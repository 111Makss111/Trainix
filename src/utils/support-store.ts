import type Stripe from "stripe";

import { ensureSupportSchema, getSql } from "@/utils/db";
import { isCheckoutPlanId, type CheckoutPlanId } from "@/utils/support-plans";

export type SupportPurchaseRecord = {
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  customer_email: string | null;
  customer_name: string | null;
  plan_id: string;
  amount_total: number | null;
  currency: string | null;
  payment_status: string;
  checkout_status: string | null;
  paid_at: string | null;
  access_granted_at: string | null;
  last_claimed_at: string | null;
  created_at: string;
  updated_at: string;
};

function getStripeId(
  value: string | Stripe.PaymentIntent | Stripe.Customer | Stripe.DeletedCustomer | null,
) {
  if (!value) {
    return null;
  }

  return typeof value === "string" ? value : value.id;
}

function getPlanId(session: Stripe.Checkout.Session): CheckoutPlanId {
  const rawPlanId = session.metadata?.plan_id;

  if (rawPlanId && isCheckoutPlanId(rawPlanId)) {
    return rawPlanId;
  }

  return "support_trainix";
}

function mapPurchaseRecord(row: Record<string, unknown>) {
  return row as unknown as SupportPurchaseRecord;
}

export async function upsertSupportPurchaseFromSession({
  session,
  source,
}: {
  session: Stripe.Checkout.Session;
  source: "claim" | "webhook";
}) {
  await ensureSupportSchema();
  const sql = getSql();
  const metadata = JSON.stringify({
    source,
    livemode: session.livemode,
    checkout_status: session.status,
  });
  const rows = (await sql.query(
    `
      INSERT INTO support_purchases (
        stripe_session_id,
        stripe_payment_intent_id,
        stripe_customer_id,
        customer_email,
        customer_name,
        plan_id,
        amount_total,
        currency,
        payment_status,
        checkout_status,
        metadata,
        paid_at,
        access_granted_at,
        last_claimed_at,
        updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb,
        CASE WHEN $9 = 'paid' THEN NOW() ELSE NULL END,
        CASE WHEN $9 = 'paid' THEN NOW() ELSE NULL END,
        CASE WHEN $12 THEN NOW() ELSE NULL END,
        NOW()
      )
      ON CONFLICT (stripe_session_id)
      DO UPDATE SET
        stripe_payment_intent_id = COALESCE(EXCLUDED.stripe_payment_intent_id, support_purchases.stripe_payment_intent_id),
        stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, support_purchases.stripe_customer_id),
        customer_email = COALESCE(EXCLUDED.customer_email, support_purchases.customer_email),
        customer_name = COALESCE(EXCLUDED.customer_name, support_purchases.customer_name),
        plan_id = EXCLUDED.plan_id,
        amount_total = COALESCE(EXCLUDED.amount_total, support_purchases.amount_total),
        currency = COALESCE(EXCLUDED.currency, support_purchases.currency),
        payment_status = EXCLUDED.payment_status,
        checkout_status = COALESCE(EXCLUDED.checkout_status, support_purchases.checkout_status),
        metadata = support_purchases.metadata || EXCLUDED.metadata,
        paid_at = CASE
          WHEN EXCLUDED.payment_status = 'paid' THEN COALESCE(support_purchases.paid_at, NOW())
          ELSE support_purchases.paid_at
        END,
        access_granted_at = CASE
          WHEN EXCLUDED.payment_status = 'paid' THEN COALESCE(support_purchases.access_granted_at, NOW())
          ELSE support_purchases.access_granted_at
        END,
        last_claimed_at = CASE
          WHEN $12 THEN NOW()
          ELSE support_purchases.last_claimed_at
        END,
        updated_at = NOW()
      RETURNING
        stripe_session_id,
        stripe_payment_intent_id,
        stripe_customer_id,
        customer_email,
        customer_name,
        plan_id,
        amount_total,
        currency,
        payment_status,
        checkout_status,
        paid_at,
        access_granted_at,
        last_claimed_at,
        created_at,
        updated_at
    `,
    [
      session.id,
      getStripeId(session.payment_intent),
      getStripeId(session.customer),
      session.customer_details?.email ?? session.customer_email ?? null,
      session.customer_details?.name ?? null,
      getPlanId(session),
      session.amount_total ?? null,
      session.currency ?? null,
      session.payment_status ?? "unpaid",
      session.status ?? null,
      metadata,
      source === "claim",
    ],
  )) as Record<string, unknown>[];

  return rows[0] ? mapPurchaseRecord(rows[0]) : null;
}

export async function getSupportPurchaseBySessionId(sessionId: string) {
  await ensureSupportSchema();
  const sql = getSql();
  const rows = (await sql.query(
    `
      SELECT
        stripe_session_id,
        stripe_payment_intent_id,
        stripe_customer_id,
        customer_email,
        customer_name,
        plan_id,
        amount_total,
        currency,
        payment_status,
        checkout_status,
        paid_at,
        access_granted_at,
        last_claimed_at,
        created_at,
        updated_at
      FROM support_purchases
      WHERE stripe_session_id = $1
      LIMIT 1
    `,
    [sessionId],
  )) as Record<string, unknown>[];

  return rows[0] ? mapPurchaseRecord(rows[0]) : null;
}

export async function markSupportPurchaseClaimed(sessionId: string) {
  await ensureSupportSchema();
  const sql = getSql();

  await sql.query(
    `
      UPDATE support_purchases
      SET last_claimed_at = NOW(), updated_at = NOW()
      WHERE stripe_session_id = $1
    `,
    [sessionId],
  );
}
