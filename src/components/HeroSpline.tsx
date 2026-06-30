import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

export default function HeroSpline() {
  return (
    <div className="relative w-full h-[550px] md:h-[700px] flex items-center justify-center select-none" id="hero-spline-section">
      {/* Very soft radial gradient behind Spline: Blue -> Emerald -> Transparent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[100%] h-[100%] max-w-[650px] max-h-[650px] bg-[radial-gradient(circle,rgba(37,99,235,0.07)_0%,rgba(34,201,126,0.05)_40%,transparent_70%)] rounded-full blur-[50px]" />
      </div>

      {/* Decorative Outer Glass Ambient Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[85%] h-[85%] max-w-[620px] max-h-[620px] rounded-full border border-[#DCE7EE]/40 bg-radial from-transparent via-white/[0.005] to-transparent animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full relative flex items-center justify-center"
        id="spline-wrapper"
      >
        <InteractiveNeuralKnot />

        {/* Minimal white platform sitting underneath with soft colored shadow */}
        <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 w-[220px] md:w-[280px] h-[16px] md:h-[20px] rounded-full bg-white border border-[#DCE7EE]/80 shadow-[0_22px_45px_rgba(16,42,67,0.06),0_15px_30px_rgba(37,99,235,0.05),0_10px_20px_rgba(34,201,126,0.04)] z-10 flex items-center justify-center pointer-events-none">
          {/* Inner ring on platform */}
          <div className="w-[90%] h-[80%] rounded-full border border-[#E6EEF3]/60 bg-gradient-to-b from-[#F1F7FA]/50 to-white" />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#52667A]/60 pointer-events-none z-30 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C97E] animate-ping" />
          Interactive 3D Engine Active
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// 1. STUNNING 3D-PROJECTED CANVAS INTERACTIVE NEURAL KNOT
// ==========================================
function InteractiveNeuralKnot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, pressed: false });
  const angle = useRef({ x: -0.2, y: 0.3, targetX: -0.2, targetY: 0.3 });
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 550;
      height = canvas.height = canvas.parentElement?.clientHeight || 550;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Translate to center coordinates
      mouse.current.targetX = (e.clientX - rect.left - width / 2) / (width / 2);
      mouse.current.targetY = (e.clientY - rect.top - height / 2) / (height / 2);
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Define 3D Points for our neural network loops
    // Loops are constructed as 3D paths mimicking the intertwined logo circles
    interface Point3D {
      x: number;
      y: number;
      z: number;
      r: number; // Radius/size
      color: string;
      glowColor: string;
      isNode: boolean;
      pulseOffset?: number;
    }

    const initKnotPoints = (): Point3D[] => {
      const pts: Point3D[] = [];
      const scale = Math.min(width, height) * 0.46; // Increased Spline size by 70%

      // Create four loops centered on quadrants
      const loopSpecs = [
        { cx: -0.4, cy: -0.4, cz: -0.1, r: 0.35, color: "#2E6BFF", glow: "rgba(46, 107, 255, 0.4)" }, // Top Left (Blue)
        { cx: 0.4, cy: -0.4, cz: 0.1, r: 0.35, color: "#22C97E", glow: "rgba(34, 201, 126, 0.4)" },  // Top Right (Green)
        { cx: 0.4, cy: 0.4, cz: -0.1, r: 0.35, color: "#2E6BFF", glow: "rgba(46, 107, 255, 0.4)" },  // Bottom Right (Blue)
        { cx: -0.4, cy: 0.4, cz: 0.1, r: 0.35, color: "#22C97E", glow: "rgba(34, 201, 126, 0.4)" },  // Bottom Left (Green)
      ];

      loopSpecs.forEach((spec) => {
        // Generate circular points in 3D
        const steps = 40;
        for (let j = 0; j < steps; j++) {
          const theta = (j / steps) * Math.PI * 2;
          // Intertwine coordinate generation
          const x = (spec.cx + Math.cos(theta) * spec.r) * scale;
          const y = (spec.cy + Math.sin(theta) * spec.r) * scale;
          const z = (spec.cz + Math.sin(theta * 2) * 0.15) * scale;

          pts.push({
            x,
            y,
            z,
            r: 1.5,
            color: spec.color,
            glowColor: spec.glow,
            isNode: j % 10 === 0,
            pulseOffset: Math.random() * Math.PI,
          });
        }
      });

      // Add central core neural nexus nodes
      pts.push({ x: 0, y: 0, z: 0, r: 12, color: "#22C97E", glowColor: "rgba(34, 201, 126, 0.8)", isNode: true }); // Center
      pts.push({ x: -scale * 0.2, y: 0, z: scale * 0.1, r: 7, color: "#F7A623", glowColor: "rgba(247, 166, 35, 0.7)", isNode: true }); // Left Bridge
      pts.push({ x: scale * 0.2, y: 0, z: -scale * 0.1, r: 7, color: "#F7A623", glowColor: "rgba(247, 166, 35, 0.7)", isNode: true }); // Right Bridge

      return pts;
    };

    let points3D = initKnotPoints();

    // 3D projections helper
    const project = (x: number, y: number, z: number, rotationX: number, rotationY: number) => {
      // Rotate around Y axis
      let x1 = x * Math.cos(rotationY) - z * Math.sin(rotationY);
      let z1 = x * Math.sin(rotationY) + z * Math.cos(rotationY);

      // Rotate around X axis
      let y2 = y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
      let z2 = y * Math.sin(rotationX) + z1 * Math.cos(rotationX);

      // Simple perspective projection
      const fov = 350;
      const perspective = fov / (fov + z2);
      const projX = x1 * perspective + width / 2;
      const projY = y2 * perspective + height / 2;

      return { x: projX, y: projY, zDepth: z2, scale: perspective };
    };

    const render3DKnot = () => {
      ctx.clearRect(0, 0, width, height);
      time.current += 0.01;

      const scaleFactor = Math.min(width, height) * 0.46; // Increased Spline size by 70%

      // Mouse Parallax easing - gentle floating, no aggressive movement
      const m = mouse.current;
      angle.current.targetX = -m.y * 0.18 - 0.1; // vertical rotation
      angle.current.targetY = m.x * 0.18 + 0.2;  // horizontal rotation

      angle.current.x += (angle.current.targetX - angle.current.x) * 0.05;
      angle.current.y += (angle.current.targetY - angle.current.y) * 0.05;

      const rotX = angle.current.x + Math.sin(time.current * 0.4) * 0.05; // float breathing
      const rotY = angle.current.y + Math.cos(time.current * 0.3) * 0.05;

      // Re-project points and sort by depth for correct layered render
      const projected = points3D.map((p) => {
        // Gentle breathing animation added to individual coordinates
        const breathingOffset = Math.sin(time.current * 1.5 + (p.pulseOffset || 0)) * 2;
        const xCoord = p.x + (p.isNode ? 0 : breathingOffset * 0.2);
        const yCoord = p.y + (p.isNode ? 0 : breathingOffset * 0.2);

        const proj = project(xCoord, yCoord, p.z, rotX, rotY);
        return {
          original: p,
          ...proj,
        };
      });

      // Sort back-to-front (depth buffering)
      projected.sort((a, b) => b.zDepth - a.zDepth);

      // Draw interactive connections first
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          // Compute distance in 3D space to connect proximal nodes
          const dist3D = Math.hypot(
            p1.original.x - p2.original.x,
            p1.original.y - p2.original.y,
            p1.original.z - p2.original.z
          );

          if (dist3D < scaleFactor * 0.5) {
            const opacity = (1 - dist3D / (scaleFactor * 0.5)) * 0.12;
            ctx.strokeStyle = `rgba(16, 42, 67, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw the main loops as flowing ribbon tracks
      ctx.lineWidth = 4;
      ctx.lineCap = "round";

      // Draw loops connected in sequences
      const loopSegments = 40;
      for (let loopIdx = 0; loopIdx < 4; loopIdx++) {
        const startIndex = loopIdx * loopSegments;
        ctx.beginPath();

        for (let j = 0; j <= loopSegments; j++) {
          const idx = startIndex + (j % loopSegments);
          const p = projected.find((item) => item.original === points3D[idx]);
          if (!p) continue;

          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        const colors = ["rgba(46,107,255,0.3)", "rgba(34,201,126,0.3)", "rgba(46,107,255,0.3)", "rgba(34,201,126,0.3)"];
        ctx.strokeStyle = colors[loopIdx];
        ctx.lineWidth = 6;
        ctx.stroke();
      }

      // Draw Flowing Data Packets along the tracks
      const packetSpeed = 0.02;
      for (let loopIdx = 0; loopIdx < 4; loopIdx++) {
        const currentProgress = (time.current * packetSpeed + loopIdx * 0.25) % 1;
        const segmentIdx = Math.floor(currentProgress * loopSegments);
        const nextSegmentIdx = (segmentIdx + 1) % loopSegments;
        const t = (currentProgress * loopSegments) % 1;

        const pA = points3D[loopIdx * loopSegments + segmentIdx];
        const pB = points3D[loopIdx * loopSegments + nextSegmentIdx];

        if (pA && pB) {
          const x = pA.x + (pB.x - pA.x) * t;
          const y = pA.y + (pB.y - pA.y) * t;
          const z = pA.z + (pB.z - pA.z) * t;

          const proj = project(x, y, z, rotX, rotY);

          // Draw Glowing Packet Orb
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 4 * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#2E6BFF";
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // Draw individual neural nodes
      projected.forEach((p) => {
        if (!p.original.isNode) {
          // Normal point track
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.original.r * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = p.original.color;
          ctx.fill();
        } else {
          // Large connected node with glowing glass effect
          const baseRadius = p.original.r * p.scale;

          // Outer glowing shadow boundary
          ctx.beginPath();
          ctx.arc(p.x, p.y, baseRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.original.glowColor;
          ctx.fill();

          // Glass core base
          ctx.beginPath();
          ctx.arc(p.x, p.y, baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.strokeStyle = p.original.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fill();

          // Bright inner nucleus dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, baseRadius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.original.color;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      animId = requestAnimationFrame(render3DKnot);
    };

    render3DKnot();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center relative cursor-grab active:cursor-grabbing"
      id="3d-neural-knot"
    >
      <canvas ref={canvasRef} className="max-w-full max-h-full block z-20" />

      {/* Floating UI stats details for custom backdrop styling */}
      <div className="absolute inset-x-8 bottom-6 flex justify-between items-center pointer-events-none text-[10px] font-mono tracking-widest text-[#52667A]/50 uppercase z-30 font-semibold">
        <div>SYS: CONNECTED</div>
        <div className="flex gap-4">
          <span>NODES: Active</span>
          <span>LATENCY: 12MS</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. PREMIUM SUSPENSE LOADER WITH PULSING VISUAL
// ==========================================
function SplineCanvasFallback({ onSlowLoading }: { onSlowLoading: () => void }) {
  useEffect(() => {
    // If Spline takes more than 5.5 seconds, we can trigger the fallback
    const timer = setTimeout(() => {
      onSlowLoading();
    }, 5500);
    return () => clearTimeout(timer);
  }, [onSlowLoading]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10" id="spline-fallback-loader">
      {/* Centered pulsing vector core */}
      <div className="relative flex items-center justify-center">
        {/* Glow Halo */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-44 h-44 rounded-full bg-[#2563EB]/10 blur-3xl"
        />

        {/* Pulsing Synapse Symbol */}
        <div className="relative animate-pulse">
          <Logo size={140} animate={false} className="opacity-85" />
        </div>
      </div>

      {/* Progress detail text */}
      <div className="flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="text-[11px] font-mono text-[#52667A]/60 tracking-[0.3em] uppercase flex items-center gap-2 font-semibold"
        >
          <span className="w-1 h-1 rounded-full bg-[#2563EB] animate-ping" />
          Initializing 3D Space
        </motion.div>
        <span className="text-[9px] font-mono text-[#52667A]/40 uppercase tracking-[0.15em] font-semibold">
          Loading Spline Engine...
        </span>
      </div>
    </div>
  );
}
