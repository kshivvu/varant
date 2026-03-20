'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

interface VicharEntry {
  id: string;
  question: string;
  recommendation?: string;
  verdictRaw: string;
  matraScore?: number;
  mimamsaDate: string;
  mimamsaOutcome?: string;
  isContinuation: boolean;
  createdAt: string;
}

function MatraBadge({ score }: { score?: number }) {
  if (!score) return null;
  const color = score >= 70
    ? 'text-green-700 bg-green-50 border-green-200'
    : score >= 45
    ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
    : 'text-red-700 bg-red-50 border-red-200';
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${color}`}>
      {score}% Matra
    </span>
  );
}

function MimamsaStatus({ entry, onUpdate }: { entry: VicharEntry; onUpdate: () => void }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const isDue = new Date(entry.mimamsaDate) <= new Date();

  if (entry.mimamsaOutcome) {
    return (
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-widest mb-1">Mimamsa · Review</p>
        <p className="text-[13px] text-amber-900">{entry.mimamsaOutcome}</p>
      </div>
    );
  }

  if (!isDue) {
    const daysLeft = Math.ceil((new Date(entry.mimamsaDate).getTime() - Date.now()) / 86400000);
    return (
      <p className="text-[11px] text-[#A0998F] mt-3">
        Mimamsa due in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
      </p>
    );
  }

  return (
    <div className="mt-3" onClick={(e) => e.stopPropagation()}>
      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="text-[11px] font-semibold text-[#9B1C1C] border border-[#9B1C1C]/30 px-3 py-1.5 rounded-full hover:bg-[#9B1C1C]/5 transition-colors"
        >
          ⚖ Mimamsa due — What actually happened?
        </button>
      ) : (
        <div className="space-y-2">
          <textarea
            className="w-full text-[13px] p-3 border border-[#E8E3DC] rounded-xl bg-white/80 resize-none focus:outline-none focus:border-[#D97706]/50"
            rows={3}
            placeholder="What actually happened? Was the decision right?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={async () => {
                setSaving(true);
                await fetch('/api/smriti', {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: entry.id, mimamsaOutcome: text }),
                });
                setSaving(false);
                setEditing(false);
                onUpdate();
              }}
              disabled={!text.trim() || saving}
              className="text-[12px] font-semibold bg-[#1A1510] text-white px-4 py-1.5 rounded-full disabled:opacity-40 hover:bg-[#9B1C1C] transition-colors"
            >
              {saving ? 'Saving...' : 'Record'}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-[12px] text-[#A0998F] px-3 py-1.5 rounded-full hover:bg-[#F5F2EE] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SmritiPage() {
  const [entries, setEntries] = useState<VicharEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refresh = async () => {
    const res = await fetch('/api/smriti');
    const data = await res.json();
    setEntries(data.vichars || []);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const deleteEntry = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch('/api/smriti', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  const openVerdict = (entry: VicharEntry) => {
    sessionStorage.setItem('Varant_verdict', JSON.stringify({
      question: entry.question,
      context: '',
      verdictRaw: entry.verdictRaw,
    }));
    router.push('/verdict');
  };

  const avgMatra = (() => {
    const scored = entries.filter((e) => e.matraScore);
    if (!scored.length) return null;
    return Math.round(scored.reduce((s, e) => s + (e.matraScore ?? 0), 0) / scored.length);
  })();

  return (
    <>
      <div className="fixed inset-0 z-[-2] varant-council-bg" />
      <div className="varant-grain-overlay fixed inset-0 z-[-1]" aria-hidden="true" />
      <main className="min-h-screen pb-24 font-sans">

        {/* Header */}
        <div className="pt-6 px-4 sm:px-6 sticky top-4 z-50 flex justify-center">
          <div className="bg-white/90 backdrop-blur-xl border border-[#E8E3DC]/80 rounded-full px-5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between gap-8 max-w-2xl w-full">
            <Link href="/" className="text-[15px] font-semibold text-[#1A1510]">
              <span className="bg-[linear-gradient(135deg,#D97706_0%,#9B1C1C_50%,#1E3A8A_100%)] bg-clip-text text-transparent">v</span>arant
            </Link>
            <span className="text-[11px] font-semibold text-[#78716c] uppercase tracking-[0.12em]">Smriti · The Memory</span>
            <div className="flex items-center gap-3">
              <Link href="/demo" className="text-[13px] font-medium text-[#9B1C1C] hover:underline">New Vichar →</Link>
              <UserButton />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

          {/* Stats */}
          {entries.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: entries.length, label: 'Vichars' },
                { value: avgMatra !== null ? `${avgMatra}%` : '—', label: 'Avg Matra' },
                { value: entries.filter((e) => e.mimamsaOutcome).length, label: 'Reviewed' },
              ].map(({ value, label }) => (
                <div key={label} className="varant-council-card rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-[#1A1510]">{value}</p>
                  <p className="text-[11px] text-[#A0998F] uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-24">
              <div className="w-6 h-6 border-2 border-[#E8E3DC] border-t-[#D97706] rounded-full animate-spin" />
            </div>
          )}

          {/* Empty */}
          {!loading && entries.length === 0 && (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">⚖️</p>
              <p className="text-[#1A1510] font-semibold text-lg mb-2">Your Smriti is empty</p>
              <p className="text-[#A0998F] text-sm mb-8">Every Vichar you complete will be recorded here permanently.</p>
              <Link href="/demo" className="bg-[#1A1510] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#9B1C1C] transition-colors">
                Begin your first Vichar
              </Link>
            </div>
          )}

          {/* Entries */}
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => openVerdict(entry)}
                className="varant-council-card rounded-2xl p-6 cursor-pointer hover:shadow-[0_4px_24px_rgba(217,119,6,0.08)] hover:border-[#D97706]/20 border border-transparent transition-all duration-200 group"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {entry.isContinuation && (
                        <span className="text-[10px] font-semibold text-[#D97706] border border-[#D97706]/30 px-2 py-0.5 rounded-full shrink-0">
                          Continued
                        </span>
                      )}
                    </div>
                    <p className="text-[16px] font-semibold text-[#1A1510] leading-snug group-hover:text-[#9B1C1C] transition-colors">
                      &ldquo;{entry.question}&rdquo;
                    </p>
                  </div>
                  <MatraBadge score={entry.matraScore} />
                </div>

                {/* Recommendation preview */}
                {entry.recommendation && (
                  <p className="text-[13px] text-[#57534E] mb-3 line-clamp-2 leading-relaxed">
                    {entry.recommendation.replace(/\*\*/g, '')}
                  </p>
                )}

                {/* Bottom row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-[#A0998F]">
                    <span>{new Date(entry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>·</span>
                    <button
                      onClick={(e) => deleteEntry(entry.id, e)}
                      className="hover:text-[#9B1C1C] transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  <span className="text-[11px] font-medium text-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity">
                    View Nirnaya →
                  </span>
                </div>

                <MimamsaStatus entry={entry} onUpdate={refresh} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}