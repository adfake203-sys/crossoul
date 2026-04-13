import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { HapticManager } from '../../lib/HapticManager';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'waitlist'), {
        email: email.toLowerCase().trim(),
        source: 'mvp_builder_game',
        createdAt: serverTimestamp()
      });

      setIsSubmitted(true);
      HapticManager.notification();

      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        onClose();
      }, 3500);
    } catch (err: any) {
      console.error("Error adding document: ", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '450px',
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '32px',
              padding: '2.5rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}
          >
            {/* Design accents */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(20px)' }} />

            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            {!isSubmitted ? (
              <>
                <div style={{ 
                    fontFamily: 'var(--font-body)',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    padding: '0.4rem 0.8rem', 
                    background: 'rgba(123, 45, 142, 0.1)', 
                    borderRadius: '20px', 
                    color: '#a5b4fc', 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    marginBottom: '1.5rem',
                    letterSpacing: '0.5px'
                }}>
                  <Sparkles size={14} /> JOIN THE MOVEMENT
                </div>

                <h2 style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.5rem', 
                    fontWeight: 900, 
                    marginBottom: '1rem', 
                    color: '#fff', 
                    letterSpacing: '-1.5px',
                    lineHeight: 1
                }}>Enter the Circle</h2>
                <p style={{ 
                    fontFamily: 'var(--font-body)',
                    color: '#a1a1aa', 
                    fontSize: '1rem', 
                    lineHeight: '1.5', 
                    marginBottom: '2rem',
                    letterSpacing: '-0.2px'
                }}>
                  Experience a mindful world of resonance. Be the first to know when we launch the next phase of human connection.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="email" 
                      required
                      placeholder="resonance@crossoul.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        padding: '1.2rem',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s',
                        cursor: isLoading ? 'not-allowed' : 'text'
                      }}
                    />
                    {error && (
                      <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 600 }}>
                        {error}
                      </p>
                    )}
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      width: '100%',
                      padding: '1.2rem',
                      background: isLoading ? '#3f3f46' : 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      letterSpacing: '0.5px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.8rem',
                      boxShadow: isLoading ? 'none' : '0 10px 20px rgba(79, 70, 229, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isLoading ? (
                      <>Processing... <Loader2 className="animate-spin" size={18} /></>
                    ) : (
                      <>Reserve my spot <Send size={18} /></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div style={{ width: '64px', height: '64px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Send size={32} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Momentum Captured!</h2>
                <p style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.9rem' }}>Welcome to the resonance chain.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
