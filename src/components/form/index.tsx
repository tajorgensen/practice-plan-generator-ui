import React, { ChangeEvent, ReactNode } from 'react';
import { SelectOption } from '../../types';

interface FormSelectProps {
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
}

/**
 * Form select component
 * @param {FormSelectProps} props
 * @returns {JSX.Element}
 */
export const FormSelect = ({ 
  name, 
  value, 
  onChange, 
  label, 
  options, 
  required = false,
  placeholder = "Select an option"
}: FormSelectProps): JSX.Element => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value || option.id} value={option.value || option.id}>
            {option.label || option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

interface FormInputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
}

/**
 * Form input component
 * @param {FormInputProps} props
 * @returns {JSX.Element}
 */
export const FormInput = ({
  type = 'text',
  name,
  value,
  onChange,
  label,
  placeholder,
  min,
  max,
  required = false
}: FormInputProps): JSX.Element => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full p-2 border rounded"
        required={required}
      />
    </div>
  );
};

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

/**
 * Form button component
 * @param {FormButtonProps} props
 * @returns {JSX.Element}
 */
export const FormButton = ({
  type = 'button',
  text,
  onClick,
  disabled = false,
  className = '',
  icon
}: FormButtonProps): JSX.Element => {
  const baseClasses = "py-2 px-4 rounded flex items-center justify-center";
  const colorClasses = className || "bg-blue-600 hover:bg-blue-700 text-white";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};