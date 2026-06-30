import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Calendar, 
  Activity, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  Shield, 
  Globe, 
  Cpu, 
  Clock, 
  Search,
  ChevronRight,
  Maximize2
} from "lucide-react";

interface WardData {
  name: string;
  healthScore: number;
  activeCases: number;
  resolvedCases: number;
  avgResolutionHours: number;
  savingsDollars: string;
  insights: string[];
  heatmapPoints: Array<{ x: number; y: number; val: number; label: string }>;
  timelinePoints: Array<{ label: string; val: number; sla: number }>;
}

export default function DashboardPreview() {
  const [activeWard, setActiveWard] = useState<string>("ward-4");

  const wards: Record<string, WardData> = {
    "ward-4": {
      name: "Ward 04 - Downtown Grid",
      healthScore: 89,
      activeCases: 14,
      resolvedCases: 412,
      avgResolutionHours: 2.1,
      savingsDollars: "$184.5K",
      insights: [
        "Oak Avenue: Predicted 87% water main stress spike within 14 days due to ambient pressure fluctuations.",
        "Downtown Route: Intelligent duplicate detection grouped 12 vocal complaints regarding broad street clogs.",
        "Immediate dispatch triggered to Local Utility Batch Roadways team to fix pothole cluster near Market Square."
      ],
      heatmapPoints: [
        { x: 25, y: 35, val: 8, label: "Oak Ave Sewer Leak" },
        { x: 55, y: 70, val: 5, label: "Broad St Signal Defect" },
        { x: 80, y: 45, val: 9, label: "Pine Blvd Pothole" },
        { x: 40, y: 20, val: 4, label: "Market Sq Trash Link" },
      ],
      timelinePoints: [
        { label: "Jan", val: 80, sla: 120 },
        { label: "Feb", val: 95, sla: 120 },
        { label: "Mar", val: 110, sla: 120 },
        { label: "Apr", val: 140, sla: 120 },
        { label: "May", val: 155, sla: 120 },
        { label: "Jun", val: 185, sla: 120 },
      ],
    },
    "ward-12": {
      name: "Ward 12 - Marina Waterfront",
      healthScore: 94,
      activeCases: 6,
      resolvedCases: 289,
      avgResolutionHours: 1.4,
      savingsDollars: "$112.1K",
      insights: [
        "Waterfront Seawall: Visual auditing agents confirmed structural depth safety remains at nominal 100%.",
        "Harbor Road: 6 audio complaints mapped to a single sewer block, preventing backlog duplicates.",
        "Autonomous shift routing triggered garbage collection timing optimizations based on noise reports."
      ],
      heatmapPoints: [
        { x: 15, y: 65, val: 9, label: "Seawall Drain Blockage" },
        { x: 45, y: 30, val: 3, label: "Pier 4 Handrail Damaged" },
        { x: 70, y: 80, val: 5, label: "Marina Rd Sinkhole" },
      ],
      timelinePoints: [
        { label: "Jan", val: 40, sla: 80 },
        { label: "Feb", val: 52, sla: 80 },
        { label: "Mar", val: 68, sla: 80 },
        { label: "Apr", val: 60, sla: 80 },
        { label: "May", val: 85, sla: 80 },
        { label: "Jun", val: 94, sla: 80 },
      ],
    },
    "ward-9": {
      name: "Ward 09 - Foothill Slopes",
      healthScore: 78,
      activeCases: 29,
      resolvedCases: 198,
      avgResolutionHours: 4.8,
      savingsDollars: "$84.9K",
      insights: [
        "West Slope: Silt sensors flag high-density drainage block risk near West Slope Highway.",
        "Foothill Pass: Heavy-duty dispatch bots automated tree pruning scheduler based on camera verification.",
        "Budget planning: Active predictive material usage logs optimized asphalt reserve levels for Ward 09."
      ],
      heatmapPoints: [
        { x: 30, y: 25, val: 9, label: "Foothill Pass Mud slide" },
        { x: 65, y: 55, val: 7, label: "Slope Rd Broken Pipe" },
        { x: 90, y: 75, val: 8, label: "Hilltop Guardrail Defect" },
        { x: 15, y: 50, val: 6, label: "Tree Fall Obstruction" },
      ],
      timelinePoints: [
        { label: "Jan", val: 20, sla: 50 },
        { label: "Feb", val: 28, sla: 50 },
        { label: "Mar", val: 32, sla: 50 },
        { label: "Apr", val: 45, sla: 50 },
        { label: "May", val: 38, sla: 50 },
        { label: "Jun", val: 55, sla: 50 },
      ],
    },
  };

  const current = wards[activeWard];

  return (
    <section className="relative py-28 md:py-36 bg-[#F1F7FA] border-t border-[#DCE7EE]" id="dashboard">
      {/* Soft dotted pattern overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#DCE7EE_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.6]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DCE7EE] bg-white text-[10px] font-mono uppercase tracking-widest text-[#2563EB] font-bold shadow-sm">
              <Activity size={12} className="animate-pulse text-[#22C97E]" />
              Strategic Ward Health Control
            </div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#102A43] tracking-tight leading-[1.1]">
              The Decision <br />
              <span className="text-[#6B7C93]/40">Intelligence Dashboard</span>
            </h2>
            <p className="font-sans text-sm text-[#52667A] leading-relaxed">
              Experience the central municipal control interface. Synapse aggregates incoming civic report flows, tracks ward health indicators, predicts hardware fatigue, and optimizes budget preservation.
            </p>
          </div>

          {/* Interactive Ward Selector Tabs */}
          <div className="flex gap-1.5 p-1 bg-white border border-[#DCE7EE] rounded-full backdrop-blur-md shadow-sm">
            {Object.keys(wards).map((key) => (
              <button
                key={key}
                onClick={() => setActiveWard(key)}
                className={`relative px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeWard === key ? "text-[#22C97E] font-bold" : "text-[#52667A] hover:text-[#102A43] font-bold"
                }`}
              >
                {activeWard === key && (
                  <motion.div
                    layoutId="activeWardTab"
                    className="absolute inset-0 bg-[#F1F7FA] border border-[#DCE7EE] rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {wards[key].name.split(" - ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Premium macOS-Style Browser Window */}
        <div className="rounded-[24px] border border-[#E6EEF3] bg-white shadow-[0_20px_60px_rgba(16,42,67,0.08)] backdrop-blur-[20px] overflow-hidden">
          
          {/* macOS Top Bar window controls */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#F1F7FA] border-b border-[#DCE7EE]">
            {/* Dots */}
            <div className="flex items-center gap-1.5 w-24">
              <div className="w-3 h-3 rounded-full bg-rose-500/50" />
              <div className="w-3 h-3 rounded-full bg-[#F7A623]/60" />
              <div className="w-3 h-3 rounded-full bg-[#22C97E]/60" />
            </div>

            {/* Address bar URL */}
            <div className="flex-1 max-w-lg flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg bg-white border border-[#DCE7EE] text-[10px] font-mono text-[#52667A] tracking-wider shadow-inner font-semibold">
              <span className="text-[#22C97E] font-bold">HTTPS</span>
              <span className="text-[#DCE7EE]">|</span>
              <span>synapse.gov/ward/health-index</span>
            </div>

            {/* Micro window actions */}
            <div className="flex items-center justify-end gap-3 w-24 text-[#52667A]/50">
              <Search size={12} />
              <Maximize2 size={11} />
            </div>
          </div>

          {/* Browser Workspace Canvas */}
          <div className="p-6 md:p-8 space-y-8 bg-white/50">
            
            {/* First Row: Status Gauges, Incident map, and live AI insights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Gauges & Microstats */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Health circle gauge card */}
                <div className="p-6 rounded-2xl bg-[#F1F7FA] border border-[#DCE7EE] flex flex-col justify-between h-[230px] shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-mono tracking-widest text-[#52667A]/75 uppercase font-bold">
                      Ward Health Score
                    </span>
                    <span className="text-[9px] font-mono text-[#22C97E] bg-white px-2 py-0.5 rounded border border-[#DCE7EE] uppercase font-bold shadow-xs">
                      +1.8% Wkly
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center relative my-2">
                    <svg width="120" height="120" viewBox="0 0 100 100" className="rotate-[-90deg]">
                      <circle cx="50" cy="50" r="40" stroke="#E6EEF3" strokeWidth="6" fill="transparent" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#22C97E"
                        strokeWidth="6"
                        strokeDasharray={251.2}
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * current.healthScore) / 100 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-display font-bold text-[#102A43] leading-none">{current.healthScore}%</span>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#52667A]/60 mt-1 font-bold">SLA Healthy</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[9px] font-mono text-[#52667A]/75 border-t border-[#DCE7EE] pt-3 mt-1 font-bold">
                    <span>Active cases: {current.activeCases}</span>
                    <span>Resolved: {current.resolvedCases}</span>
                  </div>
                </div>

                {/* Avg resolution stats card */}
                <div className="p-6 rounded-2xl bg-[#F1F7FA] border border-[#DCE7EE] flex flex-col justify-between h-[160px] shadow-sm">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#52667A]/75 uppercase block font-bold">
                      Avg Resolution Speed
                    </span>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-4xl font-display font-bold text-[#102A43]">{current.avgResolutionHours}</span>
                      <span className="text-xs font-sans text-[#52667A]/75 font-semibold">Hours</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[9px] font-mono text-[#52667A]/75 border-t border-[#DCE7EE] pt-3 font-bold">
                    <span>Taxpayer saved:</span>
                    <span className="text-[#22C97E] font-bold">{current.savingsDollars}</span>
                  </div>
                </div>

              </div>

              {/* Coordinates Map */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F1F7FA] border border-[#DCE7EE] flex flex-col justify-between min-h-[410px] shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b border-[#DCE7EE] pb-3">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#52667A]/60 uppercase block mb-1 font-bold">Incident Mesh Map</span>
                    <h4 className="text-sm font-display font-bold text-[#102A43] flex items-center gap-1">
                      <MapPin size={12} className="text-[#22C97E]" />
                      {current.name}
                    </h4>
                  </div>
                  <span className="text-[8px] font-mono text-[#2563EB] uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-[#DCE7EE] font-bold shadow-xs">
                    Live GIS Feed
                  </span>
                </div>

                {/* Radar grid display */}
                <div className="flex-1 relative rounded-xl border border-[#DCE7EE] bg-white overflow-hidden flex items-center justify-center min-h-[250px] shadow-inner">
                  <div className="absolute inset-0 opacity-[0.55] bg-[linear-gradient(to_right,rgba(16,42,67,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,42,67,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* Sweep */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 origin-center bg-[conic-gradient(from_0deg,rgba(34,201,126,0.04),transparent_30%)] pointer-events-none"
                  />

                  {/* Nodes */}
                  {current.heatmapPoints.map((pt, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute group/node cursor-pointer"
                      style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-3 rounded-full bg-[#22C97E] blur-[2px] pointer-events-none"
                      />
                      <div className="w-3 h-3 rounded-full bg-[#22C97E] border border-white flex items-center justify-center shadow-lg shadow-[#22C97E]/50" />
                      
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#102A43] border border-[#E6EEF3] rounded px-2 py-0.5 text-[8px] font-mono text-white whitespace-nowrap pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity z-20 uppercase tracking-wider font-bold">
                        {pt.label} (Severity: {pt.val}/10)
                      </div>
                    </motion.div>
                  ))}

                  <div className="absolute bottom-2 left-3 text-[7.5px] font-mono text-[#52667A]/50 tracking-widest uppercase font-bold">
                    MESH COORDS PRE-VALIDATED BY VOICE INTENT
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-[#52667A]/50 border-t border-[#DCE7EE] pt-3 mt-3 font-semibold">
                  <span>ACTIVE TARGET POOLS: DRAINAGE, STREET, LIGHTS</span>
                  <span className="text-[#22C97E] font-bold">100% SLA STABLE</span>
                </div>
              </div>

              {/* AI Insights panel */}
              <div className="lg:col-span-3 p-6 rounded-2xl bg-[#F1F7FA] border border-[#DCE7EE] flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#DCE7EE] pb-3">
                    <span className="text-[9px] font-mono tracking-widest text-[#52667A]/60 uppercase flex items-center gap-1.5 font-bold">
                      <Sparkles size={11} className="text-[#22C97E]" />
                      Gemini Auto-Audit Insights
                    </span>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence mode="wait">
                      {current.insights.map((insight, idx) => (
                        <motion.div
                          key={insight.slice(0, 15)}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: idx * 0.08 }}
                          className="p-3.5 rounded-xl bg-white border border-[#E6EEF3] flex gap-2.5 items-start shadow-xs"
                        >
                          <ChevronRight size={12} className="text-[#22C97E] shrink-0 mt-0.5" />
                          <p className="font-sans text-[11px] text-[#52667A] leading-relaxed font-medium">
                            {insight}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE7EE] space-y-1.5 text-[8.5px] font-mono text-[#52667A]/60 font-bold">
                  <div className="flex justify-between">
                    <span>ACCURACY BOUND</span>
                    <span className="text-[#22C97E] font-bold">99.98% SLA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATE AUDITING</span>
                    <span>REAL-TIME SECURE</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Trend charts inside browser */}
            <div className="p-6 rounded-2xl bg-[#F1F7FA] border border-[#DCE7EE] shadow-sm">
              <div className="flex justify-between items-center border-b border-[#DCE7EE] pb-3 mb-6">
                <span className="text-[9px] font-mono tracking-widest text-[#52667A]/60 uppercase font-bold">
                  Monthly Resolution Volume Trend
                </span>
                <div className="flex gap-4 text-[8px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                  <div className="flex gap-1 items-center">
                    <span className="w-2.5 h-0.5 bg-[#22C97E] rounded" />
                    <span>Cases Closed</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="w-2.5 h-0.5 bg-dashed border-t border-[#DCE7EE]" />
                    <span>SLA Standard Target</span>
                  </div>
                </div>
              </div>

              {/* Area SVG */}
              <div className="h-32 w-full relative flex items-end">
                <svg className="w-full h-full relative z-10" viewBox="0 0 800 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C97E" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#22C97E" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="800" y2="40" stroke="#E6EEF3" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="800" y2="80" stroke="#E6EEF3" strokeWidth="1" strokeDasharray="3 3" />

                  <path
                    d={`M 0 120 
                       L 0 ${120 - current.timelinePoints[0].val * 0.5} 
                       L 160 ${120 - current.timelinePoints[1].val * 0.5} 
                       L 320 ${120 - current.timelinePoints[2].val * 0.5} 
                       L 480 ${120 - current.timelinePoints[3].val * 0.5} 
                       L 640 ${120 - current.timelinePoints[4].val * 0.5} 
                       L 800 ${120 - current.timelinePoints[5].val * 0.5} 
                       L 800 120 Z`}
                    fill="url(#areaGrad)"
                  />

                  <path
                    d={`M 0 ${120 - current.timelinePoints[0].val * 0.5} 
                       L 160 ${120 - current.timelinePoints[1].val * 0.5} 
                       L 320 ${120 - current.timelinePoints[2].val * 0.5} 
                       L 480 ${120 - current.timelinePoints[3].val * 0.5} 
                       L 640 ${120 - current.timelinePoints[4].val * 0.5} 
                       L 800 ${120 - current.timelinePoints[5].val * 0.5}`}
                    fill="none"
                    stroke="#22C97E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {current.timelinePoints.map((pt, i) => (
                    <circle
                      key={i}
                      cx={i * 160}
                      cy={120 - pt.val * 0.5}
                      r="4"
                      fill="#22C97E"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>

                <div className="absolute inset-x-0 -bottom-6 flex justify-between text-[8px] font-mono text-[#52667A]/60 uppercase tracking-widest font-bold">
                  {current.timelinePoints.map((pt, i) => (
                    <span key={i} className="w-12 text-center">{pt.label}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
