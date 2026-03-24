import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | null = null;
let schemaPromise: Promise<void> | null = null;

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
}

export function getSql() {
  if (!sqlClient) {
    sqlClient = neon(getDatabaseUrl());
  }

  return sqlClient;
}

export async function ensureSupportSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getSql();

      await sql.transaction([
        sql`
          CREATE TABLE IF NOT EXISTS support_purchases (
            id BIGSERIAL PRIMARY KEY,
            stripe_session_id TEXT NOT NULL UNIQUE,
            stripe_payment_intent_id TEXT,
            stripe_customer_id TEXT,
            customer_email TEXT,
            customer_name TEXT,
            plan_id TEXT NOT NULL,
            amount_total INTEGER,
            currency TEXT,
            payment_status TEXT NOT NULL,
            checkout_status TEXT,
            metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
            paid_at TIMESTAMPTZ,
            access_granted_at TIMESTAMPTZ,
            last_claimed_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          )
        `,
        sql`
          CREATE INDEX IF NOT EXISTS support_purchases_customer_email_idx
          ON support_purchases (customer_email)
        `,
        sql`
          CREATE INDEX IF NOT EXISTS support_purchases_access_idx
          ON support_purchases (payment_status, access_granted_at)
        `,
      ]);
    })();
  }

  return schemaPromise;
}
