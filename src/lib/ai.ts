import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = "gpt-4o";

type Language = "EN" | "HI";

const SYSTEM_PROMPTS = {
  contractReview: (lang: Language) => `You are an expert Indian legal AI assistant specializing in contract analysis for MSMEs and small businesses.
${lang === "HI" ? "Respond in Hindi (Devanagari script). Use simple language that a small business owner can understand." : "Respond in clear, simple English."}

Your task is to analyze contracts and identify:
1. **Risk Clauses** - clauses that could harm the MSME (one-sided indemnity, unlimited liability, unfair termination, non-compete overreach, auto-renewal traps)
2. **Missing Protections** - clauses that should be present but are missing (payment terms, dispute resolution, IP ownership, confidentiality)
3. **Compliance Issues** - violations of Indian Contract Act, MSME Development Act, or relevant regulations
4. **Plain Language Summary** - what this contract actually means for the business owner

Rate overall risk as: LOW / MEDIUM / HIGH / CRITICAL
For each risk, explain WHY it's risky and WHAT to do about it.

IMPORTANT: Return ONLY valid JSON, no markdown fences or extra text.`,

  legalNotice: (lang: Language) => `You are an expert Indian legal AI assistant specializing in drafting legal notices for MSMEs and individuals.
${lang === "HI" ? "Draft the notice in Hindi (Devanagari script). Use formal legal Hindi." : "Draft in formal legal English."}

You draft notices compliant with:
- Indian Contract Act, 1872
- Negotiable Instruments Act, 1881 (Section 138 - cheque bounce)
- Transfer of Property Act, 1882
- MSME Development Act, 2006
- Consumer Protection Act, 2019

Format: Professional legal notice with proper structure:
1. Header with reference number and date
2. Sender and recipient details
3. Subject line
4. Facts of the matter
5. Legal grounds
6. Demand/relief sought
7. Consequences of non-compliance
8. Timeline for response

IMPORTANT: Return ONLY valid JSON, no markdown fences or extra text.`,

  gstDispute: (lang: Language) => `You are an expert Indian tax and legal AI assistant specializing in GST dispute resolution for MSMEs.
${lang === "HI" ? "Respond in Hindi (Devanagari script)." : "Respond in English."}

You help with:
- Understanding show cause notices (SCN)
- Drafting replies to SCN under various GST sections
- Appeal preparation for GST Appellate Authority
- Documentation requirements
- Timeline and deadline tracking
- Key sections: 73, 74, 75, 107, 112 of CGST Act

Provide step-by-step playbooks with clear action items, deadlines, and required documents.

IMPORTANT: Return ONLY valid JSON, no markdown fences or extra text.`,

  creditRecovery: (lang: Language) => `You are an expert Indian legal AI assistant specializing in credit recovery for MSMEs.
${lang === "HI" ? "Respond in Hindi (Devanagari script)." : "Respond in English."}

You help MSMEs recover dues through:
1. **MSME Samadhan** (MSME Development Act, Section 15-23) - filing facilitation council complaints
2. **SARFAESI Act** - for secured creditors
3. **IBC proceedings** - for larger amounts
4. **Legal notice route** - demand notices under Section 138 NI Act
5. **Civil suit** - Order XXXVII CPC (summary suit)

Provide specific steps, required documents, timelines, fees, and jurisdiction details.
Always mention the relevant forum and its address based on the user's state/city.

IMPORTANT: Return ONLY valid JSON, no markdown fences or extra text.`,
};

export interface ContractAnalysis {
  overallRisk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  riskScore: number;
  summary: string;
  risks: Array<{
    clause: string;
    risk: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    recommendation: string;
  }>;
  missingProtections: Array<{
    protection: string;
    importance: string;
    suggestedClause: string;
  }>;
  complianceIssues: string[];
}

export interface NoticeResult {
  notice: string;
  legalBasis: string[];
  nextSteps: string[];
}

export interface DisputePlaybook {
  currentStage: string;
  steps: Array<{
    step: number;
    action: string;
    deadline: string;
    documents: string[];
    notes: string;
  }>;
  draftReply?: string;
}

export interface RecoveryPlan {
  recommendedMechanism: string;
  steps: Array<{
    step: number;
    action: string;
    timeline: string;
    cost: string;
    documents: string[];
  }>;
  forum: string;
  estimatedTimeline: string;
  draftNotice?: string;
}

function extractJSON(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const braced = text.match(/\{[\s\S]*\}/);
  if (braced) return braced[0];
  return text;
}

export async function analyzeContract(
  contractText: string,
  language: Language = "HI"
): Promise<ContractAnalysis> {
  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    max_tokens: 4096,
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.contractReview(language) },
      {
        role: "user",
        content: `Analyze this contract and return a JSON response with the following structure:
{
  "overallRisk": "LOW|MEDIUM|HIGH|CRITICAL",
  "riskScore": <number 0-100>,
  "summary": "<plain language summary>",
  "risks": [{"clause": "", "risk": "", "severity": "", "recommendation": ""}],
  "missingProtections": [{"protection": "", "importance": "", "suggestedClause": ""}],
  "complianceIssues": [""]
}

Contract text:
${contractText}`,
      },
    ],
  });

  const text = response.choices[0].message.content || "";
  return JSON.parse(extractJSON(text));
}

export async function draftLegalNotice(
  params: {
    noticeType: string;
    senderName: string;
    senderAddress: string;
    recipientName: string;
    recipientAddress: string;
    facts: string;
    reliefSought: string;
    amount?: string;
  },
  language: Language = "HI"
): Promise<NoticeResult> {
  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.4,
    max_tokens: 4096,
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.legalNotice(language) },
      {
        role: "user",
        content: `Draft a ${params.noticeType} with these details and return JSON:
{
  "notice": "<complete notice text>",
  "legalBasis": ["<applicable laws/sections>"],
  "nextSteps": ["<what to do after sending>"]
}

Sender: ${params.senderName}, ${params.senderAddress}
Recipient: ${params.recipientName}, ${params.recipientAddress}
Facts: ${params.facts}
Relief Sought: ${params.reliefSought}
${params.amount ? `Amount: ₹${params.amount}` : ""}`,
      },
    ],
  });

  const text = response.choices[0].message.content || "";
  return JSON.parse(extractJSON(text));
}

export async function generateGstPlaybook(
  params: {
    gstin: string;
    noticeType: string;
    section: string;
    amount: string;
    facts: string;
    stage: string;
  },
  language: Language = "HI"
): Promise<DisputePlaybook> {
  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    max_tokens: 4096,
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.gstDispute(language) },
      {
        role: "user",
        content: `Create a dispute resolution playbook and return JSON:
{
  "currentStage": "",
  "steps": [{"step": 1, "action": "", "deadline": "", "documents": [""], "notes": ""}],
  "draftReply": "<draft reply if applicable>"
}

GSTIN: ${params.gstin}
Notice Type: ${params.noticeType}
Section: ${params.section}
Disputed Amount: ₹${params.amount}
Current Stage: ${params.stage}
Facts: ${params.facts}`,
      },
    ],
  });

  const text = response.choices[0].message.content || "";
  return JSON.parse(extractJSON(text));
}

export async function generateRecoveryPlan(
  params: {
    debtorName: string;
    amount: string;
    facts: string;
    state: string;
    securedOrUnsecured: string;
  },
  language: Language = "HI"
): Promise<RecoveryPlan> {
  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    max_tokens: 4096,
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.creditRecovery(language) },
      {
        role: "user",
        content: `Create a recovery plan and return JSON:
{
  "recommendedMechanism": "",
  "steps": [{"step": 1, "action": "", "timeline": "", "cost": "", "documents": [""]}],
  "forum": "<specific forum with address>",
  "estimatedTimeline": "",
  "draftNotice": "<draft demand notice if applicable>"
}

Debtor: ${params.debtorName}
Amount Due: ₹${params.amount}
Type: ${params.securedOrUnsecured}
State: ${params.state}
Facts: ${params.facts}`,
      },
    ],
  });

  const text = response.choices[0].message.content || "";
  return JSON.parse(extractJSON(text));
}

export async function chat(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  context: string,
  language: Language = "HI"
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.5,
    max_tokens: 2048,
    messages: [
      {
        role: "system",
        content: `You are a helpful Indian legal AI assistant for MSMEs and individuals.
${language === "HI" ? "Respond in Hindi (Devanagari script). Use simple language." : "Respond in simple English."}
Context: ${context}
You help with contract reviews, legal notices, GST disputes, and credit recovery.
Always cite relevant Indian laws and sections. Be practical and action-oriented.`,
      },
      ...messages,
    ],
  });

  return response.choices[0].message.content || "";
}
