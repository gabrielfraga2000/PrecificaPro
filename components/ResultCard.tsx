import React from 'react';
import { formatCurrency } from '../utils/math';
import { CalculationResult } from '../types';

interface ResultCardProps {
  result: CalculationResult | null;
  installments: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, installments }) => {
  if (!result) return null;

  return (
    <div className="mt-6 animate-fade-in">
      <div className="rounded-2xl bg-brand-700 p-6 text-white shadow-xl shadow-brand-900/10">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-100 opacity-80">
          Resultado da Simulação
        </h3>
        
        <div className="flex flex-col gap-6">
          {/* Main Hero Number: Installment Value */}
          <div>
            <span className="block text-sm font-medium text-brand-100 mb-1">
              Valor da Parcela ({installments}x)
            </span>
            <div className="text-4xl font-extrabold tracking-tight">
              {formatCurrency(result.installmentValue)}
            </div>
          </div>

          <div className="h-px bg-brand-500/50 w-full" />

          {/* Secondary Number: Total Final */}
          <div className="flex justify-between items-end">
             <div className="flex flex-col">
               <span className="text-sm font-medium text-brand-100">
                 Valor Total Final
               </span>
               <span className="text-xs text-brand-200 opacity-70">
                 (Entrada + Financiamento)
               </span>
             </div>
             <div className="text-2xl font-bold">
               {formatCurrency(result.totalFinal)}
             </div>
          </div>
        </div>
      </div>
      
      <p className="mt-3 text-center text-xs text-slate-400">
        *Cálculo inclui juros e tributos aplicáveis.
      </p>
    </div>
  );
};