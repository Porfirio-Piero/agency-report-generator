import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Send, Clock, Filter } from "lucide-react";

export default async function ReportsPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  // Mock reports - will be replaced with real data from database
  const reports = [
    { 
      id: "1", 
      client: "Acme Corp", 
      week: "Mar 8-14, 2026", 
      status: "sent",
      metrics: { impressions: "125,450", clicks: "8,234", conversions: "312", spend: "$2,450" }
    },
    { 
      id: "2", 
      client: "TechStart Inc", 
      week: "Mar 8-14, 2026", 
      status: "sent",
      metrics: { impressions: "89,230", clicks: "5,123", conversions: "198", spend: "$1,890" }
    },
    { 
      id: "3", 
      client: "Growth Labs", 
      week: "Mar 8-14, 2026", 
      status: "pending",
      metrics: { impressions: "45,120", clicks: "2,890", conversions: "87", spend: "$980" }
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Reports</h1>
            <p className="text-zinc-400 mt-1">View and manage your generated reports.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="glass border-zinc-800">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{report.client}</h3>
                    <p className="text-zinc-400 text-sm flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {report.week}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${report.status === "sent" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                    {report.status === "sent" ? "Delivered" : "Pending"}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <p className="text-zinc-400 text-xs mb-1">Impressions</p>
                    <p className="text-white font-semibold">{report.metrics.impressions}</p>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <p className="text-zinc-400 text-xs mb-1">Clicks</p>
                    <p className="text-white font-semibold">{report.metrics.clicks}</p>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <p className="text-zinc-400 text-xs mb-1">Conversions</p>
                    <p className="text-white font-semibold">{report.metrics.conversions}</p>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <p className="text-zinc-400 text-xs mb-1">Spend</p>
                    <p className="text-white font-semibold">{report.metrics.spend}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {report.status === "pending" && (
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:from-violet-500 hover:to-pink-500 transition-colors">
                      <Send className="h-4 w-4" />
                      Send Now
                    </button>
                  )}
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
                    <FileText className="h-4 w-4" />
                    Preview
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}