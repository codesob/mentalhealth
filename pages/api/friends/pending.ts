import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
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

    if (req.method === 'GET') {
        try {
            const pendingRequests = await prisma.friend.findMany({
                where: {
                    receiverId: session.user.id,
                    status: 'PENDING'
                },
                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            online: true,
                        }
                    }
                }
            });

            // Transform the data to match the Friend interface
            const transformedRequests = pendingRequests.map(request => ({
                id: request.sender.id,
                name: request.sender.name,
                avatar: request.sender.avatar,
                online: request.sender.online,
                status: 'PENDING',
            }));

            res.json(transformedRequests);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            res.status(500).json({ error: 'Error fetching pending requests' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
