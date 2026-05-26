import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  aiInsights: string[];
  gratitude: string[];
  goals: string[];
  timestamp: Date;
}

const AIJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    mood: '',
    gratitude: ['', '', ''],
    goals: ['']
  });
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);

  const journalPrompts = [
    "What made you smile today?",
    "Describe a challenge you faced and how you handled it.",
    "What are you grateful for right now?",
    "What emotions are you experiencing and why?",
    "What would you tell your younger self?",
    "What's one thing you learned about yourself today?",
    "How did you practice self-care today?",
    "What's worrying you, and what can you control about it?"
  ];

  useEffect(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })));
    }
  }, []);

  const generateAIInsights = (content: string, mood: string): string[] => {
    const insights: string[] = [];
    const lowerContent = content.toLowerCase();

    // Sentiment analysis
    const positiveWords = ['happy', 'grateful', 'excited', 'proud', 'accomplished', 'loved', 'peaceful', 'hopeful'];
    const negativeWords = ['sad', 'anxious', 'worried', 'stressed', 'angry', 'frustrated', 'overwhelmed', 'lonely'];

    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;

    if (positiveCount > negativeCount) {
      insights.push("💚 Your entry shows positive emotional energy. It's wonderful to see you recognizing the good moments!");
    } else if (negativeCount > positiveCount) {
      insights.push("💙 You're processing difficult emotions. Acknowledging these feelings is an important step in healing.");
    }

    // Identify themes
    if (lowerContent.includes('work') || lowerContent.includes('job') || lowerContent.includes('career')) {
      insights.push("💼 Work-life balance seems to be on your mind. Remember to set boundaries and prioritize self-care.");
    }

    if (lowerContent.includes('relationship') || lowerContent.includes('friend') || lowerContent.includes('family')) {
      insights.push("👥 Relationships are a focus for you. Strong connections are vital for mental health.");
    }

    if (lowerContent.includes('anxious') || lowerContent.includes('worry') || lowerContent.includes('stress')) {
      insights.push("🧘 Consider trying grounding techniques like deep breathing or the 5-4-3-2-1 method when anxiety arises.");
    }

    if (lowerContent.includes('grateful') || lowerContent.includes('thankful') || lowerContent.includes('appreciate')) {
      insights.push("🙏 Practicing gratitude is excellent for mental wellness. Studies show it can increase happiness by 25%.");
    }

    // Goal detection
    if (lowerContent.includes('goal') || lowerContent.includes('want to') || lowerContent.includes('will')) {
      insights.push("🎯 You're setting intentions. Breaking goals into small, actionable steps increases success rates.");
    }

    // Self-care detection
    if (lowerContent.includes('exercise') || lowerContent.includes('walk') || lowerContent.includes('run')) {
      insights.push("🏃 Physical activity is a powerful mood booster. Keep up the great work!");
    }

    if (insights.length === 0) {
      insights.push("✨ Thank you for taking time to journal. Regular reflection helps build self-awareness and emotional resilience.");
    }

    return insights;
  };

  const handleSaveEntry = () => {
    if (!currentEntry.content.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const insights = generateAIInsights(currentEntry.content, currentEntry.mood);

      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: currentEntry.title || `Journal Entry - ${new Date().toLocaleDateString()}`,
        content: currentEntry.content,
        mood: currentEntry.mood,
        gratitude: currentEntry.gratitude.filter(g => g.trim()),
        goals: currentEntry.goals.filter(g => g.trim()),
        aiInsights: insights,
        timestamp: new Date()
      };

      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

      setSelectedEntry(newEntry);
      setCurrentEntry({
        title: '',
        content: '',
        mood: '',
        gratitude: ['', '', ''],
        goals: ['']
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const updateGratitude = (index: number, value: string) => {
    const newGratitude = [...currentEntry.gratitude];
    newGratitude[index] = value;
    setCurrentEntry({ ...currentEntry, gratitude: newGratitude });
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...currentEntry.goals];
    newGoals[index] = value;
    setCurrentEntry({ ...currentEntry, goals: newGoals });
  };

  const addGoal = () => {
    setCurrentEntry({ ...currentEntry, goals: [...currentEntry.goals, ''] });
  };

  return (
    <Layout>
      <Head>
        <title>AI Journal | MindHeal</title>
        <meta name="description" content="Write your thoughts and receive AI-powered insights for personal growth." />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)'
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 800,
              color: 'white',
              marginBottom: '1rem'
            }}>
              🖊️ AI-Powered Journal
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Reflect, grow, and gain insights with intelligent analysis
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: selectedEntry ? '1fr 400px' : '1fr',
            gap: '2rem',
            alignItems: 'start'
          }}>
            {/* Main Journal Area */}
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Journal Prompts */}
              {showPrompts && (
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  marginBottom: '2rem',
                  border: '2px solid #bfdbfe'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 700,
                      color: '#0f172a'
                    }}>
                      💭 Writing Prompts
                    </h3>
                    <button
                      onClick={() => setShowPrompts(false)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#64748b'
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: '#475569', fontStyle: 'italic' }}>
                    "{journalPrompts[Math.floor(Math.random() * journalPrompts.length)]}"
                  </div>
                </div>
              )}

              <input
                type="text"
                placeholder="Give your entry a title..."
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  border: 'none',
                  borderBottom: '2px solid #e2e8f0',
                  marginBottom: '1.5rem',
                  fontFamily: 'inherit'
                }}
              />

              <textarea
                placeholder="Start writing your thoughts..."
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                style={{
                  width: '100%',
                  minHeight: '300px',
                  padding: '1rem',
                  fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontFamily: 'inherit',
                  lineHeight: 1.8,
                  resize: 'vertical',
                  marginBottom: '2rem'
                }}
              />

              {/* Gratitude Section */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1rem'
                }}>
                  🙏 Three Things I'm Grateful For
                </h3>
                {currentEntry.gratitude.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`${index + 1}. Something you're grateful for...`}
                    value={item}
                    onChange={(e) => updateGratitude(index, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      marginBottom: '0.75rem',
                      fontFamily: 'inherit'
                    }}
                  />
                ))}
              </div>

              {/* Goals Section */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1rem'
                }}>
                  🎯 Goals & Intentions
                </h3>
                {currentEntry.goals.map((goal, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Goal ${index + 1}...`}
                    value={goal}
                    onChange={(e) => updateGoal(index, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      marginBottom: '0.75rem',
                      fontFamily: 'inherit'
                    }}
                  />
                ))}
                <button
                  onClick={addGoal}
                  style={{
                    background: '#f1f5f9',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '0.875rem',
                    width: '100%',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    fontWeight: 600,
                    color: '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  + Add Another Goal
                </button>
              </div>

              <button
                onClick={handleSaveEntry}
                disabled={!currentEntry.content.trim() || isAnalyzing}
                style={{
                  width: '100%',
                  padding: 'clamp(1rem, 2vw, 1.25rem)',
                  background: currentEntry.content.trim()
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#cbd5e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  fontWeight: 700,
                  cursor: currentEntry.content.trim() ? 'pointer' : 'not-allowed',
                  boxShadow: currentEntry.content.trim() ? '0 8px 20px rgba(102, 126, 234, 0.3)' : 'none',
                  transition: 'all 200ms'
                }}
              >
                {isAnalyzing ? '🤖 Generating AI Insights...' : '✨ Save & Analyze Entry'}
              </button>
            </div>

            {/* AI Insights Panel */}
            {selectedEntry && (
              <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                position: 'sticky',
                top: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                    fontWeight: 700,
                    color: '#0f172a'
                  }}>
                    🤖 AI Insights
                  </h3>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      color: '#64748b'
                    }}
                  >
                    ×
                  </button>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  border: '2px solid #bfdbfe'
                }}>
                  <div style={{
                    fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
                    color: '#64748b',
                    marginBottom: '0.5rem'
                  }}>
                    Entry Date
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                    fontWeight: 600,
                    color: '#0f172a'
                  }}>
                    {selectedEntry.timestamp.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{
                    fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '0.75rem'
                  }}>
                    Key Insights
                  </h4>
                  {selectedEntry.aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#f8fafc',
                        padding: '0.875rem',
                        borderRadius: '10px',
                        marginBottom: '0.75rem',
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                        color: '#475569',
                        lineHeight: 1.7,
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      {insight}
                    </div>
                  ))}
                </div>

                {selectedEntry.gratitude.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '0.75rem'
                    }}>
                      🙏 Gratitude
                    </h4>
                    {selectedEntry.gratitude.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '0.5rem 0',
                          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                          color: '#475569'
                        }}
                      >
                        • {item}
                      </div>
                    ))}
                  </div>
                )}

                {selectedEntry.goals.length > 0 && (
                  <div>
                    <h4 style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '0.75rem'
                    }}>
                      🎯 Goals
                    </h4>
                    {selectedEntry.goals.map((goal, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '0.5rem 0',
                          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                          color: '#475569'
                        }}
                      >
                        • {goal}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recent Entries */}
          {entries.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              marginTop: '2rem',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1.5rem'
              }}>
                📚 Your Journal Entries
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                {entries.slice(0, 6).map(entry => (
                  <div
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    style={{
                      background: '#f8fafc',
                      padding: '1.5rem',
                      borderRadius: '16px',
                      border: '2px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 200ms'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <h3 style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '0.5rem'
                    }}>
                      {entry.title}
                    </h3>
                    <div style={{
                      fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
                      color: '#64748b',
                      marginBottom: '0.75rem'
                    }}>
                      {entry.timestamp.toLocaleDateString()}
                    </div>
                    <p style={{
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      color: '#475569',
                      lineHeight: 1.7,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {entry.content}
                    </p>
                    <div style={{
                      marginTop: '1rem',
                      fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
                      color: '#667eea',
                      fontWeight: 600
                    }}>
                      {entry.aiInsights.length} AI Insights →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AIJournal;
