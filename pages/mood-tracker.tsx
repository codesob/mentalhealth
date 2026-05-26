import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

interface MoodEntry {
  id: string;
  mood: string;
  intensity: number;
  note: string;
  activities: string[];
  timestamp: Date;
}

interface MoodOption {
  emoji: string;
  name: string;
  color: string;
  gradient: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(5);
  const [note, setNote] = useState<string>('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showInsights, setShowInsights] = useState(false);

  const moods: MoodOption[] = [
    { emoji: '😊', name: 'Happy', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { emoji: '😌', name: 'Calm', color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' },
    { emoji: '😢', name: 'Sad', color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { emoji: '😰', name: 'Anxious', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
    { emoji: '😤', name: 'Angry', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
    { emoji: '😴', name: 'Tired', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
    { emoji: '😐', name: 'Neutral', color: '#64748b', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' },
    { emoji: '😆', name: 'Excited', color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' },
  ];

  const activities = [
    '🏃 Exercise', '📚 Reading', '🎵 Music', '👥 Socializing',
    '🧘 Meditation', '🎨 Creative Work', '💼 Work', '🎮 Gaming',
    '🍳 Cooking', '🚶 Walking', '📱 Social Media', '🛌 Resting'
  ];

  useEffect(() => {
    // Load mood history from localStorage
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMoodHistory(parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })));
    }
  }, []);

  const handleSaveMood = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      intensity,
      note,
      activities: selectedActivities,
      timestamp: new Date()
    };

    const updatedHistory = [newEntry, ...moodHistory];
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));

    // Reset form
    setSelectedMood('');
    setIntensity(5);
    setNote('');
    setSelectedActivities([]);
    setShowInsights(true);
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const getMoodStats = () => {
    if (moodHistory.length === 0) return null;

    const last7Days = moodHistory.filter(entry => {
      const daysDiff = (new Date().getTime() - entry.timestamp.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    });

    const moodCounts = last7Days.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    const avgIntensity = last7Days.reduce((sum, entry) => sum + entry.intensity, 0) / last7Days.length;

    return { mostCommonMood, avgIntensity, entriesCount: last7Days.length };
  };

  const getAIInsights = () => {
    const stats = getMoodStats();
    if (!stats) return [];

    const insights = [];

    if (stats.mostCommonMood[0] === 'Sad' || stats.mostCommonMood[0] === 'Anxious') {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Mood Pattern Detected',
        message: `You've been feeling ${stats.mostCommonMood[0].toLowerCase()} frequently this week. Consider reaching out to a therapist or trying relaxation techniques.`
      });
    }

    if (stats.avgIntensity > 7) {
      insights.push({
        type: 'info',
        icon: '💡',
        title: 'High Emotional Intensity',
        message: 'Your emotions have been intense lately. This is normal, but grounding exercises might help you feel more balanced.'
      });
    }

    if (stats.entriesCount >= 5) {
      insights.push({
        type: 'success',
        icon: '🎉',
        title: 'Great Tracking!',
        message: `You've logged ${stats.entriesCount} mood entries this week. Consistent tracking helps identify patterns and triggers.`
      });
    }

    const recentActivities = moodHistory.slice(0, 7).flatMap(e => e.activities);
    const activityCounts = recentActivities.reduce((acc, activity) => {
      acc[activity] = (acc[activity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (activityCounts['🏃 Exercise'] >= 3) {
      insights.push({
        type: 'success',
        icon: '💪',
        title: 'Active Lifestyle',
        message: 'Great job staying active! Exercise is one of the best natural mood boosters.'
      });
    }

    if (activityCounts['🧘 Meditation'] >= 2) {
      insights.push({
        type: 'success',
        icon: '🧘',
        title: 'Mindfulness Practice',
        message: 'Regular meditation is helping you build emotional resilience. Keep it up!'
      });
    }

    return insights;
  };

  const stats = getMoodStats();
  const insights = getAIInsights();

  return (
    <Layout>
      <Head>
        <title>Mood Tracker | MindHeal</title>
        <meta name="description" content="Track your emotional wellness with AI-powered insights and pattern recognition." />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 800,
              color: 'white',
              marginBottom: '1rem'
            }}>
              How are you feeling today?
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Track your mood and discover patterns with AI-powered insights
            </p>
          </div>

          {/* Mood Selector */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '2rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1.5rem'
            }}>
              Select Your Mood
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {moods.map(mood => (
                <div
                  key={mood.name}
                  onClick={() => setSelectedMood(mood.name)}
                  style={{
                    textAlign: 'center',
                    padding: '1.5rem 1rem',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 200ms',
                    background: selectedMood === mood.name ? mood.gradient : '#f8fafc',
                    border: selectedMood === mood.name ? 'none' : '2px solid #e2e8f0',
                    transform: selectedMood === mood.name ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>
                    {mood.emoji}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    fontWeight: 600,
                    color: selectedMood === mood.name ? 'white' : '#0f172a'
                  }}>
                    {mood.name}
                  </div>
                </div>
              ))}
            </div>

            {selectedMood && (
              <>
                <h3 style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1rem'
                }}>
                  Intensity Level: {intensity}/10
                </h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    marginBottom: '2rem',
                    accentColor: '#667eea'
                  }}
                />

                <h3 style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1rem'
                }}>
                  What have you been doing?
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '2rem'
                }}>
                  {activities.map(activity => (
                    <button
                      key={activity}
                      onClick={() => toggleActivity(activity)}
                      style={{
                        padding: '0.75rem 1.25rem',
                        borderRadius: '25px',
                        border: selectedActivities.includes(activity) ? 'none' : '2px solid #e2e8f0',
                        background: selectedActivities.includes(activity)
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'white',
                        color: selectedActivities.includes(activity) ? 'white' : '#0f172a',
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 200ms'
                      }}
                    >
                      {activity}
                    </button>
                  ))}
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1rem'
                }}>
                  Add a Note (Optional)
                </h3>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's on your mind? Any triggers or thoughts you want to remember..."
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    fontFamily: 'inherit',
                    marginBottom: '2rem',
                    resize: 'vertical'
                  }}
                />

                <button
                  onClick={handleSaveMood}
                  style={{
                    width: '100%',
                    padding: 'clamp(1rem, 2vw, 1.25rem)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                    transition: 'all 200ms'
                  }}
                >
                  Save Mood Entry
                </button>
              </>
            )}
          </div>

          {/* AI Insights */}
          {stats && insights.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '2rem',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1.5rem'
              }}>
                🤖 AI Insights
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    style={{
                      background: insight.type === 'warning' ? '#fef2f2' :
                                 insight.type === 'success' ? '#f0fdf4' : '#eff6ff',
                      padding: 'clamp(1rem, 2vw, 1.5rem)',
                      borderRadius: '16px',
                      border: `2px solid ${
                        insight.type === 'warning' ? '#fecaca' :
                        insight.type === 'success' ? '#bbf7d0' : '#bfdbfe'
                      }`
                    }}
                  >
                    <div style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '0.5rem'
                    }}>
                      {insight.icon} {insight.title}
                    </div>
                    <div style={{
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      color: '#475569',
                      lineHeight: 1.7
                    }}>
                      {insight.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly Stats */}
          {stats && (
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '2rem',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1.5rem'
              }}>
                📊 Your Week in Review
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                    {moods.find(m => m.name === stats.mostCommonMood[0])?.emoji}
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>Most Common Mood</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>
                    {stats.mostCommonMood[0]}
                  </div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📈</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>Average Intensity</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>
                    {stats.avgIntensity.toFixed(1)}/10
                  </div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>Entries This Week</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>
                    {stats.entriesCount}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent History */}
          {moodHistory.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1.5rem'
              }}>
                📅 Recent Entries
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {moodHistory.slice(0, 5).map(entry => {
                  const mood = moods.find(m => m.name === entry.mood);
                  return (
                    <div
                      key={entry.id}
                      style={{
                        background: '#f8fafc',
                        padding: 'clamp(1rem, 2vw, 1.5rem)',
                        borderRadius: '16px',
                        border: '2px solid #e2e8f0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>{mood?.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', color: '#0f172a' }}>
                            {entry.mood}
                          </div>
                          <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.875rem)', color: '#64748b' }}>
                            {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        <div style={{
                          marginLeft: 'auto',
                          fontWeight: 700,
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                          color: mood?.color
                        }}>
                          {entry.intensity}/10
                        </div>
                      </div>
                      {entry.activities.length > 0 && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginTop: '0.75rem'
                        }}>
                          {entry.activities.map(activity => (
                            <span
                              key={activity}
                              style={{
                                background: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
                                color: '#64748b',
                                border: '1px solid #e2e8f0'
                              }}
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      )}
                      {entry.note && (
                        <div style={{
                          marginTop: '0.75rem',
                          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                          color: '#475569',
                          fontStyle: 'italic',
                          lineHeight: 1.7
                        }}>
                          "{entry.note}"
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MoodTracker;
