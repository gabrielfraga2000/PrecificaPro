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
    // Usamos SafeMath apenas para a subtração inicial para garantir precisão nos centavos da entrada
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

    // 3. Cálculo Financeiro de Alta Precisão (Float puro para intermediários)
    // Evitamos arredondar Juros e Impostos individualmente para não acumular erro de centavos.
    
    // Juros (I)
    const interestAmount = residual * interestRate;
    
    // Imposto sobre Juros (T)
    const taxAmount = interestAmount * TAX_RATE;

    // 4. Valor Total Financiado (Passar na Maquininha)
    // O valor na maquininha é a soma exata: Residual + Juros + Imposto.
    // Só arredondamos AGORA, no final, para 2 casas decimais.
    const rawTotalFinanced = residual + interestAmount + taxAmount;
    const totalFinanced = Math.round(rawTotalFinanced * 100) / 100;

    // 5. Valor da Parcela (Referência)
    // O valor da parcela é derivado do Total já arredondado.
    // Nota: O ResultCard vai formatar isso, mas matematicamente pode ter dízimas.
    // A prioridade é o totalFinanced estar correto.
    const installmentValue = totalFinanced / installments;

    // 6. Valor Total Final (Cliente)
    const totalFinal = downPayment + totalFinanced;

    return {
      installmentValue,
      totalFinal,
      totalFinanced,
      interestRate
    };
  }, [spotValue, downPayment, installments]);
};