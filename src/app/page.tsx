"use client";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldAlert,
  Target,
  History,
  Sparkles,
  Anchor,
  Shuffle,
  Scale,
  Quote,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function VarantLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSignedIn = useAuth()
  useGSAP(
    () => {
      // Hero Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".v-curtain", {
        height: 0,
        duration: 1.2,
        ease: "power4.inOut",
        stagger: 0.1,
      })
        .fromTo(
          ".v-fade-in",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          "-=0.6",
        )
        .fromTo(
          ".v-glass-pill",
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, stagger: 0.08 },
          "-=1.0",
        );

      // Scroll Animations
      const sections = document.querySelectorAll(".v-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".v-slide-up"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main
      ref={containerRef}
      className="bg-[#F5F2EC] text-[#1A1510] font-[family-name:var(--font-inter)] overflow-x-hidden selection:bg-[#9B1C1C]/20 selection:text-[#9B1C1C]"
    >
      {/* Background Textures */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="varant-mesh-grad"></div>
        <div className="varant-grain-overlay"></div>
      </div>

      {/* ─── Navigation ─── */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[800px] px-4 pointer-events-none">
        <div className="glass-nav border border-[#E8E3DC] rounded-full h-14 flex items-center justify-between px-6 shadow-sm pointer-events-auto">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="font-[family-name:var(--font-display)] italic text-xl font-semibold tracking-tight text-[#1A1510]">
              <span className="text-[#9B1C1C]">v</span>arant
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo("philosophy")}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#767676] hover:text-[#1A1510] transition-colors"
            >
              Philosophy
            </button>
            <button
              onClick={() => scrollTo("architecture")}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#767676] hover:text-[#1A1510] transition-colors"
            >
              The Sabha
            </button>
            <button
              onClick={() => scrollTo("platform")}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#767676] hover:text-[#1A1510] transition-colors"
            >
              Platform
            </button>
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full border border-[#1A1510]/20 hover:bg-[#1A1510]/5 transition-colors text-[#1A1510]">
                  Sign in
                </button>
              </SignInButton>
            )}
            <Link
              href="/demo"
              className="bg-[#1A1510] text-white text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-[#9B1C1C] transition-colors block"
            >
              Begin Vichar
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center pt-24 overflow-hidden">
        {/* Inner Hero Container with cinematic border */}
        <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1400px] h-[calc(100svh-4rem)] md:h-[calc(100svh-6rem)] relative rounded-2xl overflow-hidden shadow-2xl border border-black/10">
          {/* HD 16:9 Image */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="The Ancient Council Sabha"
              className="w-full h-full object-cover object-center"
              src="/hero-bg.png?v=3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1510]/90 via-[#1A1510]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1510]/40 via-transparent to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full h-full flex flex-col mt-25 items-center justify-end text-center pb-20 md:pb-32 px-6">
            <div className="mb-8 v-fade-in inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D97706]/70"></span>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#E8E3DC] border border-[#D97706]/30 bg-[#1A1510]/60 backdrop-blur-md px-4 py-1.5 rounded-full uppercase">
                2,500 Years of Indian Reasoning
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D97706]/70"></span>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-[84px] leading-[1.05] tracking-[-0.02em] text-white max-w-[900px] mb-8 text-shadow-sm v-fade-in ">
              What bet can&apos;t <br />
              <span className="italic font-light text-white/90">you undo?</span>
            </h1>

            <p className="text-lg md:text-xl text-[#E8E3DC] font-[family-name:var(--font-lora)] italic max-w-2xl mb-12 v-fade-in font-light leading-relaxed">
              Every founder gets a finite number of varas. You can&apos;t unask
              it. You can&apos;t unchoose it. Convene your Sabha.
            </p>

            <div className="flex flex-col items-center gap-6 v-fade-in w-full md:w-auto">
              <Link
                href="/demo"
                className="group bg-[#F5F2EC] text-[#1A1510] font-semibold px-10 py-4 rounded-full text-sm uppercase tracking-[0.15em] hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-3"
              >
                Convene The Council{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Glass Pills */}
            <div className="mt-16 flex flex-wrap justify-center gap-3 w-full max-w-2xl">
              <div className="v-glass-pill glass-pill px-5 py-2.5 rounded-full flex items-center gap-3 border border-white/20 backdrop-blur-md bg-white/5">
                <span className="text-[11px] font-mono tracking-widest text-[#E8E3DC] uppercase">
                  01
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white">
                  Pratham Paksha
                </span>
              </div>
              <div className="v-glass-pill glass-pill px-5 py-2.5 rounded-full flex items-center gap-3 border border-white/20 backdrop-blur-md bg-white/5">
                <span className="text-[11px] font-mono tracking-widest text-[#E8E3DC] uppercase">
                  02
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white">
                  Khandana
                </span>
              </div>
              <div className="v-glass-pill glass-pill px-5 py-2.5 rounded-full flex items-center gap-3 border border-white/20 backdrop-blur-md bg-white/5">
                <span className="text-[11px] font-mono tracking-widest text-[#D97706] uppercase">
                  03
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D97706]">
                  Nirnaya
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="relative z-10 overflow-hidden py-5 border-y border-[#1A1510]/10 bg-[#FAF9F7] mt-12 md:mt-20">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1A1510]/30 mx-4"
            >
              ✦ PRATHAM PAKSHA · KHANDANA · NIRNAYA · NYAYA SHASTRA · MIMAMSA ·
              VITARKA · ASHA · YUKTI · VIPAKSHA&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── THE PROBLEM ─── */}
      <section id="philosophy" className="relative z-10 py-32 px-6 v-section">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20 v-slide-up">
            <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-6">
              The Problem
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[64px] leading-tight text-[#1A1510] mb-8">
              Founders decide <br />
              <span className="text-[#9B1C1C] italic">in the dark.</span>
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-lg md:text-xl text-[#555] max-w-3xl mx-auto leading-relaxed font-light">
              Every irreversible bet — quit or stay, raise or bootstrap, pivot
              or persist — made on vibes, WhatsApp threads, and 2am anxiety.
              They never write down why they decided. They never track what
              happened. They never get smarter from their own history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-[#1A1510]/10 pt-16">
            <div className="text-center md:text-left v-slide-up">
              <span className="text-3xl mb-4 block">⚖️</span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                No Structure
              </h3>
              <p className="text-[15px] text-[#555] leading-relaxed">
                Opinions, not deliberation. Noise, not Nyaya.
              </p>
            </div>
            <div className="text-center md:text-left v-slide-up">
              <span className="text-3xl mb-4 block">📜</span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                No Shastra
              </h3>
              <p className="text-[15px] text-[#555] leading-relaxed">
                Decisions vanish. No record of why you chose.
              </p>
            </div>
            <div className="text-center md:text-left v-slide-up">
              <span className="text-3xl mb-4 block">👁️</span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                No Smriti
              </h3>
              <p className="text-[15px] text-[#555] leading-relaxed">
                No memory. No patterns. Judgment never compounds.
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-20 text-center v-slide-up">
            <blockquote className="font-[family-name:var(--font-lora)] italic text-xl md:text-2xl text-[#1A1510]/70 max-w-2xl mx-auto leading-relaxed">
              &ldquo;I don&apos;t know if I&apos;m exhausted or just
              scared.&rdquo;
            </blockquote>
            <p className="text-[13px] text-[#999] uppercase tracking-widest mt-4">
              — 21-year-old founder, placement deadline: this Friday
            </p>
          </div>
        </div>
      </section>

      {/* ─── THE SABHA ─── */}
      <section
        id="architecture"
        className="relative z-10 py-32 px-6 bg-white border-y border-[#1A1510]/5 shadow-sm v-section"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 v-slide-up">
            <div className="max-w-2xl">
              <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-4">
                The Sabha
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-tight text-[#1A1510]">
                Four voices.
                <br />
                <span className="italic font-light">One truth.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 v-slide-up">
            {/* Vitarka */}
            <div className="varant-persona-card p-8 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626] mb-8">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">
                  The Skeptic
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mt-1">
                  Vitarka
                </h3>
              </div>
              <div className="h-px w-full varant-jali-border my-4"></div>
              <p className="text-[14px] text-[#444] leading-relaxed">
                Challenges every assumption. Destroys sunk-cost fallacy and
                wishful thinking before it costs you everything.
              </p>
            </div>

            {/* Asha */}
            <div className="varant-persona-card p-8 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] mb-8">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">
                  The Optimist
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mt-1">
                  Asha
                </h3>
              </div>
              <div className="h-px w-full varant-jali-border my-4"></div>
              <p className="text-[14px] text-[#444] leading-relaxed">
                Finds the path forward no one else sees. Argues for upside,
                momentum, and the rare case where betting on yourself is right.
              </p>
            </div>

            {/* Yukti */}
            <div className="varant-persona-card p-8 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-full bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04] mb-8">
                <Anchor className="w-5 h-5" />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">
                  The Pragmatist
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mt-1">
                  Yukti
                </h3>
              </div>
              <div className="h-px w-full varant-jali-border my-4"></div>
              <p className="text-[14px] text-[#444] leading-relaxed">
                Breaks every option into concrete milestones. Strips the
                emotion. Delivers the hybrid path you never considered.
              </p>
            </div>

            {/* Vipaksha */}
            <div className="varant-persona-card p-8 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] mb-8">
                <Shuffle className="w-5 h-5" />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">
                  Devil&apos;s Advocate
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mt-1">
                  Vipaksha
                </h3>
              </div>
              <div className="h-px w-full varant-jali-border my-4"></div>
              <p className="text-[14px] text-[#444] leading-relaxed">
                Argues the position you fear most. Asks the question you&apos;ve
                been avoiding. Protects you from yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE PROCESS (Three Rounds) ─── */}
      <section id="platform" className="relative z-10 py-32 px-6 v-section">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20 v-slide-up">
            <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-6">
              The Process
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-tight text-[#1A1510] mb-4">
              Three rounds. <br />
              <span className="italic font-light">Ancient dialectics.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative v-slide-up">
            {/* The line connecting them */}
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-px varant-jali-border z-0"></div>

            {/* 01 — Pratham Paksha */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#E8E3DC] mb-6 text-[#9B1C1C] transition-transform duration-500 group-hover:-translate-y-2">
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold">
                  01
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mb-1">
                Pratham Paksha
              </h3>
              <span className="text-[11px] font-semibold tracking-widest text-[#D97706] uppercase mb-4 block">
                प्रथम पक्ष · First Position
              </span>
              <p className="text-[14px] text-[#555] leading-relaxed px-4">
                All four voices weigh in simultaneously. Raw, unfiltered. The
                full spectrum of perspective on your decision in a single breath
                — no filtering, no consensus-seeking.
              </p>
              <span className="inline-block mt-4 text-[10px] font-mono tracking-widest text-[#999] border border-[#E8E3DC] rounded-full px-3 py-1">
                4 voices · parallel
              </span>
            </div>

            {/* 02 — Khandana */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#E8E3DC] mb-6 text-[#1A1510] transition-transform duration-500 group-hover:-translate-y-2">
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold">
                  02
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mb-1">
                Khandana
              </h3>
              <span className="text-[11px] font-semibold tracking-widest text-[#D97706] uppercase mb-4 block">
                खण्डन · The Rebuttal
              </span>
              <p className="text-[14px] text-[#555] leading-relaxed px-4">
                Voices confront each other directly. Arguments fracture and
                reform. You may interject — challenge any voice mid-debate with
                your Prashna and it will be folded into the rebuttal.
              </p>
              <span className="inline-block mt-4 text-[10px] font-mono tracking-widest text-[#999] border border-[#E8E3DC] rounded-full px-3 py-1">
                cross-examination · prashna
              </span>
            </div>

            {/* 03 — Nirnaya */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 bg-[#1A1510] rounded-full flex items-center justify-center shadow-xl border border-[#1A1510] mb-6 text-white transition-transform duration-500 group-hover:-translate-y-2">
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold">
                  03
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mb-1">
                Nirnaya
              </h3>
              <span className="text-[11px] font-semibold tracking-widest text-[#D97706] uppercase mb-4 block">
                निर्णय · The Final Verdict
              </span>
              <p className="text-[14px] text-[#555] leading-relaxed px-4">
                The Sabha reaches synthesis. A final Shastra with Matra
                confidence score, Key Tensions, Recommendation, and The Unseen —
                the risks you never mentioned but the council detected.
              </p>
              <span className="inline-block mt-4 text-[10px] font-mono tracking-widest text-[#999] border border-[#E8E3DC] rounded-full px-3 py-1">
                verdict · shastra record
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE SHASTRA (Real Example) ─── */}
      <section className="relative z-10 py-32 px-6 bg-white border-y border-[#1A1510]/5 v-section">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 v-slide-up">
            <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-6">
              The Shastra
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-tight text-[#1A1510] mb-4">
              The Sabha deliberated. <br />
              <span className="italic font-light">Here is what it found.</span>
            </h2>
            <p className="text-[#666] max-w-2xl mx-auto">
              A real Nirnaya — run on Varant by its own founder.
            </p>
          </div>

          {/* Shastra Card */}
          <div className="v-slide-up bg-[#FAF9F7] border border-[#E8E3DC] rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">
                Shastra · Decision Record
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full">
                Nirnaya Complete
              </span>
            </div>

            <div className="mb-8">
              <p className="font-[family-name:var(--font-lora)] italic text-xl text-[#1A1510] leading-relaxed">
                &ldquo;Should I drop Varant and take a full-time job offer, or
                keep building?&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#E8E3DC]">
              <div>
                <span className="text-[10px] font-semibold tracking-widest text-[#999] uppercase block mb-1">
                  Matra
                </span>
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#D97706]">
                  70%
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1510] mb-3">
                Recommendation
              </h4>
              <p className="text-[15px] text-[#444] leading-relaxed">
                &ldquo;Take the ₹40k/month internship immediately. Use the
                remaining 13 days to ship Varant at the hackathon as a
                time-bound validation event. Building a viable business requires
                resources and emotional bandwidth — neither of which the founder
                currently possesses.&rdquo;
              </p>
            </div>

            <div className="bg-[#9B1C1C]/5 border border-[#9B1C1C]/10 rounded-xl p-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9B1C1C] mb-3">
                The Unseen
              </h4>
              <p className="text-[15px] text-[#444] leading-relaxed italic">
                &ldquo;Can the internship company become Varant&apos;s first
                client? Frame the next month as a pressure test — not a
                compromise.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE SMRITI ─── */}
      <section className="relative z-10 py-32 px-6 v-section">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="v-slide-up">
              <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-6">
                The Smriti
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-tight text-[#1A1510] mb-8">
                Your judgment <br />
                <span className="italic font-light">compounds.</span>
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                Smriti means &ldquo;that which is remembered.&rdquo; Every
                Shastra you create is saved to your Smriti — a permanent ledger
                of every decision you&apos;ve made, why you made it, and what
                the Sabha said.
              </p>
              <p className="text-[#555] leading-relaxed">
                Over time, patterns surface. Blindspots become visible. Your
                confidence calibration sharpens. Your judgment is your most
                underrated asset. Varant builds it systematically.
              </p>
            </div>

            {/* Smriti Log */}
            <div className="v-slide-up bg-[#FAF9F7] border border-[#E8E3DC] rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">
                  Smriti — Judgment Log
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#999]">
                  VAR-YASH-001
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 py-3 border-b border-[#E8E3DC]">
                  <span className="text-[10px] font-mono text-[#999] w-16 shrink-0">
                    MAR 26
                  </span>
                  <p className="text-[13px] text-[#444] flex-1 truncate">
                    &ldquo;Drop Varant or take the ₹40k job?&rdquo;
                  </p>
                  <span className="text-[13px] font-semibold text-[#D97706] w-10 text-right">
                    70%
                  </span>
                  <span className="text-[10px] font-semibold text-[#16A34A] uppercase">
                    Vindicated
                  </span>
                </div>
                <div className="flex items-center gap-4 py-3 border-b border-[#E8E3DC]">
                  <span className="text-[10px] font-mono text-[#999] w-16 shrink-0">
                    FEB 26
                  </span>
                  <p className="text-[13px] text-[#444] flex-1 truncate">
                    &ldquo;Pivot to B2B or stay with indie founders?&rdquo;
                  </p>
                  <span className="text-[13px] font-semibold text-[#D97706] w-10 text-right">
                    61%
                  </span>
                  <span className="text-[10px] font-semibold text-[#CA8A04] uppercase">
                    Mimamsa due
                  </span>
                </div>
                <div className="flex items-center gap-4 py-3 border-b border-[#E8E3DC]">
                  <span className="text-[10px] font-mono text-[#999] w-16 shrink-0">
                    JAN 26
                  </span>
                  <p className="text-[13px] text-[#444] flex-1 truncate">
                    &ldquo;Launch now or wait for the right co-founder?&rdquo;
                  </p>
                  <span className="text-[13px] font-semibold text-[#D97706] w-10 text-right">
                    82%
                  </span>
                  <span className="text-[10px] font-semibold text-[#16A34A] uppercase">
                    Vindicated
                  </span>
                </div>
                <div className="flex items-center gap-4 py-3">
                  <span className="text-[10px] font-mono text-[#999] w-16 shrink-0">
                    DEC 25
                  </span>
                  <p className="text-[13px] text-[#444] flex-1 truncate">
                    &ldquo;Fire the contractor or give one more month?&rdquo;
                  </p>
                  <span className="text-[13px] font-semibold text-[#D97706] w-10 text-right">
                    55%
                  </span>
                  <span className="text-[10px] font-semibold text-[#DC2626] uppercase">
                    Revisit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE MIMAMSA ─── */}
      <section className="relative z-10 py-32 px-6 bg-white border-y border-[#1A1510]/5 v-section">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 v-slide-up">
            <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-6">
              The Mimamsa
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-tight text-[#1A1510] mb-6">
              The Sabha <br />
              <span className="italic font-light">returns.</span>
            </h2>
            <p className="text-[#666] max-w-2xl mx-auto leading-relaxed">
              Mimamsa — one of the six classical schools of Indian philosophy —
              is dedicated entirely to the practice of returning to what was
              decided and re-examining it with new evidence.
            </p>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 v-slide-up">
            <div className="text-center">
              <span className="text-[11px] font-mono tracking-widest text-[#D97706] block mb-2">
                Day 0
              </span>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#1A1510] mb-2">
                The Vichar
              </h4>
              <p className="text-[13px] text-[#555] leading-relaxed">
                Sabha convened. Shastra recorded. Decision made.
              </p>
            </div>
            <div className="text-center">
              <span className="text-[11px] font-mono tracking-widest text-[#D97706] block mb-2">
                Day 30
              </span>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#1A1510] mb-2">
                First Mimamsa
              </h4>
              <p className="text-[13px] text-[#555] leading-relaxed">
                What actually happened? Was the Matra calibrated?
              </p>
            </div>
            <div className="text-center">
              <span className="text-[11px] font-mono tracking-widest text-[#D97706] block mb-2">
                Day 60
              </span>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#1A1510] mb-2">
                Second Mimamsa
              </h4>
              <p className="text-[13px] text-[#555] leading-relaxed">
                Deeper signal. The Sabha reconvenes with new data.
              </p>
            </div>
            <div className="text-center">
              <span className="text-[11px] font-mono tracking-widest text-[#D97706] block mb-2">
                Day 90
              </span>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#1A1510] mb-2">
                Final Mimamsa
              </h4>
              <p className="text-[13px] text-[#555] leading-relaxed">
                The full verdict on your verdict. Smriti updated.
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-20 text-center v-slide-up">
            <blockquote className="font-[family-name:var(--font-lora)] italic text-lg text-[#1A1510]/70 max-w-2xl mx-auto leading-relaxed">
              &ldquo;The Unseen questions from your Shastra become the Prashnas
              of your next Mimamsa. The Sabha remembers what you forgot to
              ask.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-10 bg-[#1A1510] text-[#E8E3DC] py-40 px-6 text-center v-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-2xl mb-8 v-slide-up text-[#D97706]/50">
            ✦ ॐ ✦
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-[56px] leading-[1.1] mb-8 v-slide-up text-white">
            Your Sabha.
            <br />
            Your Shastra.
            <br />
            <span className="italic font-light opacity-60">Your Smriti.</span>
          </h2>

          <div className="v-slide-up mb-12">
            <Link
              href="/demo"
              className="inline-flex items-center gap-4 bg-white text-[#1A1510] px-10 py-5 rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.15em]">
                Begin Your Vichar
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-sm text-[#B8B0A8] font-light leading-relaxed max-w-2xl mx-auto v-slide-up">
            Varant does not congratulate you. It does not reassure you. It
            convenes your Sabha, renders your Nirnaya, and adds it to your
            Smriti. What you do with it is your vara.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-[#E8E3DC] bg-[#FAF9F7] pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-xs">
            <div className="mb-6">
              <span className="font-[family-name:var(--font-display)] italic text-3xl font-semibold tracking-tight text-[#1A1510]">
                <span className="text-[#9B1C1C]">v</span>arant
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-16 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1510] mb-2">
                Navigate
              </h4>
              <button
                onClick={() => scrollTo("philosophy")}
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors text-left"
              >
                Philosophy
              </button>
              <button
                onClick={() => scrollTo("architecture")}
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors text-left"
              >
                The Council
              </button>
              <button
                onClick={() => scrollTo("platform")}
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors text-left"
              >
                Process
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1510] mb-2">
                Platform
              </h4>
              <Link
                href="/demo"
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors"
              >
                Run Simulation
              </Link>
              <Link
                href="#"
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors"
              >
                Pricing (Free Beta)
              </Link>
              <Link
                href="#"
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors"
              >
                Enterprise Embeds
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1510] mb-2">
                Legal
              </h4>
              <Link
                href="/privacy"
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-[#E8E3DC] flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-widest text-[#999] gap-4">
          <p>
            &copy; {new Date().getFullYear()} Varant · Rooted in Nyaya ·
            Arthashastra · Tarka Shastra · Built for founders everywhere
          </p>
          <div className="flex gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1510]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C1C]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
          </div>
        </div>
      </footer>

      {/* Cinematic Curtains */}
      <div className="fixed inset-0 bg-[#0F0C08] z-[100] origin-top v-curtain"></div>
    </main>
  );
}
