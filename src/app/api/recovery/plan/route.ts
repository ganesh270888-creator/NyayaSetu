import { NextRequest, NextResponse } from "next/server";
import { generateRecoveryPlan } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { debtorName, amount, facts, state, securedOrUnsecured, language = "HI" } = body;

    if (!debtorName || !amount || !facts) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await generateRecoveryPlan(
      {
        debtorName,
        amount,
        facts,
        state: state || "",
        securedOrUnsecured: securedOrUnsecured || "unsecured",
      },
      language
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Recovery plan error:", error);
    return NextResponse.json(
      { error: "Failed to generate recovery plan" },
      { status: 500 }
    );
  }
}
