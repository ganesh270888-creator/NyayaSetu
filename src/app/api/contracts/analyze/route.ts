import { NextRequest, NextResponse } from "next/server";
import { analyzeContract } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractText, language = "HI" } = body;

    if (!contractText || typeof contractText !== "string") {
      return NextResponse.json(
        { error: "Contract text is required" },
        { status: 400 }
      );
    }

    if (contractText.length > 50000) {
      return NextResponse.json(
        { error: "Contract text too long (max 50,000 characters)" },
        { status: 400 }
      );
    }

    const result = await analyzeContract(contractText, language);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Contract analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze contract" },
      { status: 500 }
    );
  }
}
