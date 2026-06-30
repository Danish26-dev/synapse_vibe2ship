import React from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import Button from "../../../components/ui/Button";
import MapContainer from "../../../components/ui/MapContainer";
import { showToast } from "../../../components/ui/Toast";

export default function Report() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast.success("Complaint recorded. Waiting for backend ledger dispatch.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="File Civic Complaint"
        description="Register a high-fidelity civic issue. Our neural system matches GPS coordinates, schedules verification, and triggers dispatches."
        badge="Incident Reporting Wizard"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="space-y-4">
          <h3 className="font-display font-medium text-lg text-[#102A43] tracking-tight">
            Incident Ledger Form
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Issue Summary" placeholder="E.g., Deep sewer leakage, failed street light..." required />
            <Textarea label="Incident Details & Context" placeholder="Provide details about size, hazards, or frequency..." rows={5} required />
            <Button type="submit" variant="primary">
              Submit Ticket to Dispatch
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          <h3 className="font-display font-medium text-lg text-[#102A43] tracking-tight">
            Geographic Boundary Link
          </h3>
          <MapContainer className="h-[400px]" />
        </div>
      </div>
    </div>
  );
}
