import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export default function Logo({ className = "", size = 48, animate = true }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      id="synapse-logo-svg"
    >
      <defs>
        {/* Glow Filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="blueLoop" x1="50" y1="50" x2="250" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>

        <linearGradient id="greenLoop" x1="450" y1="50" x2="250" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>

        <linearGradient id="orangeBridge" x1="150" y1="250" x2="350" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>

        <linearGradient id="blueBottomLoop" x1="250" y1="250" x2="450" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        <linearGradient id="greenBottomLoop" x1="250" y1="250" x2="50" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
      </defs>

      {/* Background Neural Grid Accent (subtle and faint inside the logo) */}
      <g opacity="0.15">
        <line x1="250" y1="120" x2="250" y2="380" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="120" y1="250" x2="380" y2="250" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="150" y1="150" x2="350" y2="350" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="350" y1="150" x2="150" y2="350" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" />
      </g>

      {/* Interactive Floating / Breathing Group */}
      <motion.g
        animate={
          animate
            ? {
                y: [0, -8, 0],
                rotate: [0, 1.5, -1.5, 0],
              }
            : {}
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "250px 250px" }}
      >
        {/* --- LOOPS & TRACKS (Symmetrical Ribbons) --- */}

        {/* 1. Top Left Loop (Blue) */}
        <path
          d="M 210 160 C 170 120, 100 120, 100 180 C 100 240, 180 240, 220 200 C 240 180, 250 150, 250 120"
          stroke="url(#blueLoop)"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
        <path
          d="M 210 160 C 170 120, 100 120, 100 180 C 100 240, 180 240, 220 200 C 240 180, 250 150, 250 120"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />

        {/* 2. Top Right Loop (Green) */}
        <path
          d="M 290 160 C 330 120, 400 120, 400 180 C 400 240, 320 240, 280 200 C 260 180, 250 150, 250 120"
          stroke="url(#greenLoop)"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
        <path
          d="M 290 160 C 330 120, 400 120, 400 180 C 400 240, 320 240, 280 200 C 260 180, 250 150, 250 120"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />

        {/* 3. Bottom Right Loop (Blue) */}
        <path
          d="M 290 340 C 330 380, 400 380, 400 320 C 400 260, 320 260, 280 300 C 260 320, 250 350, 250 380"
          stroke="url(#blueBottomLoop)"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
        <path
          d="M 290 340 C 330 380, 400 380, 400 320 C 400 260, 320 260, 280 300 C 260 320, 250 350, 250 380"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />

        {/* 4. Bottom Left Loop (Green) */}
        <path
          d="M 210 340 C 170 380, 100 380, 100 320 C 100 260, 180 260, 220 300 C 240 320, 250 350, 250 380"
          stroke="url(#greenBottomLoop)"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
        <path
          d="M 210 340 C 170 380, 100 380, 100 320 C 100 260, 180 260, 220 300 C 240 320, 250 350, 250 380"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />

        {/* --- DIAGONAL ORANGE BRIDGES --- */}
        {/* Top-Left to Bottom-Right Connector */}
        <path
          d="M 160 190 Q 250 250 340 310"
          stroke="url(#orangeBridge)"
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
        />
        {/* Top-Right to Bottom-Left Connector */}
        <path
          d="M 340 190 Q 250 250 160 310"
          stroke="url(#orangeBridge)"
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
        />


        {/* --- INTERCONNECTED NEURAL NODES --- */}

        {/* 1. Center Junction Node (Green) */}
        <circle cx="250" cy="250" r="28" fill="#10B981" filter="url(#glow)" />
        <circle cx="250" cy="250" r="16" fill="#34D399" />
        <circle cx="250" cy="250" r="8" fill="#FFFFFF" />

        {/* 2. Top-Left Loop Node (Blue) */}
        <circle cx="150" cy="180" r="22" fill="#2563EB" />
        <circle cx="150" cy="180" r="12" fill="#60A5FA" />
        <circle cx="150" cy="180" r="6" fill="#FFFFFF" />

        {/* 3. Top-Right Loop Node (Green) */}
        <circle cx="350" cy="180" r="22" fill="#059669" />
        <circle cx="350" cy="180" r="12" fill="#34D399" />
        <circle cx="350" cy="180" r="6" fill="#FFFFFF" />

        {/* 4. Bottom-Left Loop Node (Green) */}
        <circle cx="150" cy="320" r="22" fill="#059669" />
        <circle cx="150" cy="320" r="12" fill="#34D399" />
        <circle cx="150" cy="320" r="6" fill="#FFFFFF" />

        {/* 5. Bottom-Right Loop Node (Blue) */}
        <circle cx="350" cy="320" r="22" fill="#2563EB" />
        <circle cx="350" cy="320" r="12" fill="#60A5FA" />
        <circle cx="350" cy="320" r="6" fill="#FFFFFF" />

        {/* --- DIAGONAL BRIDGE GLOWING ORANGE NODES --- */}
        {/* Left Orange Node */}
        <circle cx="205" cy="250" r="18" fill="#F97316" filter="url(#glow)" />
        <circle cx="205" cy="250" r="10" fill="#FDBA74" />
        <circle cx="205" cy="250" r="4" fill="#FFFFFF" />

        {/* Right Orange Node */}
        <circle cx="295" cy="250" r="18" fill="#F97316" filter="url(#glow)" />
        <circle cx="295" cy="250" r="10" fill="#FDBA74" />
        <circle cx="295" cy="250" r="4" fill="#FFFFFF" />


        {/* --- DECORATIVE SIGNAL PULSES / DATA FLOWS --- */}
        {animate && (
          <>
            {/* Top-Left loop pulse */}
            <motion.circle
              r="6"
              fill="#FFFFFF"
              filter="url(#glow)"
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                motionPath: "path('M 210 160 C 170 120, 100 120, 100 180 C 100 240, 180 240, 220 200 C 240 180, 250 150, 250 120')",
              }}
            />

            {/* Top-Right loop pulse */}
            <motion.circle
              r="6"
              fill="#FFFFFF"
              filter="url(#glow)"
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5,
              }}
              style={{
                motionPath: "path('M 290 160 C 330 120, 400 120, 400 180 C 400 240, 320 240, 280 200 C 260 180, 250 150, 250 120')",
              }}
            />

            {/* Orange Bridge data pulses */}
            <motion.circle
              r="5"
              fill="#FFFFFF"
              filter="url(#glow)"
              animate={{
                cx: [160, 250, 340],
                cy: [190, 250, 310],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              r="5"
              fill="#FFFFFF"
              filter="url(#glow)"
              animate={{
                cx: [340, 250, 160],
                cy: [190, 250, 310],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </>
        )}
      </motion.g>
    </svg>
  );
}
