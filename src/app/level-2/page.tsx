'use client';

import React, { useState } from 'react';
import LevelLayout from '@/components/LevelLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, HardDrive, Search, CheckCircle, ChevronRight, AlertCircle, Info, Wind, BarChart3, Binary, Share2, ShieldAlert, Archive, Boxes, Fingerprint, Zap, Cpu, Layers } from 'lucide-react';
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
    title: "1. The Infinite Vault: Cloud Storage",
    icon: <HardDrive size={48} color="var(--neon-red)" />,
    content: "AI needs raw materials. **Cloud Storage** is where you keep 'unstructured' data—images, videos, and raw logs. It's built for durability (99.999999999%), meaning your data survives even if multiple data centers are destroyed.",
    tip: "Think of Cloud Storage as an infinite hard drive in the sky.",
    keyPoint: "Cloud Storage is the home for raw, unstructured data."
  },
  {
    title: "2. Temperature Control: Storage Classes",
    icon: <Archive size={48} color="var(--neon-blue)" />,
    content: "Not all data is equal. Use **Standard** for data you access every day. Use **Nearline** or **Coldline** for data accessed monthly or quarterly. Use **Archive** for long-term mission logs you might never touch again but must keep for legal reasons.",
    tip: "Archive storage is incredibly cheap but takes a few seconds to 'thaw' for use.",
    keyPoint: "Storage Classes optimize costs based on access frequency."
  },
  {
    title: "3. Relational Hub: Cloud SQL",
    icon: <Database size={48} color="var(--neon-yellow)" />,
    content: "When you have structured data that needs 'Acid Compliance' (like financial transactions), you use **Cloud SQL**. It supports PostgreSQL, MySQL, and SQL Server, and Google handles the patching and backups for you.",
    tip: "Perfect for managing user accounts and transaction history.",
    keyPoint: "Cloud SQL is a managed relational database service."
  },
  {
    title: "4. Global Sync: Cloud Spanner",
    icon: <Share2 size={48} color="var(--neon-blue)" />,
    content: "If your ship is so big it spans the entire galaxy, you need **Cloud Spanner**. It's the world's first 'NewSQL' database that is both globally consistent and massively scalable.",
    tip: "Spanner uses atomic clocks to ensure data is perfectly in sync everywhere at once.",
    keyPoint: "Cloud Spanner provides global relational database power."
  },
  {
    title: "5. Document Vault: Firestore",
    icon: <Boxes size={48} color="var(--neon-green)" />,
    content: "**Firestore** is a NoSQL document database. It's flexible and scales automatically. It's great for mobile apps and AI agents that need to store user profiles or conversation history in real-time.",
    tip: "Firestore's 'Real-time Sync' keeps all your pilot devices updated instantly.",
    keyPoint: "Firestore is a flexible, real-time NoSQL database."
  },
  {
    title: "6. Massive Throughput: Bigtable",
    icon: <Binary size={48} color="var(--neon-red)" />,
    content: "When you have petabytes of data arriving at high speed (like real-time flight telemetry), you use **Bigtable**. It's the same technology that powers Google Search and Maps.",
    tip: "Bigtable is a 'Wide-column' NoSQL database optimized for low latency and high volume.",
    keyPoint: "Bigtable handles massive analytical workloads at high speed."
  },
  {
    title: "7. The Filtration System: Dataflow",
    icon: <Wind size={48} color="var(--neon-green)" />,
    content: "Raw data is messy. **Dataflow** cleans and transforms it. It uses the Apache Beam model to process both 'Batch' data (the past) and 'Stream' data (the present) using the same code.",
    tip: "Dataflow is 'Serverless'—it spins up workers as needed and shuts them down when done.",
    keyPoint: "Dataflow is for unified batch and stream data processing."
  },
  {
    title: "8. Real-time Courier: Pub/Sub",
    icon: <Zap size={48} color="var(--neon-yellow)" />,
    content: "**Pub/Sub** is a messaging service that decouples your systems. One part of your ship 'Publishes' a message (like 'Engine Overheat!'), and many other systems 'Subscribe' to it to react instantly.",
    tip: "Pub/Sub can handle millions of messages per second with zero lag.",
    keyPoint: "Pub/Sub is the 'glue' for event-driven architectures."
  },
  {
    title: "9. The Galactic Library: BigQuery",
    icon: <Search size={48} color="var(--neon-blue)" />,
    content: "The ultimate destination for data is **BigQuery**. It's a serverless data warehouse that can analyze petabytes of data in seconds. It uses standard SQL, so any analyst can be a data pilot.",
    tip: "BigQuery separates 'Storage' from 'Compute', making it incredibly cost-effective.",
    keyPoint: "BigQuery is for high-speed, planetary-scale analytics."
  },
  {
    title: "10. In-Library Intelligence: BigQuery ML",
    icon: <Cpu size={48} color="var(--neon-yellow)" />,
    content: "**BigQuery ML** lets you create and run Machine Learning models using only SQL. You don't need to move the data out of the library to train an AI—you do it right where the data lives.",
    tip: "Great for predicting flight delays or estimating fuel consumption quickly.",
    keyPoint: "BigQuery ML democratizes machine learning for SQL users."
  },
  {
    title: "11. The Navigation Deck: Looker",
    icon: <BarChart3 size={48} color="var(--neon-yellow)" />,
    content: "Data is useless if you can't see it. **Looker** and **Looker Studio** turn BigQuery tables into interactive dashboards. It's how leaders 'see' the health of the mission at a glance.",
    tip: "Looker's 'LookML' ensures everyone in the ship is using the same definition for 'Success'.",
    keyPoint: "Looker provides enterprise-grade business intelligence."
  },
  {
    title: "12. Data Discovery: Data Catalog",
    icon: <Fingerprint size={48} color="var(--neon-green)" />,
    content: "In a galaxy of data, how do you find what you need? **Data Catalog** is a metadata management service that helps you discover and understand all your data assets across the ship.",
    tip: "It also helps with 'Data Governance' by tagging sensitive data like credit card numbers.",
    keyPoint: "Data Catalog makes your data searchable and governed."
  },
  {
    title: "13. Unified Fabric: Dataplex",
    icon: <Layers size={48} color="var(--neon-blue)" />,
    content: "**Dataplex** is an intelligent data fabric that allows you to manage data across Cloud Storage and BigQuery without moving it. It automates data discovery, security, and quality.",
    tip: "Think of it as the 'Overlord' that keeps your data nebula organized.",
    keyPoint: "Dataplex provides centralized data management and governance."
  },
  {
    title: "14. Guarding the Vault: Data Loss Prevention (DLP)",
    icon: <ShieldAlert size={48} color="var(--neon-red)" />,
    content: "The **Sensitive Data Protection (DLP)** service scans your data for secrets, passwords, and personal info. It can 'Mask' or 'Redact' this info so your AI never sees things it shouldn't.",
    tip: "DLP is a critical part of 'Responsible AI'—protecting user privacy at scale.",
    keyPoint: "DLP protects sensitive information from being exposed."
  },
  {
    title: "15. The Data Cycle: Summary",
    icon: <CheckCircle size={48} color="var(--neon-green)" />,
    content: "You've navigated the **Data Nebula**. You know where to store raw files (Storage), how to clean them (Dataflow), where to analyze them (BigQuery), and how to visualize the results (Looker). Data is the fuel—now it's time to meet the **Engine of Thought**.",
    tip: "A GDE knows that a model is only as good as the data that feeds it.",
    keyPoint: "A solid data foundation is mandatory for any AI mission."
  }
];

const quizQuestions = [
  {
    question: "I have billions of real-time sensor logs coming in every second. Which database is built for this high-speed, high-volume ingestion?",
    options: [
      { id: 'sql', label: 'Cloud SQL', desc: 'Managed relational DB.' },
      { id: 'bt', label: 'Bigtable', desc: 'High-throughput NoSQL.' },
      { id: 'storage', label: 'Cloud Storage', desc: 'Object vault.' }
    ],
    correct: 'bt'
  },
  {
    question: "Which service allows me to run Machine Learning models using only standard SQL commands?",
    options: [
      { id: 'bqml', label: 'BigQuery ML', desc: 'In-database machine learning.' },
      { id: 'flow', label: 'Dataflow', desc: 'Processing engine.' },
      { id: 'look', label: 'Looker', desc: 'BI visualization.' }
    ],
    correct: 'bqml'
  },
  {
    question: "We need to keep logs for 10 years for legal reasons, but we rarely look at them. Which storage class is cheapest?",
    options: [
      { id: 'std', label: 'Standard', desc: 'High access.' },
      { id: 'near', label: 'Nearline', desc: 'Monthly access.' },
      { id: 'arch', label: 'Archive', desc: 'Years of storage, low cost.' }
    ],
    correct: 'arch'
  },
  {
    question: "What service acts as the 'messaging courier' that decouples different parts of your cloud ship?",
    options: [
      { id: 'pub', label: 'Pub/Sub', desc: 'Asynchronous messaging.' },
      { id: 'vpc', label: 'VPC', desc: 'Private network.' },
      { id: 'iam', label: 'IAM', desc: 'Permissions.' }
    ],
    correct: 'pub'
  },
  {
    question: "Which tool would you use to clean and transform data from a messy 'Vault' into a structured 'Library'?",
    options: [
      { id: 'sql', label: 'Cloud SQL', desc: 'Storage.' },
      { id: 'dflow', label: 'Dataflow', desc: 'Batch and stream processing.' },
      { id: 'bq', label: 'BigQuery', desc: 'Analysis.' }
    ],
    correct: 'dflow'
  }
];

export default function LevelTwo() {
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
          await saveProgress(50, 2);
        }
        setCompleted(true);
      }
    }, 1000);
  };

  return (
    <LevelLayout levelNumber={2} levelTitle="The Data Nebula">
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        
        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
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
                background: 'rgba(255,67,53,0.05)', 
                padding: '1rem 1.5rem', 
                borderRadius: '16px', 
                border: '1px solid rgba(234,67,53,0.2)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}>
                <CheckCircle size={20} color="var(--neon-red)" />
                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{steps[currentStep].keyPoint}</span>
              </div>

              {steps[currentStep].tip && (
                <div style={{ 
                  background: 'rgba(255,215,0,0.05)', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,215,0,0.1)',
                  marginBottom: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left'
                }}>
                  <Info size={20} color="var(--neon-yellow)" />
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
                      background: i <= currentStep ? 'var(--neon-red)' : 'rgba(255,255,255,0.1)',
                      transition: 'background 0.3s ease'
                    }} />
                  ))}
                </div>
                <button className="btn-primary" onClick={handleNext} style={{ background: 'linear-gradient(135deg, var(--g-red), #C5221F)' }}>
                  {currentStep === steps.length - 1 ? "Start Exam" : "Next Discovery"} <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ) : !completed ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
              style={{ padding: '3rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                 <span style={{ color: 'var(--neon-red)', fontWeight: 'bold' }}>NEBULA EXAM</span>
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
                        ? (opt.id === quizQuestions[currentQuestion].correct ? 'rgba(0,194,255,0.1)' : 'rgba(255,77,77,0.1)') 
                        : 'var(--glass)',
                      borderColor: quizAnswer === opt.id 
                        ? (opt.id === quizQuestions[currentQuestion].correct ? 'var(--neon-blue)' : 'var(--neon-red)') 
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
                      opt.id === quizQuestions[currentQuestion].correct ? <CheckCircle color="var(--neon-blue)" /> : <AlertCircle color="var(--neon-red)" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{ padding: '4rem 2rem', borderColor: score >= 3 ? 'var(--neon-blue)' : 'var(--neon-red)' }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: score >= 3 ? 'rgba(0,194,255,0.1)' : 'rgba(255,77,77,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 2rem',
                border: score >= 3 ? '1px solid var(--neon-blue)' : '1px solid var(--neon-red)',
                boxShadow: score >= 3 ? '0 0 30px rgba(0,194,255,0.2)' : '0 0 30px rgba(255,77,77,0.2)'
              }}>
                {score >= 3 ? <Database size={40} color="var(--neon-blue)" /> : <AlertCircle size={40} color="var(--neon-red)" />}
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>
                {score >= 3 ? "RESOURCES SECURED" : "RESOURCES LOST"}
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
                You scored **{score}/{quizQuestions.length}**. <br/>
                {score >= 3 ? "The Ship's AI is now fueled with high-quality data. Prepare to enter **The Gemini Core**." : "The data was corrupted. Recalibrate and try again."}
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
                    Retry Extraction
                  </button>
                )}
                <a href={score >= 3 ? "/level-3" : "/"}>
                  <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                    {score >= 3 ? "Enter The Core" : "Back to Star Chart"}
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
