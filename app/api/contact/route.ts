import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const projectType = body.projectType?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !phone || !projectType || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseClient();
    const { error } = await supabase.from("consultation_requests").insert({
      full_name: name,
      email,
      phone,
      project_type: projectType,
      message,
    });

    if (error) {
      console.error("Supabase insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not save your request. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
