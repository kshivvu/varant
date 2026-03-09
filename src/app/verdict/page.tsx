'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, Zap, Search, Target } from 'lucide-react';
import VerdictCard, { ConfidenceBar } from '@/components/VerdictCard';
import { VerdictData } from '@/types/council';
import { useChime } from '@/hooks/useChime';

function parseVerdict(raw: string): VerdictData {
  const sections: Record<string, string> = {};
  const sectionHeaders = [
    'Consensus Points', 'Consensus', 'Key Tensions', 'Tensions',
    'Recommendation', 'Matra',
    "The Unseen", "What You\u2019re Missing", "What's Missing",
    "Missing Information", "What You Need",
  ];

  const normalized = raw.replace(/[\u2018\u2019]/g, "'");
  let currentSection = '';

  for (const line of normalized.split('\n')) {
    const trimmed = line.trim();
    const cleanedLine = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '');

    const matchedHeader = sectionHeaders.find(
      (h) => cleanedLine.toLowerCase().startsWith(h.toLowerCase())
    );

    if (matchedHeader) {
      if (matchedHeader === 'Consensus') currentSection = 'Consensus Points';
      else if (matchedHeader === 'Tensions') currentSection = 'Key Tensions';
      else if (matchedHeader.toLowerCase().includes('missing') || matchedHeader.toLowerCase().includes('need') || matchedHeader.toLowerCase().includes('unseen'))
        currentSection = 'The Unseen';
      else currentSection = matchedHeader;
      sections[currentSection] = '';
    } else if (currentSection) {
      sections[currentSection] = (sections[currentSection] + '\n' + trimmed).trim();
    }
  }

  let confidence = 65;
  let confidenceExplanation = '';
  const confidenceRaw = sections['Matra'] || sections['Confidence Score'] || '';

  const pipeMatch = confidenceRaw.match(/(\d+)\s*\|?\s*([\s\S]*)/);
  if (pipeMatch) {
    confidence = Math.min(100, Math.max(0, parseInt(pipeMatch[1], 10)));
    confidenceExplanation = pipeMatch[2]?.trim() || '';
  } else {
    const numMatch = confidenceRaw.match(/(\d+)/);
    if (numMatch) confidence = Math.min(100, Math.max(0, parseInt(numMatch[1], 10)));
    confidenceExplanation = confidenceRaw.replace(/\d+%?/, '').replace(/\|/, '').trim();
  }

  return {
    consensus: sections['Consensus Points'] || 'No consensus data available.',
    tensions: sections['Key Tensions'] || 'No tension data available.',
    recommendation: sections['Recommendation'] || 'No recommendation available.',
    confidence,
    confidenceExplanation,
    missing: sections['The Unseen'] || sections["What You're Missing"] || 'No missing info identified.',
  };
}

export default function VerdictScreen() {
  const router = useRouter();
  const [verdict, setVerdict] = useState<VerdictData | null>(null);
  const [rawVerdict, setRawVerdict] = useState('');
  const [question, setQuestion] = useState('');
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const { playChime, isMuted, toggleMute } = useChime();
  const scoreAnimStarted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('Varant_verdict');
    if (!stored) { router.push('/'); return; }
    const data = JSON.parse(stored);
    setQuestion(data.question);
    setRawVerdict(data.verdictRaw);
    setVerdict(parseVerdict(data.verdictRaw));
  }, [router]);

  useGSAP(() => {
    if (!verdict) return;
    
    // Premium cinematic GSAP timeline entry
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.fromTo(headerRef.current,
      { y: -40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1 }
    )
    .fromTo(questionRef.current,
      { y: 30, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
      "-=0.6"
    )
    .fromTo('.gs-verdict-card',
      { y: 40, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, stagger: {
          each: 0.3,
          onStart: () => {
            playChime();
          }
        } 
      },
      "-=0.6"
    )
    .fromTo('.gs-actions', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );
  }, { scope: containerRef, dependencies: [verdict] });

  useEffect(() => {
    if (verdict && !scoreAnimStarted.current) {
      scoreAnimStarted.current = true;
      const target = verdict.confidence;
      const duration = 1500;
      
      // Delay score animation until it appears in the GSAP cascade
      setTimeout(() => {
        const startTime = performance.now();
        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setAnimatedScore(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, 2400); 
    }
  }, [verdict]);

  const copyToClipboard = useCallback(async () => {
    const text = `VARANT SHASTRA\n${'='.repeat(40)}\n\nQuestion: ${question}\n\n${rawVerdict}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [question, rawVerdict]);

  const startNew = () => {
    sessionStorage.removeItem('Varant_session');
    sessionStorage.removeItem('Varant_verdict');
    router.push('/');
  };

  if (!verdict) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#E8711A]/20 border-t-[#E8711A] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-screen sarvam-hero-grad z-[-1] opacity-70" />

      <main className="min-h-screen pb-24 font-sans" ref={containerRef}>
        {/* Dynamic Island Header */}
        <div className="pt-8 px-6 sticky top-6 z-50 flex justify-center pointer-events-none" ref={headerRef}>
          <div className="bg-white/80 backdrop-blur-3xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-6 py-3 flex items-center justify-between gap-12 pointer-events-auto transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] min-w-[320px]">
            <h1 className="text-xl font-normal tracking-[-0.02em] font-[family-name:var(--font-display)] text-[#1A1A1A]">
              <span className="text-[#E8711A]">V</span>arant
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#1A1A1A] uppercase">Nirnaya</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 mt-4">
          {/* Question / Hero Block */}
          <div 
            ref={questionRef}
            className="w-full bg-white/60 backdrop-blur-3xl border border-white/50 rounded-[32px] p-10 md:p-16 shadow-[0_8px_40px_rgba(0,0,0,0.04)] mb-8 flex flex-col justify-center"
          >
             <span className="text-[11px] font-bold text-[#767676] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                The Sabha&apos;s Final Nirnaya
             </span>
             <p className="text-4xl md:text-5xl lg:text-5xl font-[family-name:var(--font-display)] text-[#1A1A1A] leading-[1.2] tracking-tight">
               "{question}"
             </p>
          </div>

          {/* Verdict Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Full Width Consensus */}
              <div className="md:col-span-12 gs-verdict-card h-full">
                <VerdictCard className="h-full" title="Consensus Points" icon={<CheckCircle2 className="w-5 h-5" />} accentColor="border-l-[3px] border-l-[#4CAF70]" content={verdict.consensus} />
              </div>

              {/* Split Middle: Tensions & The Unseen */}
              <div className="md:col-span-6 gs-verdict-card h-full">
                <VerdictCard className="h-full" title="Key Tensions" icon={<Zap className="w-5 h-5" />} accentColor="border-l-[3px] border-l-[#F5A623]" content={verdict.tensions} />
              </div>

              <div className="md:col-span-6 gs-verdict-card h-full">
                <VerdictCard className="h-full" title="The Unseen" icon={<Search className="w-5 h-5" />} accentColor="border-l-[3px] border-l-blue-400" content={verdict.missing} />
              </div>

              {/* Bottom: Recommendation alongside TensionMeter equivalent (ConfidenceBar) */}
              <div className="md:col-span-8 gs-verdict-card h-full">
                <VerdictCard className="h-full" title="Recommendation" icon={<Target className="w-5 h-5" />} accentColor="border-l-[3px] border-l-[#E8711A]" content={verdict.recommendation} />
              </div>

              <div className="md:col-span-4 gs-verdict-card h-full">
                <ConfidenceBar score={animatedScore} explanation={verdict.confidenceExplanation} />
              </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-16 mb-24 gs-actions w-full">
            <button
              onClick={copyToClipboard}
              className="btn-secondary px-8 py-4"
            >
              {copied ? '✓ Copied' : '📋 Copy Shastra'}
            </button>
              
            <button
              onClick={startNew}
              className="btn-primary px-8 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
            >
              Begin a New Vichar →
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
