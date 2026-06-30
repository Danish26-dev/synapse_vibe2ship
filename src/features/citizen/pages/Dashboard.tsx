import React from "react";
import PageHeader from "../../../components/ui/PageHeader";
import EmptyState from "../../../components/ui/EmptyState";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Civic Dispatch Control"
        description="Monitor root causes, file complaints, and track resolved municipal tickets."
        badge="Citizen Control Desk"
        actions={
          <Button size="sm" variant="secondary" onClick={() => navigate("/report")}>
            <Plus size={12} className="stroke-[3]" />
            Report Issue
          </Button>
        }
      />

      <EmptyState
        title="No Incidents Registered"
        description="Your localized ward is currently running at optimal efficiency. Register active street grievances to file live investigations."
        action={
          <Button variant="outline" size="sm" onClick={() => navigate("/report")}>
            File Incident Report
          </Button>
        }
      />
    </div>
  );
}
