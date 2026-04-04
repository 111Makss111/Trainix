import Stripe from "stripe";

import { type CheckoutPlanId } from "@/utils/support-plans";

let stripeClient: Stripe | null = null;

function getStripeSecretKey() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return secretKey;
}

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(getStripeSecretKey());
  }

  return stripeClient;
}

function getSupportDonationPriceId() {
  const priceId = process.env.TRAINIX_SUPPORT_DONATION_PRICE_ID;

  if (!priceId) {
    throw new Error("TRAINIX_SUPPORT_DONATION_PRICE_ID is not configured.");
  }

  return priceId;
}

export async function createCheckoutSession({
  planId,
  origin,
}: {
  planId: CheckoutPlanId;
  origin: string;
}) {
  return getStripe().checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/support/claim?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/support/cancel`,
    line_items: [
      {
        price: getSupportDonationPriceId(),
        quantity: 1,
      },
    ],
    metadata: {
      plan_id: planId,
    },
    billing_address_collection: "auto",
    customer_creation: "always",
    allow_promotion_codes: false,
    payment_method_collection: "always",
    wallet_options: {
      link: {
        display: "never",
      },
    },
  });
}

export async function retrieveCheckoutSession(sessionId: string) {
  return getStripe().checkout.sessions.retrieve(sessionId);
}

export function verifyStripeWebhook(payload: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured.");
  }

  return getStripe().webhooks.constructEvent(payload, signature, webhookSecret);
}
