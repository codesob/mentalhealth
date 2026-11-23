import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../lib/prisma';
import { authOptions } from './auth/[...nextauth]';

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 20;

const SYSTEM_PROMPT = [
    'You are an automated assistant on a mental wellbeing platform. You are not a therapist and must not present yourself as one.',
    'Be warm, calm and non-judgmental. Keep replies short and practical.',
    'If the user mentions self-harm, suicide or immediate danger, encourage them to contact local emergency services or a trusted person right away.',
    'Encourage professional help for anything serious or persistent.',
].join(' ');

// Created per request so a missing key fails the request, not the build.
function getClient(): OpenAI | null {
    const apiKey = process.env.OPENAI_API_KEY;
    return apiKey ? new OpenAI({ apiKey }) : null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // The user comes from the session, never from the request body.
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id) {
        return res.status(401).json({ message: 'Please sign in.' });
    }
    const userId = session.user.id;

    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    if (!message || message.length > MAX_MESSAGE_LENGTH) {
        return res
            .status(400)
            .json({ message: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` });
    }

    const client = getClient();
    if (!client) {
        return res.status(503).json({ message: 'The assistant is not available right now.' });
    }

    try {
        const chat =
            (await prisma.aiChat.findFirst({
                where: { userId },
                orderBy: { updatedAt: 'desc' },
            })) ?? (await prisma.aiChat.create({ data: { userId, messages: [] } }));

        const history = (chat.messages as unknown as ChatMessage[]).slice(-MAX_HISTORY_MESSAGES);

        const completion = await client.chat.completions.create({
            model: process.env.OPENAI_MODEL ?? 'gpt-4',
            max_tokens: 500,
            temperature: 0.7,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...history,
                { role: 'user', content: message },
            ],
        });

        const reply =
            completion.choices[0]?.message?.content ??
            "Sorry, I couldn't respond just now. Please try again.";

        await prisma.aiChat.update({
            where: { id: chat.id },
            data: {
                messages: [
                    ...(chat.messages as unknown as ChatMessage[]),
                    { role: 'user', content: message },
                    { role: 'assistant', content: reply },
                ],
            },
        });

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('chat-bot failed', error);
        return res.status(500).json({ message: 'Could not process your message.' });
    }
}
