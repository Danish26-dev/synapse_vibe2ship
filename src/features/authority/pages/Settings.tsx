import React from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { showToast } from "../../../components/ui/Toast";

export default function AuthoritySettings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast.success("Ward metrics updated inside central ledger.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ward Configurations"
        description="Alter boundary descriptions, assign engineers, and fine-tune priority dispatch coefficients."
        badge="System Settings"
      />

      <div className="max-w-2xl">
        <Card className="p-6 md:p-8 bg-white space-y-6">
          <h3 className="font-display font-medium text-lg text-[#102A43] tracking-tight border-b border-[#F1F7FA] pb-3">
            System Operations Panel
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Regional Ward Identifier" defaultValue="WARD_04_NORTH" required />
            <Input label="Max Concurrent Dispatches" type="number" defaultValue="15" required />
            <Button type="submit" variant="primary">
              Save Operations Rules
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
