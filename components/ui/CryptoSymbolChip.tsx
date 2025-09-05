'use client';

import { cn } from '@/lib/utils';

interface CryptoSymbolChipProps {
  symbol: string;
  name?: string;
  image?: string;
  className?: string;
}

export function CryptoSymbolChip({ symbol, name, image, className }: CryptoSymbolChipProps) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1 bg-surface rounded-full border border-gray-600',
      className
    )}>
      {image && (
        <img 
          src={image} 
          alt={symbol} 
          className="w-4 h-4 rounded-full"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
      <span className="text-sm font-medium text-text-primary">{symbol}</span>
      {name && (
        <span className="text-xs text-text-secondary hidden sm:inline">{name}</span>
      )}
    </div>
  );
}
