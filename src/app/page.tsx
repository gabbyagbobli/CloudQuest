'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  ChevronRight, 
  Sparkles, 
  Shield, 
  Database, 
  Globe, 
  LogIn, 
  LogOut, 
  User as UserIcon 
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import Leaderboard from '@/components/Leaderboard';

export default function Home() {
  const { user, signIn, logOut, userData, loading } = useAuth();
  const levels = [
    { title: "Launch Sequence", desc: "Cloud Basics", icon: <Rocket size={24} />, color: "var(--neon-blue)" },
    { title: "Data Nebula", desc: "Storage & BigQuery", icon: <Database size={24} />, color: "var(--neon-red)" },
    { title: "Gemini Core", desc: "GenAI Foundations", icon: <Sparkles size={24} />, color: "var(--neon-yellow)" },
    { title: "Agent Frontier", desc: "Gemini Enterprise", icon: <Shield size={24} />, color: "var(--neon-green)" }
  ];

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Auth Header */}
      <div style={{ 
        position: 'absolute', 
        top: '2rem', 
        right: '2rem', 
        zIndex: 100, 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem' 
      }}>
        {!loading && (
          user ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              background: 'var(--glass)', 
              padding: '0.5rem 1rem', 
              borderRadius: '100px', 
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>{user.displayName}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--neon-blue)', fontWeight: 'bold' }}>{userData?.aura || 0} AURA</div>
              </div>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Pilot" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--neon-blue)' }} />
              ) : (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserIcon size={16} />
                </div>
              )}
              <button onClick={logOut} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={signIn} style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogIn size={18} /> Pilot Sign In
            </button>
          )
        )}
      </div>
      {/* Cinematic Spaceship */}
      <motion.div 
        className="floating"
        initial={{ opacity: 0, y: 100, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          zIndex: 0,
          opacity: 1,
          filter: 'drop-shadow(0 0 40px rgba(0, 194, 255, 0.5))',
          mixBlendMode: 'screen',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
        }}
      >
        <Image 
          src="/spaceship.png" 
          alt="CloudQuest Spaceship" 
          width={400} 
          height={400} 
          style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
        />
      </motion.div>

      {/* Hero Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: '5vh' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.05)',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '0.9rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Globe size={16} color="var(--neon-blue)" />
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>The Premier Google Cloud AI Journey</span>
        </motion.div>

        <motion.h1 
          className="text-gradient-blue"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: '950',
            marginBottom: '1.5rem',
            letterSpacing: '-0.04em',
            lineHeight: 0.9
          }}
        >
          CLOUDQUEST
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: '1.4rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}
        >
          Unlocking the future of <span style={{ color: '#fff', fontWeight: 600 }}>Autonomous AI Agents</span>. 
          Foundational mastery for the next generation of Cloud Pilots.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="/level-1">
            <button className="btn-primary">
              Launch Odyssey <ChevronRight size={20} />
            </button>
          </a>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '3rem', 
        width: '100%', 
        maxWidth: '1300px', 
        marginTop: '8rem',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'center',
        zIndex: 2
      }}>
        {/* Level Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            flex: '2',
            minWidth: '300px'
          }}
        >
          {levels.map((level, i) => (
            <a key={i} href={`/level-${i + 1}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <motion.div 
                className="glass-card" 
                style={{ padding: '2rem', textAlign: 'left', height: '100%' }}
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: `rgba(255,255,255,0.05)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: level.color,
                  border: `1px solid ${level.color}33`,
                  boxShadow: `0 0 20px ${level.color}22`
                }}>
                  {level.icon}
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: 'rgba(255,255,255,0.4)', 
                  fontWeight: '700',
                  marginBottom: '0.25rem',
                  letterSpacing: '0.1em'
                }}>
                  LEVEL 0{i + 1}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 700 }}>{level.title}</h3>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{level.desc}</p>
              </motion.div>
            </a>
          ))}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ flex: '1', minWidth: '300px' }}
        >
          <Leaderboard />
        </motion.div>
      </div>

      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(66, 133, 244, 0.15) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 1
      }} />
    </main>
  );
}
