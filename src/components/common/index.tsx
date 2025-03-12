import React, { ReactNode } from 'react';
import { AlertTriangle, CheckCircle, Loader } from 'lucide-react';

interface ErrorAlertProps {
  message: string | null;
}

/**
 * Error Alert component
 * @param {ErrorAlertProps} props
 * @returns {JSX.Element | null}
 */
export const ErrorAlert = ({ message }: ErrorAlertProps): JSX.Element | null => {
  if (!message) return null;
  
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
      <AlertTriangle className="mr-2" size={20} />
      <span>{message}</span>
    </div>
  );
};

interface SuccessAlertProps {
  message: string | null;
}

/**
 * Success Alert component
 * @param {SuccessAlertProps} props
 * @returns {JSX.Element | null}
 */
export const SuccessAlert = ({ message }: SuccessAlertProps): JSX.Element | null => {
  if (!message) return null;
  
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
      <CheckCircle className="mr-2" size={20} />
      <span>{message}</span>
    </div>
  );
};

interface LoadingSpinnerProps {
  show: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Loading Spinner component
 * @param {LoadingSpinnerProps} props
 * @returns {JSX.Element | null}
 */
export const LoadingSpinner = ({ show, size = 'medium' }: LoadingSpinnerProps): JSX.Element | null => {
  if (!show) return null;
  
  let sizeClass = 'w-6 h-6';
  if (size === 'small') sizeClass = 'w-4 h-4';
  if (size === 'large') sizeClass = 'w-8 h-8';
  
  return (
    <div className="flex justify-center items-center">
      <Loader className={`${sizeClass} animate-spin text-blue-600`} />
    </div>
  );
};

interface PageContainerProps {
  children: ReactNode;
  title?: string;
}

/**
 * Page Container component
 * @param {PageContainerProps} props
 * @returns {JSX.Element}
 */
export const PageContainer = ({ children, title }: PageContainerProps): JSX.Element => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {title && <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>}
      {children}
    </div>
  );
};