import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  ArrowRight, 
  Shuffle, 
  HelpCircle, 
  AlertTriangle, 
  Sparkles, 
  Mic, 
  Eye, 
  MapPin, 
  CheckCircle2, 
  Hourglass,
  Clock,
  ShieldAlert
} from "lucide-react";

export default function TheProblem() {
  const [activeSystem, setActiveSystem] = useState<"legacy" | "synapse">("synapse");

  const legacyTimeline = [
    {
      id: "citizen",
      icon: <User className="text-rose-500" size={18} />,
      title: "Citizen",
      desc: "Reports pothole on municipal web portal.",
      status: "Frustrated"
    },
    {
      id: "wrong-dept",
      icon: <Shuffle className="text-amber-500" size={18} />,
      title: "Wrong Department",
      desc: "Ticket manually routed to Parks department instead of Roadways.",
      status: "Misrouted"
    },
    {
      id: "no-follow-up",
      icon: <Hourglass className="text-[#F7A623]" size={18} />,
      title: "No Follow Up",
      desc: "Siloed staff lose track. Case remains unassigned for weeks.",
      status: "Stalled"
    },
    {
      id: "issue-forgotten",
      icon: <AlertTriangle className="text-rose-500" size={18} />,
      title: "Issue Forgotten",
      desc: "System database clears old files. Citizen never gets a reply.",
      status: "Archived"
    }
  ];

  const synapseTimeline = [
    {
      id: "citizen",
      icon: <User className="text-[#22C97E]" size={18} />,
      title: "Citizen",
      desc: "Captures issue via voice, text, or multi-modal upload.",
      status: "Seamless"
    },
    {
      id: "synapse-core",
      icon: <Sparkles className="text-[#38BDF8]" size={18} />,
      title: "Synapse Core",
      desc: "Ingests complaint and initiates sub-agent task forces.",
      status: "Instant"
    },
    {
      id: "voice-agent",
      icon: <Mic className="text-[#22C97E]" size={18} />,
      title: "Voice Agent",
      desc: "Transcribes tone, accent, and raw intent automatically.",
      status: "Parsed"
    },
    {
      id: "vision-agent",
      icon: <Eye className="text-[#2563EB]" size={18} />,
      title: "Vision Agent",
      desc: "Verifies visual depth & filters duplicates in real-time.",
      status: "Validated"
    },
    {
      id: "authority-mapping",
      icon: <MapPin className="text-[#F7A623]" size={18} />,
      title: "Authority Mapping",
      desc: "Dispatches to accurate GIS Ward roadways division.",
      status: "Routed"
    },
    {
      id: "resolution",
      icon: <Clock className="text-[#38BDF8]" size={18} />,
      title: "Resolution",
      desc: "Automated contractor dispatch and citizen tracking.",
      status: "Dispatched"
    },
    {
      id: "verified",
      icon: <CheckCircle2 className="text-[#22C97E]" size={18} />,
      title: "Verified",
      desc: "Resolution is checked, logged, and permanently updated.",
      status: "Solved"
    }
  ];

  return (
    <section className="relative py-28 md:py-36 bg-[#F1F7FA] border-t border-[#DCE7EE]" id="the-problem">
      {/* Soft dotted pattern overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#DCE7EE_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.6]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Story Intro Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-20">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DCE7EE] bg-white text-[10px] font-mono uppercase tracking-widest text-[#22C97E] font-bold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C97E] animate-pulse"></span>
              The Paradigm Shift
            </div>
            <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight leading-[1.1] text-[#102A43]">
              Communities Don't Fail. <br />
              <span className="text-[#6B7C93]/40">Systems Do.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm md:text-base text-[#52667A] leading-relaxed">
              When a citizen encounters a broken system, complaints simply disappear. Synapse replaces administrative opacity with immediate, autonomous resolution tracks.
            </p>
          </div>
        </div>

        {/* Dynamic System Selector Switches */}
        <div className="flex justify-center mb-16">
          <div className="p-1 bg-white border border-[#DCE7EE] rounded-full flex gap-1 relative shadow-sm">
            <button
              onClick={() => setActiveSystem("legacy")}
              className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
                activeSystem === "legacy" ? "text-rose-500" : "text-[#52667A] hover:text-[#102A43]"
              }`}
            >
              The Legacy System
            </button>
            <button
              onClick={() => setActiveSystem("synapse")}
              className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 relative z-10 cursor-pointer ${
                activeSystem === "synapse" ? "text-[#22C97E]" : "text-[#52667A] hover:text-[#102A43]"
              }`}
            >
              The Synapse System
            </button>

            {/* Slider pill */}
            <motion.div
              layoutId="system-pill"
              className={`absolute top-1 bottom-1 rounded-full bg-[#F1F7FA] border border-[#DCE7EE] ${
                activeSystem === "legacy" ? "left-1 w-[164px]" : "right-1 w-[172px]"
              }`}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          </div>
        </div>

        {/* Animated Timeline Canvas */}
        <div className="relative p-8 md:p-12 rounded-[24px] bg-white border border-[#E6EEF3] backdrop-blur-[20px] shadow-[0_20px_60px_rgba(16,42,67,0.06)] overflow-hidden">
          {/* Subtle glow color filters */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[120px] transition-all duration-700 ${
              activeSystem === "legacy" ? "bg-rose-500/[0.03]" : "bg-emerald-500/[0.03]"
            }`} />
            <div className={`absolute -left-20 -top-20 w-80 h-80 rounded-full blur-[120px] transition-all duration-700 ${
              activeSystem === "legacy" ? "bg-amber-500/[0.03]" : "bg-blue-500/[0.03]"
            }`} />
          </div>

          <AnimatePresence mode="wait">
            {activeSystem === "legacy" ? (
              <motion.div
                key="legacy-timeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
              >
                {legacyTimeline.map((item, idx) => (
                  <div key={item.id} className="relative group">
                    {/* Connecting line */}
                    {idx < legacyTimeline.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-16 right-0 h-[1px] bg-dashed bg-[#DCE7EE]" />
                    )}

                    {/* Step label */}
                    <span className="text-[10px] font-mono text-[#6B7C93]/60 tracking-widest uppercase block mb-4 font-bold">
                      Step 0{idx + 1}
                    </span>

                    {/* Icon Sphere */}
                    <div className="w-12 h-12 rounded-2xl bg-[#F1F7FA] border border-[#DCE7EE] group-hover:border-rose-500/30 group-hover:bg-rose-500/[0.03] transition-all duration-300 flex items-center justify-center mb-6">
                      {item.icon}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-sans font-bold text-sm text-[#102A43]">{item.title}</h4>
                        <span className="text-[8px] font-mono tracking-wider bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded uppercase font-bold">
                          {item.status}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#6B7C93] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="synapse-timeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10"
              >
                {synapseTimeline.map((item, idx) => (
                  <div key={item.id} className="relative group">
                    {/* Connecting line with elegant light sweep */}
                    {idx < synapseTimeline.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-16 right-0 h-[1px] bg-[#DCE7EE]">
                        <motion.div
                          animate={{
                            left: ["0%", "100%"],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.3,
                            ease: "easeInOut"
                          }}
                          className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-[#22C97E]/30 to-transparent"
                        />
                      </div>
                    )}

                    {/* Step label */}
                    <span className="text-[9px] font-mono text-[#6B7C93]/60 tracking-widest uppercase block mb-4 font-bold">
                      Stage 0{idx + 1}
                    </span>

                    {/* Icon Sphere */}
                    <div className="w-12 h-12 rounded-2xl bg-[#F1F7FA] border border-[#DCE7EE] group-hover:border-[#22C97E]/30 group-hover:bg-white transition-all duration-300 flex items-center justify-center mb-6 shadow-sm relative overflow-hidden">
                      {/* Subtle back circle */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#22C97E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.icon}
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-col gap-1 items-start">
                        <h4 className="font-sans font-bold text-xs text-[#102A43] group-hover:text-[#22C97E] transition-colors">{item.title}</h4>
                        <span className="text-[8px] font-mono tracking-wider bg-emerald-500/10 text-[#22C97E] px-1.5 py-0.2 rounded uppercase font-bold">
                          {item.status}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#52667A] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
