import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, RotateCcw, Search, CalendarCheck, TrendingUp, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Mimamsa Rules — The Philosophy of Review Behind Varant",
  description:
    "How Mimamsa — the ancient Indian school of deep critical re-examination — powers Varant's Smriti and decision review system.",
};

export default function MimamsaRulesPage() {
  return (
    <main className="bg-[#F5F2EC] text-[#1A1510] font-[family-name:var(--font-inter)] min-h-screen relative overflow-x-hidden">
      {/* Background Textures */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="varant-mesh-grad"></div>
        <div className="varant-grain-overlay"></div>
      </div>

      {/* Back Navigation */}
      <nav className="relative z-10 pt-8 px-6 md:px-12 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#767676] hover:text-[#9B1C1C] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Varant</span>
        </Link>
      </nav>

      {/* Content */}
      <article className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-32">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#9B1C1C] uppercase mb-4">
            Source · स्रोत
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-[#1A1510] mb-6">
            Mimamsa Rules
          </h1>
          <p className="font-[family-name:var(--font-lora)] italic text-[#666] text-xl font-light leading-relaxed max-w-2xl">
            &quot;An entire school of philosophy dedicated to returning, re-examining, and deepening
            understanding of what was decided.&quot;
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full varant-jali-border mb-16"></div>

        {/* Introduction */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            What is Mimamsa?
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            <strong className="text-[#1A1510] font-medium">Mimamsa</strong> (मीमांसा) literally means
            &quot;deep critical re-examination&quot; — the deliberate act of returning to what was previously
            established and questioning it again with fresh evidence and renewed perspective.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            As one of the six classical schools of Indian philosophy, Mimamsa was unique in its insistence
            that <strong className="text-[#1A1510] font-medium">understanding is never final</strong>. Where other
            traditions sought permanent truths, Mimamsa built a systematic methodology for
            <strong className="text-[#1A1510] font-medium"> revisiting decisions, testing assumptions against new data,
            and refining judgment over time</strong>.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed">
            Founded by the sage <strong className="text-[#1A1510] font-medium">Jaimini</strong>, the Mimamsa Sutras
            established principles of interpretation and re-interpretation that became the bedrock of
            Indian legal and philosophical reasoning for centuries.
          </p>
        </div>

        {/* The Two Schools */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            The Two Schools of Mimamsa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="varant-persona-card p-8 rounded-2xl relative">
              <div className="w-11 h-11 rounded-full bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04] mb-6">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-1">Purva Mimamsa</h3>
              <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-4">पूर्व मीमांसा · Earlier Inquiry</span>
              <p className="text-[14px] text-[#555] leading-relaxed">
                Focused on the rules of correct action (<em>Dharma</em>) — how to analyze duties,
                obligations, and prescribed actions. It developed rigorous canons of interpretation
                to resolve conflicts between competing principles. In Varant, this maps to how
                the Shastra (decision memo) captures the reasoning and rules behind each Vichar.
              </p>
            </div>

            <div className="varant-persona-card p-8 rounded-2xl relative">
              <div className="w-11 h-11 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] mb-6">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-1">Uttara Mimamsa</h3>
              <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-4">उत्तर मीमांसा · Later Inquiry</span>
              <p className="text-[14px] text-[#555] leading-relaxed">
                Also known as <em>Vedanta</em>, this school focused on deeper philosophical inquiry —
                examining the nature of knowledge itself and questioning foundational assumptions.
                This maps to Varant&apos;s Mimamsa reviews: returning to a past Shastra with new outcomes
                and asking what you got right and what you missed.
              </p>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            Core Principles of Mimamsa
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-8">
            Mimamsa established interpretive canons that remain relevant to how founders should review their decisions:
          </p>

          <div className="space-y-6">
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#9B1C1C]/10 flex items-center justify-center text-[#9B1C1C] mt-1">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  Periodic Re-examination is Mandatory
                </h3>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  Mimamsa scholars didn&apos;t treat prior interpretations as settled law forever. They built
                  <strong className="text-[#1A1510] font-medium"> scheduled, systematic reviews</strong> into
                  their practice. Varant implements this as the <strong className="text-[#1A1510] font-medium">Mimamsa Review</strong> — a
                  30/60/90 day reminder to revisit your Shastra with new evidence and hindsight.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] mt-1">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  Judgment Compounds Over Time
                </h3>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  The Mimamsa tradition viewed understanding as <strong className="text-[#1A1510] font-medium">cumulative</strong> —
                  each review built upon previous interpretations, creating a richer, more accurate picture.
                  This is the core idea behind Varant&apos;s <strong className="text-[#1A1510] font-medium">Smriti</strong> (स्मृति) —
                  your permanent, longitudinal record of decisions, reasoning, and outcomes that reveals
                  patterns in your judgment over time.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04] mt-1">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  Conflict Between Rules Requires Method
                </h3>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  When two valid principles clashed, Mimamsa didn&apos;t pick sides arbitrarily. It applied
                  a hierarchy of interpretive rules — context, specificity, recency, and purpose. Varant&apos;s
                  Khandana round embodies this: when Vitarka and Asha fundamentally disagree, the conflict
                  itself is the signal. The Sangharsha (tension meter) quantifies and surfaces it rather than suppressing it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Varant's Mimamsa System */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            Varant&apos;s Mimamsa System
          </h2>
          <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DC] rounded-2xl p-8">
            <p className="text-[15px] text-[#555] leading-relaxed mb-6">
              Varant doesn&apos;t just deliberate — it builds a system for you to <strong className="text-[#1A1510] font-medium">get
              smarter from your own decisions over time</strong>:
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "Shastra",
                  sanskrit: "शास्त्र",
                  desc: "Every session produces a permanent, structured decision record — what was argued, what was weighed, and the final Matra (confidence score)."
                },
                {
                  label: "Smriti",
                  sanskrit: "स्मृति",
                  desc: "Your personal collection of Shastras — every decision you made, why, and what actually happened. Over time, it becomes a mirror of your judgment."
                },
                {
                  label: "Mimamsa Review",
                  sanskrit: "मीमांसा",
                  desc: "Scheduled 30/60/90 day reviews that prompt you to revisit a past Shastra. Did the Nirnaya hold up? What did you miss? How has the context changed?"
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start bg-[#F5F2EC]/80 border border-[#E8E3DC] rounded-xl px-6 py-4">
                  <span className="w-2 h-2 rounded-full bg-[#D97706] mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-[family-name:var(--font-display)] font-semibold text-[#1A1510]">{item.label}</span>
                    <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase ml-2">{item.sanskrit}</span>
                    <p className="text-[14px] text-[#555] mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mb-16 text-center">
          <blockquote className="font-[family-name:var(--font-display)] italic text-2xl md:text-3xl text-[#1A1510]/80 leading-snug max-w-3xl mx-auto">
            &quot;Your judgment is your most underrated asset. Mimamsa builds it systematically.&quot;
          </blockquote>
        </div>

        {/* CTA */}
        <div className="mt-24 pt-12 border-t border-[#E8E3DC] text-center">
          <p className="text-[#666] text-lg mb-8 font-light">
            Start building your Smriti. Begin deliberating.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-3 bg-[#1A1510] text-white px-8 py-4 rounded-full hover:bg-[#9B1C1C] transition-colors text-sm font-semibold uppercase tracking-[0.12em] group"
          >
            Begin Your Vichar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>
    </main>
  );
}
