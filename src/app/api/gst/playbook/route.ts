import { NextRequest, NextResponse } from "next/server";
import { generateGstPlaybook } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gstin, noticeType, section, amount, stage, facts, language = "HI" } = body;

    if (!gstin || !noticeType || !facts) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await generateGstPlaybook(
      {
        gstin,
        noticeType,
        section: section || "",
        amount: amount || "",
        stage: stage || "SHOW_CAUSE",
        facts,
      },
      language
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("GST playbook error:", error);
    return NextResponse.json(
      { error: "Failed to generate playbook" },
      { status: 500 }
    );
  }
}
