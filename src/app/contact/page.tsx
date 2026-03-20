import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Mail, MapPin, Globe, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Varant",
  description:
    "Get in touch with the Varant team — Syntax Terror from KCC Institute of Technology & Management.",
};

export default function ContactPage() {
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
            Sampark · संपर्क
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-[#1A1510] mb-6">
            Contact Us
          </h1>
          <p className="text-[#666] text-lg font-light leading-relaxed max-w-2xl">
            Have a question, feedback, or want to explore Varant for your team?
            We&apos;d love to hear from you.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full varant-jali-border mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column — Contact Info */}
          <div className="space-y-10">
            {/* Email */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#9B1C1C]/10 flex items-center justify-center text-[#9B1C1C]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-1">Email</h3>
                <a
                  href="mailto:team@varant.ai"
                  className="text-[15px] text-[#9B1C1C] hover:text-[#D97706] transition-colors underline underline-offset-2"
                >
                  team@varant.ai
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-1">Location</h3>
                <p className="text-[15px] text-[#555] leading-relaxed">
                  KCC Institute of Technology &amp; Management
                  <br />
                  Greater Noida, India
                </p>
              </div>
            </div>

            {/* Live Demo */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-1">Live Demo</h3>
                <a
                  href="https://varant-ai.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-[#9B1C1C] hover:text-[#D97706] transition-colors underline underline-offset-2"
                >
                  varant-ai.vercel.app
                </a>
              </div>
            </div>
          </div>

          {/* Right Column — The Team */}
          <div>
            <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DC] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#1A1510] flex items-center justify-center text-white">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                    Team Syntax Terror
                  </h3>
                  <p className="text-[11px] text-[#999] uppercase tracking-widest">
                    HackIndia Spark 4 — Open Innovation
                  </p>
                </div>
              </div>

              <div className="h-px w-full varant-jali-border mb-6"></div>

              <ul className="space-y-4">
                {[
                  "Yash Panchal",
                  "Shivam Kumar",
                  "Shambhavi Mishra",
                  "Shubhanshu Singh",
                ].map((name) => (
                  <li key={name} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#D97706]/60"></span>
                    <span className="text-[15px] text-[#333] font-medium">{name}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#E8E3DC]">
                <p className="text-[13px] text-[#777] leading-relaxed font-[family-name:var(--font-lora)] italic">
                  &quot;2,500 years ago, Indian kings had a Sabha before every
                  irreversible decision. We&apos;re giving founders their Sabha back.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 pt-12 border-t border-[#E8E3DC] text-center">
          <p className="text-[#666] text-lg mb-8 font-light">
            Ready to deliberate? Begin your Vichar now.
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
