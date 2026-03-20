export type PersonaId = 'skeptic' | 'optimist' | 'pragmatist' | 'devils-advocate';

export type PersonaStatus = 'waiting' | 'speaking' | 'done';

export type CouncilRequestType = 'persona' | 'interruption_question' | 'tension_score' | 'verdict' | 'summary' | 'unseen_questions';
export interface Persona {
    id: PersonaId;
    name: string;
    color: string;
    borderClass: string;
    bgClass: string;
    textClass: string;
    model: string;
    systemPrompt: string;
}

export enum Round {
    PRATHAM_PAKSHA = 1,
    KHANDANA = 2,
    NIRNAYA = 3,
}

export interface PersonaResponse {
    personaId: PersonaId;
    round: Round;
    content: string;
    loading: boolean;
    error: string | null;
    status: PersonaStatus;
    rebuttalQuote?: string;
    rebuttalSource?: string;
}

export interface VerdictData {
    consensus: string;
    tensions: string;
    recommendation: string;
    confidence: number;
    confidenceExplanation: string;
    missing: string;
}

export interface CouncilRequest {
    type: CouncilRequestType;
    question: string;
    context?: string;
    round?: Round;
    personaId?: PersonaId;
    previousResponses?: { personaId: PersonaId; round: Round; content: string }[];
    interjection?: string;
    content?: string; 
}

export interface CouncilResponse {
    content: string;
    personaId?: PersonaId;
    round?: Round;
}

export interface InterruptionData {
    personaId: PersonaId;
    question: string;
}

export interface SessionData {
    question: string;
    context: string;
    round1Responses: PersonaResponse[];
    round2Responses: PersonaResponse[];
    verdict: VerdictData | null;
    interjection: string;
}
