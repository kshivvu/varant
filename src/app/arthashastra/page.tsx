import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Swords, Eye, Shield, Lightbulb, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "Arthashastra — The Strategic Framework Behind Varant",
  description:
    "How Chanakya's 4th century BCE Arthashastra — the world's first systematic framework for strategic decisions under uncertainty — informs Varant.",
};

export default function ArthashastraPage() {
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
            Arthashastra
          </h1>
          <p className="font-[family-name:var(--font-lora)] italic text-[#666] text-xl font-light leading-relaxed max-w-2xl">
            &quot;The world&apos;s first systematic framework for strategic decisions under uncertainty.
            Still studied in business schools 2,400 years later.&quot;
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full varant-jali-border mb-16"></div>

        {/* Introduction */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            What is the Arthashastra?
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            The <strong className="text-[#1A1510] font-medium">Arthashastra</strong> (अर्थशास्त्र) — literally
            &quot;the science of wealth and statecraft&quot; — was composed by <strong className="text-[#1A1510] font-medium">Kautilya
            (Chanakya)</strong> in the 4th century BCE. It is a comprehensive treatise on governance,
            economics, military strategy, and most significantly for Varant — <strong className="text-[#1A1510] font-medium">decision-making
            under extreme uncertainty</strong>.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            Chanakya served as the chief advisor to Emperor Chandragupta Maurya, helping him build
            the largest empire ancient India had ever seen. The Arthashastra was his playbook — a
            systematic guide for rulers facing irreversible choices with imperfect information,
            hostile environments, and existential stakes.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed">
            Sound familiar? This is exactly the state of every early-stage founder.
          </p>
        </div>

        {/* Core Decision Principles */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            Core Decision Principles
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-8">
            The Arthashastra outlined strategic frameworks that Varant translates into its deliberation engine:
          </p>

          <div className="space-y-6">
            {/* Principle 1 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626] mt-1">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  Shadgunya — The Six-Fold Policy
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-3">षाड्गुण्य</span>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  Chanakya identified six strategic postures available to a decision-maker: peace (sandhi),
                  war (vigraha), marching (yana), halting (asana), seeking shelter (samshraya), and dual
                  policy (dvaidhibhava). For every irreversible decision, you have a limited set of
                  possible stances — the Arthashastra forces you to name which one you&apos;re taking and why.
                  Varant&apos;s four personas collectively explore these stances for your decision.
                </p>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] mt-1">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  The Council of Ministers
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-3">अमात्य परिषद</span>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  Chanakya insisted that no king should decide alone. He prescribed a formal council
                  (<em>Mantri Parishad</em>) with members assigned opposing viewpoints — not because
                  they personally disagreed, but because the system required structured dissent.
                  Varant&apos;s four-persona Sabha is a direct digital descendant of this institution.
                </p>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04] mt-1">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  Upayas — The Four Strategic Means
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-3">उपाय</span>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  Every strategy has four levers: <strong className="text-[#1A1510] font-medium">Sama</strong> (negotiation/diplomacy),{" "}
                  <strong className="text-[#1A1510] font-medium">Dana</strong> (incentivization),{" "}
                  <strong className="text-[#1A1510] font-medium">Bheda</strong> (creating internal divisions in the adversary), and{" "}
                  <strong className="text-[#1A1510] font-medium">Danda</strong> (force/punishment). Varant&apos;s personas
                  naturally map to these — Asha operates in Sama mode, Yukti in Dana, Vipaksha in Bheda,
                  and Vitarka in Danda.
                </p>
              </div>
            </div>

            {/* Principle 4 */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] mt-1">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  Anviksiki — The Lamp of All Sciences
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-3">आन्वीक्षिकी</span>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  Chanakya called critical reasoning (<em>Anviksiki</em>) &quot;the lamp of all sciences, the
                  means of all actions, and the refuge of all virtues.&quot; He placed it as the foundational
                  discipline — before economics, before statecraft, before military strategy. Without clear
                  reasoning, every other competence fails. This is Varant&apos;s core thesis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Arthashastra & Founders */}
        <div className="mb-16">
          <div className="bg-[#1A1510] text-[#E8E3DC] rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-6 h-6 text-[#D97706]" />
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                Why This Matters for Founders
              </h2>
            </div>
            <div className="space-y-4 text-[15px] text-[#B8B0A8] leading-relaxed">
              <p>
                Chanakya wrote the Arthashastra for rulers making <strong className="text-white font-medium">existential bets</strong> —
                decisions where the wrong call meant loss of kingdom, wealth, or life. He didn&apos;t optimize for
                &quot;best answer.&quot; He optimized for{" "}
                <strong className="text-[#D97706] font-medium">the best decision-making process possible under uncertainty</strong>.
              </p>
              <p>
                Today&apos;s founders face structurally identical challenges: incomplete information, hostile market dynamics,
                emotional pressure, conflicting advice, and irreversibility. The Arthashastra&apos;s genius was recognizing
                that <em className="text-white/80">individual judgment — no matter how brilliant — is insufficient</em>.
                You need structured, adversarial deliberation. You need a Sabha.
              </p>
              <p className="text-white/60 text-sm">
                Varant doesn&apos;t just draw inspiration from the Arthashastra. It executes its underlying logic with modern AI models.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 pt-12 border-t border-[#E8E3DC] text-center">
          <p className="text-[#666] text-lg mb-8 font-light">
            Let Chanakya&apos;s strategic framework work on your next irreversible bet.
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
