import React from "react";
import { motion } from "motion/react";

export default function AILoader() {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      {/* Dynamic breathing neural nodes */}
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Breathing background ring */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[#22C97E]/20 rounded-full blur-xl"
        />

        {/* Outer orbital node 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-12 h-12 border border-dashed border-[#22C97E]/30 rounded-full"
        />

        {/* Outer orbital node 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-16 h-16 border border-dashed border-blue-400/20 rounded-full"
        />

        {/* Central glowing node assembly */}
        <div className="relative flex items-center justify-center">
          {/* Inner core */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-8 h-8 rounded-full bg-[#102A43] border border-[#22C97E]/30 flex items-center justify-center shadow-lg"
          >
            {/* Pulsing signal node */}
            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-3.5 h-3.5 rounded-full bg-[#22C97E] shadow-[0_0_12px_#22C97E]"
            />
          </motion.div>
        </div>
      </div>

      <div className="text-center space-y-1">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#22C97E] font-bold block animate-pulse">
          Synapse Agent Thinking
        </span>
        <span className="font-sans text-[10px] text-[#52667A] block">
          Structuring root causes & scheduling ward dispatches...
        </span>
      </div>
    </div>
  );
}
