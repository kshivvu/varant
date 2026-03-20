import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const vichars = await prisma.vichar.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ vichars });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { question, context, verdictRaw, matraScore, recommendation, isContinuation } = await req.json();

  const mimamsaDate = new Date();
  mimamsaDate.setDate(mimamsaDate.getDate() + 30);

  const vichar = await prisma.vichar.create({
    data: {
      userId,
      question,
      context: context || null,
      verdictRaw,
      matraScore: matraScore || null,
      recommendation: recommendation || null,
      mimamsaDate,
      isContinuation: isContinuation || false,
    },
  });

  return NextResponse.json({ vichar });
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, mimamsaOutcome } = await req.json();

  // Make sure user owns this Vichar
  const vichar = await prisma.vichar.update({
    where: { id, userId },
    data: { mimamsaOutcome },
  });
  return NextResponse.json({ vichar });
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  await prisma.vichar.delete({ where: { id, userId } });
  return NextResponse.json({ success: true });
}