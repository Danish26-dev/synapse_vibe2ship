import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface VoiceWaveformProps {
  isListening?: boolean;
}

export default function VoiceWaveform({ isListening = true }: VoiceWaveformProps) {
  const [bars, setBars] = useState<number[]>(new Array(15).fill(4));

  useEffect(() => {
    if (!isListening) {
      setBars(new Array(15).fill(4));
      return;
    }

    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map(() => Math.floor(Math.random() * 32) + 6)
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-4">
      {/* Audio Waveform Bars container */}
      <div className="flex items-center gap-1.5 h-12">
        {bars.map((height, idx) => (
          <motion.div
            key={idx}
            animate={{ height }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={`w-1 rounded-full ${
              isListening 
                ? idx % 2 === 0 
                  ? "bg-[#22C97E]" 
                  : "bg-blue-400" 
                : "bg-slate-300"
            }`}
            style={{ minHeight: "4px" }}
          />
        ))}
      </div>

      <div className="text-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#52667A] font-bold">
          {isListening ? "Audio Stream Synchronized" : "Voice Feed Idle"}
        </span>
      </div>
    </div>
  );
}
