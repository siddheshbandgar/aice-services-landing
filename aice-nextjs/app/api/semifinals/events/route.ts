import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("id,title,city,event_url")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not fetch events." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, events: data ?? [] });
}
