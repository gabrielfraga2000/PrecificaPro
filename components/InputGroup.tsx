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
  placeholder?: string;
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
  error,
  placeholder
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-gray-300">
        {label}
      </label>
      <div className={`relative flex items-center rounded-lg border-2 bg-[#262626] transition-all focus-within:ring-1 focus-within:ring-[#b2ff51] ${error ? 'border-red-400 focus-within:border-red-500' : 'border-[#545454] focus-within:border-[#b2ff51] hover:border-gray-500'}`}>
        {prefix && (
          <span className="pl-3 text-gray-400 select-none font-medium">{prefix}</span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className="w-full bg-transparent py-3 px-3 text-lg font-bold text-white placeholder-gray-600 focus:outline-none"
          placeholder={placeholder || "0,00"}
        />
      </div>
    </div>
  );
};