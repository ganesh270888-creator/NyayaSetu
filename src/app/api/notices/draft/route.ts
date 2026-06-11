import { NextRequest, NextResponse } from "next/server";
import { draftLegalNotice } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      noticeType,
      senderName,
      senderAddress,
      recipientName,
      recipientAddress,
      facts,
      reliefSought,
      amount,
      language = "HI",
    } = body;

    if (!noticeType || !senderName || !recipientName || !facts) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await draftLegalNotice(
      {
        noticeType,
        senderName,
        senderAddress: senderAddress || "",
        recipientName,
        recipientAddress: recipientAddress || "",
        facts,
        reliefSought: reliefSought || "",
        amount,
      },
      language
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Notice draft error:", error);
    return NextResponse.json(
      { error: "Failed to draft notice" },
      { status: 500 }
    );
  }
}
