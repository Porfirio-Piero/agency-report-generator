"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Clock, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Play
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-violet-400" />,
      title: "5-Minute Setup",
      description: "Connect your platforms and generate your first report in under 5 minutes. No technical knowledge required."
    },
    {
      icon: <Clock className="h-6 w-6 text-cyan-400" />,
      title: "Automated Weekly Reports",
      description: "Wake up to beautiful client reports in your inbox every Monday at 6 AM. No more Monday morning data entry."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-pink-400" />,
      title: "All Your Platforms",
      description: "Google Analytics, Facebook Ads, Instagram, LinkedIn Ads — all in one place, one report."
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-400" />,
      title: "Client-Ready PDFs",
      description: "Beautiful, branded PDFs ready to send. Add your logo, colors, and custom messaging."
    }
  ];

  const metrics = [
    { label: "Hours Saved Per Year", value: "300+", icon: <Clock className="h-5 w-5" /> },
    { label: "Setup Time", value: "5 min", icon: <Zap className="h-5 w-5" /> },
    { label: "Platforms Supported", value: "5+", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Satisfaction Rate", value: "98%", icon: <CheckCircle2 className="h-5 w-5" /> }
  ];

  const testimonials = [
    {
      quote: "I wasted 300+ hours over 18 months doing this manually. The setup took 3 hours. I could've saved myself months of Monday mornings.",
      author: "Marketing Agency Owner",
      role: "10-person agency"
    },
    {
      quote: "Clients started getting reports at 6 AM instead of whenever I got around to it. They thought I was incredibly organized.",
      author: "Digital Marketing Consultant",
      role: "Freelancer"
    }
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for freelancers and small agencies",
      features: [
        "Up to 10 clients",
        "3 platforms per client",
        "Weekly automated reports",
        "Email delivery",
        "Basic branding"
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Agency",
      price: "$79",
      period: "/month",
      description: "For growing agencies with more clients",
      features: [
        "Up to 50 clients",
        "All platforms",
        "Weekly automated reports",
        "Email delivery + BCC",
        "Custom branding",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large agencies with custom needs",
      features: [
        "Unlimited clients",
        "All platforms + API access",
        "Custom report templates",
        "White-label options",
        "Dedicated support"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 gradient-mesh opacity-50 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center glow">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">ReportGen</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="#testimonials" className="text-zinc-400 hover:text-white transition-colors">Testimonials</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">Login</Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 pb-24 lg:px-12 lg:pt-24 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-violet-500/10 text-violet-300 border-violet-500/20">
            ✨ Save 300+ hours per year
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Stop wasting your{" "}
            <span className="text-gradient">Monday mornings</span>{" "}
            on reports
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Automatically generate beautiful client reports from Google Analytics, Facebook Ads, Instagram, and LinkedIn. 
            Wake up to reports in your inbox every Monday at 6 AM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0 px-8 h-14 text-lg glow">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 px-8 h-14 text-lg">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          {metrics.map((metric) => (
            <div key={metric.label} className="glass rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-2 text-violet-400">
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-zinc-400">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to automate reports
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Focus on strategy, not data entry. We handle the tedious work so you can grow your agency.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="glass border-zinc-800 hover:border-violet-500/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-24 lg:px-12 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What agency owners are saying
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="glass border-zinc-800">
                <CardContent className="pt-6">
                  <p className="text-lg text-zinc-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{testimonial.author}</div>
                      <div className="text-sm text-zinc-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 px-6 py-24 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-zinc-400">
              Start free. Upgrade when you're ready.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative glass border-zinc-800 ${plan.popular ? 'border-violet-500 ring-2 ring-violet-500/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-pink-600 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-white">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-400">{plan.period}</span>
                  </div>
                  <CardDescription className="text-zinc-400 mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle2 className="h-5 w-5 text-violet-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0' : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700'}`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-8 md:p-12 border border-zinc-800">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to reclaim your Monday mornings?
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              Join 500+ agencies who automated their reporting workflow.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white border-0 px-12 h-14 text-lg glow">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-zinc-500">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 lg:px-12 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-white">ReportGen</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-sm text-zinc-500">
            © 2026 ReportGen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}