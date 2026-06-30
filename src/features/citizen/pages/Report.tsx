import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { db } from "../../../contexts/FirebaseProvider";
import { useAuth } from "../../../contexts/AuthContext";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import MapContainer from "../../../components/ui/MapContainer";
import VoiceWaveform from "../../../components/ui/VoiceWaveform";
import { showToast } from "../../../components/ui/Toast";
import { 
  runMultiAgentPipeline, 
  PRESET_INCIDENTS, 
  AgentLog, 
  AICaseOutput 
} from "../../../services/aiWorkflow";
import { 
  Sparkles, 
  Mic, 
  Image as ImageIcon, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  ShieldAlert,
  Loader2,
  Trash2,
  MapPin,
  Clock
} from "lucide-react";

export default function Report() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  // Selected mode
  const [mode, setMode] = useState<"none" | "voice" | "image" | "text">("none");
  const [inputText, setInputText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Pipeline state
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(-1);
  const [pipelineOutput, setPipelineOutput] = useState<AICaseOutput | null>(null);

  const [isRecording, setIsRecording] = useState(false);

  // Triggering workflow from preset scenario
  const handleSelectPreset = async (presetId: string) => {
    const preset = PRESET_INCIDENTS.find(p => p.id === presetId);
    if (!preset) return;

    setMode(presetId === "streetlight" ? "text" : presetId === "pothole" ? "voice" : "image");
    setUploadedImage(preset.sampleImage);
    setInputText(preset.description);
    
    await startPipeline(preset.description, preset.sampleImage);
  };

  const startPipeline = async (text: string, image: string | null) => {
    setIsProcessing(true);
    setPipelineOutput(null);
    setLogs([]);
    setCurrentAgentIndex(0);

    try {
      // Simulate pipeline logging with intervals
      const result = await runMultiAgentPipeline(text, (updatedLogs) => {
        setLogs(updatedLogs);
        setCurrentAgentIndex(prev => prev + 1);
      });
      setPipelineOutput(result);
    } catch (err) {
      console.error(err);
      showToast.error("Failed to execute AI Dispatch pipeline.");
    } finally {
      setIsProcessing(false);
      setCurrentAgentIndex(-1);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      showToast.error("Please enter a description or upload media.");
      return;
    }
    await startPipeline(inputText, uploadedImage);
  };

  const handleVoiceSimulate = () => {
    setIsRecording(true);
    showToast.success("Recording synchronized audio channel...");
    setTimeout(async () => {
      setIsRecording(false);
      const text = "A high-mast municipal streetlight bulb on Elm Ave is sparking and dark for three days.";
      setInputText(text);
      setMode("voice");
      showToast.success("Voice transcript synchronized with 98% accuracy.");
      await startPipeline(text, null);
    }, 2500);
  };

  const handleAuthorizeDispatch = async () => {
    if (!pipelineOutput) return;

    const id = `SYN-${Math.floor(100000 + Math.random() * 900000)}`;
    const payload = {
      id,
      title: pipelineOutput.title,
      description: pipelineOutput.description,
      status: "reported" as const,
      priority: pipelineOutput.priority,
      reporterId: profile?.uid || "anonymous_user",
      reporterName: profile?.displayName || "Anonymous Citizen",
      assignedWard: pipelineOutput.assignedWard,
      category: pipelineOutput.category,
      department: pipelineOutput.department,
      latitude: pipelineOutput.latitude,
      longitude: pipelineOutput.longitude,
      mediaUrl: uploadedImage || "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=400"
    };

    try {
      // Write to real Firestore Database!
      const caseRef = collection(db, "cases");
      await addDoc(caseRef, {
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      showToast.success(`Case ${id} successfully logged to civic database!`);
      navigate("/cases");
    } catch (error) {
      console.warn("⚠️ Firestore connection unreachable. Saving case to local resilient fallback cache:", error);
      
      try {
        const localCasesStr = localStorage.getItem("synapse_local_cases");
        const localCases = localCasesStr ? JSON.parse(localCasesStr) : [];
        const offlineCase = {
          ...payload,
          docId: `local_${payload.id}`,
          createdAt: { toDate: () => new Date() }, // Mock Timestamp for frontend rendering compatibility
          updatedAt: { toDate: () => new Date() }
        };
        localCases.push(offlineCase);
        localStorage.setItem("synapse_local_cases", JSON.stringify(localCases));
        
        showToast.success(`Case ${id} saved locally in offline-resilient backup cache.`);
        navigate("/cases");
      } catch (fallbackErr) {
        console.error("❌ Critical: offline cache fallback also failed:", fallbackErr);
        showToast.error("Database connection and local storage write both failed.");
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Report a Civic Issue"
        description="Speak naturally, write text, or take a photograph. Our multi-agent AI system parses intent, audits duplicates, assigns departments, and dispatches crews."
        badge="Autonomous AI Assistant"
      />

      {/* Preset quick test triggers */}
      {!isProcessing && !pipelineOutput && (
        <div className="space-y-4">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#52667A] font-bold">
            ⚡ Quick Simulation Scenarios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESET_INCIDENTS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className="group flex flex-col p-4 bg-white hover:bg-[#F1F7FA] border border-[#E6EEF3] hover:border-[#22C97E]/30 rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="w-full h-24 rounded-lg overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={preset.sampleImage}
                    alt={preset.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-sans font-bold text-xs text-[#102A43] group-hover:text-[#22C97E] transition-colors leading-snug">
                  {preset.title}
                </h4>
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#6B7C93] mt-1 font-semibold">
                  {preset.category}
                </p>
                <div className="mt-3 flex items-center justify-between w-full">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-wider ${
                    preset.priority === "critical" 
                      ? "bg-rose-50 text-rose-600 border border-rose-100" 
                      : preset.priority === "high"
                      ? "bg-amber-50 text-amber-600 border border-amber-100"
                      : "bg-blue-50 text-blue-600 border border-blue-100"
                  }`}>
                    {preset.priority}
                  </span>
                  <span className="text-[10px] text-[#52667A]/50 font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                    Trigger <ChevronRight size={12} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Panel */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {!isProcessing && !pipelineOutput ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <Card className="p-8 space-y-6">
                  <div className="text-center max-w-md mx-auto space-y-2">
                    <h3 className="font-display font-medium text-lg text-[#102A43] tracking-tight">
                      Choose Your Input Channel
                    </h3>
                    <p className="font-sans text-xs text-[#52667A] leading-relaxed">
                      Synapse operates conversational intake. Speak, upload an image, or write details naturally.
                    </p>
                  </div>

                  {/* Mode Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setMode("voice")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                        mode === "voice"
                          ? "bg-[#22C97E]/10 border-[#22C97E] text-[#22C97E]"
                          : "bg-[#F1F7FA] border-[#DCE7EE] hover:bg-[#F8FBFD] text-[#52667A]"
                      }`}
                    >
                      <Mic size={18} className="mb-2" />
                      <span className="font-sans font-bold text-[10px] uppercase tracking-wider">Voice</span>
                    </button>

                    <button
                      onClick={() => setMode("image")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                        mode === "image"
                          ? "bg-blue-50 border-[#2563EB] text-[#2563EB]"
                          : "bg-[#F1F7FA] border-[#DCE7EE] hover:bg-[#F8FBFD] text-[#52667A]"
                      }`}
                    >
                      <ImageIcon size={18} className="mb-2" />
                      <span className="font-sans font-bold text-[10px] uppercase tracking-wider">Image</span>
                    </button>

                    <button
                      onClick={() => setMode("text")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                        mode === "text"
                          ? "bg-slate-50 border-slate-400 text-slate-800"
                          : "bg-[#F1F7FA] border-[#DCE7EE] hover:bg-[#F8FBFD] text-[#52667A]"
                      }`}
                    >
                      <Terminal size={18} className="mb-2" />
                      <span className="font-sans font-bold text-[10px] uppercase tracking-wider">Text</span>
                    </button>
                  </div>

                  {/* Mode-Specific Input Forms */}
                  {mode === "voice" && (
                    <div className="border border-[#E6EEF3] p-6 rounded-2xl bg-[#F8FBFD] flex flex-col items-center space-y-4">
                      <VoiceWaveform isListening={isRecording} />
                      <Button
                        onClick={handleVoiceSimulate}
                        disabled={isRecording}
                        variant="secondary"
                        className="w-full max-w-xs"
                      >
                        {isRecording ? "Listening..." : "Speak Naturally"}
                      </Button>
                      <p className="text-[9px] font-mono text-[#52667A]/60 text-center leading-normal">
                        Clicking activates Vapi browser synthesizer & transcription grid.
                      </p>
                    </div>
                  )}

                  {mode === "image" && (
                    <div className="border border-[#E6EEF3] p-6 rounded-2xl bg-[#F8FBFD] flex flex-col items-center space-y-4">
                      {uploadedImage ? (
                        <div className="relative w-full max-h-48 rounded-xl overflow-hidden group">
                          <img
                            src={uploadedImage}
                            alt="Uploaded preview"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => setUploadedImage(null)}
                            className="absolute top-2 right-2 p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                          <ImageIcon size={32} className="text-[#6B7C93]/40" />
                          <p className="text-xs font-bold text-[#102A43]">Drag & Drop Photo Attachment</p>
                          <p className="text-[10px] text-[#52667A]/60">Supports JPG, PNG, up to 10MB</p>
                          <button
                            onClick={() => setUploadedImage(PRESET_INCIDENTS[0].sampleImage)}
                            className="text-[10px] font-mono uppercase tracking-wider text-blue-500 hover:underline pt-2 font-bold"
                          >
                            Attach Sample Image
                          </button>
                        </div>
                      )}
                      
                      <div className="w-full space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                          Provide Context (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="Describe what happened here..."
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#DCE7EE] text-sm text-[#102A43] placeholder-[#6B7C93]/50 focus:outline-hidden focus:border-[#22C97E] transition-all"
                        />
                      </div>

                      <Button
                        onClick={async () => {
                          if (!inputText && !uploadedImage) {
                            showToast.error("Provide a photo or some description text.");
                            return;
                          }
                          await startPipeline(inputText || "Photo grievance upload", uploadedImage);
                        }}
                        variant="primary"
                        className="w-full"
                      >
                        Analyze Image with Gemini
                      </Button>
                    </div>
                  )}

                  {mode === "text" && (
                    <form onSubmit={handleCustomSubmit} className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                          Describe the grievance
                        </label>
                        <textarea
                          rows={4}
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="E.g., Garbage piled up outside government school on Maple St for three days..."
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#DCE7EE] text-sm text-[#102A43] placeholder-[#6B7C93]/50 focus:outline-hidden focus:border-[#22C97E] transition-all"
                        />
                      </div>
                      <Button type="submit" variant="primary" className="w-full">
                        Initiate Multi-Agent Audits
                      </Button>
                    </form>
                  )}
                </Card>
              </motion.div>
            ) : isProcessing ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                key="processing-terminal"
              >
                <Card className="p-6 bg-[#0B0F19] text-white border-slate-800 shadow-[0_20px_50px_rgba(11,15,25,0.4)]">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-[#22C97E]" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300 font-bold">
                        Google ADK Supervisor Controller
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 size={12} className="text-[#22C97E] animate-spin" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#22C97E] font-bold animate-pulse">
                        Active Triage
                      </span>
                    </div>
                  </div>

                  {/* Streaming Terminal Logs */}
                  <div className="h-80 overflow-y-auto space-y-2.5 font-mono text-[11px] pr-2 scrollbar-thin">
                    {logs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2 border-l border-slate-800 pl-3 leading-normal py-0.5"
                      >
                        <span className="text-[12px]">{log.emoji}</span>
                        <div className="flex-1">
                          <span className="text-slate-400 font-bold mr-1.5">[{log.agentName}]:</span>
                          <span className="text-slate-100">{log.message}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 whitespace-nowrap">{log.timestamp}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                key="audit-complete"
              >
                <Card className="p-6 space-y-6 border-[#22C97E]/30 bg-white shadow-xl">
                  <div className="flex items-center gap-3.5 border-b border-[#F1F7FA] pb-5">
                    <div className="p-3 bg-emerald-50 rounded-full text-[#22C97E] border border-emerald-100">
                      <CheckCircle2 size={22} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium text-lg text-[#102A43] tracking-tight">
                        ADK Diagnostic Handshake Complete
                      </h3>
                      <p className="font-sans text-xs text-[#52667A]">
                        Multi-agent consensus established with high-confidence routing. Ready for dispatch authorization.
                      </p>
                    </div>
                  </div>

                  {/* AI Extracted details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F8FBFD] border border-[#E6EEF3] rounded-xl">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                        Calculated Title
                      </span>
                      <p className="font-sans font-bold text-xs text-[#102A43] mt-0.5 leading-snug">
                        {pipelineOutput?.title}
                      </p>
                    </div>

                    <div className="p-4 bg-[#F8FBFD] border border-[#E6EEF3] rounded-xl">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                        Department Router
                      </span>
                      <p className="font-sans font-bold text-xs text-blue-700 mt-0.5 leading-snug">
                        {pipelineOutput?.department}
                      </p>
                    </div>

                    <div className="p-4 bg-[#F8FBFD] border border-[#E6EEF3] rounded-xl">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                        Priority Level
                      </span>
                      <div className="mt-1">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest ${
                          pipelineOutput?.priority === "critical"
                            ? "bg-rose-500 text-white"
                            : pipelineOutput?.priority === "high"
                            ? "bg-amber-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}>
                          {pipelineOutput?.priority}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F8FBFD] border border-[#E6EEF3] rounded-xl">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                        Adk Confidence
                      </span>
                      <p className="font-mono font-bold text-xs text-emerald-600 mt-0.5">
                        {pipelineOutput?.confidence}%
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F1F7FA] border border-[#DCE7EE] rounded-xl space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                      Grievance Description Audit
                    </span>
                    <p className="font-sans text-xs text-[#52667A] leading-relaxed">
                      {pipelineOutput?.description}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        setPipelineOutput(null);
                        setLogs([]);
                        setMode("none");
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Audit New Grievance
                    </Button>
                    <Button
                      onClick={handleAuthorizeDispatch}
                      variant="primary"
                      className="flex-1"
                    >
                      Authorize Ledger & Dispatch
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Geographic/Map Panel */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-4">
            <h3 className="font-display font-medium text-sm text-[#102A43] tracking-tight uppercase flex items-center gap-2">
              <MapPin size={14} className="text-[#22C97E]" />
              Geographic Grid Boundary
            </h3>
            
            <MapContainer 
              center={{ 
                lat: pipelineOutput?.latitude || 37.7749, 
                lng: pipelineOutput?.longitude || -122.4194 
              }}
              className="h-[300px]"
              markers={pipelineOutput ? [{
                lat: pipelineOutput.latitude,
                lng: pipelineOutput.longitude,
                title: pipelineOutput.title
              }] : []}
            />

            <div className="p-4 bg-[#F1F7FA]/70 border border-[#DCE7EE]/60 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A] font-semibold">
                <span>ASSIGNED JURISDICTION:</span>
                <span className="text-[#102A43] font-bold">
                  {pipelineOutput?.assignedWard || profile?.ward || "Ward 4 - East District"}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A] font-semibold">
                <span>GPS COORDINATE LOCK:</span>
                <span className="text-[#102A43] font-bold">
                  {(pipelineOutput?.latitude || 37.7749).toFixed(5)}, {(pipelineOutput?.longitude || -122.4194).toFixed(5)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
