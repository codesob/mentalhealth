import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <Layout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '4rem 1rem'
      }}>
        <Head>
          <title>Mental Health Platform</title>
          <meta name="description" content="A platform for mental health support, making friends, and accessing therapy." />
        </Head>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #4f8cff 0%, #2667ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Your Mental Health Matters
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#666',
          maxWidth: '600px',
          marginBottom: '2.5rem'
        }}>
          Connect with friends, chat with our AI companion, or schedule therapy sessions.
          Your journey to better mental health starts here.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '4rem'
        }}>
          <Link href="/register">
            <button style={{
              background: '#4f8cff',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '2rem',
              border: 'none',
              fontSize: '1.125rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 6px rgba(79,140,255,0.2)'
            }}>
              Get Started
            </button>
          </Link>
          <Link href="/therapy">
            <button style={{
              background: 'transparent',
              color: '#4f8cff',
              padding: '0.75rem 2rem',
              borderRadius: '2rem',
              border: '2px solid #4f8cff',
              fontSize: '1.125rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}>
              Find Therapists
            </button>
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '1000px'
        }}>
          {[
            {
              title: 'Connect with Friends',
              description: 'Build meaningful connections with people who understand your journey.',
              icon: '👥'
            },
            {
              title: 'AI Support',
              description: 'Get 24/7 support from our empathetic AI companion.',
              icon: '🤖'
            },
            {
              title: 'Professional Help',
              description: 'Connect with licensed therapists for expert guidance.',
              icon: '🧠'
            }
          ].map((feature, index) => (
            <div key={index} style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#1a1a1a'
              }}>
                {feature.title}
              </h3>
              <p style={{ color: '#666' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;