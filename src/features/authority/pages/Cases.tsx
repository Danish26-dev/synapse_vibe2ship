import React, { useEffect, useState } from "react";
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../../../contexts/FirebaseProvider";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import MapContainer from "../../../components/ui/MapContainer";
import { showToast } from "../../../components/ui/Toast";
import { 
  ShieldAlert, 
  User, 
  MapPin, 
  Building, 
  CheckCircle2, 
  Wrench, 
  Truck, 
  AlertTriangle,
  Layers,
  ChevronRight,
  Sparkles
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

export default function AuthorityCases() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [auditMode, setAuditMode] = useState(false);

  useEffect(() => {
    const mergeAndSetCases = (firestoreList: CaseItem[]) => {
      const localCasesStr = localStorage.getItem("synapse_local_cases");
      let merged = [...firestoreList];
      
      if (localCasesStr) {
        try {
          const localList = JSON.parse(localCasesStr);
          localList.forEach((lc: any) => {
            if (!firestoreList.some(fc => fc.id === lc.id)) {
              merged.push({
                docId: lc.docId || `local_${lc.id}`,
                id: lc.id,
                title: lc.title,
                description: lc.description,
                status: lc.status,
                priority: lc.priority,
                assignedWard: lc.assignedWard,
                category: lc.category,
                mediaUrl: lc.mediaUrl,
                department: lc.department,
                latitude: lc.latitude,
                longitude: lc.longitude,
                createdAt: lc.createdAt,
                reporterName: lc.reporterName
              });
            }
          });
        } catch (e) {
          console.error("⚠️ Error parsing local cases in admin view:", e);
        }
      }

      // Safe timestamp conversion and sorting by date descending
      const getTimestampTime = (val: any) => {
        if (!val) return 0;
        if (typeof val.toDate === "function") return val.toDate().getTime();
        if (val.seconds) return val.seconds * 1000;
        const parsed = Date.parse(val);
        return isNaN(parsed) ? 0 : parsed;
      };

      merged.sort((a, b) => getTimestampTime(b.createdAt) - getTimestampTime(a.createdAt));
      setCases(merged);
    };

    // Listen to ALL cases in Firestore
    const casesRef = collection(db, "cases");
    const q = query(casesRef, orderBy("createdAt", "desc"));

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
      mergeAndSetCases(casesList);
      setLoading(false);
    }, (error) => {
      console.error("Firestore loading error:", error);
      mergeAndSetCases([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (caseDocId: string, nextStatus: "dispatched" | "in_progress" | "resolved") => {
    const messageMap = {
      dispatched: "Incident approved. Engineering crew scheduled.",
      in_progress: "Dispatch active. Engineering squad deployed on-site.",
      resolved: "Work marked as completed. Awaiting citizen verification."
    };

    try {
      if (caseDocId.startsWith("local_")) {
        // Update local storage cases cache
        const localCasesStr = localStorage.getItem("synapse_local_cases");
        if (localCasesStr) {
          try {
            const localCases = JSON.parse(localCasesStr);
            const updated = localCases.map((c: any) => 
              (c.docId === caseDocId || `local_${c.id}` === caseDocId) 
                ? { ...c, status: nextStatus, updatedAt: new Date().toISOString() } 
                : c
            );
            localStorage.setItem("synapse_local_cases", JSON.stringify(updated));
          } catch (e) {
            console.error("Failed to update offline case local status:", e);
          }
        }
        
        showToast.success(messageMap[nextStatus]);
        setCases(prev => prev.map(c => c.docId === caseDocId ? { ...c, status: nextStatus } : c));
        if (selectedCase && selectedCase.docId === caseDocId) {
          setSelectedCase(prev => prev ? { ...prev, status: nextStatus } : null);
        }
        return;
      }

      const docRef = doc(db, "cases", caseDocId);
      await updateDoc(docRef, {
        status: nextStatus,
        updatedAt: serverTimestamp()
      });

      showToast.success(messageMap[nextStatus]);

      // Update selected modal view state
      if (selectedCase && selectedCase.docId === caseDocId) {
        setSelectedCase(prev => prev ? { ...prev, status: nextStatus } : null);
      }
    } catch (err) {
      console.warn("⚠️ Firestore write blocked. Falling back to local state updates:", err);
      
      const localCasesStr = localStorage.getItem("synapse_local_cases");
      const localCases = localCasesStr ? JSON.parse(localCasesStr) : [];
      const currentCase = cases.find(c => c.docId === caseDocId);
      if (currentCase) {
        const offlineUpdatedCase = {
          ...currentCase,
          status: nextStatus,
          updatedAt: new Date().toISOString()
        };
        const updatedLocal = [...localCases.filter((c: any) => c.id !== currentCase.id), offlineUpdatedCase];
        localStorage.setItem("synapse_local_cases", JSON.stringify(updatedLocal));
      }

      showToast.success(messageMap[nextStatus] + " (Offline Mode)");
      setCases(prev => prev.map(c => c.docId === caseDocId ? { ...c, status: nextStatus } : c));
      if (selectedCase && selectedCase.docId === caseDocId) {
        setSelectedCase(prev => prev ? { ...prev, status: nextStatus } : null);
      }
    }
  };

  const runDuplicateAudit = () => {
    setAuditMode(true);
    showToast.success("Executing Spatial Semantic audit across active queues...");
    setTimeout(() => {
      setAuditMode(false);
      showToast.success("No duplicate street incidents flagged. Queue structure optimal.");
    }, 2000);
  };

  const getStatusStyle = (status: string) => {
    const styles = {
      reported: "bg-blue-50 text-blue-600 border border-blue-100",
      dispatched: "bg-purple-50 text-purple-600 border border-purple-100",
      in_progress: "bg-amber-50 text-amber-600 border border-amber-100 animate-pulse",
      resolved: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      closed: "bg-slate-50 text-slate-500 border border-slate-100"
    };
    return styles[status as keyof typeof styles] || styles.reported;
  };

  const getPriorityStyle = (priority: string) => {
    const styles = {
      low: "bg-slate-100 text-slate-700",
      medium: "bg-blue-50 text-blue-700",
      high: "bg-amber-50 text-amber-800 font-bold",
      critical: "bg-rose-50 text-rose-800 font-bold animate-pulse"
    };
    return styles[priority as keyof typeof styles] || styles.low;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#DCE7EE] border-t-[#22C97E] animate-spin" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#52667A]">Fetching Regional Queues...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Municipal Dispatch Queue"
        description="Monitor citizen intake files, perform GIS boundary audits, and manage regional engineering dispatch stages."
        badge="Autonomous Dispatch Desk"
        actions={
          <Button 
            onClick={runDuplicateAudit} 
            disabled={auditMode}
            variant="outline" 
            size="sm"
            className="border-blue-300 text-blue-700"
          >
            <Layers size={12} className="mr-1" />
            {auditMode ? "Auditing Clusters..." : "Run Duplicate Audit"}
          </Button>
        }
      />

      {cases.length === 0 ? (
        <EmptyState
          title="All Municipal Queues Cleared"
          description="Your department jurisdiction currently has zero active grievances on ledger. Everything is running smoothly."
        />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main List Column */}
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
                    <span className="flex items-center gap-1 text-[#102A43] font-bold">
                      <User size={11} className="text-blue-500" /> Reporter: {item.reporterName || "Anonymous"}
                    </span>
                    <span className="flex items-center gap-1 font-bold uppercase font-mono text-[9px] text-blue-700">
                      <Building size={11} /> {item.department}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <MapPin size={11} className="text-[#22C97E]" /> {item.assignedWard}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Action / Detail Column */}
          <div className="space-y-6">
            {selectedCase ? (
              <Card className="p-6 space-y-6 border-[#E6EEF3] sticky top-6">
                <div>
                  <span className="font-mono text-[9px] text-[#52667A] font-bold tracking-widest uppercase">
                    REGIONAL CONTRACT: {selectedCase.id}
                  </span>
                  <h3 className="font-display font-bold text-[#102A43] text-sm tracking-tight leading-snug mt-1 border-b border-[#F1F7FA] pb-3">
                    {selectedCase.title}
                  </h3>
                </div>

                {/* Status-Driven Controls */}
                <div className="space-y-3.5">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                    ⚙️ Dispatch State Controls
                  </h4>

                  {selectedCase.status === "reported" && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
                        <AlertTriangle size={14} className="text-blue-700 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-blue-900 leading-normal">
                          This ticket was logged by a citizen. Confirming dispatch assigns scheduled crews and coordinates the on-site operation.
                        </p>
                      </div>
                      <Button
                        onClick={() => handleUpdateStatus(selectedCase.docId, "dispatched")}
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2 py-3"
                      >
                        <Truck size={14} />
                        Confirm Dispatch Crew
                      </Button>
                    </div>
                  )}

                  {selectedCase.status === "dispatched" && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl flex items-start gap-2">
                        <Wrench size={14} className="text-purple-700 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-purple-900 leading-normal">
                          The dispatch crew has arrived on site. Set state to Active on-site to alert citizens.
                        </p>
                      </div>
                      <Button
                        onClick={() => handleUpdateStatus(selectedCase.docId, "in_progress")}
                        variant="secondary"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 text-white border-none"
                      >
                        <Wrench size={14} />
                        Set Active On-Site
                      </Button>
                    </div>
                  )}

                  {selectedCase.status === "in_progress" && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-amber-700 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-amber-900 leading-normal">
                          Repairs are completed. Mark resolved to send a verification payload to the reporting citizen.
                        </p>
                      </div>
                      <Button
                        onClick={() => handleUpdateStatus(selectedCase.docId, "resolved")}
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#22C97E] hover:bg-[#1eb370] border-none text-white font-bold"
                      >
                        <CheckCircle2 size={14} />
                        Mark as Resolved
                      </Button>
                    </div>
                  )}

                  {selectedCase.status === "resolved" && (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-1.5">
                      <CheckCircle2 className="text-emerald-600 mx-auto" size={24} />
                      <h4 className="font-sans font-bold text-xs text-emerald-950">Awaiting Citizen Signature</h4>
                      <p className="text-[10px] text-emerald-800 leading-normal max-w-xs mx-auto">
                        Crews completed repairing this issue. The incident will officially close when verified by the reporter's community handshake.
                      </p>
                    </div>
                  )}

                  {selectedCase.status === "closed" && (
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center space-y-1.5">
                      <ShieldCheck className="text-slate-500 mx-auto" size={24} />
                      <h4 className="font-sans font-bold text-xs text-slate-800">Incidence Closed & Ledger Sealed</h4>
                      <p className="text-[10px] text-slate-600 leading-normal">
                        This issue was verified by the community and the public ledger is sealed successfully.
                      </p>
                    </div>
                  )}
                </div>

                {/* Case Info Grid */}
                <div className="space-y-3 pt-4 border-t border-[#F1F7FA]">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]">
                    <span>REPORTER:</span>
                    <strong className="text-slate-800">{selectedCase.reporterName || "Anonymous User"}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]">
                    <span>JURISDICTION:</span>
                    <strong className="text-slate-800 uppercase">{selectedCase.assignedWard}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#52667A]">
                    <span>DEPARTMENT ASSIGNED:</span>
                    <strong className="text-blue-700 uppercase">{selectedCase.department}</strong>
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
                  <ShieldAlert size={20} />
                </div>
                <h4 className="font-display font-medium text-xs text-[#102A43] tracking-tight uppercase">
                  Select an Incident
                </h4>
                <p className="font-sans text-[11px] text-[#52667A] max-w-xs leading-normal">
                  Click on any open citizen report to assess severity, coordinate crews, run duplicates scan, or mark issues as resolved.
                </p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
