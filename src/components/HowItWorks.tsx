import React from "react";
import { motion } from "motion/react";
import { Mic, Cpu, Eye, MapPin, Wrench, Users, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "voice",
      num: "01",
      icon: <Mic className="text-[#2563EB]" size={18} />,
      title: "Voice Report",
      subtitle: "Instant Voice Intake",
      desc: "Citizens describe any local grievance naturally using speech. The Vapi & Twilio vocal engine records ambient dialects and stress contexts, eliminating rigid entry fields.",
      glow: "from-[#2563EB]/[0.04] to-indigo-500/0",
    },
    {
      id: "understanding",
      num: "02",
      icon: <Cpu className="text-[#22C97E]" size={18} />,
      title: "AI Understanding",
      subtitle: "Cognitive Context Extraction",
      desc: "Gemini models process vocal transcripts, extracting structural severity, priority metrics, semantic tags, and explicit geographic coordinates within seconds.",
      glow: "from-[#22C97E]/[0.04] to-teal-500/0",
    },
    {
      id: "vision",
      num: "03",
      icon: <Eye className="text-[#F7A623]" size={18} />,
      title: "Vision Verification",
      subtitle: "Multi-Modal Proof Audit",
      desc: "Our Gemini Vision Agents analyze upload images to verify damage depth, identify duplicate issues, audit AI-generated content authenticity, and tag structural risks.",
      glow: "from-[#F7A623]/[0.04] to-amber-500/0",
    },
    {
      id: "mapping",
      num: "04",
      icon: <MapPin className="text-[#2563EB]" size={18} />,
      title: "Authority Mapping",
      subtitle: "Dynamic Agency Dispatch",
      desc: "Coordinates are parsed across local geographic boundary meshes. Tickets are dispatched directly to the exact responsible subdivision (e.g. ward plumbing engineering).",
      glow: "from-[#2563EB]/[0.04] to-violet-500/0",
    },
    {
      id: "resolution",
      num: "05",
      icon: <Wrench className="text-[#22C97E]" size={18} />,
      title: "Resolution Agent",
      subtitle: "Automated Ticket Execution",
      desc: "A dedicated resolution bot triggers contractor scheduling, generates work orders, tracks material dispatches, and interfaces with engineering dashboards.",
      glow: "from-[#22C97E]/[0.04] to-cyan-500/0",
    },
    {
      id: "community",
      num: "06",
      icon: <Users className="text-[#F7A623]" size={18} />,
      title: "Community Verification",
      subtitle: "Decentralized Feedback Mesh",
      desc: "Ward neighbors are notified of completion. Locals submit micro-votes to audit work quality, ensuring contractors are accountable and held to civic standards.",
      glow: "from-[#F7A623]/[0.04] to-red-500/0",
    },
    {
      id: "resolved",
      num: "07",
      icon: <CheckCircle className="text-[#22C97E] animate-pulse" size={18} />,
      title: "Resolved",
      subtitle: "Closed Loop Optimization",
      desc: "Upon validation, tickets auto-close. Case metrics are logged into BigQuery and AlloyDB for municipal health indices, and confirmation is broadcasted.",
      glow: "from-[#22C97E]/[0.04] to-emerald-500/0",
    },
  ];

  return (
    <section className="relative py-28 md:py-36 bg-[#F8FBFD] border-t border-[#DCE7EE]" id="how-it-works">
      {/* Soft dotted pattern overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#DCE7EE_1.2px,transparent_1.2px)] [background-size:40px_40px] opacity-[0.55]" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24 space-y-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DCE7EE] bg-white text-[10px] font-mono uppercase tracking-widest text-[#22C97E] font-bold shadow-sm mb-4"
          >
            Workflow Automation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-medium text-4xl md:text-5xl text-[#102A43] tracking-tight leading-[1.1]"
          >
            How Synapse Orchestrates <br />
            <span className="text-[#6B7C93]/40">Civic Accountability</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono text-[#52667A]/60 tracking-wide uppercase font-bold"
          >
            SCROLL TO TRACK THE SIGNAL LIFECYCLE
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative mt-16" id="timeline-container">
          {/* Central Connecting Tube */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-[#DCE7EE]">
            <motion.div
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-[#2563EB] via-[#22C97E] via-[#F7A623] to-[#22C97E] origin-top"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
                  id={`timeline-step-${step.id}`}
                >
                  {/* Visual Node */}
                  <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#DCE7EE] flex items-center justify-center z-10 hover:border-[#22C97E] transition-colors duration-300 shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-[#F1F7FA] flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content Block (Left or Right depending on index) */}
                  <div
                    className={`w-full md:w-[44%] pl-12 md:pl-0 ${
                      isEven ? "md:text-right md:order-1" : "md:order-2"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -25 : 25, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
                      className="group relative p-6 md:p-8 rounded-[24px] bg-white border border-[#E6EEF3] backdrop-blur-[20px] shadow-[0_20px_60px_rgba(16,42,67,0.05)] hover:shadow-[0_25px_65px_rgba(16,42,67,0.09)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      {/* Ambient Glowing Corner */}
                      <div className={`absolute -right-16 -top-16 w-36 h-36 bg-gradient-to-br ${step.glow} rounded-full blur-2xl opacity-45 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Number badge */}
                      <span className="font-mono text-[10px] text-[#6B7C93]/50 tracking-[0.2em] uppercase block mb-3 font-bold">
                        {step.num} / STEP
                      </span>

                      {/* Heading */}
                      <h4 className="font-sans font-bold text-lg text-[#102A43] mb-1 group-hover:text-[#2563EB] transition-colors">
                        {step.title}
                      </h4>

                      {/* Accent Subtitle */}
                      <span className="text-[11px] font-mono text-[#22C97E] uppercase tracking-widest block mb-4 font-bold">
                        {step.subtitle}
                      </span>

                      {/* Description */}
                      <p className="font-sans text-xs text-[#52667A] leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space for structural symmetry */}
                  <div className="hidden md:block w-[44%] md:order-1.5" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
