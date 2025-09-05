'use client';

import { Alert } from '@/lib/types';
import { ALERT_TYPES } from '@/lib/constants';
import { formatPrice, formatPercentage, cn } from '@/lib/utils';
import { CryptoSymbolChip } from './ui/CryptoSymbolChip';
import { StatusIndicator } from './ui/StatusIndicator';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  variant?: 'breakout' | 'trend' | 'portfolio';
  className?: string;
}

export function AlertCard({ alert, variant = alert.type, className }: AlertCardProps) {
  const alertConfig = ALERT_TYPES[alert.type];
  const isPositive = (alert.priceChange ?? 0) > 0;
  
  return (
    <div className={cn('alert-card', variant, className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{alertConfig.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{alertConfig.name}</h3>
            <p className="text-sm text-text-secondary">{alertConfig.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-secondary">
          <Clock className="w-3 h-3" />
          {new Date(alert.createdAt).toLocaleTimeString()}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <CryptoSymbolChip symbol={alert.cryptoSymbol} />
        <div className="text-right">
          {alert.currentPrice && (
            <div className="text-xl font-bold text-text-primary">
              {formatPrice(alert.currentPrice)}
            </div>
          )}
          {alert.priceChange !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-positive" />
              ) : (
                <TrendingDown className="w-4 h-4 text-negative" />
              )}
              <StatusIndicator variant={isPositive ? 'positive' : 'negative'}>
                {formatPercentage(alert.priceChange)}
              </StatusIndicator>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 bg-bg rounded-md">
        <p className="text-sm text-text-secondary">{alert.message}</p>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
        <span className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          alert.status === 'active' && 'bg-primary/20 text-primary',
          alert.status === 'triggered' && 'bg-positive/20 text-positive',
          alert.status === 'expired' && 'bg-gray-600/20 text-text-secondary'
        )}>
          {alert.status.toUpperCase()}
        </span>
        <div className="text-xs text-text-secondary">
          Threshold: {formatPrice(alert.threshold)}
        </div>
      </div>
    </div>
  );
}
