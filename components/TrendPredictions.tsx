'use client';

import { useState, useEffect } from 'react';
import { TrendPrediction } from '@/lib/types';
import { CryptoSymbolChip } from './ui/CryptoSymbolChip';
import { StatusIndicator } from './ui/StatusIndicator';
import { Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function TrendPredictions() {
  const [predictions, setPredictions] = useState<TrendPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock AI predictions
    const mockPredictions: TrendPrediction[] = [
      {
        symbol: 'BTC',
        prediction: 'bullish',
        confidence: 85,
        timeframe: '24h',
        reasoning: 'Strong institutional buying pressure and breaking key resistance levels. On-chain metrics show accumulation by long-term holders.'
      },
      {
        symbol: 'ETH',
        prediction: 'bullish',
        confidence: 78,
        timeframe: '4h',
        reasoning: 'Ethereum network activity increasing with upcoming protocol upgrades. DeFi TVL showing positive momentum.'
      },
      {
        symbol: 'SOL',
        prediction: 'neutral',
        confidence: 65,
        timeframe: '1h',
        reasoning: 'Mixed signals from technical indicators. Waiting for clearer direction after recent consolidation phase.'
      },
      {
        symbol: 'ADA',
        prediction: 'bearish',
        confidence: 72,
        timeframe: '24h',
        reasoning: 'Declining development activity and reduced social sentiment. Technical indicators showing weakness.'
      }
    ];

    setTimeout(() => {
      setPredictions(mockPredictions);
      setLoading(false);
    }, 1500);
  }, []);

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'bullish':
        return <TrendingUp className="w-5 h-5 text-positive" />;
      case 'bearish':
        return <TrendingDown className="w-5 h-5 text-negative" />;
      default:
        return <Minus className="w-5 h-5 text-text-secondary" />;
    }
  };

  const getPredictionVariant = (prediction: string): 'positive' | 'negative' | 'neutral' => {
    switch (prediction) {
      case 'bullish':
        return 'positive';
      case 'bearish':
        return 'negative';
      default:
        return 'neutral';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-accent animate-pulse" />
          <h2 className="text-xl font-bold text-text-primary">AI Trend Predictions</h2>
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="metric-card animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="w-16 h-6 bg-gray-600 rounded"></div>
              <div className="w-20 h-5 bg-gray-600 rounded"></div>
            </div>
            <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-bold text-text-primary">AI Trend Predictions</h2>
        <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
          PREMIUM
        </span>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction) => (
          <div key={prediction.symbol} className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <CryptoSymbolChip symbol={prediction.symbol} />
              <div className="flex items-center gap-2">
                {getPredictionIcon(prediction.prediction)}
                <StatusIndicator variant={getPredictionVariant(prediction.prediction)}>
                  {prediction.prediction.toUpperCase()}
                </StatusIndicator>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Confidence</span>
                <span className="text-sm font-medium text-text-primary">{prediction.confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${prediction.confidence}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Timeframe</span>
                <span className="px-2 py-1 bg-surface text-text-primary text-xs font-medium rounded">
                  {prediction.timeframe}
                </span>
              </div>
            </div>

            <div className="p-3 bg-bg rounded-md">
              <p className="text-sm text-text-secondary leading-relaxed">
                {prediction.reasoning}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-4 border-accent/20">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-text-primary">AI Analysis</h3>
        </div>
        <p className="text-sm text-text-secondary">
          Predictions are generated using advanced machine learning models analyzing market data, 
          on-chain metrics, social sentiment, and technical indicators. Results update every hour.
        </p>
      </div>
    </div>
  );
}
