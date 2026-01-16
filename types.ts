export interface CalculationResult {
  installmentValue: number;
  totalFinal: number;
  totalFinanced: number; // Exposed internally for validation if needed, but not shown to user per requirements
  interestRate: number;
}

export interface InterestTier {
  min: number;
  max: number;
  rate: number;
}

export interface PricingState {
  spotValue: string; // Keeping as string for input handling
  downPayment: string;
  installments: number;
}