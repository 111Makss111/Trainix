import type { CheckoutPlanId } from "@/utils/support-plans";

function isMissing(value: string | undefined) {
  return !value || value.trim().length === 0;
}

export function isApkConfigured() {
  return !isMissing(process.env.TRAINIX_APK_PATH) || !isMissing(process.env.TRAINIX_APK_URL);
}

export function getSupportCheckoutMissingConfig(planId: CheckoutPlanId) {
  const missing: string[] = [];

  if (isMissing(process.env.DATABASE_URL)) {
    missing.push("DATABASE_URL");
  }

  if (isMissing(process.env.STRIPE_SECRET_KEY)) {
    missing.push("STRIPE_SECRET_KEY");
  }

  if (
    planId === "support_trainix" &&
    isMissing(process.env.TRAINIX_SUPPORT_DONATION_PRICE_ID)
  ) {
    missing.push("TRAINIX_SUPPORT_DONATION_PRICE_ID");
  }

  return missing;
}

export function getSupportWebhookMissingConfig() {
  const missing: string[] = [];

  if (isMissing(process.env.DATABASE_URL)) {
    missing.push("DATABASE_URL");
  }

  if (isMissing(process.env.STRIPE_SECRET_KEY)) {
    missing.push("STRIPE_SECRET_KEY");
  }

  if (isMissing(process.env.STRIPE_WEBHOOK_SECRET)) {
    missing.push("STRIPE_WEBHOOK_SECRET");
  }

  return missing;
}
