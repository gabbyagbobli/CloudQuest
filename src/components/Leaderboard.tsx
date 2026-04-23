'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Trophy, Star, User as UserIcon } from 'lucide-react';

export default function Leaderboard() {
  const [pilots, setPilots] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('aura', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPilots(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <Trophy color="var(--neon-yellow)" size={24} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Top Pilots</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {pilots.map((pilot, i) => (
          <motion.div 
            key={pilot.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: i === 0 ? 'rgba(251,188,5,0.05)' : 'rgba(255,255,255,0.02)',
              borderRadius: '12px',
              border: i === 0 ? '1px solid rgba(251,188,5,0.2)' : '1px solid transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '900', color: i === 0 ? 'var(--neon-yellow)' : 'rgba(255,255,255,0.3)' }}>
                #{i + 1}
              </span>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {pilot.photoURL ? (
                  <img src={pilot.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <UserIcon size={14} color="rgba(255,255,255,0.5)" />
                )}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                {pilot.displayName ? pilot.displayName.split(' ')[0] : 'Pilot'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--neon-blue)' }}>{pilot.aura}</span>
              <Star size={12} color="var(--neon-blue)" fill="var(--neon-blue)" />
            </div>
          </motion.div>
        ))}
        {pilots.length === 0 && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', padding: '1rem' }}>
            Awaiting new pilots...
          </div>
        )}
      </div>
    </div>
  );
}
