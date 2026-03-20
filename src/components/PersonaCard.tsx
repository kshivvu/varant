'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Sparkles, Anchor, Shuffle } from 'lucide-react';
import { Persona, PersonaResponse, PersonaStatus, PersonaId } from '@/types/council';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { PERSONAS } from '@/lib/prompts';

interface PersonaCardProps {
  persona: Persona;
  response?: PersonaResponse;
  status?: PersonaStatus;
}

const personaIcons: Record<PersonaId, React.ReactNode> = {
  skeptic: <ShieldAlert className="w-4 h-4" />,
  optimist: <Sparkles className="w-4 h-4" />,
  pragmatist: <Anchor className="w-4 h-4" />,
  'devils-advocate': <Shuffle className="w-4 h-4" />,
};

const personaSanskrit: Record<PersonaId, string> = {
  skeptic: 'वितर्क',
  optimist: 'आशा',
  pragmatist: 'युक्ति',
  'devils-advocate': 'विपक्ष',
};

const accentHex: Record<string, string> = {
  red: '#B91C1C',
  green: '#15803D',
  yellow: '#A16207',
  blue: '#1E40AF',
};

const dotColor: Record<string, string> = {
  red: 'bg-[#B91C1C]',
  green: 'bg-[#15803D]',
  yellow: 'bg-[#A16207]',
  blue: 'bg-[#1E40AF]',
};

function parseRebuttal(content: string): { quote: string | null; source: string | null; body: string } {
  const match = content.match(/^REBUTTING\s+(.+?):\s*["""](.+?)["""]\s*\n([\s\S]*)$/i);
  if (match) return { source: match[1].trim(), quote: match[2].trim(), body: match[3].trim() };
  const match2 = content.match(/^REBUTTING\s+(.+?):\s*(.+?)\n([\s\S]*)$/i);
  if (match2) return { source: match2[1].trim(), quote: match2[2].trim(), body: match2[3].trim() };
  return { quote: null, source: null, body: content };
}

function getSourceDotColor(sourceName: string): string {
  const p = PERSONAS.find((x) => x.name.toLowerCase().includes(sourceName.toLowerCase().replace('the ', '')));
  return p ? dotColor[p.color] : 'bg-[#78716c]';
}

export default function PersonaCard({ persona, response, status }: PersonaCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const effectiveStatus = status || response?.status || (response?.loading ? 'speaking' : response?.content ? 'done' : 'waiting');
  const isSpeaking = effectiveStatus === 'speaking';
  const isWaiting = effectiveStatus === 'waiting';
  const isDone = effectiveStatus === 'done';
  const hasContent = !!response?.content;
  const hasError = !!response?.error;

  const color = accentHex[persona.color] || '#1A1510';
  const { quote, source, body } = hasContent ? parseRebuttal(response!.content) : { quote: null, source: null, body: '' };

  // Auto-fetch summary when done
  useEffect(() => {
    if (!isDone || !hasContent || summary || summaryLoading) return;

    setSummaryLoading(true);
    fetch('/api/council', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'summary',
        question: '',
        personaId: persona.id,
        content: response!.content,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setSummary(data.summary || null);
        setSummaryLoading(false);
      })
      .catch(() => {
        setSummaryLoading(false);
      });
  }, [isDone, hasContent]);

  return (
    <div
      className={`varant-persona-card relative flex flex-col h-full min-h-[220px] rounded-lg overflow-hidden transition-all duration-300 ${
        isSpeaking ? 'varant-persona-card-speaking' : ''
      } ${isWaiting && !hasContent ? 'opacity-55' : ''}`}
    >
      {/* Left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: `linear-gradient(180deg, ${color}, ${color}88)`, opacity: isSpeaking ? 1 : 0.6 }}
      />

      <div className="flex-1 flex flex-col pl-2 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-3 pb-2">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
            style={{ backgroundColor: `${color}20`, color, border: `2px solid ${color}40` }}
          >
            {personaIcons[persona.id]}
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#1A1510] leading-tight">
              {persona.name}
              <span className="ml-1.5 text-[11px] font-normal" style={{ color }}>
                {personaSanskrit[persona.id]}
              </span>
            </p>
            <p className="text-[11px] text-[#78716c] mt-0.5">
              {isSpeaking && !hasContent
                ? 'is thinking...'
                : hasContent
                  ? quote && source
                    ? 'responds in the debate'
                    : 'says'
                  : 'listening'}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-4 pb-4 flex flex-col min-h-0">
          {isWaiting && !hasContent && !hasError && (
            <div className="flex-1 flex items-center justify-center py-6">
              <p className="text-[12px] text-[#a8a29e] italic">Waiting for my turn to speak...</p>
            </div>
          )}

          {isSpeaking && !hasContent && (
            <div className="flex-1 flex flex-col justify-center gap-3 py-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                <span className="text-[12px] text-[#78716c] italic">Gathering my thoughts...</span>
              </div>
              <div className="space-y-2 mt-2">
                <div className="h-2.5 w-full rounded bg-[#e7e5e4]/80" />
                <div className="h-2.5 w-[92%] rounded bg-[#e7e5e4]/60" />
                <div className="h-2.5 w-[85%] rounded bg-[#e7e5e4]/50" />
              </div>
            </div>
          )}

          {hasError && (
            <p className="text-[#B91C1C] text-[13px] py-3 italic">
              I couldn&apos;t respond — {response!.error}
            </p>
          )}

          {hasContent && (
            <div className="space-y-3">
              {/* Rebuttal quote block */}
              {quote && source && (
                <div
                  className="pl-4 py-2.5 border-l-2 rounded-r-md"
                  style={{ borderColor: `${color}60`, backgroundColor: `${color}0A` }}
                >
                  <p className="text-[11px] font-semibold text-[#78716c] uppercase tracking-wider mb-1.5">
                    But {source} said —
                  </p>
                  <p className="text-[13px] font-[family-name:var(--font-lora)] italic text-[#44403c] leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="text-[11px] text-[#78716c] mt-2 font-medium">So I say —</p>
                </div>
              )}

              {/* Summary loading state */}
              {summaryLoading && (
                <div className="flex items-center gap-2 py-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                  <span className="text-[11px] text-[#a8a29e] italic tracking-wide">Rendering summary...</span>
                </div>
              )}

              {/* Summary view (default when done) */}
              {!summaryLoading && summary && !expanded && (
                <div className="space-y-2">
                  <div className="prose-quorum text-[14px] leading-relaxed text-[#44403c]">
                    <MarkdownRenderer content={summary} />
                  </div>
                  <button
                    onClick={() => setExpanded(true)}
                    className="text-[11px] font-medium mt-1 hover:underline transition-colors"
                    style={{ color }}
                  >
                    Show full response ↓
                  </button>
                </div>
              )}

              {/* Full response view */}
              {(!summary || expanded) && !summaryLoading && (
                <div className="space-y-2">
                  <div className="prose-quorum text-[14px] leading-relaxed text-[#44403c]">
                    <MarkdownRenderer content={quote ? body : response!.content} />
                    {isSpeaking && (
                      <span
                        className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse rounded-sm"
                        style={{ backgroundColor: color }}
                      />
                    )}
                  </div>
                  {summary && expanded && (
                    <button
                      onClick={() => setExpanded(false)}
                      className="text-[11px] font-medium mt-1 hover:underline transition-colors"
                      style={{ color }}
                    >
                      Show summary ↑
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }}
      />
    </div>
  );
}