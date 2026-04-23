'use client';

import React, { useState } from 'react';
import LevelLayout from '@/components/LevelLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Ship, Layers, CheckCircle, ChevronRight, AlertCircle, Terminal, Bot, Link, Anchor, Info, Search, BrainCircuit, Workflow, Database, Cable, Activity } from 'lucide-react';
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
    title: "1. The Fleet: What is an AI Agent?",
    icon: <Bot size={48} color="var(--neon-green)" />,
    content: "We've built the engine; now we build the fleet. **AI Agents** are autonomous programs that use LLMs to reason and take action. Unlike a simple chatbot, an agent has a goal and will figure out the steps to reach it on its own.",
    tip: "An Agent is like having a co-pilot that can actually fly the ship while you sleep.",
    keyPoint: "Agents are autonomous entities that reason and act."
  },
  {
    title: "2. The Reasoning Engine",
    icon: <BrainCircuit size={48} color="var(--neon-blue)" />,
    content: "Every agent uses an LLM as its **Reasoning Engine**. This engine analyzes the goal, breaks it down into a plan, and decides which tools to use at each step. It's the central command for the agent's behavior.",
    tip: "The smarter the engine (like Gemini 1.5 Pro), the more complex the missions the agent can handle.",
    keyPoint: "The Reasoning Engine is the brain of the AI agent."
  },
  {
    title: "3. Tool Use & Function Calling",
    icon: <Cable size={48} color="var(--neon-yellow)" />,
    content: "To interact with the world, agents use **Tools**. Through **Function Calling**, the agent can describe an action it wants to take (like 'Search Database') and get the results back to continue its reasoning.",
    tip: "Tools can be anything with an API—databases, search engines, or even your ship's physical thrusters.",
    keyPoint: "Tool Use allows agents to interact with external systems."
  },
  {
    title: "4. Extensions: Boosting Capabilities",
    icon: <Layers size={48} color="var(--neon-green)" />,
    content: "**Extensions** are pre-built toolkits that you can plug into your agents. They provide ready-made connections to popular services like Google Search, Maps, or Flights, so you don't have to build them from scratch.",
    tip: "Extensions turn a generic agent into a specialized specialist instantly.",
    keyPoint: "Extensions provide plug-and-play tools for agents."
  },
  {
    title: "5. Stay Grounded: Grounding with Search",
    icon: <Search size={48} color="var(--neon-blue)" />,
    content: "To prevent hallucinations, we use **Grounding**. By connecting an agent to **Google Search**, it can verify facts in real-time before answering. This ensures the agent's knowledge is always fresh and accurate.",
    tip: "Grounding with Search is perfect for agents that need to know about current events or pricing.",
    keyPoint: "Grounding connects agent reasoning to real-world facts."
  },
  {
    title: "6. Enterprise Intelligence: Grounding with Data",
    icon: <Database size={48} color="var(--neon-green)" />,
    content: "You can also ground agents in your **Enterprise Data**. This means the agent can answer questions using your private mission logs, manuals, and databases without that data ever leaving your secure cloud ship.",
    tip: "This is how you build a support agent that actually knows your specific ship's history.",
    keyPoint: "Enterprise grounding makes agents experts in your private data."
  },
  {
    title: "7. The Master Construction Yard: Agent Studio",
    icon: <Ship size={48} color="var(--neon-yellow)" />,
    content: "**Agent Studio** is a low-code interface for building and managing AI agents. You can define the agent's goal, equip it with tools, and test its behavior in a safe 'Sandbox' before deploying it to the fleet.",
    tip: "Use Agent Studio to iterate quickly on agent personalities and skillsets.",
    keyPoint: "Agent Studio is a low-code builder for AI agents."
  },
  {
    title: "8. Professional Toolkit: ADK",
    icon: <Terminal size={48} color="var(--neon-blue)" />,
    content: "For complex, code-first missions, we use the **Agent Development Kit (ADK)**. It's a framework that allows developers to build sophisticated agents with complex logic and deep integrations using Python or JavaScript.",
    tip: "The ADK is the choice for enterprise developers building mission-critical agent networks.",
    keyPoint: "ADK provides code-first tools for advanced agent development."
  },
  {
    title: "9. Reasoning in Public: Vertex AI Search",
    icon: <Search size={48} color="var(--neon-green)" />,
    content: "**Vertex AI Search** is a 'GenAI App Builder' that lets you create search-based agents in minutes. It handles the indexing of your documents and the grounding of the AI automatically.",
    tip: "Ideal for 'Talk to your docs' apps where users just want to find info fast.",
    keyPoint: "Vertex AI Search provides instant search-based agent capabilities."
  },
  {
    title: "10. Memory Bank: Persistence",
    icon: <Activity size={48} color="var(--neon-blue)" />,
    content: "Agents need a **Memory Bank** to remember previous missions and user preferences. By using databases like Firestore or Cloud SQL, agents can maintain 'State' and provide a personalized experience over time.",
    tip: "Memory is what makes an agent feel like a true companion rather than a one-time tool.",
    keyPoint: "Memory provides agents with long-term context and state."
  },
  {
    title: "11. Shields Up: Model Armor",
    icon: <ShieldAlert size={48} color="var(--neon-red)" />,
    content: "**Model Armor** is a security layer that sits between your agent and the world. It filters out harmful inputs (Prompt Injection) and ensures the agent never leaks sensitive mission data in its outputs.",
    tip: "Model Armor is mandatory for agents that interact with the public internet.",
    keyPoint: "Model Armor provides security and governance for agents."
  },
  {
    title: "12. The Fleet Registry: Agent Management",
    icon: <Layers size={48} color="var(--neon-yellow)" />,
    content: "As your fleet grows, you need to manage it. The **Agent Registry** allows you to version your agents, track their performance, and 'Roll Back' to a previous version if a new update causes issues.",
    tip: "Always version your agents so you can test new 'Engine' upgrades safely.",
    keyPoint: "Agent Management ensures a stable and scalable fleet."
  },
  {
    title: "13. Orchestration: Multi-Agent Systems",
    icon: <Workflow size={48} color="var(--neon-blue)" />,
    content: "Sometimes one agent isn't enough. In a **Multi-Agent System**, specialized agents work together. A 'Researcher' agent might find data, while a 'Writer' agent summarizes it, and a 'Reviewer' agent checks for safety.",
    tip: "Collaboration is the secret to solving the most complex galactic challenges.",
    keyPoint: "Multi-agent systems allow specialized agents to collaborate."
  },
  {
    title: "14. Evaluation: Measuring Quality",
    icon: <Activity size={48} color="var(--neon-green)" />,
    content: "How do you know if your agent is doing a good job? We use **Evaluation** tools to test the agent against a set of 'Golden Examples'. This helps us measure accuracy, grounding, and safety objectively.",
    tip: "Never deploy an agent to the fleet without a thorough evaluation mission.",
    keyPoint: "Evaluation ensures agent quality and mission success."
  },
  {
    title: "15. The Odyssey Complete: Summary",
    icon: <CheckCircle size={48} color="var(--neon-green)" />,
    content: "You have ascended the peak of the **Gemini Enterprise Agent Platform**. You've learned to build, equip, secure, and manage a fleet of autonomous agents. You are no longer just a Pilot; you are a Fleet Commander.",
    tip: "The galaxy of AI is infinite. Keep exploring, keep building, and stay grounded.",
    keyPoint: "Platform mastery is the final step in the CloudQuest Odyssey."
  }
];

const quizQuestions = [
  {
    question: "What is the term for connecting an AI agent to a trusted source like Google Search to prevent hallucinations?",
    options: [
      { id: 'boosting', label: 'Boosting', desc: 'Increasing power.' },
      { id: 'grounding', label: 'Grounding', desc: 'Connecting to real-world facts.' },
      { id: 'shielding', label: 'Shielding', desc: 'Protecting from attacks.' }
    ],
    correct: 'grounding'
  },
  {
    question: "Which tool would a developer use for a code-first approach to building complex, multi-agent networks?",
    options: [
      { id: 'studio', label: 'Agent Studio', desc: 'Low-code builder.' },
      { id: 'adk', label: 'Agent Development Kit (ADK)', desc: 'Code-first framework.' },
      { id: 'console', label: 'GCP Console', desc: 'General management.' }
    ],
    correct: 'adk'
  },
  {
    question: "Which security layer protects your agent from 'Prompt Injection' and prevents it from leaking sensitive data?",
    options: [
      { id: 'firewall', label: 'VPC Firewall', desc: 'Network security.' },
      { id: 'armor', label: 'Model Armor', desc: 'AI-specific governance and safety.' },
      { id: 'iam', label: 'IAM Roles', desc: 'User permissions.' }
    ],
    correct: 'armor'
  },
  {
    question: "An agent that can break down a high-level goal into a plan and execute it is said to have a _______?",
    options: [
      { id: 'database', label: 'Database', desc: 'Storage.' },
      { id: 'reasoning', label: 'Reasoning Engine', desc: 'Autonomous planning capability.' },
      { id: 'script', label: 'Static Script', desc: 'Hard-coded rules.' }
    ],
    correct: 'reasoning'
  },
  {
    question: "What allows an agent to interact with the world by calling APIs to perform tasks like booking a flight?",
    options: [
      { id: 'tooling', label: 'Tool Use / Function Calling', desc: 'Connecting AI to actions.' },
      { id: 'storage', label: 'Cloud Storage', desc: 'Holding files.' },
      { id: 'vpc', label: 'VPC Networking', desc: 'Space highways.' }
    ],
    correct: 'tooling'
  }
];

export default function LevelFour() {
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
          await saveProgress(100, 4);
        }
        setCompleted(true);
      }
    }, 1000);
  };

  return (
    <LevelLayout levelNumber={4} levelTitle="Agent Enterprise Platform">
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        
        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
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
                background: 'rgba(52,168,83,0.05)', 
                padding: '1rem 1.5rem', 
                borderRadius: '16px', 
                border: '1px solid rgba(52,168,83,0.2)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}>
                <CheckCircle size={20} color="var(--neon-green)" />
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
                      background: i <= currentStep ? 'var(--neon-green)' : 'rgba(255,255,255,0.1)',
                      transition: 'background 0.3s ease'
                    }} />
                  ))}
                </div>
                <button className="btn-primary" onClick={handleNext} style={{ background: 'linear-gradient(135deg, var(--g-green), #1E7E34)' }}>
                  {currentStep === steps.length - 1 ? "Start Exam" : "Next Skill"} <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ) : !completed ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
              style={{ padding: '3rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                 <span style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>AGENT EXAM</span>
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
                        ? (opt.id === quizQuestions[currentQuestion].correct ? 'rgba(52,168,83,0.1)' : 'rgba(255,77,77,0.1)') 
                        : 'var(--glass)',
                      borderColor: quizAnswer === opt.id 
                        ? (opt.id === quizQuestions[currentQuestion].correct ? 'var(--neon-green)' : 'var(--neon-red)') 
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
                      opt.id === quizQuestions[currentQuestion].correct ? <CheckCircle color="var(--neon-green)" /> : <AlertCircle color="var(--neon-red)" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{ padding: '4rem 2rem', borderColor: score >= 3 ? 'var(--neon-green)' : 'var(--neon-red)' }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: score >= 3 ? 'rgba(52,168,83,0.1)' : 'rgba(255,77,77,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 2rem',
                border: score >= 3 ? '1px solid var(--neon-green)' : '1px solid var(--neon-red)',
                boxShadow: score >= 3 ? '0 0 30px rgba(52,168,83,0.3)' : '0 0 30px rgba(255,77,77,0.3)'
              }}>
                {score >= 3 ? <Terminal size={40} color="var(--neon-green)" /> : <AlertCircle size={40} color="var(--neon-red)" />}
              </div>
              <h2 style={{ fontSize: '3rem', fontWeight: '950', marginBottom: '1rem' }}>
                {score >= 3 ? "ODYSSEY COMPLETE" : "FLEET COMMAND FAILED"}
              </h2>
              <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
                You scored **{score}/{quizQuestions.length}**. <br/>
                {score >= 3 ? "You have ascended the peak of the **Gemini Enterprise Agent Platform**. You are now a certified **Cloud Pilot**." : "Your fleet was scattered. Recalibrate your command logic and try again."}
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
                    Retry Command
                  </button>
                )}
                <a href="/">
                  <button className="btn-primary" style={{ background: score >= 3 ? 'linear-gradient(135deg, var(--g-green), #1E7E34)' : 'rgba(255,255,255,0.1)' }}>
                    Return to Home Base
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
