import { useMemo } from 'react';
import { INTEREST_TABLE, TAX_RATE } from '../constants';
import { CalculationResult } from '../types';
import { SafeMath } from '../utils/math';

export const usePriceCalculator = (
  spotValue: number,
  downPayment: number,
  installments: number
): CalculationResult | null => {
  
  return useMemo(() => {
    // Basic validation
    if (spotValue < 0 || downPayment < 0 || installments < 1) {
      return null;
    }

    if (downPayment > spotValue) {
      return null;
    }

    // 1. Valor Residual (R) = Vv - Ve
    const residual = SafeMath.subtract(spotValue, downPayment);

    // If fully paid by down payment
    if (residual <= 0) {
      return {
        installmentValue: 0,
        totalFinal: downPayment,
        totalFinanced: 0,
        interestRate: 0
      };
    }

    // 2. Taxa de Juros (i)
    let interestRate = 0;
    if (installments > 1) {
      const tier = INTEREST_TABLE.find(
        (t) => installments >= t.min && installments <= t.max
      );
      if (tier) {
        interestRate = tier.rate;
      }
    }

    // 3. Valor dos Juros (I) = R * i
    const interestAmount = SafeMath.multiply(residual, interestRate);

    // 4. Valor do Imposto (T) = I * 0.08
    const taxAmount = SafeMath.multiply(interestAmount, TAX_RATE);

    // 5. Valor Total Parcelado (Vf) = R + I + T
    const totalFinanced = SafeMath.add(residual, interestAmount, taxAmount);

    // 6. Valor da Parcela = Vf / n
    const installmentValue = SafeMath.divide(totalFinanced, installments);

    // 7. Valor Total Final = Entrada + Total Parcelado
    const totalFinal = SafeMath.add(downPayment, totalFinanced);

    return {
      installmentValue,
      totalFinal,
      totalFinanced,
      interestRate
    };
  }, [spotValue, downPayment, installments]);
};