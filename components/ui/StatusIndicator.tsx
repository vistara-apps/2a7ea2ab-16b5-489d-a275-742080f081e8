'use client';

import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  variant: 'positive' | 'negative' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export function StatusIndicator({ variant, children, className }: StatusIndicatorProps) {
  return (
    <span className={cn(
      'font-medium',
      variant === 'positive' && 'status-positive',
      variant === 'negative' && 'status-negative',
      variant === 'neutral' && 'status-neutral',
      className
    )}>
      {children}
    </span>
  );
}
