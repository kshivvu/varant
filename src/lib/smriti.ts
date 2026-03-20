// src/lib/smriti.ts
// Smriti — The Memory. Persistent ledger of every Vichar.

export interface SmritiEntry {
  id: string;
  question: string;
  context?: string;
  verdictRaw: string;
  matraScore: number | null;
  recommendation: string;
  createdAt: string; // ISO string
  mimamsaDate: string; // 30 days later, ISO string
  mimamsaOutcome?: string; // filled in during review
}

const SMRITI_KEY = 'varant_smriti';

export function getAllSmriti(): SmritiEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SMRITI_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToSmriti(entry: Omit<SmritiEntry, 'id' | 'createdAt' | 'mimamsaDate'>): SmritiEntry {
  const now = new Date();
  const mimamsa = new Date(now);
  mimamsa.setDate(mimamsa.getDate() + 30);

  const newEntry: SmritiEntry = {
    ...entry,
    id: `varant_${now.getTime()}`,
    createdAt: now.toISOString(),
    mimamsaDate: mimamsa.toISOString(),
  };

  const existing = getAllSmriti();
  const updated = [newEntry, ...existing];
  localStorage.setItem(SMRITI_KEY, JSON.stringify(updated));
  return newEntry;
}

export function updateMimamsa(id: string, outcome: string): void {
  const entries = getAllSmriti();
  const updated = entries.map((e) =>
    e.id === id ? { ...e, mimamsaOutcome: outcome } : e
  );
  localStorage.setItem(SMRITI_KEY, JSON.stringify(updated));
}

export function deleteSmritiEntry(id: string): void {
  const entries = getAllSmriti();
  const updated = entries.filter((e) => e.id !== id);
  localStorage.setItem(SMRITI_KEY, JSON.stringify(updated));
}

// Extract Matra score from raw verdict text
export function extractMatra(verdictRaw: string): number | null {
  const matraMatch = verdictRaw.match(/##\s*Matra[\s\S]*?(\d+)\|/);
  if (matraMatch) return parseInt(matraMatch[1], 10);
  // fallback: look for standalone number|text pattern
  const fallback = verdictRaw.match(/(\d{2,3})\|/);
  return fallback ? parseInt(fallback[1], 10) : null;
}

// Extract recommendation from raw verdict text
export function extractRecommendation(verdictRaw: string): string {
  const match = verdictRaw.match(/##\s*Recommendation\s*([\s\S]*?)(?=##|$)/);
  if (match) return match[1].trim().slice(0, 200);
  return '';
}