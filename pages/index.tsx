import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Home = () => {
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "MindHeal changed my life. The support and community are incredible.",
      author: "Sarah Johnson",
      role: "Community Member"
    },
    {
      text: "Finding a therapist has never been easier. Thank you MindHeal!",
      author: "Michael Chen",
      role: "Member since 2023"
    },
    {
      text: "The AI chat feature helped me through my darkest days.",
      author: "Emily Rodriguez",
      role: "Active User"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Head>
        <title>MindHeal - Your Mental Health Companion</title>
        <meta name="description" content="Connect with caring professionals, supportive community, and AI companions. Your mental health journey starts here." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>

      {/* Hero Section */}
      <div style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem)',
        textAlign: 'center',
        maxWidth: 1280,
        margin: '0 auto'
      }} className="fade-in">
        <div style={{
          display: 'inline-block',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(1rem, 2vw, 1.5rem)',
          borderRadius: '50px',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          color: 'white',
          fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
          fontWeight: 500,
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          ✨ Trusted by 50,000+ users worldwide
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 8vw, 4.5rem)',
          fontWeight: 800,
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          color: 'white',
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}>
          Your Mental Health
          <br />
          <span style={{
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Journey Starts Here
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
          color: 'rgba(255, 255, 255, 0.95)',
          maxWidth: '700px',
          margin: '0 auto',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          lineHeight: 1.7,
          fontWeight: 300,
          padding: '0 1rem'
        }}>
          Connect with licensed therapists, join supportive communities, and get 24/7 AI assistance. 
          Take the first step towards better mental wellness today.
        </p>

        <div style={{
          display: 'flex',
          gap: 'clamp(0.75rem, 2vw, 1rem)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
          padding: '0 1rem'
        }}>
          <button
            onClick={() => router.push('/register')}
            style={{
              background: 'white',
              color: '#667eea',
              padding: 'clamp(0.875rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
              borderRadius: '14px',
              border: 'none',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(0)',
              transition: 'all 200ms',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            }}
          >
            Start Free Today →
          </button>
          <button
            onClick={() => router.push('/therapy')}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              padding: 'clamp(0.875rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
              borderRadius: '14px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              fontWeight: 600,
              cursor: 'pointer',
              transform: 'translateY(0)',
              transition: 'all 200ms',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Browse Therapists
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'clamp(1rem, 3vw, 2rem)',
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>50K+</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Active Users</div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>500+</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Licensed Therapists</div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>24/7</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>AI Support</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        background: 'white',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#0f172a'
            }}>
              Everything You Need for
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}> Mental Wellness</span>
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#64748b', maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
              Comprehensive tools and support to help you on your journey
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            {[
              {
                icon: '💬',
                title: 'Anonymous Chat',
                description: 'Connect with others who understand. Share your feelings in a safe, judgment-free space.',
                color: '#667eea',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              {
                icon: '🤖',
                title: 'AI Companion',
                description: 'Get instant support anytime. Our AI is trained to listen and provide helpful guidance.',
                color: '#ec4899',
                gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
              },
              {
                icon: '👨‍⚕️',
                title: 'Professional Therapy',
                description: 'Book sessions with licensed therapists. Video, audio, or text - whatever works for you.',
                color: '#10b981',
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              },
              {
                icon: '🎯',
                title: 'Mood Tracking',
                description: 'Monitor your emotional wellness. Track patterns and celebrate your progress over time.',
                color: '#f59e0b',
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              },
              {
                icon: '📚',
                title: 'Resource Library',
                description: 'Access curated articles, videos, and exercises. Learn coping strategies and self-care techniques.',
                color: '#6366f1',
                gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
              },
              {
                icon: '🔒',
                title: 'Complete Privacy',
                description: 'Your data is encrypted and secure. We never share your information without permission.',
                color: '#8b5cf6',
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 300ms',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{
                  width: 'clamp(50px, 10vw, 60px)',
                  height: 'clamp(50px, 10vw, 60px)',
                  borderRadius: '16px',
                  background: feature.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  marginBottom: '1.5rem',
                  boxShadow: `0 8px 20px ${feature.color}40`
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#0f172a'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: 1.8,
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            color: 'white'
          }}>
            What Our Community Says
          </h2>

          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            minHeight: 'clamp(180px, 30vw, 200px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'all 500ms'
          }}>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: 'white',
              marginBottom: '2rem',
              fontWeight: 300,
              lineHeight: 1.7,
              fontStyle: 'italic'
            }}>
              "{testimonials[currentTestimonial].text}"
            </p>
            <div>
              <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
                {testimonials[currentTestimonial].author}
              </div>
              <div style={{ fontSize: 'clamp(0.875rem, 2vw, 0.95rem)', color: 'rgba(255, 255, 255, 0.8)' }}>
                {testimonials[currentTestimonial].role}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem' }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: currentTestimonial === index ? 40 : 12,
                  height: 12,
                  borderRadius: '6px',
                  background: currentTestimonial === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 300ms'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'white',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            color: '#0f172a'
          }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#64748b',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.7,
            padding: '0 1rem'
          }}>
            Join thousands of people who have taken control of their mental health. 
            Get started for free today - no credit card required.
          </p>
          <button
            onClick={() => router.push('/register')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: 'clamp(1rem, 2vw, 1.25rem) clamp(2rem, 4vw, 3rem)',
              borderRadius: '14px',
              border: 'none',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
              transform: 'translateY(0)',
              transition: 'all 200ms'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
            }}
          >
            Create Free Account
          </button>
          <p style={{ marginTop: '1.5rem', color: '#94a3b8', fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)', padding: '0 1rem' }}>
            Free forever. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
