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

    // 3. Cálculo teórico dos componentes
    const interestAmount = SafeMath.multiply(residual, interestRate);
    const taxAmount = SafeMath.multiply(interestAmount, TAX_RATE);
    
    // Total Teórico (Ex: 1162.00)
    const theoreticalTotal = SafeMath.add(residual, interestAmount, taxAmount);

    // 4. Definição da Parcela (A Verdade Visual)
    // Dividimos o teórico e arredondamos para 2 casas.
    // Ex: 1162 / 13 = 89.3846... -> Arredonda para 89.38
    const rawInstallment = SafeMath.divide(theoreticalTotal, installments);
    const installmentValue = Math.round(rawInstallment * 100) / 100;

    // 5. Definição do Total da Maquininha (A Verdade Matemática)
    // Recalculamos o total baseado na parcela arredondada para garantir consistência.
    // Ex: 89.38 * 13 = 1161.94 (e não mais 1162.00)
    const totalFinanced = SafeMath.multiply(installmentValue, installments);

    // 6. Valor Total Final (Cliente)
    const totalFinal = SafeMath.add(downPayment, totalFinanced);

    return {
      installmentValue,
      totalFinal,
      totalFinanced,
      interestRate
    };
  }, [spotValue, downPayment, installments]);
};