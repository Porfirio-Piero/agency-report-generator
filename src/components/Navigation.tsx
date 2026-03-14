"use client";

// Mock navigation for testing without Clerk
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export function Navigation() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ReportGen</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Dashboard
              </Link>
              <Link href="/clients" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Clients
              </Link>
              <Link href="/reports" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Reports
              </Link>
              <Link href="/settings" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}