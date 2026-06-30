import React from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import { BarChart3, Database, TrendingUp, Zap } from "lucide-react";

export default function AuthorityAnalytics() {
  const stats = [
    { label: "Active Tickets", value: "0", icon: <Zap size={18} className="text-amber-500" /> },
    { label: "Resolved This Week", value: "0", icon: <TrendingUp size={18} className="text-emerald-500" /> },
    { label: "BigQuery Sync Status", value: "Idle", icon: <Database size={18} className="text-blue-500" /> },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Civic Decision Intelligence"
        description="Run deep analytical queries, review automated cluster trends, and assess operational bottlenecks."
        badge="Enterprise Analytics"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="flex items-center justify-between p-6 bg-white">
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#52667A] font-bold">
                {stat.label}
              </p>
              <p className="text-2xl font-display font-medium text-[#102A43]">
                {stat.value}
              </p>
            </div>
            <div className="p-3.5 bg-[#F1F7FA] rounded-full border border-[#DCE7EE] shrink-0">
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-10 flex flex-col items-center justify-center border border-dashed border-[#DCE7EE] bg-[#F8FBFD] text-center min-h-[250px]">
        <div className="p-4 bg-white rounded-full border border-[#DCE7EE] text-[#52667A]/60 mb-4 shadow-sm animate-pulse">
          <BarChart3 size={24} />
        </div>
        <h4 className="font-display font-medium text-base text-[#102A43] tracking-tight">
          Analytical Dashboard Empty
        </h4>
        <p className="font-sans text-xs text-[#52667A] max-w-sm mt-1">
          No records found in BigQuery or AlloyDB clusters yet. Connect live instances or seed initial database schemas to populate analytical data streams.
        </p>
      </Card>
    </div>
  );
}
