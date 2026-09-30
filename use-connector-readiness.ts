import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { OWNER_EMAIL, siteOverridesSchema, type SiteOverrides } from "@/data/studio";

function parseBody(body: unknown): SiteOverrides {
  let value = body;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      return {};
    }
  }
  const parsed = siteOverridesSchema.safeParse(value ?? {});
  return parsed.success ? parsed.data : {};
}

export const loadSiteCopy = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{ body: unknown }>`select body from site_copy where id = 1`;
  return parseBody(rows[0]?.body);
});

export const saveSiteCopy = createServerFn({ method: "POST" })
  .validator((input: unknown) => siteOverridesSchema.parse(input))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const users = await sql<{ email: string }>`select email from "user" where id = ${context.userId}`;
    const email = users[0]?.email?.toLowerCase();
    if (email !== OWNER_EMAIL) {
      throw new Error("Forbidden");
    }
    const body = JSON.stringify(data);
    await sql`
      insert into site_copy (id, body, updated_by)
      values (1, ${body}::jsonb, ${context.userId})
      on conflict (id) do update
      set body = excluded.body,
          updated_by = excluded.updated_by,
          updated_at = now()
    `;
    return { ok: true as const };
  });
