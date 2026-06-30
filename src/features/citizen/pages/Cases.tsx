import React from "react";
import PageHeader from "../../../components/ui/PageHeader";
import EmptyState from "../../../components/ui/EmptyState";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Cases() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Logged Incidents"
        description="Review updates on your submitted tickets, active dispatches, and verification reports."
        badge="Activity Logs"
      />

      <EmptyState
        title="No Historic Activity Record"
        description="You have not submitted any municipal tickets to the distributed ledger yet."
        action={
          <Button variant="primary" size="sm" onClick={() => navigate("/report")}>
            Register Your First Case
          </Button>
        }
      />
    </div>
  );
}
