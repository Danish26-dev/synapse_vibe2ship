import React from "react";
import { motion } from "motion/react";
import { Mic, Eye, MapPin, Sparkles, Shield, ArrowRight } from "lucide-react";

export default function CoreFeatures() {
  const features = [
    {
      id: "intake",
      badge: "Intelligent Intake",
      title: "Voice-First Civic Ingest",
      desc: "Describe local issues naturally using raw, conversational speech. Our real-time acoustic transcription engine parses multi-dialect syntax, urgency markers, and background noise, removing administrative form friction entirely.",
      icon: <Mic className="text-[#22C97E]" size={24} />,
      visual: (
        <div className="relative w-full h-full min-h-[300px] rounded-[24px] bg-white border border-[#E6EEF3] backdrop-blur-[20px] shadow-[0_20px_60px_rgba(16,42,67,0.06)] hover:shadow-[0_25px_65px_rgba(16,42,67,0.1)] hover:-translate-y-1 p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300">
          {/* Subtle light sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#22C97E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]/60 uppercase tracking-widest font-bold">
            <span>Acoustic Neural Stream</span>
            <span className="text-[#22C97E] animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C97E]" /> Live Capture
            </span>
          </div>

          <div className="flex gap-2 items-end justify-center h-24 my-6">
            {[30, 80, 50, 95, 40, 70, 85, 30, 60, 45, 90, 35, 75, 60, 80, 40, 95, 55, 70, 30].map((h, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-gradient-to-t from-[#22C97E] to-[#2563EB] rounded-full"
                animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.3}%`] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>

          <div className="p-4 bg-[#F1F7FA] border border-[#DCE7EE] rounded-2xl text-xs font-mono text-[#102A43] leading-relaxed shadow-sm">
            &quot;Yeah there&apos;s this massive water leak by the street intersection on Oak Avenue, it&apos;s eroding the sidewalk and looks like a main burst...&quot;
          </div>
        </div>
      )
    },
    {
      id: "vision",
      badge: "Multi-Modal Audit",
      title: "Gemini Vision Verification",
      desc: "Our Gemini Vision agent automatically evaluates image and video submissions, estimating materials depths, checking geographic timestamps, and screening duplicate reports near coords to keep backlogs completely pristine.",
      icon: <Eye className="text-[#2563EB]" size={24} />,
      visual: (
        <div className="relative w-full h-full min-h-[300px] rounded-[24px] bg-white border border-[#E6EEF3] backdrop-blur-[20px] shadow-[0_20px_60px_rgba(16,42,67,0.06)] hover:shadow-[0_25px_65px_rgba(16,42,67,0.1)] hover:-translate-y-1 p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]/60 uppercase tracking-widest font-bold">
            <span>Visual Depth Mapping</span>
            <span className="text-[#2563EB] font-semibold">Active Scans</span>
          </div>

          <div className="relative flex-1 my-6 rounded-2xl border border-dashed border-[#DCE7EE] flex items-center justify-center overflow-hidden bg-[#F1F7FA]">
            {/* Horizontal scanning light beam */}
            <motion.div
              animate={{ y: [-50, 50, -50] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-0.5 bg-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.3)] z-10"
            />
            
            <div className="text-center space-y-2 z-10">
              <span className="text-xs font-mono text-[#2563EB] font-bold uppercase tracking-widest">Target Resolution Audit</span>
              <p className="text-[10px] font-mono text-[#52667A] uppercase font-semibold">Erosion Level: High (4.8cm)</p>
            </div>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-[#52667A]/60 uppercase tracking-wider border-t border-[#E6EEF3] pt-3 font-semibold">
            <span>COORDS: 37.7749° N, 122.4194° W</span>
            <span className="text-[#22C97E] font-bold">MATCH: NULL DUPLICATE</span>
          </div>
        </div>
      )
    },
    {
      id: "dispatch",
      badge: "GIS Routing",
      title: "Autonomous Authority Mapping",
      desc: "No more administrative shuffle. Synapse instantly analyzes coordinate mesh overlays and Ward divisions, directly routing work orders and material schedules to the exact roadway, safety, or plumbing team responsible.",
      icon: <MapPin className="text-[#F7A623]" size={24} />,
      visual: (
        <div className="relative w-full h-full min-h-[300px] rounded-[24px] bg-white border border-[#E6EEF3] backdrop-blur-[20px] shadow-[0_20px_60px_rgba(16,42,67,0.06)] hover:shadow-[0_25px_65px_rgba(16,42,67,0.1)] hover:-translate-y-1 p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F7A623]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]/60 uppercase tracking-widest font-bold">
            <span>GIS Ward Boundaries</span>
            <span className="text-[#F7A623]">Mesh Locked</span>
          </div>

          <div className="flex-1 my-6 border border-[#DCE7EE] rounded-2xl relative overflow-hidden bg-[#F1F7FA] p-4 flex flex-col justify-between shadow-inner">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A] border-b border-[#DCE7EE] pb-2 font-semibold">
              <span>DEST: WARD 04 DIVISION</span>
              <span className="text-[#22C97E] font-bold">EST. ARRIVAL: Q1</span>
            </div>

            <div className="grid grid-cols-4 grid-rows-3 gap-2 py-4 flex-1">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={`border border-[#DCE7EE] rounded flex items-center justify-center text-[8px] font-mono ${
                    i === 5 ? "bg-[#F7A623]/10 border-[#F7A623]/25 text-[#F7A623] font-bold" : "text-[#52667A]/40 font-semibold"
                  }`}
                >
                  {i === 5 ? "DISPATCH" : `ZONE ${i + 1}`}
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#52667A]/60 uppercase tracking-widest flex items-center gap-2 font-bold">
            <Shield size={11} className="text-[#F7A623]" />
            SLA Response Priority: 98.4%
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="relative py-28 md:py-36 bg-[#F8FBFD] border-t border-[#DCE7EE]" id="features">
      {/* Soft dotted pattern overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#DCE7EE_1.2px,transparent_1.2px)] [background-size:40px_40px] opacity-[0.55]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DCE7EE] bg-white text-[10px] font-mono uppercase tracking-widest text-[#2563EB] font-bold shadow-sm">
            <Sparkles size={11} />
            The Product Ecosystem
          </div>
          <h2 className="font-display font-medium text-4xl md:text-5xl text-[#102A43] tracking-tight leading-[1.1]">
            Redefining Accountability. <br />
            <span className="text-[#6B7C93]/40">From Submission to Resolution.</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#52667A] max-w-xl leading-relaxed">
            Every feature is built as a highly specialized, autonomous operational unit designed to streamline community operations.
          </p>
        </div>

        {/* Flagship Horizontal Sections */}
        <div className="space-y-24 md:space-y-36">
          {features.map((feat, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={feat.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-5 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <span className="text-[10px] font-mono text-[#22C97E] uppercase tracking-[0.25em] block font-bold">
                    {feat.badge}
                  </span>
                  
                  <h3 className="font-display font-medium text-3xl md:text-4xl text-[#102A43] tracking-tight leading-tight">
                    {feat.title}
                  </h3>

                  <p className="font-sans text-sm text-[#52667A] leading-relaxed">
                    {feat.desc}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-[#52667A] uppercase tracking-widest border-b border-[#DCE7EE] pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-all cursor-pointer font-bold">
                      View Documentation
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.div>

                {/* Animated Visual illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  {feat.visual}
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
