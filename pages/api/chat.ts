import { NextApiRequest, NextApiResponse } from 'next';

let chatHistory: { friendId: string; messages: { sender: string; content: string; timestamp: Date }[] }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { friendId, message } = req.body;

        if (!friendId || !message) {
            return res.status(400).json({ error: 'Friend ID and message are required' });
        }

        const timestamp = new Date();
        const newMessage = { sender: 'user', content: message, timestamp };

        const chat = chatHistory.find(chat => chat.friendId === friendId);
        if (chat) {
            chat.messages.push(newMessage);
        } else {
            chatHistory.push({ friendId, messages: [newMessage] });
        }

        return res.status(200).json({ success: true, message: newMessage });
    } else if (req.method === 'GET') {
        const { friendId } = req.query;

        if (!friendId) {
            return res.status(400).json({ error: 'Friend ID is required' });
        }

        const chat = chatHistory.find(chat => chat.friendId === friendId);
        return res.status(200).json({ messages: chat ? chat.messages : [] });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}