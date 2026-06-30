import React, { useState } from "react";
import { motion } from "motion/react";
import { Mic, Eye, MapPin, Copy, Shield, BarChart3, HelpCircle } from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  border: string;
  x: number; // percentage width
  y: number; // percentage height
  desc: string;
}

export default function MultiAgentArchitecture() {
  const [selectedAgent, setSelectedAgent] = useState<string>("voice");

  const agents: AgentNode[] = [
    {
      id: "voice",
      name: "Voice Agent",
      role: "Speech & Intent Intake",
      icon: <Mic size={18} className="text-[#2563EB]" />,
      color: "bg-[#2563EB]/8",
      border: "border-[#2563EB]/15",
      x: 15,
      y: 50,
      desc: "Handles multi-dialect verbal complaints directly. Extracts emotional distress, situational severity, and speech semantic structure seamlessly without forcing users into dropdown input forms.",
    },
    {
      id: "vision",
      name: "Vision Agent",
      role: "Visual Damage Analyzer",
      icon: <Eye size={18} className="text-[#22C97E]" />,
      color: "bg-[#22C97E]/8",
      border: "border-[#22C97E]/15",
      x: 45,
      y: 25,
      desc: "Audits image and video proofs. Estimates depth levels, classifies material faults, detects fraudulent duplicate uploads, and ensures structural integrity proof.",
    },
    {
      id: "authority",
      name: "Authority Agent",
      role: "Boundary & GIS Dispatcher",
      icon: <MapPin size={18} className="text-[#F7A623]" />,
      color: "bg-[#F7A623]/8",
      border: "border-[#F7A623]/15",
      x: 45,
      y: 75,
      desc: "Cross-checks municipal GIS boundary polygons. Routes the verified case file automatically to the correct localized department, removing internal bureaucratic delays.",
    },
    {
      id: "duplicate",
      name: "Duplicate Detection",
      role: "Proximity Deduplicator",
      icon: <Copy size={18} className="text-[#6EE7B7]" />,
      color: "bg-[#6EE7B7]/8",
      border: "border-[#6EE7B7]/15",
      x: 75,
      y: 25,
      desc: "Groups overlapping coordinates and matching descriptions. Consolidates multi-citizen reporting into singular master-tickets to prevent municipal backlog clogging.",
    },
    {
      id: "resolution",
      name: "Resolution Agent",
      role: "Autonomous Execution Bot",
      icon: <Shield size={18} className="text-[#2563EB]" />,
      color: "bg-[#2563EB]/8",
      border: "border-[#2563EB]/15",
      x: 75,
      y: 75,
      desc: "Coordinates contractor schedules, dispatches work orders, logs contractor photos, and triggers direct verified completion notifications to nearby citizens.",
    },
    {
      id: "decision",
      name: "Decision Intelligence",
      role: "Ward Budget Optimizer",
      icon: <BarChart3 size={18} className="text-[#22C97E]" />,
      color: "bg-[#22C97E]/8",
      border: "border-[#22C97E]/15",
      x: 90,
      y: 50,
      desc: "Gathers historic municipal data, mapping localized failure frequencies to generate live Ward Health Scores, budget projections, and preventive road repair recommendations.",
    }
  ];

  // Animated pipeline links between agents
  const connections = [
    { from: "voice", to: "vision", color: "stroke-[#2563EB]/15", duration: 3.5, delay: 0 },
    { from: "voice", to: "authority", color: "stroke-[#2563EB]/15", duration: 3.5, delay: 0.8 },
    { from: "vision", to: "duplicate", color: "stroke-[#22C97E]/15", duration: 4, delay: 1.2 },
    { from: "authority", to: "resolution", color: "stroke-[#F7A623]/15", duration: 4, delay: 1.6 },
    { from: "duplicate", to: "decision", color: "stroke-[#6EE7B7]/15", duration: 3.5, delay: 2.2 },
    { from: "resolution", to: "decision", color: "stroke-[#2563EB]/15", duration: 3.5, delay: 2.6 }
  ];

  return (
    <section className="relative py-28 md:py-36 bg-[#F8FBFD] border-t border-[#DCE7EE]" id="architecture">
      {/* Soft dotted pattern overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#DCE7EE_1.2px,transparent_1.2px)] [background-size:40px_40px] opacity-[0.55]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono text-[#22C97E] uppercase tracking-[0.3em] font-bold">
              Autonomous Infrastructure
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#102A43] tracking-tight leading-[1.1]">
              AI Multi-Agent <br />
              <span className="text-[#6B7C93]/40">Grid System</span>
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="font-sans text-[#52667A] text-sm md:text-base leading-relaxed">
              Instead of static scripts, Synapse coordinates a decentralized network of autonomous agents. Each agent specializes in a singular operation, communicating through cryptographic secure rails until full resolution is achieved.
            </p>
          </div>
        </div>

        {/* Node Graph Visualization Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="architecture-matrix">
          {/* Node Graph Box */}
          <div className="lg:col-span-8 relative min-h-[450px] md:min-h-[500px] border border-[#E6EEF3] bg-white rounded-3xl p-6 overflow-hidden flex items-center justify-center shadow-[0_20px_60px_rgba(16,42,67,0.06)]">
            
            {/* Soft inner dots */}
            <div className="absolute inset-0 opacity-[0.55] bg-[radial-gradient(#DCE7EE_1.2px,transparent_1.2px)] [background-size:24px_24px]" />

            {/* Selected node halo projection */}
            {agents.map((agent) => {
              if (agent.id !== selectedAgent) return null;
              return (
                <motion.div
                  key={agent.id}
                  layoutId="activeAgentAura"
                  className="absolute w-36 h-36 rounded-full bg-[#22C97E]/[0.02] blur-3xl"
                  style={{
                    left: `${agent.x}%`,
                    top: `${agent.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                />
              );
            })}

            {/* SVG Connection Cables */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" id="neural-svg">
              <defs>
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {connections.map((conn, idx) => {
                const fromNode = agents.find((a) => a.id === conn.from);
                const toNode = agents.find((a) => a.id === conn.to);
                if (!fromNode || !toNode) return null;

                const x1 = `${fromNode.x}%`;
                const y1 = `${fromNode.y}%`;
                const x2 = `${toNode.x}%`;
                const y2 = `${toNode.y}%`;

                return (
                  <g key={idx}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      className={`${conn.color} stroke-[1.5]`}
                      strokeDasharray="4 6"
                    />

                    {/* Flowing data signal pulses */}
                    <motion.circle
                      r="2.5"
                      fill="#22C97E"
                      filter="url(#glowFilter)"
                      animate={{
                        cx: [x1, x2],
                        cy: [y1, y2],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: conn.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: conn.delay
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Render Agents Interactive Nodes */}
            {agents.map((agent) => {
              const isActive = selectedAgent === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className="absolute cursor-pointer transition-transform duration-300 hover:scale-[1.08] z-10 flex flex-col items-center gap-1.5 group"
                  style={{
                    left: `${agent.x}%`,
                    top: `${agent.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300 ${agent.color} ${agent.border} ${
                      isActive
                        ? "ring-2 ring-[#22C97E]/30 border-[#22C97E] scale-105 bg-white shadow-md"
                        : "group-hover:border-[#2563EB]/30 bg-[#F1F7FA]"
                    }`}
                  >
                    {agent.icon}
                  </div>

                  <span className={`text-[9px] font-mono tracking-wider uppercase max-w-[80px] text-center leading-none font-bold ${
                    isActive ? "text-[#102A43]" : "text-[#52667A]/70 group-hover:text-[#102A43]"
                  }`}>
                    {agent.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Metadata Card Detail panel */}
          <div className="lg:col-span-4" id="agent-meta-card">
            <div className="p-8 rounded-3xl bg-white border border-[#E6EEF3] backdrop-blur-md relative overflow-hidden h-full flex flex-col justify-between shadow-[0_20px_60px_rgba(16,42,67,0.06)]">
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-[#E6EEF3] pb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#F1F7FA] border border-[#DCE7EE] flex items-center justify-center shadow-sm">
                    {agents.find((a) => a.id === selectedAgent)?.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#22C97E] uppercase block leading-none mb-1 font-bold">
                      {agents.find((a) => a.id === selectedAgent)?.role}
                    </span>
                    <h4 className="font-sans font-bold text-[#102A43] text-base">
                      {agents.find((a) => a.id === selectedAgent)?.name}
                    </h4>
                  </div>
                </div>

                <p className="font-sans text-xs text-[#52667A] leading-relaxed">
                  {agents.find((a) => a.id === selectedAgent)?.desc}
                </p>
              </div>

              {/* Minimal aesthetic tracking specs */}
              <div className="mt-8 pt-6 border-t border-[#E6EEF3] space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-[#52667A]/60 font-semibold">
                  <span>ORCHESTRATION MODE</span>
                  <span className="text-[#22C97E] font-bold">AUTONOMOUS</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono text-[#52667A]/60 font-semibold">
                  <span>CONSENSUS INTEGRITY</span>
                  <span className="text-[#102A43] font-bold">100% CRYPTO VALIDATED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
