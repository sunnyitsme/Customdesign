import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Enquiry endpoint.
 *
 * Server-side validation runs regardless of what the client did. Beyond that
 * this is deliberately a development adapter: it validates, logs that a valid
 * enquiry arrived, and returns success WITHOUT claiming the enquiry reached
 * anyone.
 *
 * It does not:
 *   - write to a database. Storing enquiry data — which for this firm would be
 *     personal and financial — needs a defined retention and lawful basis, not
 *     a table added in passing.
 *   - post to a CRM. No credentials exist. Faking a successful submission would
 *     be the worst possible failure mode: a client believing they had made
 *     contact when nobody received it.
 *   - verify Turnstile. The hook is below, inert until a secret is configured.
 *
 * Production requires: CRM endpoint and credentials, TURNSTILE_SECRET_KEY, and
 * a defined retention policy. Until then the page tells the user plainly that
 * this is a preview and gives them the phone number.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 },
    );
  }

  // Turnstile verification point. Left inert rather than stubbed to always
  // pass, so that wiring it up is a deliberate act.
  const turnstileSecret = process.env["TURNSTILE_SECRET_KEY"];
  if (turnstileSecret) {
    // Verify parsed.data.turnstileToken against Cloudflare before delivering.
    // Not implemented: no secret is configured in any environment yet.
  }

  const crmConfigured = Boolean(process.env["CRM_ENDPOINT"]);

  if (!crmConfigured) {
    // Log only what identifies the enquiry type, never the personal detail.
    console.info(
      `[contact] valid enquiry received (${parsed.data.enquiryType}) — no CRM configured, nothing delivered`,
    );
    return NextResponse.json({
      ok: true,
      delivered: false,
      message:
        "Validated, but not delivered: this preview has no CRM configured. Please call instead.",
    });
  }

  return NextResponse.json({
    ok: false,
    delivered: false,
    error: "CRM delivery is not implemented yet.",
  }, { status: 501 });
}
