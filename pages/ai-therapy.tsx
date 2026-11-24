import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface TherapistPersona {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  description: string;
  greeting: string;
  systemPrompt: string;
}

const AITherapy = () => {
  const router = useRouter();
  const [selectedTherapist, setSelectedTherapist] = useState<TherapistPersona | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const therapists: TherapistPersona[] = [
    {
      id: 'dr-emma',
      name: 'Dr. Emma Wilson',
      specialty: 'Anxiety & Depression',
      avatar: '👩‍⚕️',
      description: 'Specializes in cognitive behavioral therapy for anxiety and depression. Warm, empathetic, and solution-focused.',
      greeting: "Hello! I'm Dr. Emma Wilson. I'm here to support you through anxiety and depression. What's on your mind today?",
      systemPrompt: 'You are Dr. Emma Wilson, a compassionate therapist specializing in CBT for anxiety and depression. You are warm, empathetic, validating, and solution-focused. Use evidence-based techniques. Always validate feelings before offering solutions. If you detect crisis language, recommend immediate professional help.'
    },
    {
      id: 'dr-marcus',
      name: 'Dr. Marcus Chen',
      specialty: 'Stress & Burnout',
      avatar: '👨‍⚕️',
      description: 'Expert in stress management and burnout prevention. Practical, mindfulness-based approach.',
      greeting: "Hi! I'm Dr. Marcus Chen. I help people navigate stress and prevent burnout. Let's work together to find balance in your life.",
      systemPrompt: 'You are Dr. Marcus Chen, a practical therapist specializing in stress management and burnout. You use mindfulness-based techniques and focus on work-life balance. Be direct but compassionate. Provide actionable coping strategies. If crisis detected, recommend professional help immediately.'
    },
    {
      id: 'dr-sofia',
      name: 'Dr. Sofia Rodriguez',
      specialty: 'Relationships & Self-Esteem',
      avatar: '👩‍⚕️',
      description: 'Focuses on relationship issues and building healthy self-esteem. Nurturing and insightful.',
      greeting: "Welcome! I'm Dr. Sofia Rodriguez. I specialize in relationships and self-worth. You deserve to feel valued and connected.",
      systemPrompt: 'You are Dr. Sofia Rodriguez, a nurturing therapist specializing in relationships and self-esteem. You help clients build healthy boundaries and self-compassion. Be insightful, validating, and help identify patterns. If crisis detected, prioritize safety and recommend professional help.'
    },
    {
      id: 'dr-james',
      name: 'Dr. James Taylor',
      specialty: 'Trauma & PTSD',
      avatar: '👨‍⚕️',
      description: 'Trained in trauma-informed care and EMDR. Gentle, patient, and grounding.',
      greeting: "Hello, I'm Dr. James Taylor. I provide trauma-informed support. This is a safe space. We'll move at your pace.",
      systemPrompt: 'You are Dr. James Taylor, a trauma-informed therapist specializing in PTSD. You are extremely gentle, patient, and grounding. Always prioritize safety and emotional regulation. Use grounding techniques. Never push. If crisis or self-harm detected, immediately recommend emergency services.'
    }
  ];

  const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'self-harm', 'hurt myself', 'no reason to live'];

  const detectCrisis = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectTherapist = (therapist: TherapistPersona) => {
    setSelectedTherapist(therapist);
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: therapist.greeting,
        timestamp: new Date()
      }
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedTherapist) return;

    // Check for crisis
    if (detectCrisis(inputMessage)) {
      setShowCrisisModal(true);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
      const responses = [
        "I hear you, and what you're feeling is completely valid. Many people experience similar emotions when dealing with these challenges.",
        "Thank you for sharing that with me. It takes courage to open up about these feelings. Let's explore this together.",
        "That sounds really difficult. Can you tell me more about what you're experiencing? I'm here to listen and support you.",
        "I appreciate you trusting me with this. What you're going through matters, and we can work through this step by step.",
        "Those feelings are understandable given what you're dealing with. Let's look at some coping strategies that might help."
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedTherapist) {
    return (
      <Layout>
        <Head>
          <title>AI Therapy - Choose Your Therapist | MindHeal</title>
          <meta name="description" content="Connect with AI therapists specialized in different areas. Get professional support 24/7." />
        </Head>

        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)'
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                fontWeight: 800,
                color: 'white',
                marginBottom: '1rem'
              }}>
                Choose Your AI Therapist
              </h1>
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                Each therapist specializes in different areas and uses evidence-based techniques.
                Choose the one that fits your needs best.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              {therapists.map(therapist => (
                <div
                  key={therapist.id}
                  onClick={() => handleSelectTherapist(therapist)}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    cursor: 'pointer',
                    transition: 'all 300ms',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(3rem, 6vw, 4rem)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {therapist.avatar}
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                  }}>
                    {therapist.name}
                  </h3>
                  <div style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    color: '#667eea',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {therapist.specialty}
                  </div>
                  <p style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    color: '#64748b',
                    lineHeight: 1.7,
                    textAlign: 'center'
                  }}>
                    {therapist.description}
                  </p>
                  <button style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Start Session
                  </button>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 'clamp(2rem, 5vw, 4rem)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'white', fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', marginBottom: '1rem' }}>
                🚨 Crisis Support
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', marginBottom: '1rem' }}>
                If you're in crisis or having thoughts of self-harm, please reach out for immediate help:
              </p>
              <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 600, color: 'white' }}>
                National Suicide Prevention Lifeline: 988 or 1-800-273-8255
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Chat with {selectedTherapist.name} | MindHeal</title>
        <meta name="description" content={`AI therapy session with ${selectedTherapist.name}, specializing in ${selectedTherapist.specialty}`} />
      </Head>

      {/* Crisis Modal */}
      {showCrisisModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: 'clamp(2rem, 4vw, 3rem)',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#dc2626', marginBottom: '1rem' }}>
              🚨 Crisis Detected
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: '#0f172a', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              It seems you may be in crisis. Please reach out to professionals who can provide immediate help:
            </p>
            <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)', color: '#dc2626', marginBottom: '0.5rem' }}>
                National Suicide Prevention Lifeline
              </div>
              <div style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, color: '#0f172a' }}>
                988 or 1-800-273-8255
              </div>
              <div style={{ fontSize: 'clamp(0.875rem, 2vw, 0.95rem)', color: '#64748b', marginTop: '0.5rem' }}>
                Available 24/7. Free and confidential.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowCrisisModal(false)}
                style={{
                  flex: 1,
                  minWidth: '120px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Continue Session
              </button>
              <button
                onClick={() => window.open('tel:988')}
                style={{
                  flex: 1,
                  minWidth: '120px',
                  background: '#dc2626',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Call 988 Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#f8fafc'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => setSelectedTherapist(null)}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '12px',
              padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              cursor: 'pointer',
              fontWeight: 600,
              color: '#0f172a'
            }}
          >
            ← Back
          </button>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{selectedTherapist.avatar}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#0f172a' }}>
              {selectedTherapist.name}
            </div>
            <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', color: '#64748b' }}>
              {selectedTherapist.specialty}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'clamp(1rem, 2vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {messages.map(message => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '70%',
                background: message.role === 'user'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                color: message.role === 'user' ? 'white' : '#0f172a',
                padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(1rem, 2.5vw, 1.5rem)',
                borderRadius: '16px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                lineHeight: 1.7,
                boxShadow: message.role === 'assistant' ? '0 2px 10px rgba(0, 0, 0, 0.08)' : 'none'
              }}>
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                background: 'white',
                padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(1rem, 2.5vw, 1.5rem)',
                borderRadius: '16px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div className="typing-dot" />
                  <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
                  <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          background: 'white',
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', gap: '1rem', maxWidth: 1200, margin: '0 auto' }}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              style={{
                flex: 1,
                padding: 'clamp(0.875rem, 2vw, 1rem)',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontFamily: 'inherit',
                resize: 'none',
                minHeight: '60px',
                maxHeight: '150px'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              style={{
                background: inputMessage.trim()
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#cbd5e1',
                color: 'white',
                padding: 'clamp(0.875rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                borderRadius: '12px',
                border: 'none',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontWeight: 600,
                cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                whiteSpace: 'nowrap'
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background: #94a3b8;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AITherapy;
