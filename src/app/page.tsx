"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Target, History, Sparkles, Anchor, Shuffle, Scale, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function VarantLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".v-curtain", { height: 0, duration: 1.2, ease: "power4.inOut", stagger: 0.1 })
      .fromTo(".v-fade-in", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }, "-=0.6")
      .fromTo(".v-glass-pill", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.08 }, "-=1.0");

    // Scroll Animations
    const sections = document.querySelectorAll('.v-section');
    sections.forEach((section) => {
      gsap.fromTo(section.querySelectorAll('.v-slide-up'), 
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
          }
        }
      );
    });
  }, { scope: containerRef });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if(el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <main ref={containerRef} className="bg-[#F5F2EC] text-[#1A1510] font-[family-name:var(--font-inter)] overflow-x-hidden selection:bg-[#9B1C1C]/20 selection:text-[#9B1C1C]">
      
      {/* Background Textures */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="varant-mesh-grad"></div>
        <div className="varant-grain-overlay"></div>
      </div>

      {/* ─── Navigation ─── */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[800px] px-4 pointer-events-none">
        <div className="glass-nav border border-[#E8E3DC] rounded-full h-14 flex items-center justify-between px-6 shadow-sm pointer-events-auto">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <span className="font-[family-name:var(--font-display)] italic text-xl font-semibold tracking-tight text-[#1A1510]">
              <span className="text-[#9B1C1C]">v</span>arant
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('philosophy')} className="text-xs font-semibold uppercase tracking-[0.15em] text-[#767676] hover:text-[#1A1510] transition-colors">Philosophy</button>
            <button onClick={() => scrollTo('architecture')} className="text-xs font-semibold uppercase tracking-[0.15em] text-[#767676] hover:text-[#1A1510] transition-colors">The Sabha</button>
            <button onClick={() => scrollTo('platform')} className="text-xs font-semibold uppercase tracking-[0.15em] text-[#767676] hover:text-[#1A1510] transition-colors">Platform</button>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/demo" className="bg-[#1A1510] text-white text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-[#9B1C1C] transition-colors block">
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
            <img alt="The Ancient Council Sabha" className="w-full h-full object-cover object-center" src="/hero-bg.png?v=3" />
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
              What bet can&apos;t <br/>
              <span className="italic font-light text-white/90">you undo?</span>
            </h1>

            <p className="text-lg md:text-xl text-[#E8E3DC] font-[family-name:var(--font-lora)] italic max-w-2xl mb-12 v-fade-in font-light leading-relaxed">
              Every founder gets a finite number of varas. You can&apos;t unask it. You can&apos;t unchoose it. Convene your Sabha.
            </p>

            <div className="flex flex-col items-center gap-6 v-fade-in w-full md:w-auto">
              <Link href="/demo" className="group bg-[#F5F2EC] text-[#1A1510] font-semibold px-10 py-4 rounded-full text-sm uppercase tracking-[0.15em] hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-3">
                Convene The Council <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Glass Pills */}
            <div className="mt-16 flex flex-wrap justify-center gap-3 w-full max-w-2xl">
              <div className="v-glass-pill glass-pill px-5 py-2.5 rounded-full flex items-center gap-3 border border-white/20 backdrop-blur-md bg-white/5">
                <span className="text-[11px] font-mono tracking-widest text-[#E8E3DC] uppercase">01</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white">Pratham Paksha</span>
              </div>
              <div className="v-glass-pill glass-pill px-5 py-2.5 rounded-full flex items-center gap-3 border border-white/20 backdrop-blur-md bg-white/5">
                <span className="text-[11px] font-mono tracking-widest text-[#E8E3DC] uppercase">02</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white">Khandana</span>
              </div>
              <div className="v-glass-pill glass-pill px-5 py-2.5 rounded-full flex items-center gap-3 border border-white/20 backdrop-blur-md bg-white/5">
                <span className="text-[11px] font-mono tracking-widest text-[#D97706] uppercase">03</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D97706]">Nirnaya</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY SECTION ─── */}
      <section id="philosophy" className="relative z-10 py-32 px-6 v-section">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20 v-slide-up">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[64px] leading-tight text-[#1A1510] mb-8">
              Your judgment is your most <br/><span className="text-[#9B1C1C] italic">underrated asset.</span>
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-lg md:text-xl text-[#555] max-w-3xl mx-auto leading-relaxed font-light">
              Most decision tools are Western-framed toys—Socrates, Roman law, chess metrics. Varant owns entirely unclaimed territory: the 2,500-year-old Indian intellectual tradition of deliberate, structured, and recorded judgment.
              <br/><br/>
              We don&apos;t optimize for the "best answer." <strong className="text-[#1A1510] font-medium">We optimize for the best decision-making process.</strong>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-[#1A1510]/10 pt-16">
            <div className="text-center md:text-left v-slide-up">
              <span className="text-3xl mb-4 block">⚖️</span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">Nyaya Shastra</h3>
              <p className="text-[15px] text-[#555] leading-relaxed">The science of logical argumentation. Structured debate with formal roles and a necessary, formal verdict.</p>
            </div>
            <div className="text-center md:text-left v-slide-up">
              <span className="text-3xl mb-4 block">📜</span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">Arthashastra</h3>
              <p className="text-[15px] text-[#555] leading-relaxed">The 4th century BCE framework for strategic decisions under deep uncertainty. We execute its underlying principles.</p>
            </div>
            <div className="text-center md:text-left v-slide-up">
              <span className="text-3xl mb-4 block">👁️</span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">Mimamsa</h3>
              <p className="text-[15px] text-[#555] leading-relaxed">The discipline of returning to what was decided and examining it again with new evidence. The core of your Smriti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE SABHA (Architecture) ─── */}
      <section id="architecture" className="relative z-10 py-32 px-6 bg-white border-y border-[#1A1510]/5 shadow-sm v-section">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 v-slide-up">
            <div className="max-w-2xl">
              <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-4">
                The Council Architecture
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-tight text-[#1A1510]">
                Four distinct heuristics.<br/>
                One unalterable verdict.
              </h2>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-base text-[#666] max-w-md leading-relaxed border-l-2 border-[#D97706]/30 pl-6">
              In ancient India, a Sabha was not just a meeting — it was a sacred deliberation space. Every voice had a designated role. No decision left without a verdict.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 v-slide-up">
            
            {/* Vitarka */}
            <div className="varant-persona-card p-8 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626] mb-8">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">वितर्क</span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mt-1">Vitarka</h3>
              </div>
              <div className="h-px w-full varant-jali-border my-4"></div>
              <p className="text-[14px] text-[#444] leading-relaxed">
                <strong className="text-[#1A1510] font-medium block mb-1">Deliberate Counter-Reasoning</strong>
                Finds every flaw. Challenges every assumption. Names the absolute worst-case mechanical risks of the proposition.
              </p>
            </div>

            {/* Asha */}
            <div className="varant-persona-card p-8 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] mb-8">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">आशा</span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mt-1">Asha</h3>
              </div>
              <div className="h-px w-full varant-jali-border my-4"></div>
              <p className="text-[14px] text-[#444] leading-relaxed">
                <strong className="text-[#1A1510] font-medium block mb-1">The Rising Possibility</strong>
                Finds opportunity where others see obstacles. Synthesizes best-case permutations for maximum value generation.
              </p>
            </div>

            {/* Yukti */}
            <div className="varant-persona-card p-8 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-full bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04] mb-8">
                <Anchor className="w-5 h-5" />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">युक्ति</span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mt-1">Yukti</h3>
              </div>
              <div className="h-px w-full varant-jali-border my-4"></div>
              <p className="text-[14px] text-[#444] leading-relaxed">
                <strong className="text-[#1A1510] font-medium block mb-1">Practical Wisdom</strong>
                Rejects pure theory. Explores what actually works given your real constraints, budget, and immediate operational needs.
              </p>
            </div>

            {/* Vipaksha */}
            <div className="varant-persona-card p-8 rounded-2xl relative group">
              <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] mb-8">
                <Shuffle className="w-5 h-5" />
              </div>
              <div className="mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">विपक्ष</span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mt-1">Vipaksha</h3>
              </div>
              <div className="h-px w-full varant-jali-border my-4"></div>
              <p className="text-[14px] text-[#444] leading-relaxed">
                <strong className="text-[#1A1510] font-medium block mb-1">The Opposition</strong>
                Reframes the entire question. Challenges the foundational premise of your worldview to expose blind spots.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── PLATFORM PROTOCOLS ─── */}
      <section id="platform" className="relative z-10 py-32 px-6 v-section">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20 v-slide-up">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-tight text-[#1A1510] mb-4">
              Decide like it can&apos;t be undone.
            </h2>
            <p className="text-[#666] max-w-2xl mx-auto">
              Most founders make calls on vibes and 2am anxiety. You never write down why you decided what you decided. Varant digitizes the ancient protocol of permanent record.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative v-slide-up">
            {/* The line connecting them */}
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-px varant-jali-border z-0"></div>

            {/* 1. The Prashna */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#E8E3DC] mb-6 text-[#9B1C1C] transition-transform duration-500 group-hover:-translate-y-2">
                <Quote className="w-8 h-8" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mb-2">The Prashna</h3>
              <span className="text-[11px] font-semibold tracking-widest text-[#D97706] uppercase mb-4 block">The Essential Question</span>
              <p className="text-[14px] text-[#555] leading-relaxed px-4">
                Right when you think you&apos;re safe, the system interrupts. It asks the one deeply uncomfortable, pointed question you have been avoiding to cut through pretense.
              </p>
            </div>

            {/* 2. The Shastra */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#E8E3DC] mb-6 text-[#1A1510] transition-transform duration-500 group-hover:-translate-y-2">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mb-2">The Shastra</h3>
              <span className="text-[11px] font-semibold tracking-widest text-[#D97706] uppercase mb-4 block">The Decision Record</span>
              <p className="text-[14px] text-[#555] leading-relaxed px-4">
                Every session produces an authoritative, written memo detailing what was weighed, why it was chosen, and your exact <span className="font-medium text-[#1A1510]">Matra</span> (confidence score).
              </p>
            </div>

            {/* 3. The Smriti */}
            <div className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-20 h-20 bg-[#1A1510] rounded-full flex items-center justify-center shadow-xl border border-[#1A1510] mb-6 text-white transition-transform duration-500 group-hover:-translate-y-2">
                <History className="w-8 h-8" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1510] mb-2">The Smriti</h3>
              <span className="text-[11px] font-semibold tracking-widest text-[#D97706] uppercase mb-4 block">The Memory</span>
              <p className="text-[14px] text-[#555] leading-relaxed px-4">
                A permanent, longitudinal ledger of your decisions. It surfaces patterns over time, exposing blindspots and forcing your executive judgment to compound.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND TRUTH / CTA ─── */}
      <section className="relative z-10 bg-[#1A1510] text-[#E8E3DC] py-40 px-6 text-center v-section">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D97706] to-transparent mx-auto mb-10 v-slide-up"></div>
          
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-[56px] leading-[1.1] mb-8 v-slide-up text-white">
            Varant does not congratulate you.<br/>
            <span className="italic font-light opacity-60">It does not reassure you.</span>
          </h2>
          
          <p className="font-[family-name:var(--font-lora)] text-xl md:text-2xl text-[#B8B0A8] font-light leading-relaxed max-w-3xl mx-auto mb-16 v-slide-up italic">
            You bring the dilemma. It convenes the Sabha, renders the Nirnaya, and adds it to your Smriti. What you do with it is your vara.
          </p>

          <div className="v-slide-up">
            <Link href="/demo" className="inline-flex items-center gap-4 bg-white text-[#1A1510] px-10 py-5 rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <span className="text-sm font-semibold uppercase tracking-[0.15em]">Begin Your Vichar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
            <p className="text-sm text-[#666] font-light leading-relaxed mb-6 font-[family-name:var(--font-inter)]">
              Bridging the gap between timeless Indian reasoning frameworks and modern compute primitives.
            </p>
            <p className="text-[12px] uppercase tracking-widest text-[#1A1510] font-semibold">
              The ancient council. <br/>For modern bets.
            </p>
          </div>

          <div className="flex flex-wrap gap-16 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1510] mb-2">Sources</h4>
              <Link href="#" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Nyaya Sutras</Link>
              <Link href="#" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Arthashastra</Link>
              <Link href="#" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Mimamsa Rules</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1510] mb-2">Platform</h4>
              <Link href="/demo" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Run Simulation</Link>
              <Link href="#" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Pricing (Free Beta)</Link>
              <Link href="#" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Enterprise Embeds</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1510] mb-2">Legal</h4>
              <Link href="#" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Privacy</Link>
              <Link href="#" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Terms of Service</Link>
              <Link href="#" className="text-sm text-[#666] hover:text-[#9B1C1C] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-[#E8E3DC] flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-widest text-[#999] gap-4">
          <p>&copy; {new Date().getFullYear()} Varant. Built in India. For founders everywhere.</p>
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
