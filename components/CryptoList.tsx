'use client';

import { useState, useEffect } from 'react';
import { CryptoData } from '@/lib/types';
import { formatPrice, formatPercentage, formatMarketCap, getStatusColor, generateMockCryptoData } from '@/lib/utils';
import { CryptoSymbolChip } from './ui/CryptoSymbolChip';
import { StatusIndicator } from './ui/StatusIndicator';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function CryptoList() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const loadCryptos = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockCryptoData();
      setCryptos(mockData);
      setLoading(false);
    };

    loadCryptos();
    
    // Update data every 30 seconds
    const interval = setInterval(loadCryptos, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="metric-card animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div>
                  <div className="w-16 h-4 bg-gray-600 rounded mb-1"></div>
                  <div className="w-12 h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-20 h-5 bg-gray-600 rounded mb-1"></div>
                <div className="w-16 h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cryptos.map((crypto) => {
        const isPositive24h = crypto.price_change_percentage_24h > 0;
        const isPositive1h = crypto.price_change_percentage_1h > 0;
        
        return (
          <div key={crypto.id} className="metric-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img 
                  src={crypto.image} 
                  alt={crypto.symbol}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/32/374151/9CA3AF?text=${crypto.symbol.charAt(0)}`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-text-primary">{crypto.symbol.toUpperCase()}</h3>
                  <p className="text-sm text-text-secondary">{crypto.name}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-text-primary">
                  {formatPrice(crypto.current_price)}
                </div>
                <div className="flex items-center gap-1 justify-end">
                  {isPositive24h ? (
                    <TrendingUp className="w-4 h-4 text-positive" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-negative" />
                  )}
                  <StatusIndicator variant={isPositive24h ? 'positive' : 'negative'}>
                    {formatPercentage(crypto.price_change_percentage_24h)}
                  </StatusIndicator>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-text-secondary mb-1">1h Change</p>
                <StatusIndicator variant={isPositive1h ? 'positive' : 'negative'}>
                  {formatPercentage(crypto.price_change_percentage_1h)}
                </StatusIndicator>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Market Cap</p>
                <p className="text-text-primary font-medium">
                  {formatMarketCap(crypto.market_cap)}
                </p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Volume 24h</p>
                <p className="text-text-primary font-medium">
                  {formatMarketCap(crypto.volume_24h)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
