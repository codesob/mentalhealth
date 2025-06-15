import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ChatInterface from '../../components/ChatInterface';
import fetchUserData from '../../services/userService';

const ChatPage = () => {
    const router = useRouter();
    const { friendId } = router.query;
    const [friend, setFriend] = useState<any>(null);

    useEffect(() => {
        if (friendId) {
            fetchUserData.fetchUser(friendId as string).then(data => {
                setFriend(data);
            });
        }
    }, [friendId]);

    if (!friend) {
        return (
            <Layout>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 150px)'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            width: 40,
                            height: 40,
                            border: '3px solid #4f8cff',
                            borderLeftColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <div style={{ color: '#666' }}>Loading chat...</div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '2rem'
            }}>
                <ChatInterface friendId={friendId as string} friend={friend} />
            </div>
        </Layout>
    );
};

export default ChatPage;