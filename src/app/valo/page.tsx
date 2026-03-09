"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Target, History, Sparkles, Anchor, Shuffle, Quote, Binary } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Inter, Playfair_Display, Lora } from "next/font/google";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });
const lora = Lora({ subsets: ['latin'], weight: ["400", "500"], style: ["italic", "normal"], variable: '--font-lora' });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ValoLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Initial Reveal
    tl.to(".v-reveal-overlay", {
      height: 0,
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.1
    })
    .fromTo(".v-fade-up", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".v-line-draw", 
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power3.inOut", transformOrigin: "left" },
      "-=1.2"
    );

    // Orb float animation
    gsap.to(".v-orb", {
      y: "-=20",
      x: "+=15",
      rotation: 5,
      duration: 8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 2,
        from: "random"
      }
    });

    // Scroll trigger animations for sections
    const sections = document.querySelectorAll('.v-section');
    sections.forEach((section) => {
      gsap.fromTo(section.querySelectorAll('.v-slide-up'), 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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
    <main ref={containerRef} className={`min-h-screen bg-[#0a0a0c] text-[#E8E3DC] ${inter.variable} ${playfair.variable} ${lora.variable} font-[family-name:var(--font-inter)] overflow-x-hidden selection:bg-[#9B1C1C]/40 selection:text-white`}>
      
      {/* ─── Dark Ancient Orbs & Textures Ambient Map ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen bg-[#020202]">
        {/* Core structure - Saffron and Ancient Red glows instead of Cyan/Purple */}
        <div className="absolute top-[20%] left-[60%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06)_0%,transparent_60%)] v-orb"></div>
        <div className="absolute top-[40%] left-[20%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(155,28,28,0.05)_0%,transparent_60%)] v-orb"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.04)_0%,transparent_60%)] v-orb"></div>
        
        {/* Sharp highlights */}
        <div className="absolute top-[35%] left-[55%] w-2 h-2 bg-[#D97706] rounded-full shadow-[0_0_20px_4px_rgba(217,119,6,0.5)] v-orb"></div>
        <div className="absolute top-[65%] left-[30%] w-1.5 h-1.5 bg-[#9B1C1C] rounded-full shadow-[0_0_15px_3px_rgba(155,28,28,0.4)] v-orb"></div>
        <div className="absolute top-[25%] left-[35%] w-1 h-1 bg-[#E8E3DC] rounded-full shadow-[0_0_10px_2px_rgba(232,227,220,0.5)] v-orb"></div>
        
        {/* Dark Kolam overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 400\'%3E%3Cdefs%3E%3Cpattern id=\'kolam\' width=\'24\' height=\'24\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'0.8\' fill=\'%23ffffff\' fill-opacity=\'0.3\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23kolam)\'/%3E%3Cg fill=\'none\' stroke=\'%23ffffff\' stroke-opacity=\'0.1\' stroke-width=\'0.4\'%3E%3Ccircle cx=\'200\' cy=\'200\' r=\'60\'/%3E%3Ccircle cx=\'200\' cy=\'200\' r=\'100\'/%3E%3Ccircle cx=\'200\' cy=\'200\' r=\'150\'/%3E%3Ccircle cx=\'200\' cy=\'200\' r=\'190\'/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '400px 400px', backgroundPosition: 'center' }}></div>
        
        {/* Precision Grid lines */}
        <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent hidden md:block"></div>
        <div className="absolute left-[85%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent hidden md:block"></div>
      </div>

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="flex items-center gap-4 v-fade-up cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <span className="font-[family-name:var(--font-display)] italic text-2xl font-semibold tracking-tight text-white/90">
            <span className="text-[#DC2626]">v</span>arant
          </span>
        </div>

        <div className="hidden md:flex items-center gap-12 v-fade-up">
          <button onClick={() => scrollTo('platform')} className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 hover:text-[#D97706] transition-colors">Platform</button>
          <button onClick={() => scrollTo('architecture')} className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 hover:text-[#D97706] transition-colors">Architecture</button>
          <button onClick={() => scrollTo('science')} className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 hover:text-[#D97706] transition-colors">Philosophy</button>
        </div>

        <div className="flex items-center gap-6 v-fade-up">
          <Link href="/demo" className="relative group overflow-hidden px-6 py-3 rounded-sm border border-white/20 hover:border-[#D97706]/50 transition-colors bg-white/5">
            <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.15em]">Access Sabha</span>
            <div className="absolute inset-0 bg-[#D97706]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 px-6 md:px-12 pt-48 pb-32 max-w-[1400px] mx-auto min-h-[90vh] flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="overflow-hidden mb-8">
              <div className="v-fade-up flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#9B1C1C]"></span>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9B1C1C]">Irreversible Decision Framework</span>
              </div>
            </div>

            <div className="relative mb-10">
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,6.5vw,6rem)] leading-[1.0] tracking-tight font-medium text-white shadow-sm">
                <div className="overflow-hidden pb-2"><div className="v-fade-up">Stop Guessing.</div></div>
                <div className="overflow-hidden pb-2"><div className="v-fade-up text-white/60 italic font-light">Compute The Unseen.</div></div>
              </h1>
            </div>

            <div className="overflow-hidden max-w-2xl mb-12">
              <p className="v-fade-up text-lg md:text-xl text-[#B8B0A8] font-[family-name:var(--font-lora)] italic leading-[1.7]">
                Every founder gets a finite number of <span className="text-white font-medium not-italic">varas</span> (irreversible bets). Quit vs. Stay. Pivot vs. Persist. The highest stakes imaginable, decided on 2AM WhatsApp threads. 
                <br/><br/>
                <span className="text-white font-medium not-italic">It's amateur hour. We put an end to it today.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 v-fade-up">
              <Link href="/demo" className="group flex items-center gap-4 bg-[#E8E3DC] text-[#0a0a0c] px-8 py-5 rounded-sm hover:bg-white transition-colors w-full sm:w-auto justify-center">
                <span className="text-sm font-bold uppercase tracking-[0.15em]">Convene Your Sabha</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">System Status</span>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#D97706] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#D97706] rounded-full shadow-[0_0_8px_rgba(217,119,6,0.8)] animate-pulse"></div>
                  Engine Operational
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 hidden lg:flex items-center justify-end relative">
            <div className="relative w-[340px] h-[340px] border border-white/[0.05] rounded-full flex items-center justify-center v-fade-up group">
               <div className="absolute inset-4 border border-[#D97706]/20 rounded-full border-dashed animate-[spin_60s_linear_infinite] opacity-50"></div>
               <div className="absolute inset-12 border border-[#9B1C1C]/20 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-50"></div>
               
               <div className="w-32 h-32 bg-white/[0.02] backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-700">
                  <span className="text-[10px] font-mono text-white/40 uppercase leading-loose tracking-widest">
                    Aarambh<br/>Sabha<br/><span className="text-[#D97706]">Nirnaya</span>
                  </span>
               </div>
               
               <div className="absolute top-0 w-2 h-2 bg-[#D97706] rounded-full shadow-[0_0_10px_rgba(217,119,6,0.8)]"></div>
               <div className="absolute bottom-12 right-6 w-1.5 h-1.5 bg-[#9B1C1C] rounded-full shadow-[0_0_10px_rgba(155,28,28,0.8)]"></div>
               <div className="absolute top-24 left-6 w-1 h-1 bg-[#E8E3DC] rounded-full shadow-[0_0_10px_rgba(232,227,220,0.8)]"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent v-line-draw relative">
        <div className="absolute left-[15%] top-[-3px] w-1.5 h-1.5 bg-[#D97706]/40 rounded-full hidden md:block"></div>
        <div className="absolute right-[15%] top-[-3px] w-1.5 h-1.5 bg-[#D97706]/40 rounded-full hidden md:block"></div>
      </div>

      {/* ─── PLATFORM SECTION ─── */}
      <section id="platform" className="relative z-10 py-32 px-6 md:px-12 max-w-[1400px] mx-auto v-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-6 flex items-center gap-4 v-slide-up">
              <span className="w-8 h-px bg-[#D97706]/40"></span>
              The Platform
            </h2>
            <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight v-slide-up text-white">
              Your judgment is your most <i className="text-white/60">underrated asset.</i>
            </h3>
            <p className="text-white/50 text-lg leading-relaxed font-light mb-8 v-slide-up">
              Most decision tools are Western-framed toys. They give you "an objective answer." That's not how business works.
              <br/><br/>
              Varant owns entirely unclaimed territory: the 2,500-year-old Indian intellectual tradition of deliberate, structured, and recorded judgment. 
              We don't optimize for the best answer. <strong className="text-white font-medium">We optimize for the best decision-making process.</strong>
            </p>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-8 bg-white/[0.02] border border-white/[0.05] rounded-sm hover:bg-white/[0.04] transition-colors v-slide-up group">
              <History className="w-6 h-6 text-[#D97706]/60 mb-6 group-hover:text-[#D97706] transition-colors" />
              <h4 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-3">The Smriti <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase ml-2">Memory</span></h4>
              <p className="text-sm text-white/50 leading-relaxed font-[family-name:var(--font-inter)] font-light">
                You never write down why you decided what you decided. Over time, Varant builds your Smriti—a complete longitudinal ledger of your decisions, exposing your blindspots.
              </p>
            </div>
            <div className="p-8 bg-white/[0.02] border border-white/[0.05] rounded-sm hover:bg-white/[0.04] transition-colors v-slide-up group">
              <Target className="w-6 h-6 text-[#9B1C1C]/60 mb-6 group-hover:text-[#9B1C1C] transition-colors" />
              <h4 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-3">The Shastra <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase ml-2">Record</span></h4>
              <p className="text-sm text-white/50 leading-relaxed font-[family-name:var(--font-inter)] font-light">
                Every session produces a Shastra. An authoritative, written memo detailing exactly what was weighed, why it was chosen, and your exact confidence score (The Matra).
              </p>
            </div>
            <div className="p-8 bg-[#111114] border border-[#D97706]/20 rounded-sm hover:bg-[#16161a] transition-colors v-slide-up group sm:col-span-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D97706]/50 to-transparent"></div>
              <ShieldAlert className="w-6 h-6 text-[#D97706] mb-6" />
              <h4 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-3 text-white">The Prashna <span className="font-mono text-[10px] tracking-widest text-[#D97706]/50 uppercase ml-2">The Essential Question</span></h4>
              <p className="text-sm text-white/60 leading-relaxed font-light max-w-2xl font-[family-name:var(--font-inter)]">
                Right when you think you're safe, the system interrupts you. The Prashna isn't a casual query—it is the one deeply uncomfortable, pointed question you have been avoiding. It slices through your pretense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARCHITECTURE SECTION (The 4 Voices / Round System) ─── */}
      <section id="architecture" className="relative z-10 py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/[0.05] bg-black/20 v-section">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 v-slide-up">
          <div className="max-w-2xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#D97706]/40"></span>
              The Sabha Architecture
            </h2>
            <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-medium tracking-tight mb-6">Four distinct heuristics. <br/><i className="text-white/60">One unalterable verdict.</i></h3>
          </div>
          <p className="font-[family-name:var(--font-lora)] text-[#B8B0A8] italic text-base max-w-md leading-relaxed border-l border-white/10 pl-6 hidden md:block">
            In ancient India, no king made an irreversible act without convening the Sabha. Every voice had a designated role. No decision left without a verdict. We digitized the protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/[0.05] rounded-sm overflow-hidden v-slide-up">
          {/* Node 01 */}
          <div className="bg-[#0a0a0c] p-10 group hover:bg-[#111114] transition-colors duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#DC2626]/5 rounded-full blur-[40px] group-hover:bg-[#DC2626]/10 transition-colors"></div>
            <div className="mb-10 text-white/20 group-hover:text-[#DC2626] transition-colors duration-500">
              <Binary strokeWidth={1} className="w-8 h-8" />
            </div>
            <div className="font-mono text-[10px] text-[#DC2626] uppercase tracking-widest mb-4">Node_01 // Vitarka</div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-3 text-white/90">Pure Logic</h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Deliberate counter-reasoning. Finds every flaw, challenges every assumption, and maps the exact mechanical risks of the proposition.
            </p>
          </div>

          {/* Node 02 */}
          <div className="bg-[#0a0a0c] p-10 group hover:bg-[#111114] transition-colors duration-500 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#16A34A]/5 rounded-full blur-[40px] group-hover:bg-[#16A34A]/10 transition-colors"></div>
            <div className="mb-10 text-white/20 group-hover:text-[#16A34A] transition-colors duration-500">
              <Sparkles strokeWidth={1} className="w-8 h-8" />
            </div>
            <div className="font-mono text-[10px] text-[#16A34A] uppercase tracking-widest mb-4">Node_02 // Asha</div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-3 text-white/90">Upside Theory</h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              The rising possibility. Identifies massive leverage where others see blockers. Calculates mathematical upper-bound success potential.
            </p>
          </div>

          {/* Node 03 */}
          <div className="bg-[#0a0a0c] p-10 group hover:bg-[#111114] transition-colors duration-500 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706]/5 rounded-full blur-[40px] group-hover:bg-[#D97706]/10 transition-colors"></div>
            <div className="mb-10 text-white/20 group-hover:text-[#D97706] transition-colors duration-500">
              <Anchor strokeWidth={1} className="w-8 h-8" />
            </div>
            <div className="font-mono text-[10px] text-[#D97706] uppercase tracking-widest mb-4">Node_03 // Yukti</div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-3 text-white/90">Practical Vector</h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Applied wisdom. Rejects pure theory. Demands to know exactly what actually works right now given your real-world resource constraints.
            </p>
          </div>

          {/* Node 04 */}
          <div className="bg-[#0a0a0c] p-10 group hover:bg-[#111114] transition-colors duration-500 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-[40px] group-hover:bg-[#2563EB]/10 transition-colors"></div>
            <div className="mb-10 text-white/20 group-hover:text-[#2563EB] transition-colors duration-500">
              <Shuffle strokeWidth={1} className="w-8 h-8" />
            </div>
            <div className="font-mono text-[10px] text-[#2563EB] uppercase tracking-widest mb-4">Node_04 // Vipaksha</div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-3 text-white/90">The Opposition</h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              The adversary. Explicitly built to reframe the entire question and attack the foundational premise of your worldview.
            </p>
          </div>
        </div>
        
        {/* Phase Progression Engine inside Architecture */}
        <div className="mt-24 pt-24 border-t border-white/[0.05] v-slide-up">
          <div className="max-w-4xl mx-auto text-center relative">
            <h4 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight mb-12 text-white/90">The 3-Round Trividha Protocol</h4>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 relative text-left">
              <div className="absolute top-4 left-[10%] right-[10%] h-[1px] bg-white/10 hidden md:block">
                <div className="h-full bg-[#D97706]/50 w-1/3"></div>
              </div>
              
              <div className="relative z-10 w-full md:w-1/3 flex flex-col pt-2">
                <div className="w-4 h-4 rounded-full bg-[#E8E3DC] mb-6 shadow-[0_0_15px_rgba(232,227,220,0.5)] border-2 border-[#1A1510]"></div>
                <span className="font-mono text-xs text-[#D97706] mb-2 tracking-widest">ROUND 01</span>
                <h5 className="font-[family-name:var(--font-display)] text-xl mb-2 text-white">Pratham Paksha</h5>
                <p className="text-sm text-white/50 font-light leading-relaxed">The 4 heuristics present independent assessments. No cross-talk. Pure individual bias mapped against your constraints.</p>
              </div>
              
              <div className="relative z-10 w-full md:w-1/3 flex flex-col pt-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-4 h-4 rounded-full border-2 border-white/30 bg-[#0a0a0c] mb-6"></div>
                <span className="font-mono text-xs text-[#D97706] mb-2 tracking-widest">ROUND 02</span>
                <h5 className="font-[family-name:var(--font-display)] text-xl mb-2 text-white">Khandana</h5>
                <p className="text-sm text-white/50 font-light leading-relaxed">The models turn on each other. They actively discover structural flaws in the opposing arguments to synthesize higher-order truth.</p>
              </div>
              
              <div className="relative z-10 w-full md:w-1/3 flex flex-col pt-2 opacity-40 hover:opacity-100 transition-opacity">
                <div className="w-4 h-4 rounded-full border-2 border-white/30 bg-[#0a0a0c] mb-6"></div>
                <span className="font-mono text-xs text-[#D97706] mb-2 tracking-widest">ROUND 03</span>
                <h5 className="font-[family-name:var(--font-display)] text-xl mb-2 text-white">Nirnaya</h5>
                <p className="text-sm text-white/50 font-light leading-relaxed">The system synthesizes the noise into a ruthless, structured executive judgment. The decision is logged. History is recorded.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCIENCE SECTION (Brand Voice / Truth) ─── */}
      <section id="science" className="relative z-10 py-40 px-6 md:px-12 bg-[#050505] v-section text-center border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <Quote className="w-12 h-12 text-[#9B1C1C] mx-auto mb-10 v-slide-up opacity-50" />
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.5rem)] font-medium tracking-tight leading-[1.1] mb-8 v-slide-up text-[#E8E3DC]">
            Varant does not congratulate you.<br/>
            <span className="italic text-white/40 font-light">Varant does not reassure you.</span>
          </h2>
          <p className="font-[family-name:var(--font-lora)] text-xl md:text-2xl text-white/50 italic leading-relaxed max-w-3xl mx-auto mb-16 v-slide-up">
            You bring the dilemma. It convenes the Sabha, renders the Nirnaya, and etches it into your Smriti forever. What you do with it is your burden to bear.
          </p>

          <Link href="/demo" className="inline-flex items-center gap-4 bg-[#E8E3DC] text-[#0a0a0c] px-12 py-5 rounded-sm hover:scale-105 transition-transform v-slide-up shadow-[0_0_30px_rgba(232,227,220,0.1)] hover:bg-white">
            <span className="text-sm font-bold uppercase tracking-[0.15em]">Initialize Protocol</span>
          </Link>
        </div>
      </section>

      {/* ─── Data Footer ─── */}
      <footer className="relative z-10 border-t border-[#D97706]/20 bg-[#020202] pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="max-w-sm">
            <div className="mb-6">
              <span className="font-[family-name:var(--font-display)] italic text-2xl font-semibold tracking-tight text-white/90">
                <span className="text-[#DC2626]">v</span>arant
              </span>
            </div>
            <p className="text-sm text-white/40 font-light leading-relaxed mb-8">
              A computational architecture mapping ancient heuristic protocols onto modern language primitives. Build better trajectories.
            </p>
            <div className="font-mono text-[10px] text-[#D97706]/60 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-[#D97706]/60 rounded-full"></div>
               TCP/IP Handshake secure
            </div>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#E8E3DC]">Theory</h4>
              <Link href="#" className="text-sm text-white/40 hover:text-[#D97706] transition-colors">Nyaya Shastra</Link>
              <Link href="#" className="text-sm text-white/40 hover:text-[#D97706] transition-colors">Arthashastra</Link>
              <Link href="#" className="text-sm text-white/40 hover:text-[#D97706] transition-colors">Mimamsa Dynamics</Link>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#E8E3DC]">System</h4>
              <Link href="/demo" className="text-sm text-white/40 hover:text-[#D97706] transition-colors">Run Simulation</Link>
              <Link href="#" className="text-sm text-white/40 hover:text-[#D97706] transition-colors">Pricing</Link>
              <Link href="#" className="text-sm text-white/40 hover:text-[#D97706] transition-colors">Enterprise API</Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-mono text-white/20 tracking-widest gap-4">
          <p>&copy; {new Date().getFullYear()} Varant. Decide like it can't be undone.</p>
          <p>SYS.VER_2.4.9 // LATENCY: 12ms</p>
        </div>
      </footer>
      
      {/* Page Transition Overlays */}
      <div className="fixed inset-0 bg-[#0a0a0c] z-[100] origin-top v-reveal-overlay"></div>
    </main>
  );
}
