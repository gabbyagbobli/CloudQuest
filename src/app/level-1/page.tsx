'use client';

import React, { useState } from 'react';
import LevelLayout from '@/components/LevelLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Zap, Book, CheckCircle, ChevronRight, AlertCircle, Info, Cpu, Layers, ShieldCheck, Network, Cloud, Terminal, Activity, Anchor } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const renderText = (text: string) => {
// ... existing renderText function ...
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
    title: "1. Galactic Coordinates: Regions",
    icon: <Map size={48} color="var(--neon-blue)" />,
    content: "A **Region** is a specific geographic area, like 'us-central1' or 'asia-east1'. You choose a Region close to your users to minimize **Latency**—the time it takes for data to travel. It also helps with **Data Residency** (keeping data within legal borders).",
    tip: "Always check the 'Carbon Footprint' of a region to build greener AI missions.",
    keyPoint: "Regions are geographic hubs for your cloud resources."
  },
  {
    title: "2. The Binary Stars: Zones",
    icon: <Zap size={48} color="var(--neon-yellow)" />,
    content: "Inside every Region are multiple **Zones**. These are isolated data centers. If one zone fails, your mission continues in another. This provides **High Availability (HA)** and protects against local disasters.",
    tip: "A single Region usually has 3+ Zones connected by low-latency fiber.",
    keyPoint: "Zones are isolated failure domains within a Region."
  },
  {
    title: "3. The Ship's Manifest: Projects",
    icon: <Book size={48} color="var(--neon-green)" />,
    content: "A **Project** is the core organizational unit. It holds your resources, APIs, and billing settings. Every project has a unique **Project ID** and **Project Number**. It's the primary way Google tracks your mission.",
    tip: "Project IDs are globally unique—once used, they can never be reused by anyone else.",
    keyPoint: "Projects are the basic management unit for all resources."
  },
  {
    title: "4. The Command Chain: Resource Hierarchy",
    icon: <Layers size={48} color="var(--neon-blue)" />,
    content: "Resources live in **Projects**, Projects live in **Folders**, and Folders live in the **Organization**. This hierarchy allows you to set policies (like 'No public buckets') at the top and have them trickle down to every ship in the fleet.",
    tip: "The Organization node is usually tied to your Workspace or GSuite domain.",
    keyPoint: "Hierarchy allows for centralized control and security."
  },
  {
    title: "5. Keys to the Ship: IAM",
    icon: <ShieldCheck size={48} color="var(--neon-red)" />,
    content: "**Identity and Access Management (IAM)** defines **WHO** (identity) can do **WHAT** (roles) on **WHICH** resource. We use the **Principle of Least Privilege**—only give a pilot the exact keys they need to fly, nothing more.",
    tip: "Never use your 'Owner' account for daily tasks; create limited roles instead.",
    keyPoint: "IAM controls security and permissions across the platform."
  },
  {
    title: "6. Autonomous Droids: Service Accounts",
    icon: <Terminal size={48} color="var(--neon-green)" />,
    content: "A **Service Account** is a special identity for your code, not a human. When your AI model needs to talk to a database, it uses a Service Account to prove it has permission without needing a password.",
    tip: "Think of Service Accounts as digital 'IDs' for your applications.",
    keyPoint: "Service Accounts allow apps to authenticate securely."
  },
  {
    title: "7. Space Highways: Virtual Private Cloud (VPC)",
    icon: <Network size={48} color="var(--neon-blue)" />,
    content: "A **VPC** is your private network in the cloud. It connects your VMs, databases, and AI models securely. It's global, meaning your VPC can span across every region in the Google galaxy.",
    tip: "VPCs are 'Global', but the **Subnets** inside them are 'Regional'.",
    keyPoint: "VPC provides secure, private networking for your resources."
  },
  {
    title: "8. Ship's Shields: Firewall Rules",
    icon: <ShieldCheck size={48} color="var(--neon-red)" />,
    content: "**Firewall Rules** control which signals can enter or leave your ship. You can block entire regions or only allow traffic on specific ports (like port 443 for secure web traffic).",
    tip: "GCP firewalls use 'Tags'—you can say 'Allow web traffic to every ship tagged 'frontend'.",
    keyPoint: "Firewalls protect your network from unauthorized access."
  },
  {
    title: "9. Raw Power: Compute Engine",
    icon: <Cpu size={48} color="var(--neon-yellow)" />,
    content: "**Compute Engine** provides Virtual Machines (VMs). You have total control over the OS, CPU, and RAM. For AI, you can attach **NVIDIA GPUs** or Google's own **TPUs** to accelerate model training.",
    tip: "Use 'Preemptible VMs' for batch AI jobs to save up to 80% on costs.",
    keyPoint: "Compute Engine is for raw, customizable processing power."
  },
  {
    title: "10. Automatic Flight: App Engine",
    icon: <Cloud size={48} color="var(--neon-blue)" />,
    content: "**App Engine** is a 'Platform as a Service' (PaaS). You just provide the code, and Google handles the servers, scaling, and networking. It's perfect for simple web apps and AI APIs that need to scale from zero to millions.",
    tip: "Standard Environment scales fast; Flexible Environment supports custom Docker containers.",
    keyPoint: "App Engine focuses on code, not infrastructure management."
  },
  {
    title: "11. Escape Pods: Cloud Run",
    icon: <Anchor size={48} color="var(--neon-green)" />,
    content: "**Cloud Run** is a serverless platform that runs **Containers**. It scales automatically based on traffic and only costs you money when your code is actually running. It's the modern way to deploy AI microservices.",
    tip: "Cloud Run is built on Knative, making your apps portable to any Kubernetes cluster.",
    keyPoint: "Cloud Run is for serverless, containerized applications."
  },
  {
    title: "12. Fleet Command: GKE",
    icon: <Layers size={48} color="var(--neon-blue)" />,
    content: "**Google Kubernetes Engine (GKE)** is for managing a massive fleet of containers. It's the most advanced way to run complex AI workloads that need high performance, orchestration, and custom networking.",
    tip: "Use 'Autopilot' mode to let Google manage the nodes while you manage the containers.",
    keyPoint: "GKE is for enterprise-grade container orchestration."
  },
  {
    title: "13. Signal Triggers: Cloud Functions",
    icon: <Zap size={48} color="var(--neon-yellow)" />,
    content: "**Cloud Functions** are tiny snippets of code that run in response to events—like a new file appearing in a vault or a message arriving in a queue. They are the 'glue' of the cloud.",
    tip: "Perfect for triggering an AI analysis whenever a user uploads a photo.",
    keyPoint: "Cloud Functions are event-driven, serverless code snippets."
  },
  {
    title: "14. Mission Monitoring: Cloud Ops",
    icon: <Activity size={48} color="var(--neon-red)" />,
    content: "**Cloud Operations (formerly Stackdriver)** provides logging and monitoring. It's your ship's dashboard, showing you exactly how much fuel (CPU) you're using and if any systems are failing.",
    tip: "Set up 'Alerting Policies' to get a notification before your ship runs out of credits.",
    keyPoint: "Cloud Ops provides visibility into your ship's health."
  },
  {
    title: "15. The Final Boarding: Summary",
    icon: <CheckCircle size={48} color="var(--neon-green)" />,
    content: "You've mastered the **Foundations**. You know how the galaxy is mapped (Regions/Zones), how the command chain works (IAM/Hierarchy), and how to power your engines (Compute/Serverless). You are ready for the Final Exam.",
    tip: "Take a deep breath. The Data Nebula is next, but first, we verify your skills.",
    keyPoint: "Foundational mastery is the first step to becoming a GDE."
  }
];

const quizQuestions = [
  {
    question: "If I want to ensure my mission continues even if one data center fails, I should deploy across multiple _______?",
    options: [
      { id: 'region', label: 'Regions', desc: 'Different geographic hubs.' },
      { id: 'zone', label: 'Zones', desc: 'Isolated failure domains in a region.' },
      { id: 'project', label: 'Projects', desc: 'Management folders.' }
    ],
    correct: 'zone'
  },
  {
    question: "Which concept follows the 'Principle of Least Privilege' by giving pilots only the keys they need?",
    options: [
      { id: 'vpc', label: 'VPC', desc: 'Networking highways.' },
      { id: 'iam', label: 'IAM', desc: 'Identity and Access Management.' },
      { id: 'gce', label: 'Compute Engine', desc: 'Virtual Machine engines.' }
    ],
    correct: 'iam'
  },
  {
    question: "I need to run a piece of code only when a user uploads a file, and I don't want to manage servers. What should I use?",
    options: [
      { id: 'gce', label: 'Compute Engine', desc: 'Raw VM power.' },
      { id: 'func', label: 'Cloud Functions', desc: 'Event-driven serverless code.' },
      { id: 'bq', label: 'BigQuery', desc: 'Data analytics library.' }
    ],
    correct: 'func'
  },
  {
    question: "What is the global private network that connects all your Google Cloud resources securely?",
    options: [
      { id: 'internet', label: 'Public Internet', desc: 'The open space.' },
      { id: 'vpc', label: 'VPC', desc: 'Virtual Private Cloud.' },
      { id: 'vpn', label: 'VPN', desc: 'A secure tunnel.' }
    ],
    correct: 'vpc'
  },
  {
    question: "Which resource is the primary organizational unit for billing, APIs, and resource ownership?",
    options: [
      { id: 'folder', label: 'Folder', desc: 'Groups of projects.' },
      { id: 'org', label: 'Organization', desc: 'The top-level node.' },
      { id: 'project', label: 'Project', desc: 'The mission container.' }
    ],
    correct: 'project'
  }
];

export default function LevelOne() {
  const { user, saveProgress } = useAuth();
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
          await saveProgress(50, 1);
        }
        setCompleted(true);
      }
    }, 1000);
  };

  return (
    <LevelLayout levelNumber={1} levelTitle="Launch Sequence">
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        
        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card"
              style={{ padding: '3rem', position: 'relative' }}
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
                background: 'rgba(255,255,255,0.03)', 
                padding: '1rem 1.5rem', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
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
                      background: i <= currentStep ? 'var(--neon-blue)' : 'rgba(255,255,255,0.1)',
                      transition: 'background 0.3s ease'
                    }} />
                  ))}
                </div>
                <button className="btn-primary" onClick={handleNext}>
                  {currentStep === steps.length - 1 ? "Start Exam" : "Next Navigation"} <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ) : !completed ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{ padding: '3rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                 <span style={{ color: 'var(--neon-blue)', fontWeight: 'bold' }}>FINAL EXAM</span>
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
                        ? (opt.id === quizQuestions[currentQuestion].correct ? 'rgba(0,255,133,0.1)' : 'rgba(255,77,77,0.1)') 
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
              style={{ padding: '4rem 2rem', borderColor: score >= 3 ? 'var(--neon-green)' : 'var(--neon-red)' }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: score >= 3 ? 'rgba(0,255,133,0.1)' : 'rgba(255,77,77,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 2rem',
                border: score >= 3 ? '1px solid var(--neon-green)' : '1px solid var(--neon-red)',
                boxShadow: score >= 3 ? '0 0 30px rgba(0,255,133,0.2)' : '0 0 30px rgba(255,77,77,0.2)'
              }}>
                {score >= 3 ? <CheckCircle size={40} color="var(--neon-green)" /> : <AlertCircle size={40} color="var(--neon-red)" />}
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>
                {score >= 3 ? "MISSION SUCCESSFUL!" : "MISSION FAILED"}
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
                You scored **{score}/{quizQuestions.length}**. <br/>
                {score >= 3 ? "Navigation coordinates confirmed. You are now ready to enter the **Data Nebula**." : "You need to study the star charts more. Try the training again."}
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
                    Retry Training
                  </button>
                )}
                <a href="/">
                  <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                    Back to Star Chart
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
