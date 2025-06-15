import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { message, userId } = req.body;

        if (!message || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Get chat history or create new chat
        let chat = await prisma.aiChat.findFirst({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
        });

        if (!chat) {
            chat = await prisma.aiChat.create({
                data: {
                    userId,
                    messages: [] as ChatMessage[],
                },
            });
        }        // Prepare conversation history for context
        const messages = [
            {
                role: 'system' as const,
                content: `You are a supportive and empathetic AI companion for a mental health support platform. 
                 Your goal is to provide a caring, non-judgmental presence while encouraging users to seek 
                 professional help when appropriate. Always maintain a compassionate tone and prioritize 
                 the user's emotional well-being.`,
            },
            ...(chat.messages as ChatMessage[]),
            { role: 'user' as const, content: message },
        ];

        // Get response from OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages,
            max_tokens: 500,
            temperature: 0.7,
        }); const aiResponse = completion.choices[0].message?.content || 'I apologize, but I\'m having trouble responding right now.';
        const updatedMessages: ChatMessage[] = [
            ...(chat.messages as ChatMessage[]),
            { role: 'user', content: message },
            { role: 'assistant', content: aiResponse },
        ];

        await prisma.aiChat.update({
            where: { id: chat.id },
            data: {
                messages: updatedMessages,
                updatedAt: new Date(),
            },
        });

        return res.status(200).json({ reply: aiResponse });
    } catch (error: any) {
        console.error('AI Chat Error:', error);
        return res.status(500).json({
            message: 'Error processing your message',
            error: error.message
        });
    }
}
