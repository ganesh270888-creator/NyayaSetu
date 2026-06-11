import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    const name = file.name.toLowerCase();
    let text = "";

    if (name.endsWith(".txt")) {
      text = await file.text();
    } else if (name.endsWith(".pdf")) {
      const arrayBuffer = await file.arrayBuffer();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfParseModule: any = await import("pdf-parse");
      const pdfParse = pdfParseModule.default ?? pdfParseModule;
      const data = await pdfParse(Buffer.from(arrayBuffer));
      text = data.text;
    } else if (name.endsWith(".docx")) {
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({
        buffer: Buffer.from(arrayBuffer),
      });
      text = result.value;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use .txt, .pdf, or .docx" },
        { status: 400 }
      );
    }

    return NextResponse.json({ text, fileName: file.name });
  } catch (error) {
    console.error("File extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract text from file" },
      { status: 500 }
    );
  }
}
