import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Scale, BookOpen, Users, MessageSquare, Gavel } from "lucide-react";

export const metadata: Metadata = {
  title: "Nyaya Sutras — The Science Behind Varant's Reasoning",
  description:
    "How the ancient Nyaya Shastra — India's 2,500-year-old science of logical argumentation — powers Varant's structured deliberation.",
};

export default function NyayaSutrasPage() {
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
            Nyaya Sutras
          </h1>
          <p className="font-[family-name:var(--font-lora)] italic text-[#666] text-xl font-light leading-relaxed max-w-2xl">
            &quot;The science of logical argumentation and correct reasoning — structured debate with
            formal roles, formal rules, and a formal verdict.&quot;
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full varant-jali-border mb-16"></div>

        {/* Introduction */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            What is Nyaya?
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            <strong className="text-[#1A1510] font-medium">Nyaya</strong> (न्याय) literally means
            &quot;that by which one is guided to a conclusion&quot; — it is one of the six classical schools
            (<em>Darshanas</em>) of Indian philosophy. Founded by the sage <strong className="text-[#1A1510] font-medium">Gautama</strong> (also
            known as Akshapada) around the 2nd century BCE, the Nyaya Sutras laid out a rigorous
            framework for valid reasoning, logical argumentation, and the pursuit of truth through structured debate.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            Unlike casual discussion, Nyaya demanded <strong className="text-[#1A1510] font-medium">formal roles</strong> for
            each participant, <strong className="text-[#1A1510] font-medium">formal rules</strong> governing argument
            structure, and a <strong className="text-[#1A1510] font-medium">formal verdict</strong> at the conclusion.
            No debate was complete without resolution. This is the antithesis of modern &quot;let me think about it&quot; paralysis.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed">
            The Nyaya system recognized 16 categories of logical discourse (<em>Padarthas</em>), including
            means of valid knowledge, objects of inquiry, doubt, purpose, example, established doctrine,
            and most importantly — the structured debate itself.
          </p>
        </div>

        {/* The Formal Debate Structure */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            The Formal Debate Structure
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-8">
            Nyaya codified three types of debate, each with increasing rigor. Varant&apos;s Sabha draws
            from all three:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="varant-persona-card p-7 rounded-2xl relative">
              <div className="w-11 h-11 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] mb-6">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">Vada</h3>
              <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-3">वाद · Honest Debate</span>
              <p className="text-[13px] text-[#555] leading-relaxed">
                A collaborative discussion where both sides seek truth. Neither participant aims to &quot;win&quot; — the goal
                is mutual understanding. This is the spirit of Varant&apos;s Pratham Paksha round.
              </p>
            </div>

            <div className="varant-persona-card p-7 rounded-2xl relative">
              <div className="w-11 h-11 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626] mb-6">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">Jalpa</h3>
              <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-3">जल्प · Adversarial Debate</span>
              <p className="text-[13px] text-[#555] leading-relaxed">
                A competitive argument where each side defends their position using any legitimate means.
                This maps to Varant&apos;s Khandana round — where voices directly rebut each other.
              </p>
            </div>

            <div className="varant-persona-card p-7 rounded-2xl relative">
              <div className="w-11 h-11 rounded-full bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04] mb-6">
                <Gavel className="w-5 h-5" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">Vitanda</h3>
              <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase block mb-3">वितण्डा · Destructive Critique</span>
              <p className="text-[13px] text-[#555] leading-relaxed">
                Pure attack — finding flaws without needing to offer an alternative. This is the role
                Vitarka and Vipaksha play in every Varant session: ruthless, productive destruction of assumptions.
              </p>
            </div>
          </div>
        </div>

        {/* The Five-Part Syllogism */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            The Five-Part Syllogism
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-8">
            Nyaya established a five-step logical structure (<em>Panchavayava</em>) for any valid argument.
            Every voice in Varant&apos;s Sabha implicitly follows this:
          </p>

          <div className="space-y-4">
            {[
              { num: "01", label: "Pratijna", sanskrit: "प्रतिज्ञा", desc: "The thesis — stating the position to be proved" },
              { num: "02", label: "Hetu", sanskrit: "हेतु", desc: "The reason — the logical ground supporting the thesis" },
              { num: "03", label: "Udaharana", sanskrit: "उदाहरण", desc: "The example — a universally accepted illustration" },
              { num: "04", label: "Upanaya", sanskrit: "उपनय", desc: "The application — connecting the example to the specific case" },
              { num: "05", label: "Nigamana", sanskrit: "निगमन", desc: "The conclusion — the re-statement of the thesis as proven" },
            ].map((step) => (
              <div key={step.num} className="flex gap-5 items-start bg-white/50 backdrop-blur-sm border border-[#E8E3DC] rounded-xl px-6 py-4">
                <span className="text-[11px] font-mono tracking-widest text-[#D97706] mt-1 flex-shrink-0">{step.num}</span>
                <div>
                  <span className="font-[family-name:var(--font-display)] font-semibold text-[#1A1510]">{step.label}</span>
                  <span className="text-[10px] font-mono tracking-widest text-[#767676] uppercase ml-2">{step.sanskrit}</span>
                  <p className="text-[14px] text-[#555] mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How Varant Uses Nyaya */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-6">
            How Varant Uses Nyaya
          </h2>
          <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DC] rounded-2xl p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#9B1C1C]/10 flex items-center justify-center text-[#9B1C1C] flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1510] mb-1">Formal Roles</h4>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    Nyaya demanded designated roles in debate — the proponent (Vadin), the opponent (Prativadin),
                    and the judge (Madhyastha). Varant assigns four fixed personas (Vitarka, Asha, Yukti, Vipaksha)
                    plus a Chairman (Nirnaya) — each with an irrevocable philosophical position.
                  </p>
                </div>
              </div>

              <div className="h-px w-full varant-jali-border"></div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#9B1C1C]/10 flex items-center justify-center text-[#9B1C1C] flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1510] mb-1">Mandatory Resolution</h4>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    In Nyaya, no debate was complete without a verdict. Varant enforces this through the three-round
                    structure: Pratham Paksha → Khandana → Nirnaya. You cannot exit the Sabha without a recorded judgment.
                  </p>
                </div>
              </div>

              <div className="h-px w-full varant-jali-border"></div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#9B1C1C]/10 flex items-center justify-center text-[#9B1C1C] flex-shrink-0 mt-0.5">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1510] mb-1">Structured Conflict</h4>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    Nyaya recognized that truth emerges from controlled friction — not from consensus or individual authority.
                    Varant&apos;s Sangharsha (tension meter) and Khandana (refutation round) are direct implementations of this principle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 pt-12 border-t border-[#E8E3DC] text-center">
          <p className="text-[#666] text-lg mb-8 font-light">
            Experience Nyaya-powered deliberation firsthand.
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
