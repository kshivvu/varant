import React from 'react';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative z-10 py-32 px-6 v-section"
      style={{ background: '#FAF9F7', borderTop: '1px solid rgba(26, 21, 16, 0.05)', borderBottom: '1px solid rgba(26, 21, 16, 0.05)' }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-6">
            Monetization · The Vara
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[64px] leading-tight text-[#1A1510] mb-8">
            Choose your <br />
            <span className="text-[#9B1C1C] italic">council.</span>
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-lg md:text-xl text-[#555] max-w-2xl mx-auto leading-relaxed font-light">
            Every founder gets a finite number of varas. How many will you make with clarity?
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* CARD 1 — FREE */}
          <div className="reveal varant-persona-card p-10 rounded-2xl flex flex-col h-full bg-white border border-[#E8E3DC] shadow-sm hover:shadow-md transition-all">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-full bg-[#767676]/10 flex items-center justify-center text-[#767676] mb-6">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">Vichar Free</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#1A1510]">₹0</span>
                <span className="text-[12px] text-[#767676]">/ forever</span>
              </div>
            </div>

            <div className="h-px w-full varant-jali-border mb-8"></div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "3 Vichars per month",
                "Full Sabha access",
                "Pratham Paksha + Khandana",
                "Nirnaya verdict",
                "No Smriti (History)",
                "No sharing features"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-[#555]">
                  <span className="text-[#9B1C1C] opacity-50">✦</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/demo"
              className="w-full py-4 rounded-full border border-[#E8E3DC] text-[#1A1510] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#1A1510] hover:text-white transition-all text-center"
            >
              Begin for free
            </Link>
          </div>

          {/* CARD 2 — PRO (FEATURED) */}
          <div className="reveal relative varant-persona-card p-10 rounded-2xl flex flex-col h-full bg-white border-2 border-[#9B1C1C]/20 shadow-xl scale-105 z-10">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#9B1C1C] text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
              Most Chosen
            </div>

            <div className="mb-8">
              <div className="w-12 h-12 rounded-full bg-[#9B1C1C]/10 flex items-center justify-center text-[#9B1C1C] mb-6">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#9B1C1C] uppercase font-bold">Vichar Pro</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#1A1510]">₹799</span>
                <span className="text-[12px] text-[#767676]">/ month</span>
              </div>
            </div>

            <div className="h-px w-full varant-jali-border mb-8"></div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Unlimited Vichars",
                "Full Smriti history",
                "Shastra export (PDF/Text)",
                "Mimamsa reminders",
                "Priority processing",
                "Advanced analytics"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-[#1A1510] font-medium">
                  <span className="text-[#9B1C1C]">✦</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/demo"
              className="w-full py-4 rounded-full bg-[#1A1510] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#9B1C1C] transition-all shadow-lg hover:shadow-xl active:scale-95 text-center"
            >
              Get Unlimited Access
            </Link>
          </div>

          {/* CARD 3 — TEAM */}
          <div className="reveal varant-persona-card p-10 rounded-2xl flex flex-col h-full bg-white border border-[#E8E3DC] shadow-sm hover:shadow-md transition-all">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-full bg-[#D97706]/10 flex items-center justify-center text-[#D97706] mb-6">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#D97706] uppercase">Team Sabha</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#1A1510]">₹2499</span>
                <span className="text-[12px] text-[#767676]">/ month</span>
              </div>
            </div>

            <div className="h-px w-full varant-jali-border mb-8"></div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Everything in Pro",
                "Up to 5 team members",
                "Shared Smriti ledger",
                "Async team Sabha",
                "Team Shastra export",
                "Admin dashboard"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-[#555]">
                  <span className="text-[#D97706] opacity-60">✦</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="w-full py-4 rounded-full border border-[#D97706]/30 text-[#D97706] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#D97706] hover:text-white transition-all text-center"
            >
              Contact for Teams
            </Link>
          </div>
        </div>

        {/* Enterprise Row */}
        <div className="mt-20 text-center reveal">
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#767676] uppercase tracking-widest">
            Building something larger?{' '}
            <Link 
              href="/contact" 
              className="text-[#9B1C1C] hover:underline transition-all font-bold"
            >
              Talk to us about API access and custom Sabhas →
            </Link>
          </p>
          <p className="mt-4 text-[10px] text-[#999] italic">
            ✦ All plans include: Prashna interruption · Matra confidence score · The Unseen detection
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
