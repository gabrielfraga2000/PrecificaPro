import React, { useState } from 'react';
import { usePriceCalculator } from './hooks/usePriceCalculator';
import { InputGroup } from './components/InputGroup';
import { ResultCard } from './components/ResultCard';
import { MAX_INSTALLMENTS } from './constants';
import { parseCurrencyInput } from './utils/math';
import { CalculatorIcon, RefreshCw, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [spotValueStr, setSpotValueStr] = useState<string>('');
  const [downPaymentStr, setDownPaymentStr] = useState<string>('');
  const [installments, setInstallments] = useState<number>(1);

  // Convert string inputs to numbers for logic
  const spotValue = parseCurrencyInput(spotValueStr);
  const downPayment = parseCurrencyInput(downPaymentStr);

  const result = usePriceCalculator(spotValue, downPayment, installments);

  const hasError = downPayment > spotValue;

  const handleReset = () => {
    setSpotValueStr('');
    setDownPaymentStr('');
    setInstallments(1);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-2 font-sans">
      <main className="w-full max-w-md bg-[#353535] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden border border-[#545454]">
        
        {/* Header */}
        <header className="bg-[#353535] px-5 py-4 border-b border-[#545454] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#b2ff51]/10 p-2 rounded-lg text-[#b2ff51]">
              <CalculatorIcon size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">PrecificaPro</h1>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Calculadora Dinâmica</p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-[#b2ff51] hover:bg-[#b2ff51]/10 rounded-full transition-colors"
            aria-label="Limpar dados"
          >
            <RefreshCw size={16} />
          </button>
        </header>

        {/* Content */}
        <div className="p-4">
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            
            {/* Spot Value Input */}
            <InputGroup
              id="spotValue"
              label="Valor à Vista"
              prefix="R$"
              value={spotValueStr}
              onChange={(e) => setSpotValueStr(e.target.value)}
              placeholder="0.00"
              step="0.01"
            />

            {/* Down Payment Input */}
            <div>
              <InputGroup
                id="downPayment"
                label="Valor de Entrada"
                prefix="R$"
                value={downPaymentStr}
                onChange={(e) => setDownPaymentStr(e.target.value)}
                placeholder="0.00"
                step="0.01"
                error={hasError}
              />
              {hasError && (
                <div className="flex items-center gap-1 mt-1 text-red-400 text-xs font-medium animate-pulse">
                  <AlertCircle size={12} />
                  <span>A entrada não pode ser maior que o valor à vista.</span>
                </div>
              )}
            </div>

            {/* Installments Select */}
            <div className="flex flex-col gap-1">
              <label htmlFor="installments" className="text-xs font-semibold text-gray-300">
                Número de Parcelas
              </label>
              <div className="relative">
                <select
                  id="installments"
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full appearance-none rounded-lg border-2 border-[#545454] bg-[#262626] py-2 px-3 text-base font-bold text-white focus:border-[#b2ff51] focus:outline-none focus:ring-1 focus:ring-[#b2ff51] transition-all cursor-pointer hover:border-gray-500"
                >
                  {Array.from({ length: MAX_INSTALLMENTS }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-[#353535] text-white">
                      {n}x {n === 1 ? '(Sem Juros)' : ''}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

          </form>

          {/* Results Section */}
          {!hasError && spotValue > 0 && (
            <ResultCard result={result} installments={installments} />
          )}

          {/* Empty State / Prompt */}
          {!result && !hasError && (
            <div className="mt-6 text-center p-4 bg-[#262626] rounded-xl border border-[#545454] border-dashed">
              <p className="text-xs text-gray-400 font-medium">
                Insira o valor à vista para começar.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;