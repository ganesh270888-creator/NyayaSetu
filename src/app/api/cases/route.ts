import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ cases: [] });
  }

  try {
    const cases = await prisma.case.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        analyses: { take: 1, orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json({ cases });
  } catch {
    return NextResponse.json({ cases: [], error: "Database not available" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, description, language, analysisResult, input } = body;

    const caseRecord = await prisma.case.create({
      data: {
        userId: userId || "anonymous",
        type,
        title,
        description,
        language: language === "hi" ? "HI" : "EN",
        status: "DRAFT",
        analyses: {
          create: {
            type,
            input: input || {},
            result: analysisResult || {},
            riskScore: analysisResult?.riskScore,
            language: language === "hi" ? "HI" : "EN",
          },
        },
      },
      include: { analyses: true },
    });

    return NextResponse.json({ case: caseRecord });
  } catch (error) {
    console.error("Save case error:", error);
    return NextResponse.json(
      { error: "Failed to save. Database may not be connected." },
      { status: 500 }
    );
  }
}
