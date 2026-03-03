import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type VerifyPayload = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  subscription_id?: string;
};

export async function POST(req: Request) {
  const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!razorpaySecret) {
    return NextResponse.json(
      { ok: false, error: "Payment verification not configured." },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as VerifyPayload;
    const orderId = body.razorpay_order_id || "";
    const paymentId = body.razorpay_payment_id || "";
    const signature = body.razorpay_signature || "";
    const subscriptionId = body.subscription_id || "";

    if (!orderId || !paymentId || !signature || !subscriptionId) {
      return NextResponse.json(
        { ok: false, error: "Missing payment verification fields." },
        { status: 400 }
      );
    }

    const expected = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expected !== signature) {
      return NextResponse.json(
        { ok: false, error: "Invalid payment signature." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("subscriptions")
      .update({
        status: "active",
        payment_ref: paymentId,
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
      })
      .eq("id", subscriptionId);

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Could not activate subscription." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Payment verified. Alerts are now active.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
