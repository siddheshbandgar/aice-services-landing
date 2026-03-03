import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type SubscribePayload = {
  name?: string;
  email?: string;
  eventId?: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SubscribePayload;
    const name = (body.name || "").trim();
    const email = normalizeEmail(body.email || "");
    const eventId = (body.eventId || "").trim();

    if (!email || !eventId) {
      return NextResponse.json(
        { ok: false, error: "Email and event are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const { data: existingUser, error: getUserError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (getUserError) {
      return NextResponse.json(
        { ok: false, error: "Could not find user." },
        { status: 500 }
      );
    }

    let userId = existingUser?.id as string | undefined;

    if (!userId) {
      const { data: newUser, error: insertUserError } = await supabaseAdmin
        .from("users")
        .insert({ name: name || null, email })
        .select("id")
        .single();

      if (insertUserError || !newUser) {
        return NextResponse.json(
          { ok: false, error: "Could not create user." },
          { status: 500 }
        );
      }

      userId = newUser.id;
    }

    const { error: subError } = await supabaseAdmin.from("subscriptions").upsert(
      {
        user_id: userId,
        event_id: eventId,
        status: "pending_payment",
        paid_amount: 2000,
        currency: "INR",
      },
      {
        onConflict: "user_id,event_id",
      }
    );

    if (subError) {
      return NextResponse.json(
        { ok: false, error: "Could not create subscription." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        "Request received. Complete payment to activate alerts. Mark subscription active from Supabase after payment.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
