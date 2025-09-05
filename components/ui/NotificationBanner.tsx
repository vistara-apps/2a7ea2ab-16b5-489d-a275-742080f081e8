'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NotificationBannerProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  dismissible?: boolean;
  className?: string;
}

export function NotificationBanner({ 
  type = 'info', 
  title, 
  message, 
  dismissible = true,
  className 
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const typeStyles = {
    info: 'bg-primary/10 border-primary/20 text-primary',
    success: 'bg-positive/10 border-positive/20 text-positive',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    error: 'bg-negative/10 border-negative/20 text-negative',
  };

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg border',
      typeStyles[type],
      className
    )}>
      <div className="flex-1">
        {title && (
          <h4 className="font-semibold mb-1">{title}</h4>
        )}
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
