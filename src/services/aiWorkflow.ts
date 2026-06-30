// AI multi-agent workflow simulation engine representing Google ADK & Gemini
export interface AgentLog {
  agentName: string;
  emoji: string;
  message: string;
  timestamp: string;
}

export interface AICaseOutput {
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  assignedWard: string;
  department: string;
  latitude: number;
  longitude: number;
  confidence: number;
  logs: AgentLog[];
}

export const PRESET_INCIDENTS = [
  {
    id: "pothole",
    title: "Main Street Deep Pothole",
    description: "Deep 12-inch structural pothole in the middle of Main St, causing vehicles to swerve into oncoming traffic.",
    category: "Asphalt & Road Hazards",
    priority: "high" as const,
    assignedWard: "Ward 4 - East District",
    department: "Bureau of Highways & Infrastructure",
    latitude: 37.7749,
    longitude: -122.4194,
    confidence: 97.8,
    sampleImage: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "sewage",
    title: "Sewage Overflow & Manhole Failure",
    description: "Sewage bubbling up from a damaged storm drain near Cherry St apartments. Strong sewage smell posing direct environmental hazard.",
    category: "Sanitation & Sewer Control",
    priority: "critical" as const,
    assignedWard: "Ward 4 - East District",
    department: "Water Reclamation & Sewer Division",
    latitude: 37.7833,
    longitude: -122.4167,
    confidence: 98.5,
    sampleImage: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "streetlight",
    title: "Damaged Public Streetlight Grid",
    description: "Three consecutive high-mast streetlights failed entirely on Maple St, creating a severe dark zone and reducing pedestrian security.",
    category: "Power Grids & Public Lighting",
    priority: "medium" as const,
    assignedWard: "Ward 2 - Central District",
    department: "Municipal Utility & Grid Services",
    latitude: 37.7699,
    longitude: -122.4468,
    confidence: 95.2,
    sampleImage: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "garbage",
    title: "Illegal Trash Dumping & Waste Accrual",
    description: "Overwhelming pile of commercial plastics, old furniture, and garbage bags dumped in the vacant public lot behind the high school.",
    category: "Environmental Health & Litter",
    priority: "medium" as const,
    assignedWard: "Ward 4 - East District",
    department: "Solid Waste Management Bureau",
    latitude: 37.7599,
    longitude: -122.4368,
    confidence: 96.4,
    sampleImage: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400"
  }
];

export async function runMultiAgentPipeline(
  input: string,
  onLogUpdate: (logs: AgentLog[]) => void
): Promise<AICaseOutput> {
  const logs: AgentLog[] = [];
  const addLog = (agentName: string, emoji: string, message: string) => {
    const time = new Date().toLocaleTimeString();
    logs.push({ agentName, emoji, message, timestamp: time });
    onLogUpdate([...logs]);
  };

  // Determine which preset matches the user input, or fallback to auto-generated details
  const inputLower = input.toLowerCase();
  let matched = PRESET_INCIDENTS.find(
    p => inputLower.includes(p.id) || inputLower.includes(p.title.toLowerCase().split(" ")[0]) || inputLower.includes("garbage") && p.id === "garbage" || inputLower.includes("sewer") && p.id === "sewage" || inputLower.includes("pothole") && p.id === "pothole" || inputLower.includes("light") && p.id === "streetlight"
  ) || PRESET_INCIDENTS[0];

  // Step 1: Citizen Intake Agent starts
  addLog("Supervisor Agent", "👑", "Google ADK orchestrator initialized. Starting intake analysis protocol.");
  await sleep(600);
  
  addLog("Citizen Intake Agent", "📞", `Transcribing voice or parsing text input: "${input.substring(0, 60)}..."`);
  await sleep(700);

  addLog("Citizen Intake Agent", "📞", "Intent matched: CIVIC_GRIEVANCE_REGISTRATION. Parsing dialect & severity metrics.");
  await sleep(500);

  // Step 2: Validation Agent
  addLog("Validation Agent", "🛡️", "Executing sensory logic. Parsing image pixels & verifying structural attributes.");
  await sleep(800);

  addLog("Validation Agent", "🛡️", `Verification verified with ${matched.confidence}% confidence score. Valid street-level emergency.`);
  await sleep(600);

  // Step 3: Duplicate Detection
  addLog("Duplicate Detection Agent", "🔍", "Scanning ward clusters & Firestore case matrices for duplicate tickets.");
  await sleep(700);

  addLog("Duplicate Detection Agent", "🔍", "No matching active ticket found within a 500-meter GPS radius. Triage authorized.");
  await sleep(500);

  // Step 4: Authority Mapping
  addLog("Authority Mapping Agent", "🏢", "Querying AlloyDB civic knowledge graph for regional municipal boundaries.");
  await sleep(900);

  addLog(
    "Authority Mapping Agent",
    "🏢",
    `Matched jurisdiction: ${matched.assignedWard} -> Routed to: '${matched.department}'`
  );
  await sleep(600);

  // Step 5: Priority & Escalation Agent
  addLog("Priority Agent", "🚨", `Assessing incident safety impact score. Grade Calculated: ${matched.priority.toUpperCase()}`);
  await sleep(700);

  addLog("Escalation Agent", "📈", `SLA response window configured: ${matched.priority === "critical" ? "4 Hours" : "24 Hours"}`);
  await sleep(500);

  // Step 6: Final payload assembly
  addLog("Notification Agent", "🔗", "Assembled automated resident timeline feed and configured Twilio webhook trigger.");
  await sleep(600);

  addLog("Analytics Agent", "📊", "BigQuery telemetry payload compiled. Ward Health metrics queued for real-time aggregation.");
  await sleep(400);

  addLog("Supervisor Agent", "👑", "Multi-agent ledger dispatch cycle complete. Awaiting user final verification.");

  return {
    title: matched.title,
    description: matched.description,
    category: matched.category,
    priority: matched.priority,
    assignedWard: matched.assignedWard,
    department: matched.department,
    latitude: matched.latitude,
    longitude: matched.longitude,
    confidence: matched.confidence,
    logs
  };
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
