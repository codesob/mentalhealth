import Layout from '../components/Layout';
import FriendList from '../components/FriendList';
import AiChatBot from '../components/AiChatBot';

export default function ChatHome() {
  return (
    <Layout>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
        gap: '2rem',
        height: 'calc(100vh - 150px)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div>
          <h2 style={{ 
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#1a1a1a'
          }}>
            Conversations
          </h2>
          <FriendList />
        </div>
        
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          color: '#666',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem' }}>👋</div>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: '0.5rem'
          }}>
            Welcome to MeHeal Chat
          </h2>
          <p>Select a friend to start chatting or try our AI companion below</p>
          <AiChatBot />
        </div>
      </div>
    </Layout>
  );
}
