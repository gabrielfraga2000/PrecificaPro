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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-white">
        
        {/* Header */}
        <header className="bg-white px-6 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-50 p-2.5 rounded-xl text-brand-600">
              <CalculatorIcon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">PrecificaPro</h1>
              <p className="text-xs font-medium text-slate-400">Calculadora Dinâmica</p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
            aria-label="Limpar dados"
          >
            <RefreshCw size={18} />
          </button>
        </header>

        {/* Content */}
        <div className="p-6">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            
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
                <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium animate-pulse">
                  <AlertCircle size={12} />
                  <span>A entrada não pode ser maior que o valor à vista.</span>
                </div>
              )}
            </div>

            {/* Installments Select */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="installments" className="text-sm font-semibold text-slate-600">
                Número de Parcelas
              </label>
              <div className="relative">
                <select
                  id="installments"
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-white py-3 px-4 text-lg font-bold text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all cursor-pointer"
                >
                  {Array.from({ length: MAX_INSTALLMENTS }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}x {n === 1 ? '(Sem Juros)' : ''}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
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
            <div className="mt-8 text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
              <p className="text-sm text-slate-400 font-medium">
                Insira o valor à vista para começar a simulação.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;