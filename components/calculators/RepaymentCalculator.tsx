"use client";

import { useMemo, useState } from "react";
import { NumberField } from "./NumberField";
import { amortise, gbp, withOverpayment } from "@/lib/mortgage";

/**
 * Repayment and overpayment calculator.
 *
 * Pure arithmetic on the figures the user enters — it applies no lender policy
 * and makes no lending claim, which is precisely why it is safe to publish.
 * Results update live and are announced politely to assistive technology.
 */
export function RepaymentCalculator({
  mode,
}: {
  mode: "repayment" | "overpayment";
}) {
  const [amount, setAmount] = useState(250_000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(25);
  const [overpayment, setOverpayment] = useState(200);

  const invalid = amount <= 0 || years <= 0 || rate < 0;

  const result = useMemo(
    () => amortise(amount, rate, years),
    [amount, rate, years],
  );
  const over = useMemo(
    () => withOverpayment(amount, rate, years, overpayment),
    [amount, rate, years, overpayment],
  );

  return (
    <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => event.preventDefault()}
        aria-label={
          mode === "repayment"
            ? "Repayment calculator"
            : "Overpayment calculator"
        }
      >
        <NumberField
          label="Amount borrowed"
          value={amount}
          onChange={setAmount}
          prefix="£"
          step={1000}
        />
        <NumberField
          label="Interest rate"
          value={rate}
          onChange={setRate}
          suffix="%"
          step={0.1}
        />
        <NumberField
          label="Term"
          value={years}
          onChange={setYears}
          suffix="years"
          step={1}
        />
        {mode === "overpayment" && (
          <NumberField
            label="Monthly overpayment"
            value={overpayment}
            onChange={setOverpayment}
            prefix="£"
            step={25}
            hint="Check whether your lender applies an overpayment limit or early repayment charge."
          />
        )}
      </form>

      <div
        aria-live="polite"
        className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
      >
        {invalid ? (
          <p className="text-body-lg text-accent">
            Enter an amount, a rate and a term to see a result.
          </p>
        ) : mode === "repayment" ? (
          <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-8">
            <div className="col-span-2">
              <dt className="text-body-sm font-medium text-ink">
                Monthly payment
              </dt>
              <dd className="m-0 mt-2 text-display-2 leading-none font-medium tabular text-ink">
                {gbp(result.monthlyPayment)}
              </dd>
            </div>
            <div className="border-t border-line pt-8">
              <dt className="text-body-sm font-medium text-ink">
                Total interest
              </dt>
              <dd className="m-0 mt-2 text-heading-1 font-medium tabular text-ink-secondary">
                {gbp(result.totalInterest)}
              </dd>
            </div>
            <div className="border-t border-line pt-8">
              <dt className="text-body-sm font-medium text-ink">
                Total repaid
              </dt>
              <dd className="m-0 mt-2 text-heading-1 font-medium tabular text-ink-secondary">
                {gbp(result.totalPaid)}
              </dd>
            </div>
          </dl>
        ) : (
          <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-8">
            <div className="col-span-2">
              <dt className="text-body-sm font-medium text-ink">Time saved</dt>
              <dd className="m-0 mt-2 text-display-2 leading-none font-medium tabular text-ink">
                {Math.floor(over.monthsSaved / 12)}y {over.monthsSaved % 12}m
              </dd>
            </div>
            <div className="border-t border-line pt-8">
              <dt className="text-body-sm font-medium text-ink">
                Interest saved
              </dt>
              <dd className="m-0 mt-2 text-heading-1 font-medium tabular text-ink-secondary">
                {gbp(over.interestSaved)}
              </dd>
            </div>
            <div className="border-t border-line pt-8">
              <dt className="text-body-sm font-medium text-ink">New term</dt>
              <dd className="m-0 mt-2 text-heading-1 font-medium tabular text-ink-secondary">
                {Math.floor(over.newMonths / 12)}y {over.newMonths % 12}m
              </dd>
            </div>
          </dl>
        )}

        <p className="mt-10 max-w-[52ch] border-t border-line pt-6 text-body-sm text-ink-secondary">
          An illustration based only on the figures you entered. It assumes the
          rate stays the same for the whole term and excludes fees. It is not a
          quotation, a lending decision, or advice.
        </p>
      </div>
    </div>
  );
}
