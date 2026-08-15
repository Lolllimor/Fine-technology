"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { MarketingImage } from "@/components/landing/MarketingImage";
import { brand, images } from "@/content/landing";
import {
  DashboardIcon,
  ExternalLinkIcon,
  ImageIcon,
  InboxIcon,
  QuoteIcon,
  SignOutIcon,
} from "@/components/admin/icons";

const links: {
  href: string;
  label: string;
  exact?: boolean;
  icon: (props: { className?: string }) => React.JSX.Element;
}[] = [
  { href: "/admin", label: "Dashboard", exact: true, icon: DashboardIcon },
  { href: "/admin/testimonials", label: "Testimonials", icon: QuoteIcon },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/clients", label: "Clients", icon: ImageIcon },
  { href: "/admin/leads", label: "Leads", icon: InboxIcon },
];

type Props = {
  pendingTestimonials?: number;
  unreadLeads?: number;
};

export function AdminSidebar({
  pendingTestimonials = 0,
  unreadLeads = 0,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col gap-6 border-b border-white/10 bg-[#001428] px-4 py-5 text-white lg:min-h-screen lg:w-56 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
      <div>
        <MarketingImage
          src={images.logo}
          alt={brand.name}
          width={120}
          height={40}
          className="h-9 w-auto"
          style={{ width: "auto", height: "auto" }}
        />
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#30EAA9]">
          Admin
        </p>
      </div>

      <nav aria-label="Admin" className="flex flex-wrap gap-1 lg:flex-col">
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;
          const badge =
            link.href === "/admin/testimonials" && pendingTestimonials > 0
              ? pendingTestimonials
              : link.href === "/admin/leads" && unreadLeads > 0
                ? unreadLeads
                : null;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="flex-1">{link.label}</span>
              {badge ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#30EAA9] px-1.5 text-xs font-bold text-[#023048]">
                  {badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <ExternalLinkIcon className="h-5 w-5" />
          View site
        </Link>
        <button
          type="button"
          onClick={signOut}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <SignOutIcon className="h-5 w-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
