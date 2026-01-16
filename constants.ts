import { InterestTier } from "./types";

// Tabela de Juros (Array de Objetos)
// 2 a 6x: 5% | 7 a 9x: 9% | 10 a 12x: 12% | 13 a 15x: 15% | 16 a 18x: 18% | 19 a 21x: 21%
export const INTEREST_TABLE: InterestTier[] = [
  { min: 2, max: 6, rate: 0.05 },
  { min: 7, max: 9, rate: 0.09 },
  { min: 10, max: 12, rate: 0.12 },
  { min: 13, max: 15, rate: 0.15 },
  { min: 16, max: 18, rate: 0.18 },
  { min: 19, max: 21, rate: 0.21 },
];

export const TAX_RATE = 0.08; // 8% sobre o valor gerado pelos juros
export const MAX_INSTALLMENTS = 21;