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
            const friends = await prisma.friend.findMany({
                where: {
                    OR: [
                        { senderId: session.user.id },
                        { receiverId: session.user.id }
                    ],
                    AND: {
                        status: 'ACCEPTED'
                    }
                },
                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            online: true,
                        }
                    },
                    receiver: {
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
            const transformedFriends = friends.map(friend => {
                const isSender = friend.senderId === session.user.id;
                const friendUser = isSender ? friend.receiver : friend.sender;

                return {
                    id: friendUser.id,
                    name: friendUser.name,
                    avatar: friendUser.avatar,
                    online: friendUser.online,
                    status: friend.status,
                };
            });

            res.json(transformedFriends);
        } catch (error) {
            console.error('Error fetching friends:', error);
            res.status(500).json({ error: 'Error fetching friends' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
