## Trainix Beta + Optional Support

This project now uses a simpler model:

- the Android beta APK is free to download
- support is optional and handled as a one-time donation
- Stripe webhook events persist donation records in Neon
- after a successful donation, the user is redirected back to `/download` with a thank-you state

## Getting Started

1. Copy `.env.example` to `.env.local`.
2. Create a Neon project and copy the pooled connection string into `DATABASE_URL`.
3. Configure Stripe:

```bash
DATABASE_URL=postgresql://user:password@ep-example-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
TRAINIX_SUPPORT_DONATION_PRICE_ID=price_...
```

4. Configure APK delivery with either a local file path or a remote URL:

```bash
TRAINIX_APK_PATH=storage/trainix.apk
# or
TRAINIX_APK_URL=https://downloads.example.com/trainix.apk
```

5. In Stripe, point your webhook endpoint to:

```bash
https://your-domain.com/api/stripe/webhook
```

Subscribe at least to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`

6. Run the development server:

```bash
npm run dev
```

## Flow Overview

1. The pricing section offers a free APK option and an optional donation.
2. The donation card posts to `/api/support/checkout`.
3. Stripe webhook events write or update donation records in Neon.
4. Stripe sends the user back to `/support/claim?session_id=...`.
5. The app verifies the donation and redirects to `/download?support=success`.
6. `/api/download/apk` serves the APK publicly.

## Notes

- The database schema is created automatically on first request.
- `TRAINIX_APK_PATH` is best for local or self-hosted setups.
- `TRAINIX_APK_URL` is better when the APK already lives in object storage or behind a CDN.
- If both are set, the remote URL takes precedence.
- Donation records stay in Neon even though APK access is free.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Serverless Driver](https://neon.com/docs/serverless/serverless-driver)
- [Stripe Checkout](https://docs.stripe.com/payments/checkout)
- [Stripe Webhooks](https://docs.stripe.com/webhooks)

## Deploying

For a real production deployment, prefer storing the APK outside the repo and pointing `TRAINIX_APK_URL` to a controlled download location or object storage URL.
