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
    <div className="mt-4 animate-fade-in">
      <div className="rounded-xl bg-black p-4 text-white shadow-xl shadow-black/20 border border-[#b2ff51]/20">
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#b2ff51] opacity-90">
          Resultado da Simulação
        </h3>
        
        <div className="flex flex-col gap-4">
          {/* Main Hero Number: Installment Value */}
          <div>
            <span className="block text-xs font-medium text-gray-300 mb-0.5">
              Valor da Parcela ({installments}x)
            </span>
            <div className="text-3xl font-extrabold tracking-tight text-[#b2ff51]">
              {formatCurrency(result.installmentValue)}
            </div>
            <p className="text-[9px] text-gray-500 mt-1">
              *A soma das parcelas pode variar centavos devido ao arredondamento da maquininha.
            </p>
          </div>

          <div className="h-px bg-[#333] w-full" />

          {/* Value to Charge on Machine */}
          <div className="flex justify-between items-center bg-[#262626] -mx-4 px-4 py-2 border-l-4 border-[#b2ff51]">
             <div className="flex flex-col">
               <span className="text-sm font-bold text-white">
                 Passar na Maquininha
               </span>
               <span className="text-[10px] text-gray-400">
                 (Valor EXATO a Digitar)
               </span>
             </div>
             <div className="text-xl font-bold text-white">
               {formatCurrency(result.totalFinanced)}
             </div>
          </div>

          {/* Secondary Number: Total Final */}
          <div className="flex justify-between items-end pt-1">
             <div className="flex flex-col">
               <span className="text-xs font-medium text-gray-400">
                 Valor Total Final
               </span>
               <span className="text-[10px] text-gray-500">
                 (Entrada + Financiamento)
               </span>
             </div>
             <div className="text-base font-semibold text-gray-400">
               {formatCurrency(result.totalFinal)}
             </div>
          </div>
        </div>
      </div>
      
      <p className="mt-2 text-center text-[10px] text-gray-500">
        *Cálculo inclui juros progressivos e taxa administrativa.
      </p>
    </div>
  );
};