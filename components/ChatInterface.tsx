import React, { useEffect, useState } from 'react';

interface Friend {
    name?: string;
    avatar?: string;
}

interface Message {
    sender: string;
    content: string;
    timestamp: string;
}

interface ChatInterfaceProps {
    friendId: string;
    friend: Friend;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ friendId, friend }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(`/api/chat?friendId=${friendId}`);
            const data = await response.json();
            setMessages(data.messages);
        };
        fetchMessages();
    }, [friendId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friendId, message: newMessage }),
            });
            const data = await response.json();
            setMessages((prevMessages) => [...prevMessages, data.message]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-interface" style={{ maxWidth: 500, margin: '0 auto', border: '1px solid #ddd', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #eee' }}>
            <div className="chat-header" style={{ display: 'flex', alignItems: 'center', padding: 16, borderBottom: '1px solid #eee', background: '#f7f7f7', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                <img src={friend?.avatar || '/avatars/default.png'} alt="avatar" className="avatar" style={{ width: 48, height: 48, borderRadius: '50%', marginRight: 16 }} />
                <div className="friend-info">
                    <div className="friend-name" style={{ fontWeight: 600, fontSize: 20 }}>{friend?.name || 'Friend'}</div>
                </div>
            </div>
            <div className="messages" style={{ minHeight: 300, maxHeight: 400, overflowY: 'auto', padding: 16, background: '#fafbfc' }}>
                {messages.length === 0 && <div style={{ color: '#aaa', textAlign: 'center', marginTop: 40 }}>No messages yet. Say hi!</div>}
                {messages.map((msg, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                        <div style={{
                            background: msg.sender === 'user' ? '#4f8cff' : '#e5e5ea',
                            color: msg.sender === 'user' ? '#fff' : '#222',
                            padding: '8px 14px',
                            borderRadius: 18,
                            maxWidth: '70%',
                            fontSize: 16,
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input-area" style={{ display: 'flex', borderTop: '1px solid #eee', padding: 12, background: '#f7f7f7', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: 10, borderRadius: 20, border: '1px solid #ccc', outline: 'none', fontSize: 16 }}
                    onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                />
                <button onClick={handleSendMessage} style={{ marginLeft: 10, padding: '8px 18px', borderRadius: 20, background: '#4f8cff', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Send</button>
            </div>
        </div>
    );
};

export default ChatInterface;