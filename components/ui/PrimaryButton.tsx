'use client';

import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function PrimaryButton({ 
  variant = 'default', 
  size = 'md',
  loading = false,
  className,
  disabled,
  children,
  ...props 
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'btn-primary': variant === 'default',
          'btn-secondary': variant === 'secondary',
          'border border-gray-600 bg-transparent text-text-primary hover:bg-surface': variant === 'outline',
        },
        {
          'px-3 py-1.5 text-sm rounded': size === 'sm',
          'px-4 py-2 text-base rounded-md': size === 'md',
          'px-6 py-3 text-lg rounded-lg': size === 'lg',
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}
