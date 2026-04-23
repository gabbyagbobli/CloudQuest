'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

interface LevelLayoutProps {
  children: React.ReactNode;
  levelNumber: number;
  levelTitle: string;
}

export default function LevelLayout({ children, levelNumber, levelTitle }: LevelLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', position: 'relative' }}>
      {/* Top Navigation */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '4rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/">
            <button className="glass-card" style={{ padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
              <Home size={20} />
            </button>
          </Link>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>MISSION CONTROL</div>
            <div style={{ fontWeight: 'bold', letterSpacing: '0.05em' }}>LEVEL {levelNumber}: {levelTitle}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-blue)', boxShadow: '0 0 10px var(--neon-blue)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>PILOT STATUS: READY</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.main>

      {/* Subtle Background Elements */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vh',
        background: 'radial-gradient(circle, rgba(66, 133, 244, 0.05) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
    </div>
  );
}
