import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getSession } from 'next-auth/react';

interface SessionUser {
    id: string;
    email: string;
    name: string;
}

interface ExtendedSession {
    user: SessionUser;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req }) as ExtendedSession | null;

    if (!session || !session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const { friendId, action } = req.query;

    if (!friendId || typeof friendId !== 'string' || !['accept', 'reject'].includes(action as string)) {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    if (req.method === 'POST') {
        try {
            const friendRequest = await prisma.friend.findFirst({
                where: {
                    senderId: friendId,
                    receiverId: session.user.id,
                    status: 'PENDING'
                }
            });

            if (!friendRequest) {
                return res.status(404).json({ error: 'Friend request not found' });
            }

            if (action === 'accept') {
                await prisma.friend.update({
                    where: { id: friendRequest.id },
                    data: { status: 'ACCEPTED' }
                });
            } else {
                await prisma.friend.delete({
                    where: { id: friendRequest.id }
                });
            }

            res.status(200).json({ message: `Friend request ${action}ed successfully` });
        } catch (error) {
            console.error(`Error ${action}ing friend request:`, error);
            res.status(500).json({ error: `Error ${action}ing friend request` });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
