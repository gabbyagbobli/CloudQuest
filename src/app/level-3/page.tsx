'use client';

import React, { useState } from 'react';
import LevelLayout from '@/components/LevelLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, MessagesSquare, CheckCircle, ChevronRight, AlertCircle, Eye, Music, FileText, ShieldCheck, Info, Binary, Brain, Scale, ThermometerSnowflake, Zap, Activity, Layers } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const renderText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#fff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const steps = [
  {
    title: "1. The Engine of Thought: Generative AI",
    icon: <Sparkles size={48} color="var(--neon-yellow)" />,
    content: "**Generative AI** is a type of AI that can create *new* content—text, images, code, and more. Unlike traditional AI that only classifies data, GenAI understands the patterns well enough to generate something entirely original.",
    tip: "Think of GenAI as an artist, whereas traditional AI is more like a librarian.",
    keyPoint: "GenAI creates new content based on learned patterns."
  },
  {
    title: "2. The Library of Knowledge: Foundation Models",
    icon: <Brain size={48} color="var(--neon-blue)" />,
    content: "**Foundation Models** (like Gemini) are trained on massive datasets covering almost all human knowledge. They are 'General Purpose,' meaning one model can do thousands of different tasks without needing special training for each one.",
    tip: "A Foundation Model is the 'Base' that you build your specific applications on top of.",
    keyPoint: "Foundation Models are the multi-purpose brains of AI."
  },
  {
    title: "3. The Language of AI: Tokens",
    icon: <Binary size={48} color="var(--neon-red)" />,
    content: "AI doesn't see words; it sees **Tokens**. A token is a chunk of characters. On average, 1,000 tokens is about 750 words. Every time the AI 'thinks', it's processing these tokens one by one.",
    tip: "Shorter words might be 1 token, while long complex words might be 3 or 4 tokens.",
    keyPoint: "Tokens are the fundamental units of AI processing."
  },
  {
    title: "4. The Short-term Memory: Context Window",
    icon: <Layers size={48} color="var(--neon-green)" />,
    content: "The **Context Window** is how much information the AI can 'remember' at one time during a conversation. Gemini has a massive context window (up to 2 million tokens!), allowing it to read entire books or hours of video in one go.",
    tip: "A larger context window means the AI can understand much more complex missions without 'forgetting' the start.",
    keyPoint: "Context Window determines the limit of the AI's immediate memory."
  },
  {
    title: "5. Creative Heat: Temperature",
    icon: <ThermometerSnowflake size={48} color="var(--neon-yellow)" />,
    content: "**Temperature** controls the randomness of the AI's output. A low temperature (0.1) makes it factual and predictable. A high temperature (0.9) makes it creative and diverse.",
    tip: "Use low temperature for coding and high temperature for writing poetry.",
    keyPoint: "Temperature balances predictability vs. creativity."
  },
  {
    title: "6. Narrowing the Field: Top-K & Top-P",
    icon: <Scale size={48} color="var(--neon-blue)" />,
    content: "These settings tell the AI how to choose the next token. **Top-K** limits it to the 'K' most likely words. **Top-P** chooses from a dynamic set of words whose total probability equals 'P'. They help prevent the AI from babbling.",
    tip: "Adjusting these helps fine-tune how 'focused' the AI's reasoning is.",
    keyPoint: "Top-K and Top-P refine the token selection process."
  },
  {
    title: "7. The Super-Human Senses: Multimodality",
    icon: <div style={{ display: 'flex', gap: '8px' }}>
      <Eye size={32} color="var(--neon-blue)" />
      <Music size={32} color="var(--neon-red)" />
      <FileText size={32} color="var(--neon-green)" />
    </div>,
    content: "Gemini is natively **Multimodal**. It was trained on text, images, audio, and video *at the same time*. This allows it to understand the relationship between a photo of a broken engine and the sound it's making.",
    tip: "You don't need separate models for vision and sound anymore—Gemini does it all.",
    keyPoint: "Multimodal AI reasons across different media types natively."
  },
  {
    title: "8. The Pilot's Command: Prompt Engineering",
    icon: <MessagesSquare size={48} color="var(--neon-blue)" />,
    content: "**Prompt Engineering** is how you talk to the Core. A perfect prompt includes: **Instruction** (the task), **Context** (background), **Input Data**, and **Output Format** (how you want the answer).",
    tip: "Be specific! Instead of 'Write a story,' say 'Write a 3-paragraph space opera about a lost droid.'",
    keyPoint: "Good prompting is the key to high-quality AI output."
  },
  {
    title: "9. Just Do It: Zero-Shot Prompting",
    icon: <Zap size={48} color="var(--neon-yellow)" />,
    content: "**Zero-Shot** is when you ask the AI to do a task without giving it any examples. Because Foundation Models are so smart, they can often guess exactly what you want on the first try.",
    tip: "Example: 'Translate this to Spanish: Hello.' This is zero-shot.",
    keyPoint: "Zero-shot is asking for a task with no prior examples."
  },
  {
    title: "10. Learning by Example: Few-Shot Prompting",
    icon: <Layers size={48} color="var(--neon-green)" />,
    content: "**Few-Shot** is giving the AI 2 or 3 examples of the task before asking it to do the real one. This 'primes' the model and dramatically improves accuracy for complex tasks.",
    tip: "Show, don't just tell. Examples are the best way to teach the AI your preferred style.",
    keyPoint: "Few-shot uses examples to guide the AI's behavior."
  },
  {
    title: "11. Thinking Out Loud: Chain of Thought",
    icon: <Activity size={48} color="var(--neon-red)" />,
    content: "**Chain of Thought** (CoT) is asking the AI to 'Think step-by-step.' By breaking a problem down into small logical pieces, the AI is much less likely to make a mistake in complex reasoning.",
    tip: "Adding 'Let's think step-by-step' to your prompt is a magic trick for better logic.",
    keyPoint: "CoT forces the AI to show its work and improve accuracy."
  },
  {
    title: "12. The Pilot's Manual: System Instructions",
    icon: <ShieldCheck size={48} color="var(--neon-green)" />,
    content: "**System Instructions** are high-level rules that stay active throughout the whole mission. They tell the AI: 'You are a professional flight engineer' or 'Never use emojis.'",
    tip: "Use these to set the permanent 'Personality' and 'Safety Boundaries' of your AI.",
    keyPoint: "System Instructions set the behavior for the entire session."
  },
  {
    title: "13. Mirage in the Nebula: Hallucinations",
    icon: <AlertCircle size={48} color="var(--neon-red)" />,
    content: "Sometimes the AI sounds very confident but is actually making things up. This is called a **Hallucination**. It happens because the AI is a probability engine, not a database of facts.",
    tip: "Always verify the Core's output, especially for numbers, dates, and legal facts.",
    keyPoint: "Hallucinations are plausible-sounding but false outputs."
  },
  {
    title: "14. Guarding the Core: Safety Settings",
    icon: <ShieldCheck size={48} color="var(--neon-green)" />,
    content: "Gemini has built-in **Safety Filters** for hate speech, harassment, and dangerous content. As a pilot, you can adjust these thresholds to ensure the Core remains a safe and helpful assistant.",
    tip: "Responsible AI is about ensuring the technology benefits everyone without causing harm.",
    keyPoint: "Safety settings protect users and missions from harmful content."
  },
  {
    title: "15. The Core Synchronized: Summary",
    icon: <CheckCircle size={48} color="var(--neon-yellow)" />,
    content: "You've mastered the **Gemini Core**. You understand how it thinks (Tokens), how it remembers (Context), and how to command it (Prompting). You've even learned to spot its mirages (Hallucinations). You are ready for the final frontier.",
    tip: "The Core is powerful, but it needs a skilled Pilot to reach its full potential.",
    keyPoint: "Understanding the Core's mechanics is the heart of AI expertise."
  }
];

const quizQuestions = [
  {
    question: "What do we call the chunks of characters that an AI processes instead of whole words?",
    options: [
      { id: 'atoms', label: 'Atoms', desc: 'Smallest units of matter.' },
      { id: 'tokens', label: 'Tokens', desc: 'Chunks of ~4 characters.' },
      { id: 'bits', label: 'Bits', desc: 'Binary 0s and 1s.' }
    ],
    correct: 'tokens'
  },
  {
    question: "I want the AI to be very factual and predictable for a coding mission. What should I set the Temperature to?",
    options: [
      { id: 'high', label: 'High (0.9)', desc: 'Creative and diverse.' },
      { id: 'low', label: 'Low (0.1)', desc: 'Factual and predictable.' },
      { id: 'med', label: 'Medium (0.5)', desc: 'A balance of both.' }
    ],
    correct: 'low'
  },
  {
    question: "What is the term for when an AI confidently states something that is factually incorrect?",
    options: [
      { id: 'glitch', label: 'Glitch', desc: 'A software error.' },
      { id: 'hallucination', label: 'Hallucination', desc: 'Plausible but false output.' },
      { id: 'latency', label: 'Latency', desc: 'Network delay.' }
    ],
    correct: 'hallucination'
  },
  {
    question: "By telling the AI 'Let's think step-by-step', which prompting technique am I using?",
    options: [
      { id: 'zero', label: 'Zero-Shot', desc: 'No examples.' },
      { id: 'cot', label: 'Chain of Thought', desc: 'Step-by-step reasoning.' },
      { id: 'multi', label: 'Multimodality', desc: 'Using images.' }
    ],
    correct: 'cot'
  },
  {
    question: "Which feature of Gemini allows it to process a 1,000-page manual and an hour-long video in a single prompt?",
    options: [
      { id: 'gpu', label: 'GPU Acceleration', desc: 'Raw hardware speed.' },
      { id: 'context', label: 'Massive Context Window', desc: '2M+ token memory.' },
      { id: 'safety', label: 'Safety Filters', desc: 'Blocking content.' }
    ],
    correct: 'context'
  }
];

export default function LevelThree() {
  const { saveProgress } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizStarted(true);
    }
  };

  const handleQuiz = (answer: string) => {
    setQuizAnswer(answer);
    const isCorrect = answer === quizQuestions[currentQuestion].correct;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setTimeout(async () => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setQuizAnswer(null);
      } else {
        if (newScore >= 3) {
          await saveProgress(50, 3);
        }
        setCompleted(true);
      }
    }, 1000);
  };

  return (
    <LevelLayout levelNumber={3} levelTitle="The Gemini Core">
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        
        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-card"
              style={{ padding: '3rem' }}
            >
              <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                {steps[currentStep].icon}
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '800' }}>
                {steps[currentStep].title}
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '2rem' }}>
                {renderText(steps[currentStep].content)}
              </p>
              
              <div style={{ 
                background: 'rgba(251,188,5,0.05)', 
                padding: '1rem 1.5rem', 
                borderRadius: '16px', 
                border: '1px solid rgba(251,188,5,0.2)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}>
                <CheckCircle size={20} color="var(--neon-yellow)" />
                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{steps[currentStep].keyPoint}</span>
              </div>

              {steps[currentStep].tip && (
                <div style={{ 
                  background: 'rgba(0,194,255,0.05)', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(0,194,255,0.1)',
                  marginBottom: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left'
                }}>
                  <Info size={20} color="var(--neon-blue)" />
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                    {renderText(`Pilot's Tip: ${steps[currentStep].tip}`)}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '8px', maxWidth: '60%' }}>
                  {steps.map((_, i) => (
                    <div key={i} style={{ 
                      minWidth: '20px', 
                      height: '4px', 
                      borderRadius: '2px', 
                      background: i <= currentStep ? 'var(--neon-yellow)' : 'rgba(255,255,255,0.1)',
                      transition: 'background 0.3s ease'
                    }} />
                  ))}
                </div>
                <button className="btn-primary" onClick={handleNext} style={{ background: 'linear-gradient(135deg, var(--g-yellow), #D4A017)' }}>
                  {currentStep === steps.length - 1 ? "Start Exam" : "Next Insight"} <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ) : !completed ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{ padding: '3rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                 <span style={{ color: 'var(--neon-yellow)', fontWeight: 'bold' }}>CORE EXAM</span>
                 <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>{quizQuestions[currentQuestion].question}</h2>

              <div style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
                {quizQuestions[currentQuestion].options.map((opt) => (
                  <button 
                    key={opt.id}
                    disabled={quizAnswer !== null}
                    className="glass-card"
                    onClick={() => handleQuiz(opt.id)}
                    style={{ 
                      padding: '1.5rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: quizAnswer === opt.id 
                        ? (opt.id === quizQuestions[currentQuestion].correct ? 'rgba(251,188,5,0.1)' : 'rgba(255,77,77,0.1)') 
                        : 'var(--glass)',
                      borderColor: quizAnswer === opt.id 
                        ? (opt.id === quizQuestions[currentQuestion].correct ? 'var(--neon-yellow)' : 'var(--neon-red)') 
                        : 'var(--glass-border)',
                      cursor: quizAnswer === null ? 'pointer' : 'default',
                      opacity: quizAnswer !== null && quizAnswer !== opt.id ? 0.5 : 1
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{opt.desc}</div>
                    </div>
                    {quizAnswer === opt.id && (
                      opt.id === quizQuestions[currentQuestion].correct ? <CheckCircle color="var(--neon-yellow)" /> : <AlertCircle color="var(--neon-red)" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{ padding: '4rem 2rem', borderColor: score >= 3 ? 'var(--neon-yellow)' : 'var(--neon-red)' }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: score >= 3 ? 'rgba(251,188,5,0.1)' : 'rgba(255,77,77,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 2rem',
                border: score >= 3 ? '1px solid var(--neon-yellow)' : '1px solid var(--neon-red)',
                boxShadow: score >= 3 ? '0 0 30px rgba(251,188,5,0.2)' : '0 0 30px rgba(255,77,77,0.2)'
              }}>
                {score >= 3 ? <Sparkles size={40} color="var(--neon-yellow)" /> : <AlertCircle size={40} color="var(--neon-red)" />}
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>
                {score >= 3 ? "CORE SYNCHRONIZED" : "SYNCHRONIZATION FAILED"}
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
                You scored **{score}/{quizQuestions.length}**. <br/>
                {score >= 3 ? "You've mastered the foundations of the Core. Final frontier awaits: **The Agent Platform**." : "The Core rejected your commands. Study the manual and try again."}
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                {score < 3 && (
                   <button className="btn-primary" onClick={() => {
                    setCurrentStep(0);
                    setQuizStarted(false);
                    setCurrentQuestion(0);
                    setQuizAnswer(null);
                    setScore(0);
                    setCompleted(false);
                  }}>
                    Retry Sync
                  </button>
                )}
                <a href={score >= 3 ? "/level-4" : "/"}>
                  <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                    {score >= 3 ? "Reach The Summit" : "Back to Star Chart"}
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </LevelLayout>
  );
}
