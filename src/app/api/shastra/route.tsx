import react from "react"

import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { backgroundColor: '#FAF8F5', fontFamily: 'Helvetica', paddingBottom: 40 },
  header: { backgroundColor: '#1A1510', padding: '28 40 24 40', borderBottomWidth: 3, borderBottomColor: '#D97706' },
  headerStrip: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, backgroundColor: '#D97706' },
  brand: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#FFFFFF' },
  brandAccent: { color: '#D97706' },
  headerSub: { fontSize: 7.5, color: '#78716C', marginTop: 4, letterSpacing: 1.5 },
  headerDate: { fontSize: 7.5, color: '#78716C', marginTop: 2 },
  body: { padding: '24 40 24 40' },
  questionCard: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: '16 20', marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#1A1510', borderWidth: 1, borderColor: '#E8E3DC' },
  questionLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#A0998F', letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' },
  questionText: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#1A1510', lineHeight: 1.4 },
  matraCard: { backgroundColor: '#FFF7ED', borderRadius: 8, padding: '14 20', marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#D97706', borderWidth: 1, borderColor: '#FED7AA', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  matraLeft: { flex: 1 },
  matraLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#92400E', letterSpacing: 1.5, marginBottom: 4, textTransform: 'uppercase' },
  matraExplanation: { fontSize: 9.5, color: '#78350F', lineHeight: 1.5 },
  matraScore: { fontSize: 40, fontFamily: 'Helvetica-Bold', color: '#D97706', marginLeft: 16 },
  section: { borderRadius: 8, padding: '14 16 14 18', marginBottom: 12, borderWidth: 1, borderLeftWidth: 4 },
  sectionLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' },
  sectionContent: { fontSize: 10, lineHeight: 1.7, color: '#44403C' },
  consensus: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC', borderLeftColor: '#15803D' },
  consensusLabel: { color: '#15803D' },
  tensions: { backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderLeftColor: '#A16207' },
  tensionsLabel: { color: '#A16207' },
  recommendation: { backgroundColor: '#FFF5F5', borderColor: '#FECACA', borderLeftColor: '#9B1C1C' },
  recommendationLabel: { color: '#9B1C1C' },
  unseen: { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE', borderLeftColor: '#1E40AF' },
  unseenLabel: { color: '#1E40AF' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1A1510', padding: '8 40', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerLeft: { fontSize: 7, color: '#78716C' },
  footerRight: { fontSize: 7, color: '#57534E' },
});

const clean = (text: string) => (text || '').replace(/\*\*/g, '').replace(/^[-•*]\s*/gm, '• ');

export async function POST(req: NextRequest) {
  const { question, verdict, matraScore } = await req.json();

  const sections = [
    { label: 'CONSENSUS POINTS', content: verdict.consensus, style: styles.consensus, labelStyle: styles.consensusLabel },
    { label: 'KEY TENSIONS', content: verdict.tensions, style: styles.tensions, labelStyle: styles.tensionsLabel },
    { label: 'RECOMMENDATION', content: verdict.recommendation, style: styles.recommendation, labelStyle: styles.recommendationLabel },
    { label: 'THE UNSEEN', content: verdict.missing, style: styles.unseen, labelStyle: styles.unseenLabel },
  ];

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerStrip} />
          <Text style={styles.brand}>varant</Text>
          <Text style={styles.headerSub}>SHASTRA  ·  THE DECISION RECORD  ·  THE ANCIENT COUNCIL</Text>
          <Text style={styles.headerDate}>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
        </View>

        <View style={styles.body}>
          {/* Question */}
          <View style={styles.questionCard}>
            <Text style={styles.questionLabel}>THE DECISION</Text>
            <Text style={styles.questionText}>"{question}"</Text>
          </View>

          {/* Matra */}
          <View style={styles.matraCard}>
            <View style={styles.matraLeft}>
              <Text style={styles.matraLabel}>MATRA  ·  CONFIDENCE SCORE</Text>
              <Text style={styles.matraExplanation}>{clean(verdict.confidenceExplanation || 'Based on Sabha agreement level')}</Text>
            </View>
            <Text style={styles.matraScore}>{matraScore}%</Text>
          </View>

          {/* Sections */}
          {sections.map((s) => (
            <View key={s.label} style={[styles.section, s.style]}>
              <Text style={[styles.sectionLabel, s.labelStyle]}>{s.label}</Text>
              <Text style={styles.sectionContent}>{clean(s.content)}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>varant  ·  The Ancient Council. For Modern Bets.  ·  varant.vercel.app</Text>
          <Text style={styles.footerRight}>Decide like it can't be undone.</Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);

  return new NextResponse(Buffer.from(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="shastra-${Date.now()}.pdf"`,
    },
  });
}