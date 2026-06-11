import { NextRequest, NextResponse } from "next/server";
import { razorpay, PLANS } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();
    const plan = PLANS.find((p) => p.id === planId);

    if (!plan || plan.price === 0) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: plan.price,
      currency: "INR",
      receipt: `nyayasetu_${planId}_${Date.now()}`,
      notes: { planId: plan.id, planName: plan.name },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
