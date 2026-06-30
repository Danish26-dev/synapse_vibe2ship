import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onLaunchDemo: () => void;
}

export default function FinalCTA({ onLaunchDemo }: FinalCTAProps) {
  return (
    <section className="relative py-28 md:py-36 bg-[#F8FBFD] border-t border-[#DCE7EE]" id="final-cta">
      {/* Dynamic Background Glow Sphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[350px] bg-[#22C97E]/8 rounded-full blur-[140px] opacity-75 animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center space-y-8">
        {/* Editorial Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 border border-[#DCE7EE] bg-white rounded-full shadow-sm"
        >
          <Sparkles className="text-[#22C97E]" size={12} />
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#22C97E] uppercase font-bold">
            Platform Alpha Launch
          </span>
        </motion.div>

        {/* Display Headings */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-medium text-4xl md:text-6xl text-[#102A43] tracking-tight leading-[1.05]"
          >
            Ready to Build Smarter <br />
            <span className="text-[#6B7C93]/40">Communities?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[#52667A] text-xs md:text-sm max-w-lg mx-auto leading-relaxed"
          >
            Deploy Synapse in your municipality today. Establish immediate transparency, automate dispatch workflows, and restore civic trust.
          </motion.p>
        </div>

        {/* Dynamic CTA Launch Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <button
            onClick={onLaunchDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#102A43] hover:bg-[#102A43]/90 text-white font-sans font-bold tracking-widest text-xs uppercase transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-xl shadow-[#102A43]/10 cursor-pointer"
            id="final-cta-launch-btn"
          >
            Launch Synapse
            <ArrowRight size={14} className="text-white stroke-[2.5]" />
          </button>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-[#DCE7EE] hover:bg-[#F1F7FA] hover:border-[#22C97E]/30 text-[#52667A] hover:text-[#102A43] font-sans font-bold tracking-widest text-xs uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
          >
            Read Architecture
          </a>
        </motion.div>
      </div>
    </section>
  );
}
