import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Bell, Palette, Clock, Users, Link2 } from "lucide-react";

export default async function SettingsPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-zinc-400 mt-1">Manage your account and preferences.</p>
        </div>

        <div className="space-y-6">
          {/* Agency Settings */}
          <Card className="glass border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Agency Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-zinc-400 text-sm block mb-2">Agency Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-violet-500 focus:outline-none"
                  placeholder="Your Agency Name"
                />
              </div>
              <div>
                <label className="text-zinc-400 text-sm block mb-2">Logo URL</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-violet-500 focus:outline-none"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div>
                <label className="text-zinc-400 text-sm block mb-2">Primary Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    className="h-10 w-10 rounded cursor-pointer"
                    defaultValue="#8b5cf6"
                  />
                  <input 
                    type="text" 
                    className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
                    defaultValue="#8b5cf6"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Settings */}
          <Card className="glass border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Delivery Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 text-sm block mb-2">Delivery Day</label>
                  <select className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-violet-500 focus:outline-none">
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 text-sm block mb-2">Delivery Time</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-violet-500 focus:outline-none"
                    defaultValue="06:00"
                  />
                </div>
              </div>
              <div>
                <label className="text-zinc-400 text-sm block mb-2">Timezone</label>
                <select className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-violet-500 focus:outline-none">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Connected Platforms */}
          <Card className="glass border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Connected Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <span className="text-xl">📊</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Google Analytics</p>
                      <p className="text-zinc-400 text-sm">Connect to pull website metrics</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-700">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                      <span className="text-xl">📘</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Facebook Ads</p>
                      <p className="text-zinc-400 text-sm">Includes Instagram Ads</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-700">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-700/10 flex items-center justify-center">
                      <span className="text-xl">💼</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">LinkedIn Ads</p>
                      <p className="text-zinc-400 text-sm">B2B advertising metrics</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-700">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="glass border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Email notifications</p>
                    <p className="text-zinc-400 text-sm">Receive report delivery confirmations</p>
                  </div>
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-violet-600 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Weekly summary</p>
                    <p className="text-zinc-400 text-sm">Get a summary of all reports sent</p>
                  </div>
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-violet-600 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}