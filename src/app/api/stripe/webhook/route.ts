import { NextResponse } from "next/server";
import Stripe from "stripe";

import { getSupportWebhookMissingConfig } from "@/utils/support-config";
import { upsertSupportPurchaseFromSession } from "@/utils/support-store";
import { verifyStripeWebhook } from "@/utils/stripe-support";

export const runtime = "nodejs";

function isCheckoutSessionEvent(event: Stripe.Event) {
  return (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded" ||
    event.type === "checkout.session.async_payment_failed" ||
    event.type === "checkout.session.expired"
  );
}

export async function POST(request: Request) {
  const missingConfig = getSupportWebhookMissingConfig();

  if (missingConfig.length > 0) {
    return new NextResponse(
      `Webhook setup is incomplete: ${missingConfig.join(", ")}`,
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature.", { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;

  try {
    event = verifyStripeWebhook(payload, signature);
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);

    return new NextResponse("Invalid webhook signature.", { status: 400 });
  }

  if (isCheckoutSessionEvent(event)) {
    try {
      await upsertSupportPurchaseFromSession({
        session: event.data.object as Stripe.Checkout.Session,
        source: "webhook",
      });
    } catch (error) {
      console.error("Stripe webhook persistence failed", error);

      return new NextResponse("Webhook persistence failed.", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
