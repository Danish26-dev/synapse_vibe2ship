import React, { useEffect, useState } from "react";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../../../contexts/FirebaseProvider";
import { useAuth } from "../../../contexts/AuthContext";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import MapContainer from "../../../components/ui/MapContainer";
import { showToast } from "../../../components/ui/Toast";
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Building, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  X,
  FileText
} from "lucide-react";

interface CaseItem {
  id: string;
  docId: string;
  title: string;
  description: string;
  status: "reported" | "dispatched" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignedWard: string;
  category: string;
  mediaUrl?: string;
  department: string;
  latitude: number;
  longitude: number;
  createdAt: any;
  reporterName?: string;
}

export default function Cases() {
  const { profile } = useAuth();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  useEffect(() => {
    if (!profile?.uid) return;

    // Set up a real-time snapshot listener on the cases collection!
    const casesRef = collection(db, "cases");
    const q = query(
      casesRef,
      where("reporterId", "==", profile.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const casesList: CaseItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        casesList.push({
          docId: docSnap.id,
          id: data.id,
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          assignedWard: data.assignedWard,
          category: data.category,
          mediaUrl: data.mediaUrl,
          department: data.department,
          latitude: data.latitude,
          longitude: data.longitude,
          createdAt: data.createdAt,
          reporterName: data.reporterName
        });
      });
      setCases(casesList);
      setLoading(false);
    }, (error) => {
      console.error("Snapshot error:", error);
      // Fallback to load all if composite index is still building
      const qFallback = query(casesRef, orderBy("createdAt", "desc"));
      const unsubFallback = onSnapshot(qFallback, (snapshot) => {
        const casesList: CaseItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.reporterId === profile.uid) {
            casesList.push({
              docId: docSnap.id,
              id: data.id,
              title: data.title,
              description: data.description,
              status: data.status,
              priority: data.priority,
              assignedWard: data.assignedWard,
              category: data.category,
              mediaUrl: data.mediaUrl,
              department: data.department,
              latitude: data.latitude,
              longitude: data.longitude,
              createdAt: data.createdAt,
              reporterName: data.reporterName
            });
          }
        });
        setCases(casesList);
        setLoading(false);
      });
      return () => unsubFallback();
    });

    return () => unsubscribe();
  }, [profile?.uid]);

  const handleVerifyResolution = async (caseDocId: string) => {
    try {
      const docRef = doc(db, "cases", caseDocId);
      await updateDoc(docRef, {
        status: "closed",
        updatedAt: serverTimestamp()
      });
      showToast.success("Thank you! You verified the resolution. Case is officially closed.");
      // Update selected modal view state
      if (selectedCase && selectedCase.docId === caseDocId) {
        setSelectedCase(prev => prev ? { ...prev, status: "closed" } : null);
      }
    } catch (err) {
      console.error("Verification failed:", err);
      showToast.error("Database mismatch error.");
    }
  };

  const getStatusStyle = (status: string) => {
    const styles = {
      reported: "bg-blue-50 text-blue-600 border border-blue-100",
      dispatched: "bg-purple-50 text-purple-600 border border-purple-100",
      in_progress: "bg-amber-50 text-amber-600 border border-amber-100",
      resolved: "bg-emerald-50 text-emerald-600 border border-emerald-100 animate-pulse",
      closed: "bg-slate-50 text-slate-500 border border-slate-100"
    };
    return styles[status as keyof typeof styles] || styles.reported;
  };

  const getPriorityStyle = (priority: string) => {
    const styles = {
      low: "bg-slate-100 text-slate-700",
      medium: "bg-blue-50 text-blue-700",
      high: "bg-amber-50 text-amber-800 font-bold",
      critical: "bg-rose-50 text-rose-800 font-bold"
    };
    return styles[priority as keyof typeof styles] || styles.low;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#DCE7EE] border-t-[#22C97E] animate-spin" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#52667A]">Querying Ledgers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="My Submitted Grievances"
        description="Monitor status indices, audit active dispatch workflows, and confirm municipal completion reports in real time."
        badge="Residents Ledger"
      />

      {cases.length === 0 ? (
        <EmptyState
          title="No Active Grievance Tickets"
          description="Your profile hasn't logged any cases. Start an AI-assisted intake report to record your first street issue."
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* List of cases */}
          <div className="xl:col-span-2 space-y-4">
            {cases.map((item) => (
              <button
                key={item.docId}
                onClick={() => setSelectedCase(item)}
                className={`w-full text-left p-6 bg-white border rounded-2xl transition-all hover:shadow-md cursor-pointer flex gap-4 ${
                  selectedCase?.docId === item.docId 
                    ? "border-[#22C97E] ring-3 ring-[#22C97E]/5" 
                    : "border-[#E6EEF3] hover:border-[#DCE7EE]"
                }`}
              >
                {item.mediaUrl && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 hidden sm:block bg-slate-100 border border-[#E6EEF3]">
                    <img 
                      src={item.mediaUrl} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[9px] text-[#52667A] font-bold tracking-widest uppercase">
                      ID: {item.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                        {item.status.replace("_", " ")}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest ${getPriorityStyle(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-sm text-[#102A43] tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  
                  <p className="font-sans text-xs text-[#52667A] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#52667A] font-medium border-t border-[#F1F7FA]">
                    <span className="flex items-center gap-1.5 font-bold uppercase font-mono text-[9px] text-blue-700">
                      <Building size={11} /> {item.department}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold">
                      <MapPin size={11} className="text-[#22C97E]" /> {item.assignedWard}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed tracking view */}
          <div className="space-y-6">
            {selectedCase ? (
              <Card className="p-6 space-y-6 border-[#E6EEF3] sticky top-6">
                <div className="flex justify-between items-start border-b border-[#F1F7FA] pb-4">
                  <div>
                    <span className="font-mono text-[9px] text-[#52667A] font-bold tracking-widest">
                      CASE LEDGER: {selectedCase.id}
                    </span>
                    <h3 className="font-display font-bold text-[#102A43] text-sm tracking-tight leading-snug mt-1">
                      {selectedCase.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    <X size={16} className="text-slate-400" />
                  </button>
                </div>

                {/* Progress Status Timeline */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                    📡 ADK Case Timeline
                  </h4>
                  
                  <div className="relative pl-6 space-y-5 border-l-2 border-[#DCE7EE]">
                    {/* Reported */}
                    <div className="relative">
                      <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-white bg-blue-500 shadow-sm" />
                      <div className="text-xs">
                        <strong className="text-[#102A43]">Ticket Recorded</strong>
                        <p className="text-[10px] text-[#52667A] mt-0.5">Assigned to regional dispatch</p>
                      </div>
                    </div>

                    {/* Dispatched */}
                    <div className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                        ["dispatched", "in_progress", "resolved", "closed"].includes(selectedCase.status)
                          ? "bg-purple-500"
                          : "bg-slate-200"
                      }`} />
                      <div className="text-xs">
                        <strong className={["dispatched", "in_progress", "resolved", "closed"].includes(selectedCase.status) ? "text-[#102A43]" : "text-slate-400"}>
                          Autonomous ADK Audit
                        </strong>
                        <p className="text-[10px] text-[#52667A] mt-0.5">Matched with department boundary mapping</p>
                      </div>
                    </div>

                    {/* In Progress */}
                    <div className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                        ["in_progress", "resolved", "closed"].includes(selectedCase.status)
                          ? "bg-amber-500"
                          : "bg-slate-200"
                      }`} />
                      <div className="text-xs">
                        <strong className={["in_progress", "resolved", "closed"].includes(selectedCase.status) ? "text-[#102A43]" : "text-slate-400"}>
                          Engineering Dispatch Active
                        </strong>
                        <p className="text-[10px] text-[#52667A] mt-0.5">Operations squad is active on-site</p>
                      </div>
                    </div>

                    {/* Resolved */}
                    <div className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                        ["resolved", "closed"].includes(selectedCase.status)
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }`} />
                      <div className="text-xs">
                        <strong className={["resolved", "closed"].includes(selectedCase.status) ? "text-[#102A43]" : "text-slate-400"}>
                          Squad Work Completed
                        </strong>
                        <p className="text-[10px] text-[#52667A] mt-0.5">Structure repaired. Awaiting resident verification.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification section */}
                {selectedCase.status === "resolved" && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3.5">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="text-emerald-700 shrink-0 mt-0.5" size={16} />
                      <div className="space-y-0.5">
                        <h4 className="font-sans font-bold text-xs text-emerald-950">Verify Public Completion</h4>
                        <p className="font-sans text-[11px] text-emerald-800 leading-normal">
                          The regional engineering department has completed repairing this issue. Please verify work to close the ticket loop.
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleVerifyResolution(selectedCase.docId)}
                      variant="secondary"
                      className="w-full text-center py-2.5 text-[10px] tracking-wider"
                    >
                      Verify Resolution & Close Case
                    </Button>
                  </div>
                )}

                {/* Case Info Grid */}
                <div className="space-y-3 pt-4 border-t border-[#F1F7FA]">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]">
                    <span>DEPARTMENT ASSIGNED:</span>
                    <strong className="text-blue-700 uppercase">{selectedCase.department}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]">
                    <span>SEVERITY PROFILE:</span>
                    <span className="font-bold text-[#102A43] uppercase">{selectedCase.priority}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]">
                    <span>COMMUNITY TRUST RATIO:</span>
                    <span className="font-bold text-emerald-600">99.4%</span>
                  </div>
                </div>

                {/* Map */}
                <MapContainer 
                  center={{ lat: selectedCase.latitude, lng: selectedCase.longitude }}
                  className="h-[180px]"
                  markers={[{
                    lat: selectedCase.latitude,
                    lng: selectedCase.longitude,
                    title: selectedCase.title
                  }]}
                />
              </Card>
            ) : (
              <Card className="p-8 text-center border-dashed border-[#DCE7EE] bg-[#F1F7FA]/30 flex flex-col items-center justify-center space-y-3 h-[400px]">
                <div className="p-3 bg-white rounded-full border border-[#DCE7EE] text-[#52667A] shadow-xs">
                  <FileText size={20} />
                </div>
                <h4 className="font-display font-medium text-xs text-[#102A43] tracking-tight uppercase">
                  Select a Case
                </h4>
                <p className="font-sans text-[11px] text-[#52667A] max-w-xs leading-normal">
                  Click on any case on the left grid panel to view active ADK agent telemetry logs, dispatch stages, and close the loop.
                </p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
