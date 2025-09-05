'use client';

import { useState, useEffect } from 'react';
import { PortfolioHolding } from '@/lib/types';
import { formatPrice, formatPercentage } from '@/lib/utils';
import { StatusIndicator } from './ui/StatusIndicator';
import { PrimaryButton } from './ui/PrimaryButton';
import { Wallet, TrendingUp, TrendingDown, Plus } from 'lucide-react';

export function PortfolioOverview() {
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalChange, setTotalChange] = useState(0);

  useEffect(() => {
    // Mock portfolio data
    const mockPortfolio: PortfolioHolding[] = [
      {
        symbol: 'BTC',
        amount: 0.5,
        initialPrice: 42000,
        targetPrice: 50000,
        stopLoss: 38000
      },
      {
        symbol: 'ETH',
        amount: 2.5,
        initialPrice: 2500,
        targetPrice: 3000,
        stopLoss: 2200
      },
      {
        symbol: 'SOL',
        amount: 10,
        initialPrice: 80,
        targetPrice: 120,
        stopLoss: 70
      }
    ];

    // Simulate current prices and calculate values
    const currentPrices = {
      BTC: 46250,
      ETH: 2750,
      SOL: 102.5
    };

    let total = 0;
    let totalInitial = 0;

    const portfolioWithValues = mockPortfolio.map(holding => {
      const currentPrice = currentPrices[holding.symbol as keyof typeof currentPrices] || holding.initialPrice;
      const currentValue = holding.amount * currentPrice;
      const initialValue = holding.amount * holding.initialPrice;
      
      total += currentValue;
      totalInitial += initialValue;
      
      return {
        ...holding,
        currentPrice,
        currentValue,
        initialValue,
        change: ((currentPrice - holding.initialPrice) / holding.initialPrice) * 100
      };
    });

    setPortfolio(portfolioWithValues);
    setTotalValue(total);
    setTotalChange(((total - totalInitial) / totalInitial) * 100);
  }, []);

  const isPositive = totalChange > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-bold text-text-primary">Portfolio</h2>
        </div>
        <PrimaryButton size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Holding
        </PrimaryButton>
      </div>

      <div className="glass-card p-6">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-text-primary mb-2">
            {formatPrice(totalValue)}
          </h3>
          <div className="flex items-center justify-center gap-2">
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-positive" />
            ) : (
              <TrendingDown className="w-5 h-5 text-negative" />
            )}
            <StatusIndicator variant={isPositive ? 'positive' : 'negative'}>
              {formatPercentage(totalChange)}
            </StatusIndicator>
            <span className="text-text-secondary">Total P&L</span>
          </div>
        </div>

        <div className="space-y-4">
          {portfolio.map((holding) => {
            const isHoldingPositive = (holding as any).change > 0;
            
            return (
              <div key={holding.symbol} className="flex items-center justify-between p-4 bg-bg rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center">
                    <span className="font-bold text-text-primary">{holding.symbol}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{holding.symbol}</h4>
                    <p className="text-sm text-text-secondary">{holding.amount} tokens</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-text-primary">
                    {formatPrice((holding as any).currentValue)}
                  </div>
                  <div className="flex items-center gap-1">
                    <StatusIndicator variant={isHoldingPositive ? 'positive' : 'negative'}>
                      {formatPercentage((holding as any).change)}
                    </StatusIndicator>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card text-center">
          <h4 className="text-text-secondary text-sm mb-1">Holdings</h4>
          <p className="text-2xl font-bold text-text-primary">{portfolio.length}</p>
        </div>
        <div className="metric-card text-center">
          <h4 className="text-text-secondary text-sm mb-1">Best Performer</h4>
          <p className="text-lg font-semibold text-positive">SOL +28.1%</p>
        </div>
        <div className="metric-card text-center">
          <h4 className="text-text-secondary text-sm mb-1">Active Alerts</h4>
          <p className="text-2xl font-bold text-primary">3</p>
        </div>
      </div>
    </div>
  );
}
