import { NextResponse } from "next/server";

import { getSupportCheckoutMissingConfig } from "@/utils/support-config";
import { isCheckoutPlanId } from "@/utils/support-plans";
import { createCheckoutSession } from "@/utils/stripe-support";

export async function POST(request: Request) {
  const formData = await request.formData();
  const planId = formData.get("planId");

  if (typeof planId !== "string" || !isCheckoutPlanId(planId)) {
    return NextResponse.redirect(
      new URL("/support/unavailable?reason=plan", request.url),
      303,
    );
  }

  const missingConfig = getSupportCheckoutMissingConfig(planId);

  if (missingConfig.length > 0) {
    return NextResponse.redirect(
      new URL("/support/unavailable?reason=setup", request.url),
      303,
    );
  }

  try {
    const session = await createCheckoutSession({
      planId,
      origin: new URL(request.url).origin,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Checkout creation failed", error);

    return NextResponse.redirect(
      new URL("/support/unavailable?reason=checkout", request.url),
      303,
    );
  }
}
