import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../../../components/Navbar";
import ParticleNetwork from "../../../components/ParticleNetwork";
import HeroSpline from "../../../components/HeroSpline";
import TheProblem from "../../../components/TheProblem";
import HowItWorks from "../../../components/HowItWorks";
import CoreFeatures from "../../../components/CoreFeatures";
import MultiAgentArchitecture from "../../../components/MultiAgentArchitecture";
import DashboardPreview from "../../../components/DashboardPreview";
import TechStack from "../../../components/TechStack";
import FinalCTA from "../../../components/FinalCTA";
import Footer from "../../../components/Footer";
import Logo from "../../../components/Logo";
import { Sparkles, ArrowRight, X, Play, Mic, Eye, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Interactive Live Demo Simulator State
  const [simStep, setSimStep] = useState<"idle" | "listening" | "analyzing" | "verifying" | "dispatching" | "resolved">("idle");
  const [simIssue, setSimIssue] = useState<string>("");
  const [simLogs, setSimLogs] = useState<string[]>([]);

  useEffect(() => {
    // Elegant entrance timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Section scroll tracker
    const handleScroll = () => {
      const sections = ["home", "how-it-works", "features", "architecture", "dashboard"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Demo Simulation script runner
  const runSimulation = (type: "pothole" | "water" | "signal") => {
    setSimLogs([]);
    setSimIssue(type === "pothole" ? "Pothole on Main St" : type === "water" ? "Burst Pipe on Oak Ave" : "Broken Traffic Light");
    setSimStep("listening");
    
    // Step 1: Listening / Transcribing
    setTimeout(() => {
      setSimLogs(prev => [...prev, "🎤 Audio stream captured via Vapi..."]);
      setSimLogs(prev => [...prev, "⚡️ Transcribed dialect with 98% accuracy: 'Big road crack near the library'..."]);
      setSimStep("analyzing");
    }, 1500);

    // Step 2: Cognition / Gemini extraction
    setTimeout(() => {
      setSimLogs(prev => [...prev, "🧠 Querying Gemini 2.5 API core..."]);
      setSimLogs(prev => [...prev, "🏷️ Extracted intent: 'ASPHALT_PUDDLE_HAZARD' | Severity: HIGH"]);
      setSimLogs(prev => [...prev, "📍 Pinpointing coordinate: Lat 37.7749, Lng -122.4194."]);
      setSimStep("verifying");
    }, 3200);

    // Step 3: Vision audit
    setTimeout(() => {
      setSimLogs(prev => [...prev, "👁️ Launching Vision Verification Agent..."]);
      setSimLogs(prev => [...prev, "📸 Audited photo: verified structural depth is 4.2cm. No duplicate matching found nearby."]);
      setSimStep("dispatching");
    }, 4800);

    // Step 4: Dispatch routing
    setTimeout(() => {
      setSimLogs(prev => [...prev, "🗺️ Querying local GIS ward boundary indices..."]);
      setSimLogs(prev => [...prev, "🏢 Dispatched to: 'Ward 04 - Roadways Infrastructure division'."]);
      setSimLogs(prev => [...prev, "🛠️ Automated work order #74892 created for local engineering crew."]);
      setSimStep("resolved");
    }, 6400);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FBFD] overflow-x-hidden" id="home">
      {/* 1. PRE-RENDER ENTRY LOADING SHIELD */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#F8FBFD] z-50 flex flex-col items-center justify-center gap-6"
            id="curtain-loader"
          >
            {/* Ambient Back Glow */}
            <div className="absolute w-80 h-80 rounded-full bg-[#22C97E]/5 blur-[120px]" />

            <div className="relative">
              <Logo size={140} animate={true} />
            </div>

            {/* Futuristic text logs */}
            <div className="flex flex-col items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-[#52667A]/60 uppercase mt-4 font-semibold">
              <span className="text-[#22C97E] animate-pulse">● System Diagnostic Ingress</span>
              <span>Constructing Civic Space...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DYNAMIC BACKGROUND NETWORK CANVAS */}
      <ParticleNetwork />

      {/* Background Atmosphere Glows (Elegant Premium Light) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#22C97E]/[0.015] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2563EB]/[0.015] rounded-full blur-[100px]"></div>
      </div>

      {/* 3. NAVBAR HEADER */}
      <Navbar onLaunchDemo={() => setDemoOpen(true)} activeSection={activeSection} />

      {/* 4. HERO SECTION */}
      <header className="relative pt-32 pb-16 md:pt-48 md:pb-24 max-w-7xl mx-auto px-6 md:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading Copy */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
            
            {/* Launch Accent Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#DCE7EE] bg-[#F1F7FA]/80 text-[11px] font-bold uppercase tracking-wider text-[#22C97E] self-start backdrop-blur-md shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C97E] animate-pulse"></span>
              Next-Gen Civic Intelligence
            </motion.div>

            {/* Editorial Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-[#102A43] pb-1"
              >
                Building Smarter <br />
                <span className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] bg-clip-text text-transparent">Communities</span> <br />
                Through AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-base md:text-lg text-[#52667A] leading-relaxed max-w-md"
              >
                Synapse transforms fragmented civic complaints into intelligent AI-managed Civic Cases that automatically connect citizens, authorities, and communities.
              </motion.p>
            </div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => setDemoOpen(true)}
                style={{
                  background: "linear-gradient(135deg, #2563EB, #22C97E)",
                }}
                className="px-8 py-4 text-white rounded-xl font-bold transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-[0.98] shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_35px_rgba(34,201,126,0.35)]"
                id="hero-launch-btn"
              >
                Launch Demo
                <ArrowRight size={14} className="text-white stroke-[2.5]" />
              </button>

              <a
                href="#architecture"
                className="px-8 py-4 bg-white border border-[#DCE7EE] hover:bg-[#F1F7FA] text-[#102A43] font-sans text-xs uppercase tracking-widest text-center flex items-center justify-center rounded-xl font-bold transition-all hover:scale-[1.03]"
              >
                Explore Architecture
              </a>
            </motion.div>

            {/* Google Badges underlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 opacity-60 pt-6 border-t border-[#E6EEF3]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#52667A]">Powered by</span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-[#102A43]">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Gemini</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" />Firebase</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Google Cloud</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" />AlloyDB</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Centerpiece */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <HeroSpline />
          </div>

        </div>
      </header>

      {/* 5. THE PROBLEM SECTION */}
      <TheProblem />

      {/* 6. HOW SYNAPSE WORKS TIMELINE */}
      <HowItWorks />

      {/* 7. CORE BENTO FEATURES */}
      <CoreFeatures />

      {/* 8. AI MULTI-AGENT ARCHITECTURE */}
      <MultiAgentArchitecture />

      {/* 9. DECISION INTELLIGENCE DASHBOARD PREVIEW */}
      <DashboardPreview />

      {/* 10. TECHNOLOGY STACK WALL */}
      <TechStack />

      {/* 11. FINAL DISPLAY CTA */}
      <FinalCTA onLaunchDemo={() => setDemoOpen(true)} />

      {/* 12. MINIMAL FOOTER */}
      <Footer />

      {/* ====================================
          13. INTERACTIVE LIVE DEMO SIMULATOR MODAL
          ==================================== */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#102A43]/20 backdrop-blur-[16px] z-50 flex items-center justify-center p-4"
            id="demo-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-4xl bg-white/90 border border-[#E6EEF3] shadow-[0_30px_70px_rgba(16,42,67,0.12)] rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 max-h-[90vh] backdrop-blur-[24px]"
            >
              {/* Back gradient */}
              <div className="absolute -left-20 -top-20 w-56 h-56 bg-[#22C97E]/5 rounded-full blur-3xl" />

              {/* Close Button */}
              <button
                onClick={() => {
                  setDemoOpen(false);
                  setSimStep("idle");
                  setSimLogs([]);
                }}
                className="absolute top-6 right-6 p-2 rounded-lg bg-[#F1F7FA] hover:bg-[#E6EEF3] border border-[#DCE7EE] text-[#52667A] hover:text-[#102A43] transition-colors cursor-pointer z-20"
                id="close-demo-btn"
              >
                <X size={16} />
              </button>

              {/* Left Column: Intake Controls */}
              <div className="flex-1 space-y-6 md:max-w-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#22C97E] uppercase flex items-center gap-1.5 font-bold">
                    <Sparkles size={11} />
                    Live App Simulator
                  </span>
                  <h3 className="font-display font-medium text-[#102A43] text-2xl tracking-tight leading-tight">
                    Simulate Civic Ingestions
                  </h3>
                  <p className="font-sans text-xs text-[#52667A] leading-relaxed">
                    Select a core civic grievance scenario. Track how our multi-agent model maps intent coordinates, filters noise, and dispatches crews.
                  </p>
                </div>

                {/* Scenario Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => runSimulation("pothole")}
                    disabled={simStep !== "idle" && simStep !== "resolved"}
                    className="w-full p-4 rounded-xl bg-white border border-[#DCE7EE] hover:border-[#2563EB]/30 hover:bg-[#F1F7FA] shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4 cursor-pointer disabled:opacity-40"
                    id="scenario-pothole-btn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#2563EB]/8 border border-[#2563EB]/15 flex items-center justify-center shrink-0">
                      <Mic size={14} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#102A43]">Main St Pothole</h4>
                      <p className="text-[10px] text-[#52667A]/80">Voice reporting intake simulation</p>
                    </div>
                  </button>

                  <button
                    onClick={() => runSimulation("water")}
                    disabled={simStep !== "idle" && simStep !== "resolved"}
                    className="w-full p-4 rounded-xl bg-white border border-[#DCE7EE] hover:border-[#22C97E]/30 hover:bg-[#F1F7FA] shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4 cursor-pointer disabled:opacity-40"
                    id="scenario-water-btn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#22C97E]/8 border border-[#22C97E]/15 flex items-center justify-center shrink-0">
                      <Eye size={14} className="text-[#22C97E]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#102A43]">Burst Oak Ave Pipe</h4>
                      <p className="text-[10px] text-[#52667A]/80">Multi-modal vision analysis check</p>
                    </div>
                  </button>
                </div>

                <div className="text-[9px] font-mono text-[#52667A]/40 uppercase tracking-widest font-bold">
                  Synapse Workspace sandbox v1.2
                </div>
              </div>

              {/* Right Column: Dynamic Output Terminal */}
              <div className="flex-1 bg-[#F1F7FA] border border-[#DCE7EE] rounded-2xl p-6 flex flex-col justify-between overflow-y-auto min-h-[300px] md:min-h-0 shadow-inner">
                
                {/* Simulated Steps Header */}
                <div className="flex justify-between items-center border-b border-[#DCE7EE] pb-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#52667A]/75 uppercase font-bold">
                    Cognitive Routing Console
                  </span>
                  <div className="flex gap-1.5 items-center">
                    <span className={`w-2 h-2 rounded-full ${simStep === "idle" ? "bg-[#52667A]/30" : simStep === "resolved" ? "bg-[#22C97E]" : "bg-[#2563EB] animate-ping"}`} />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#102A43] font-bold">
                      {simStep}
                    </span>
                  </div>
                </div>

                {/* Simulated Output Logs */}
                <div className="flex-1 my-4 space-y-3 font-mono text-xs overflow-y-auto max-h-[320px] pr-2">
                  {simStep === "idle" && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-[#52667A]/50">
                      <Play size={20} className="stroke-[1.5] text-[#2563EB]" />
                      <p className="text-[10px] uppercase tracking-widest font-semibold leading-relaxed">Select an incident scenario from the left panel to execute</p>
                    </div>
                  )}

                  {simLogs.map((log, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      key={idx}
                      className="text-[11px] text-[#102A43] font-medium border-l-2 border-[#2563EB]/30 pl-3 py-0.5 leading-relaxed"
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>

                {/* Action feedback metrics */}
                <div className="border-t border-[#DCE7EE] pt-4 flex justify-between items-center">
                  <div className="flex gap-6 text-[10px] font-mono text-[#52667A] font-semibold">
                    <div>INTENT: <span className="text-[#102A43] font-bold">{simIssue || "N/A"}</span></div>
                  </div>
                  {simStep === "resolved" && (
                    <div className="flex items-center gap-1.5 text-xs text-[#22C97E] font-bold font-mono">
                      <CheckCircle2 size={13} />
                      RESOLUTION ACTIVE
                    </div>
                  )}
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
