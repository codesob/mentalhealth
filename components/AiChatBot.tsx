import React, { useState } from 'react';

const AiChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Array<{
        content: string;
        sender: 'user' | 'bot';
        timestamp: Date;
    }>>([
        {
            content: "Hi! I'm here to listen and support you. How are you feeling today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const userMessage = {
            content: newMessage,
            sender: 'user' as const,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat-bot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage })
            });

            const data = await response.json();
            
            const botMessage = {
                content: data.reply || "I'm here to listen. Would you like to tell me more?",
                sender: 'bot' as const,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '600px',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden'
        }}>
            <div style={{
                padding: '16px',
                background: '#4f8cff',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                }}>
                    🤖
                </div>
                <div>
                    <div style={{ fontWeight: 600 }}>AI Companion</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Always here to listen</div>
                </div>
            </div>

            <div style={{
                height: '400px',
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                        <div style={{
                            maxWidth: '80%',
                            padding: '12px 16px',
                            borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                            background: msg.sender === 'user' ? '#4f8cff' : '#f0f2f5',
                            color: msg.sender === 'user' ? '#fff' : '#1a1a1a'
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ padding: '8px', color: '#666' }}>
                        AI is typing...
                    </div>
                )}
            </div>

            <div style={{
                padding: '16px',
                borderTop: '1px solid #eee',
                display: 'flex',
                gap: '12px'
            }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '20px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        fontSize: '1rem'
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '20px',
                        background: '#4f8cff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default AiChatBot;