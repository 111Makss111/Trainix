import { NextResponse } from "next/server";

import {
  getSupportPurchaseBySessionId,
  markSupportPurchaseClaimed,
  upsertSupportPurchaseFromSession,
} from "@/utils/support-store";
import { retrieveCheckoutSession } from "@/utils/stripe-support";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(
      new URL("/support/unavailable?reason=session", request.url),
      303,
    );
  }

  try {
    const existingPurchase = await getSupportPurchaseBySessionId(sessionId);

    if (existingPurchase?.payment_status === "paid") {
      await markSupportPurchaseClaimed(sessionId);

      return NextResponse.redirect(
        new URL("/download?support=success", request.url),
        303,
      );
    }

    const session = await retrieveCheckoutSession(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.redirect(
        new URL("/support/unavailable?reason=payment", request.url),
        303,
      );
    }

    try {
      const purchase = await upsertSupportPurchaseFromSession({
        session,
        source: "claim",
      });

      if (purchase?.payment_status === "paid") {
        return NextResponse.redirect(
          new URL("/download?support=success", request.url),
          303,
        );
      }

      console.error("Checkout claim did not persist a paid purchase", {
        sessionId,
        paymentStatus: session.payment_status,
      });
    } catch (error) {
      console.error("Checkout claim persistence failed after paid session", error);
    }

    return NextResponse.redirect(
      new URL("/download?support=success", request.url),
      303,
    );
  } catch (error) {
    console.error("Checkout claim verification failed", error);

    return NextResponse.redirect(
      new URL("/support/unavailable?reason=verification", request.url),
      303,
    );
  }
}
