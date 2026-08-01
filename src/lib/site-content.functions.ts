import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import type { SectionContent, SiteSection } from "./site-content";

export const getSiteSections = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSection[]> => {
    // On external hosting (e.g. Vercel) the server-side vars may be missing.
    // Fall back to the public VITE_* vars and never throw: the landing page
    // must still render with its built-in default content.
    const key =
      process.env["SUPABASE_PUBLISHABLE_KEY"] ??
      process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
      "";
    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"] ?? "";
    if (!url || !key) return [];
    try {
      const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
      });
      const { data, error } = await client
        .from("site_sections")
        .select("section_key, label, sort_order, is_visible, content")
        .order("sort_order", { ascending: true });
      if (error) return [];
      return (data ?? []).map((row) => ({
        section_key: row.section_key,
        label: row.label,
        sort_order: row.sort_order,
        is_visible: row.is_visible,
        content: (row.content ?? {}) as SectionContent,
      }));
    } catch {
      return [];
    }
  },
);

/**
 * Bootstrap: the first signed-in user may claim the admin role, but only
 * while no admin exists yet. Afterwards this always returns false.
 */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) throw new Error("Gagal memeriksa data admin");
    if ((count ?? 0) > 0) return { granted: false as const };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error("Gagal menetapkan admin pertama");
    return { granted: true as const };
  });