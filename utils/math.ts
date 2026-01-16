/**
 * SafeMath Utility
 * Handles currency operations using integer arithmetic (cents) to avoid
 * JavaScript floating point errors (e.g., 0.1 + 0.2 = 0.300000004).
 */
export class SafeMath {
  private static toCents(value: number): number {
    return Math.round(value * 100);
  }

  private static fromCents(cents: number): number {
    return cents / 100;
  }

  static subtract(a: number, b: number): number {
    return this.fromCents(this.toCents(a) - this.toCents(b));
  }

  static multiply(amount: number, factor: number): number {
    // Factor is usually a rate (e.g., 0.05), so we don't convert factor to cents in the same way
    // We multiply amount(cents) * factor, then round to nearest cent
    const cents = this.toCents(amount);
    const resultCents = Math.round(cents * factor);
    return this.fromCents(resultCents);
  }

  static add(a: number, b: number, c: number = 0): number {
    return this.fromCents(this.toCents(a) + this.toCents(b) + this.toCents(c));
  }

  static divide(amount: number, divisor: number): number {
    if (divisor === 0) return 0;
    // Division for installments usually requires ceiling or standard rounding depending on business logic.
    // Standard approach: normal division
    return amount / divisor; 
  }
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const parseCurrencyInput = (value: string): number => {
  // Remove non-numeric characters except dot/comma
  // This is a basic parser. For robust apps, a masking library is recommended.
  if (!value) return 0;
  return parseFloat(value);
};