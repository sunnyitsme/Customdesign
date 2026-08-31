import { z } from "zod";

/**
 * Enquiry schema.
 *
 * One definition, imported by both the client form and the route handler, so
 * the two can never drift. Client-side validation is a convenience; the server
 * validates the same shape again because a browser is not a trust boundary.
 *
 * Deliberately minimal: the form asks what is needed to route the enquiry and
 * call the person back. It does not collect financial detail, dates of birth or
 * anything else that would make this a data-protection problem the site is not
 * yet built to handle.
 */
export const enquiryTypes = [
  "mortgage",
  "property-finance",
  "protection",
  "wills-estate-planning",
  "existing-client",
  "other",
] as const;

export type EnquiryType = (typeof enquiryTypes)[number];

export const enquiryLabels: Record<EnquiryType, string> = {
  mortgage: "Mortgage",
  "property-finance": "Property finance",
  protection: "Protection",
  "wills-estate-planning": "Wills & estate planning",
  "existing-client": "Existing client",
  other: "Something else",
};

export const contactSchema = z.object({
  enquiryType: z.enum(enquiryTypes, {
    message: "Choose what your enquiry is about",
  }),
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.email("Enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[0-9+()\s-]*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about what you need")
    .max(2000, "Please keep this under 2000 characters"),
  consent: z.literal(true, {
    message: "Please confirm we can contact you about this enquiry",
  }),
  /** Populated by Turnstile once configured; absence is tolerated in development. */
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
