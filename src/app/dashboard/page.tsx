import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  // Mock data - will be replaced with real data from database
  const stats = [
    { label: "Active Clients", value: "12", icon: <Users className="h-5 w-5" />, change: "+2" },
    { label: "Reports This Week", value: "48", icon: <FileText className="h-5 w-5" />, change: "+12" },
    { label: "Time Saved", value: "24h", icon: <Clock className="h-5 w-5" />, change: "this week" },
    { label: "Delivered", value: "100%", icon: <CheckCircle2 className="h-5 w-5" />, change: "on time" },
  ];

  const recentReports = [
    { client: "Acme Corp", date: "2026-03-14", status: "sent", platforms: ["GA", "FB", "LI"] },
    { client: "TechStart Inc", date: "2026-03-14", status: "sent", platforms: ["GA", "FB"] },
    { client: "Growth Labs", date: "2026-03-14", status: "pending", platforms: ["GA"] },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Welcome back! Here's your reporting overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass border-zinc-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-sm text-emerald-400 mt-1">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card className="glass border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Client</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Platforms</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-zinc-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report, i) => (
                    <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{report.client}</td>
                      <td className="py-4 px-4 text-zinc-400">{report.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          {report.platforms.map((p) => (
                            <span key={p} className="px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300">{p}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${report.status === "sent" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="text-violet-400 hover:text-violet-300 text-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass border-zinc-800 hover:border-violet-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4 text-violet-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-white font-medium mb-1">Add Client</h3>
              <p className="text-zinc-400 text-sm">Connect a new client account</p>
            </CardContent>
          </Card>
          <Card className="glass border-zinc-800 hover:border-violet-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center mx-auto mb-4 text-pink-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-white font-medium mb-1">Generate Report</h3>
              <p className="text-zinc-400 text-sm">Create a report manually</p>
            </CardContent>
          </Card>
          <Card className="glass border-zinc-800 hover:border-violet-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-white font-medium mb-1">View Analytics</h3>
              <p className="text-zinc-400 text-sm">See performance trends</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}