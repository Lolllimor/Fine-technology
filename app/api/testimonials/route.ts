import { NextResponse } from "next/server";
import { isCloudinaryUrl } from "@/lib/cloudinary-upload";
import { createSupabaseClient } from "@/lib/supabase";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

export type TestimonialPublic = {
  id: string;
  full_name: string;
  role: string;
  quote: string;
  avatar_url: string;
  image_url: string | null;
  created_at: string;
};

type Body = {
  fullName?: string;
  role?: string;
  quote?: string;
  avatarUrl?: string;
};

export async function GET() {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, full_name, role, quote, avatar_url, image_url, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Testimonials GET failed:", error.message);
      return NextResponse.json(
        { error: "Could not load testimonials." },
        { status: 500 },
      );
    }

    return NextResponse.json({ testimonials: data ?? [] });
  } catch (err) {
    console.error("Testimonials GET error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const fullName = body.fullName?.trim() ?? "";
    const role = body.role?.trim() ?? "";
    const quote = body.quote?.trim() ?? "";
    const avatarUrl = body.avatarUrl?.trim() ?? "";

    if (!fullName || !role || !quote) {
      return NextResponse.json(
        { error: "Please fill in name, role, and quote." },
        { status: 400 },
      );
    }

    if (!avatarUrl || !isCloudinaryUrl(avatarUrl)) {
      return NextResponse.json(
        { error: "Please upload a photo first." },
        { status: 400 },
      );
    }

    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createServiceSupabaseClient()
      : createSupabaseClient();

    const { error: insertError } = await supabase.from("testimonials").insert({
      full_name: fullName,
      role,
      quote,
      avatar_url: avatarUrl,
      approved: false,
    });

    if (insertError) {
      console.error("Testimonial insert failed:", insertError.message);
      return NextResponse.json(
        { error: "Could not save your testimonial. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Testimonials POST error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
