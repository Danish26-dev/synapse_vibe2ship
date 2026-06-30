import React, { useEffect, useRef } from "react";

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles array
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const pX = Math.random() * width;
      const pY = Math.random() * height;
      particles.push({
        x: pX,
        y: pY,
        baseX: pX,
        baseY: pY,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.4 + 0.1,
        pulseSpeed: 0.005 + Math.random() * 0.01,
        pulsePhase: Math.random() * Math.PI,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    // Smooth mouse position interpolation
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    const drawGrid = (context: CanvasRenderingContext2D) => {
      const gridSize = 64; // Dotted grid spacing

      // Small dotted pattern intersections only (No lines!)
      context.fillStyle = "rgba(16, 42, 67, 0.05)";
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          context.beginPath();
          context.arc(x, y, 0.8, 0, Math.PI * 2);
          context.fill();
        }
      }

      // Draw subtle elegant flowing curved lines mimicking the logo flow
      context.lineWidth = 1.2;
      
      // Curve 1 (Blueish)
      context.beginPath();
      context.moveTo(0, height * 0.35);
      context.bezierCurveTo(width * 0.3, height * 0.1, width * 0.6, height * 0.8, width, height * 0.45);
      context.strokeStyle = "rgba(37, 99, 235, 0.025)";
      context.stroke();

      // Curve 2 (Emerald)
      context.beginPath();
      context.moveTo(0, height * 0.65);
      context.bezierCurveTo(width * 0.4, height * 0.9, width * 0.7, height * 0.2, width, height * 0.75);
      context.strokeStyle = "rgba(34, 201, 126, 0.025)";
      context.stroke();
    };

    const render = () => {
      // 1. Clear background with premium primary background #F8FBFD
      ctx.fillStyle = "#F8FBFD";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation for parallax and glow
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 2. Soft, rich radial lighting glow behind everything using theme blue and emerald
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        mouse.radius * 3
      );
      gradient.addColorStop(0, "rgba(37, 99, 235, 0.04)"); // Soft premium light blue glow
      gradient.addColorStop(0.5, "rgba(34, 201, 126, 0.035)"); // Soft premium emerald glow
      gradient.addColorStop(1, "rgba(248, 251, 253, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw static grid / dots and logo curves
      drawGrid(ctx);

      // 4. Update and render drifting particles
      particles.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse repulsion / attraction interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        let forceX = 0;
        let forceY = 0;

        if (dist < mouse.radius) {
          // Push particles away gently on hover
          const push = (mouse.radius - dist) / mouse.radius;
          forceX = (dx / dist) * push * 0.5;
          forceY = (dy / dist) * push * 0.5;
          p.x -= forceX;
          p.y -= forceY;
        }

        // Particle pulse alpha animation
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.15;

        // Render particle
        ctx.beginPath();
        // Slightly blueish-green soft colored dots on particles for light theme
        const colorSeed = (p.x + p.y) % 2;
        if (colorSeed < 1) {
          ctx.fillStyle = `rgba(37, 99, 235, ${Math.max(0.04, Math.min(currentAlpha * 0.35, 0.5))})`;
        } else {
          ctx.fillStyle = `rgba(34, 201, 126, ${Math.max(0.04, Math.min(currentAlpha * 0.35, 0.5))})`;
        }
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Very soft outer particle glow
        if (p.size > 1.2) {
          ctx.beginPath();
          ctx.fillStyle = colorSeed < 1 
            ? `rgba(37, 99, 235, ${Math.max(0.01, currentAlpha * 0.1)})`
            : `rgba(34, 201, 126, ${Math.max(0.01, currentAlpha * 0.1)})`;
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" id="particle-canvas" />
      {/* Editorial Noise Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.018] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
