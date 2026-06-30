import React from "react";
import { motion } from "motion/react";
import { Cpu, Flame, Map, MessageSquare, Database, Server, Box, Layers } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  desc: string;
}

export default function TechStack() {
  const technologies: TechItem[] = [
    {
      name: "Gemini 2.5",
      category: "Cognitive AI Core",
      icon: <Cpu className="text-[#2563EB]" size={20} />,
      desc: "Powers our server-side multi-modal multi-agent reasoning, Vision verification, and report synthesis.",
    },
    {
      name: "Firebase Suite",
      category: "App Ecosystem",
      icon: <Flame className="text-[#F7A623]" size={20} />,
      desc: "Manages real-time distributed states, cloud asset storage, and authenticated civic ledgers.",
    },
    {
      name: "Google Maps GIS",
      category: "Spatial Geometry",
      icon: <Map className="text-[#22C97E]" size={20} />,
      desc: "Powers address validation, boundary meshes, and precise localized coordinate routing.",
    },
    {
      name: "Cloud Run",
      category: "Compute Engine",
      icon: <Server className="text-[#2563EB]" size={20} />,
      desc: "Launches serverless, scale-to-zero container microservices with low-latency global ingress.",
    },
    {
      name: "AlloyDB",
      category: "Relational Ledger",
      icon: <Database className="text-[#22C97E]" size={20} />,
      desc: "Provides lightning-fast analytical queries and vector storage for civic similarity matchings.",
    },
    {
      name: "BigQuery",
      category: "Civic Data Warehousing",
      icon: <Layers className="text-[#2563EB]" size={20} />,
      desc: "Aggregates municipal tickets into multi-year structural planning dashboards and indices.",
    },
    {
      name: "Twilio & Vapi",
      category: "Audio Processing",
      icon: <MessageSquare className="text-[#F7A623]" size={20} />,
      desc: "Drives voice-first intake, recording environmental tones and dialing emergency dispatch alerts.",
    },
    {
      name: "Tailwind & Motion",
      category: "Client Presentation",
      icon: <Box className="text-[#22C97E]" size={20} />,
      desc: "Powers our high-fidelity, liquid-responsive interface layouts and staggering scroll triggers.",
    },
  ];

  // Doubled ticker list for continuous infinite looping animation
  const tickerItems = [
    "Google Gemini", "Firebase", "Google Maps Platform", "Google Cloud", 
    "BigQuery", "AlloyDB", "Twilio", "Vapi.ai", "React 19", "Tailwind CSS", "Framer Motion"
  ];
  const fullTicker = [...tickerItems, ...tickerItems];

  return (
    <section className="relative py-28 md:py-36 bg-[#F1F7FA] border-t border-[#DCE7EE] overflow-hidden" id="tech-stack-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,201,126,0.015),transparent_40%)] pointer-events-none" />

      {/* INFINITE CONVEYOR TICKER TRACK (Drifting background text) */}
      <div className="w-full border-y border-[#DCE7EE] bg-white py-5 mb-20 overflow-hidden relative shadow-xs">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F1F7FA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F1F7FA] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-16 text-[10px] font-mono tracking-[0.4em] text-[#52667A]/55 uppercase font-bold"
        >
          {fullTicker.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C97E]/50" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DCE7EE] bg-white text-[10px] font-mono uppercase tracking-widest text-[#22C97E] font-bold shadow-sm">
            Integration Core
          </span>
          <h2 className="font-display font-medium text-4xl md:text-5xl text-[#102A43] tracking-tight leading-[1.1]">
            Built on Enterprise <br />
            <span className="text-[#6B7C93]/40">Google & Civic Tech</span>
          </h2>
          <p className="font-sans text-[#52667A] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Synapse bridges bleeding-edge LLM reasoning engines with industry-standard municipal storage and audio infrastructure.
          </p>
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="tech-grid">
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
              className="p-6 rounded-2xl bg-white border border-[#E6EEF3] hover:border-[#22C97E]/30 hover:shadow-[0_20px_50px_rgba(16,42,67,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="w-10 h-10 rounded-xl bg-[#F1F7FA] border border-[#DCE7EE] group-hover:border-[#22C97E]/40 group-hover:bg-white transition-all flex items-center justify-center shadow-xs">
                  {tech.icon}
                </div>
                
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-[#22C97E] uppercase tracking-widest block font-bold">
                    {tech.category}
                  </span>
                  <h4 className="font-sans font-bold text-[#102A43] text-base tracking-tight">
                    {tech.name}
                  </h4>
                </div>

                <p className="font-sans text-xs text-[#52667A] leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              {/* Faint indicator border */}
              <div className="h-[1px] bg-[#E6EEF3] mt-6" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
