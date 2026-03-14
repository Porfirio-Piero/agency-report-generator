"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { BarChart3, Clients, Settings, FileText, Bell } from "lucide-react";

export function Navigation() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white hidden sm:block">ReportGen</span>
            </Link>
            <SignedIn>
              <div className="flex items-center gap-6">
                <NavLink href="/dashboard" icon={<BarChart3 className="h-4 w-4" />}>
                  Dashboard
                </NavLink>
                <NavLink href="/clients" icon={<Clients className="h-4 w-4" />}>
                  Clients
                </NavLink>
                <NavLink href="/reports" icon={<FileText className="h-4 w-4" />}>
                  Reports
                </NavLink>
                <NavLink href="/settings" icon={<Settings className="h-4 w-4" />}>
                  Settings
                </NavLink>
              </div>
            </SignedIn>
          </div>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ 
  href, 
  icon, 
  children 
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}