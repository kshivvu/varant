import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ShieldCheck, Eye, Server, AlertTriangle, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Varant",
  description:
    "How Varant handles your data. No decision data stored. No PII collected. Sessions are stateless.",
};

export default function PrivacyPage() {
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
            Niti · नीति
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-[#1A1510] mb-6">
            Privacy Policy
          </h1>
          <p className="text-[#666] text-lg font-light leading-relaxed max-w-2xl">
            Varant is built on a principle rooted in ancient Indian councils: what
            is deliberated in the Sabha stays in the Sabha. Your decisions are
            yours — we do not store, sell, or use them.
          </p>
          <p className="text-[12px] text-[#999] mt-4 uppercase tracking-widest">
            Last updated: March 2026
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full varant-jali-border mb-16"></div>

        {/* Sections */}
        <div className="space-y-16">
          {/* 1. No Decision Data Stored */}
          <section className="flex gap-6 group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] mt-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                No Decision Data Stored
              </h2>
              <p className="text-[15px] text-[#555] leading-relaxed">
                Your Vichar sessions are <strong className="text-[#1A1510] font-medium">completely stateless</strong>.
                The decisions, context, and arguments you share with the Sabha are processed
                in real-time and <strong className="text-[#1A1510] font-medium">never persisted server-side</strong>.
                Once the session ends, the data ceases to exist on our infrastructure.
              </p>
            </div>
          </section>

          {/* 2. No PII Collected */}
          <section className="flex gap-6 group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] mt-1">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                No Personal Information Collected
              </h2>
              <p className="text-[15px] text-[#555] leading-relaxed">
                The current version of Varant requires <strong className="text-[#1A1510] font-medium">no login, no account creation, and no personal information</strong>.
                You simply begin your Vichar. There are no cookies for tracking,
                no analytics fingerprinting, and no advertising identifiers.
              </p>
            </div>
          </section>

          {/* 3. OpenRouter & Third-Party API */}
          <section className="flex gap-6 group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04] mt-1">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                Third-Party AI Providers
              </h2>
              <p className="text-[15px] text-[#555] leading-relaxed mb-4">
                Varant routes your deliberation to multiple AI models via the{" "}
                <strong className="text-[#1A1510] font-medium">OpenRouter API</strong>.
                All model calls are governed by{" "}
                <a
                  href="https://openrouter.ai/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9B1C1C] underline underline-offset-2 hover:text-[#D97706] transition-colors"
                >
                  OpenRouter&apos;s privacy policy
                </a>
                . By default, providers <strong className="text-[#1A1510] font-medium">do not train on API inputs</strong>.
              </p>
              <p className="text-[15px] text-[#555] leading-relaxed">
                The models used include Gemini Flash, GPT-4.1 Nano, Qwen 3.5 Flash, and
                Gemini Flash Lite. Each model processes your input only for the
                duration of the session response.
              </p>
            </div>
          </section>

          {/* 4. Not Professional Advice */}
          <section className="flex gap-6 group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626] mt-1">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                Not Professional Advice
              </h2>
              <p className="text-[15px] text-[#555] leading-relaxed">
                Varant is a <strong className="text-[#1A1510] font-medium">deliberation tool</strong>,
                not a substitute for professional legal, medical, or financial
                advice. The Sabha&apos;s voices argue fixed philosophical positions to
                help you reason — they are not qualified advisors and their output
                should not be treated as authoritative guidance.
              </p>
            </div>
          </section>

          {/* 5. No Manipulation */}
          <section className="flex gap-6 group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] mt-1">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
                No Manipulation
              </h2>
              <p className="text-[15px] text-[#555] leading-relaxed">
                The four personas — Vitarka, Asha, Yukti, and Vipaksha — argue from{" "}
                <strong className="text-[#1A1510] font-medium">fixed philosophical positions</strong>.
                They are not optimized for any outcome, conversion, or bias. The
                Sabha&apos;s structure ensures opposing perspectives are always
                represented. The Nirnaya (verdict) is a synthesis, not a sales pitch.
              </p>
            </div>
          </section>
        </div>

        {/* Closing */}
        <div className="mt-24 pt-12 border-t border-[#E8E3DC]">
          <p className="text-sm text-[#999] font-light leading-relaxed">
            Questions about this policy? Reach out to us on our{" "}
            <Link href="/contact" className="text-[#9B1C1C] hover:text-[#D97706] transition-colors underline underline-offset-2">
              contact page
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
