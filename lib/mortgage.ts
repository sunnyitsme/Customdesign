/**
 * Mortgage arithmetic.
 *
 * Only the two calculations that are unambiguous and standard: the amortising
 * payment, and the effect of a regular overpayment. Both are pure maths with no
 * lender policy in them, which is why they are safe to implement.
 *
 * Deliberately absent: anything resembling an affordability or borrowing-
 * capacity model. That is lender underwriting, it varies by lender and changes,
 * and a plausible-looking number would be worse than no number at all.
 */

/** Monthly payment on a repayment mortgage. */
export function monthlyPayment(
  principal: number,
  annualRatePercent: number,
  termYears: number,
): number {
  const months = Math.round(termYears * 12);
  if (months <= 0 || principal <= 0) return 0;
  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export interface AmortisationResult {
  readonly monthlyPayment: number;
  readonly totalPaid: number;
  readonly totalInterest: number;
}

export function amortise(
  principal: number,
  annualRatePercent: number,
  termYears: number,
): AmortisationResult {
  const payment = monthlyPayment(principal, annualRatePercent, termYears);
  const months = Math.round(termYears * 12);
  const totalPaid = payment * months;
  return {
    monthlyPayment: payment,
    totalPaid,
    totalInterest: Math.max(0, totalPaid - principal),
  };
}

export interface OverpaymentResult {
  readonly baselineMonths: number;
  readonly newMonths: number;
  readonly monthsSaved: number;
  readonly interestSaved: number;
}

/**
 * Effect of a fixed monthly overpayment, by running the balance down month by
 * month. Iteration rather than a closed form, because it stays correct when the
 * overpayment clears the balance early.
 */
export function withOverpayment(
  principal: number,
  annualRatePercent: number,
  termYears: number,
  overpayment: number,
): OverpaymentResult {
  const basePayment = monthlyPayment(principal, annualRatePercent, termYears);
  const monthlyRate = annualRatePercent / 100 / 12;
  const baselineMonths = Math.round(termYears * 12);
  const baselineInterest = basePayment * baselineMonths - principal;

  let balance = principal;
  let months = 0;
  let interest = 0;
  const payment = basePayment + Math.max(0, overpayment);
  const cap = baselineMonths;

  while (balance > 0 && months < cap) {
    const monthInterest = balance * monthlyRate;
    interest += monthInterest;
    balance = balance + monthInterest - payment;
    months += 1;
    if (balance < 0) balance = 0;
  }

  return {
    baselineMonths,
    newMonths: months,
    monthsSaved: Math.max(0, baselineMonths - months),
    interestSaved: Math.max(0, baselineInterest - interest),
  };
}

export const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
