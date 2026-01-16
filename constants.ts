import { InterestTier } from "./types";

// Tabela de Juros (Taxas específicas por parcela)
// Atualizado conforme solicitação: Taxas individuais de 2x a 21x
export const INTEREST_TABLE: InterestTier[] = [
  { min: 2, max: 2, rate: 0.0413 },   // 4,13%
  { min: 3, max: 3, rate: 0.0488 },   // 4,88%
  { min: 4, max: 4, rate: 0.0563 },   // 5,63%
  { min: 5, max: 5, rate: 0.0638 },   // 6,38%
  { min: 6, max: 6, rate: 0.0713 },   // 7,13%
  { min: 7, max: 7, rate: 0.0823 },   // 8,23%
  { min: 8, max: 8, rate: 0.0898 },   // 8,98%
  { min: 9, max: 9, rate: 0.0973 },   // 9,73%
  { min: 10, max: 10, rate: 0.1048 }, // 10,48%
  { min: 11, max: 11, rate: 0.1123 }, // 11,23%
  { min: 12, max: 12, rate: 0.1198 }, // 11,98%
  { min: 13, max: 13, rate: 0.1273 }, // 12,73%
  { min: 14, max: 14, rate: 0.1348 }, // 13,48%
  { min: 15, max: 15, rate: 0.1423 }, // 14,23%
  { min: 16, max: 16, rate: 0.1498 }, // 14,98%
  { min: 17, max: 17, rate: 0.1573 }, // 15,73%
  { min: 18, max: 18, rate: 0.1648 }, // 16,48%
  { min: 19, max: 19, rate: 0.1723 }, // 17,23%
  { min: 20, max: 20, rate: 0.1798 }, // 17,98%
  { min: 21, max: 21, rate: 0.1873 }, // 18,73%
];

export const TAX_RATE = 0.08; // 8% sobre o valor gerado pelos juros
export const MAX_INSTALLMENTS = 21;