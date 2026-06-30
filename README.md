# Synapse Civic Portal 🏙️

Welcome to the **Synapse Civic Portal**, a next-generation municipal grievance reporting and incident dispatch system designed to build an active bridge between citizens and city operations.

Synapse streamlines the reporting of public safety hazards, infrastructure degradation, and city utility issues, automatically analyzing submissions and dispatching the correct municipal engineering crews.

---

## 🌟 Key Features

### 👥 Dual-Role Architecture
1. **Citizen Access**
   - **AI-Guided Submissions**: Enter a raw civic issue description; the portal automatically extracts title, severity, category, and assigned city department.
   - **Interactive Geographic Log**: Pinpoint the precise coordinates of issues on interactive maps.
   - **Community Handshake Verification**: Verify that a completed engineering fix meets citizen standards to officially close the case.

2. **Authority / Operations Lead Access**
   - **Active Dispatch Queue**: Review newly reported grievances, authorize schedules, and dispatch municipal engineering squads.
   - **Departmental Workload Analytics**: View visual breakdowns of incident densities, response speeds, and active ward distributions.
   - **Real-time Status Management**: Track incidents through stages: `Reported` ➔ `Dispatched` ➔ `In Progress` ➔ `Resolved` ➔ `Closed`.

---

## 🛡️ Robust Resilience Engineering

To guarantee 100% operational availability during real-world civic emergencies and sandbox development, Synapse features advanced architectural fallback layers:

### 📶 Offline-Resilient Local Fallback
If the portal experiences network interruptions or fails to reach the Cloud Firestore database backend:
- **Zero-Block Case Reporting**: Submitting an issue seamlessly routes the payload to an offline-resilient local storage cache.
- **Continuous Local Dispatch & Closure**: Actions like approving dispatches, advancing crew statuses, or confirming citizen handshakes are stored locally and instantly updated in the UI.
- **Unified Local & Cloud States**: The applet automatically aggregates Firestore collections with local offline session records, showing a beautifully merged, sorted timeline.

### 🔑 Restricted Environment Demo Sign-In
In sandbox environments where Firebase Anonymous Sign-In or Google SSO might be restricted:
- **Automatic Simulation Mode**: If Firebase rejects an anonymous session, Synapse detects the restriction instantly.
- **Fully Formed Virtual Accounts**: The auth engine generates a resilient, secure mock citizen or authority profile so users can explore and test the entire app without friction.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite (Fast Build Cycle)
- **Styling**: Tailwind CSS (Fluid Layouts, Modern Aesthetics)
- **Animation**: Motion / React (Organic transitions, interactive modal feedback)
- **Backend / DB**: Firebase Firestore & Firebase Authentication
- **Data Visualization**: Recharts / D3 (Rich analytical dashboards and workload graphs)

---

## 🚀 Running the App Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```
