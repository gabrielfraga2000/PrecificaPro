import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  prefix?: string;
  min?: string | number;
  max?: string | number;
  step?: string;
  error?: boolean;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  value,
  onChange,
  type = "number",
  prefix,
  min,
  max,
  step,
  error
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-slate-600">
        {label}
      </label>
      <div className={`relative flex items-center rounded-lg border-2 bg-white transition-all focus-within:ring-2 focus-within:ring-brand-100 ${error ? 'border-red-300 focus-within:border-red-500' : 'border-slate-200 focus-within:border-brand-500'}`}>
        {prefix && (
          <span className="pl-3 text-slate-400 select-none font-medium">{prefix}</span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className="w-full bg-transparent py-3 px-3 text-lg font-bold text-slate-800 placeholder-slate-300 focus:outline-none"
          placeholder="0,00"
        />
      </div>
    </div>
  );
};