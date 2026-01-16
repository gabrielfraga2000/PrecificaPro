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
      <div className="rounded-2xl bg-black p-6 text-white shadow-xl shadow-black/20 border border-[#b2ff51]/20">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#b2ff51] opacity-90">
          Resultado da Simulação
        </h3>
        
        <div className="flex flex-col gap-6">
          {/* Main Hero Number: Installment Value */}
          <div>
            <span className="block text-sm font-medium text-gray-300 mb-1">
              Valor da Parcela ({installments}x)
            </span>
            <div className="text-4xl font-extrabold tracking-tight text-[#b2ff51]">
              {formatCurrency(result.installmentValue)}
            </div>
          </div>

          <div className="h-px bg-[#333] w-full" />

          {/* Value to Charge on Machine */}
          <div className="flex justify-between items-center">
             <div className="flex flex-col">
               <span className="text-sm font-bold text-white">
                 Passar na Maquininha
               </span>
               <span className="text-xs text-gray-500">
                 (Valor Financiado)
               </span>
             </div>
             <div className="text-xl font-bold text-white">
               {formatCurrency(result.totalFinanced)}
             </div>
          </div>

          {/* Secondary Number: Total Final */}
          <div className="flex justify-between items-end border-t border-[#333] pt-4">
             <div className="flex flex-col">
               <span className="text-sm font-medium text-gray-400">
                 Valor Total Final
               </span>
               <span className="text-xs text-gray-500">
                 (Entrada + Financiamento)
               </span>
             </div>
             <div className="text-lg font-semibold text-gray-400">
               {formatCurrency(result.totalFinal)}
             </div>
          </div>
        </div>
      </div>
      
      <p className="mt-3 text-center text-xs text-gray-500">
        *Cálculo inclui juros e tributos aplicáveis.
      </p>
    </div>
  );
};