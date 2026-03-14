import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Link2, MoreVertical, Trash2 } from "lucide-react";

export default async function ClientsPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  // Mock clients - will be replaced with real data from database
  const clients = [
    { id: "1", name: "Acme Corp", email: "reports@acme.com", platforms: ["Google Analytics", "Facebook Ads", "LinkedIn Ads"], status: "active" },
    { id: "2", name: "TechStart Inc", email: "marketing@techstart.io", platforms: ["Google Analytics", "Facebook Ads"], status: "active" },
    { id: "3", name: "Growth Labs", email: "team@growthlabs.com", platforms: ["Google Analytics"], status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Clients</h1>
            <p className="text-zinc-400 mt-1">Manage your client accounts and platform connections.</p>
          </div>
          <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="glass border-zinc-800">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                    <p className="text-zinc-400 text-sm">{client.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${client.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                      {client.status}
                    </span>
                    <button className="p-1 hover:bg-zinc-800 rounded">
                      <MoreVertical className="h-4 w-4 text-zinc-400" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-zinc-400 text-sm font-medium">Connected Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {client.platforms.map((platform) => (
                      <span key={platform} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm">
                        <Link2 className="h-3 w-3" />
                        {platform}
                      </span>
                    ))}
                    {client.platforms.length < 3 && (
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-zinc-700 text-zinc-500 text-sm hover:border-zinc-500 hover:text-zinc-400 transition-colors">
                        <Plus className="h-3 w-3" />
                        Connect Platform
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-800">
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    View Reports
                  </Button>
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {clients.length === 0 && (
          <Card className="glass border-zinc-800">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="h-16 w-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-violet-400" />
              </div>
              <h3 className="text-white font-medium mb-2">No clients yet</h3>
              <p className="text-zinc-400 text-sm mb-4">Add your first client to start generating reports.</p>
              <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white">
                Add Your First Client
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}