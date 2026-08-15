"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    setStatus("loading");
    setErrorMessage("");

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }

      router.push(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setStatus("error");
      setErrorMessage("Could not sign in. Please try again.");
    }
  }

  const busy = status === "loading";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#001428] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#023048] p-8 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-widest text-[#30EAA9]">
          Fine Technology
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">Admin sign in</h1>
        <p className="mt-2 text-sm text-white/70">
          Use the staff account created in Supabase Auth.
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-white/80">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              disabled={busy}
              className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#023048] outline-none focus:ring-2 focus:ring-[#30EAA9]/50 disabled:opacity-70"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-white/80">
              Password
            </span>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                disabled={busy}
                className="w-full rounded-xl border-0 bg-white py-3 pl-4 pr-12 text-sm text-[#023048] outline-none focus:ring-2 focus:ring-[#30EAA9]/50 disabled:opacity-70"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                disabled={busy}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#64748B] transition hover:text-[#023048] disabled:opacity-50"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 3l18 18M10.6 10.7a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 5c5 0 8.5 3.5 10 7-0.5 1.2-1.2 2.3-2.1 3.2M6.1 6.1C4.5 7.3 3.3 8.9 2 12c1.5 3.5 5 7 10 7 1.5 0 2.9-.3 4.1-.8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {status === "error" ? (
            <p className="rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-100">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 cursor-pointer rounded-xl bg-linear-to-r from-[#30EAA9] to-[#0798E7] px-4 py-3.5 text-sm font-semibold text-[#023048] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
