export interface User {
  userId: string;
  email?: string;
  subscriptionTier: 'basic' | 'premium';
  alertPreferences: AlertPreferences;
  portfolio: PortfolioHolding[];
}

export interface AlertPreferences {
  breakoutThreshold: number;
  trendSensitivity: 'low' | 'medium' | 'high';
  notificationMethods: ('push' | 'email' | 'farcaster')[];
  watchedCoins: string[];
}

export interface PortfolioHolding {
  symbol: string;
  amount: number;
  initialPrice: number;
  targetPrice?: number;
  stopLoss?: number;
}

export interface Alert {
  alertId: string;
  userId: string;
  type: 'breakout' | 'trend' | 'portfolio';
  cryptoSymbol: string;
  threshold: number;
  createdAt: Date;
  status: 'active' | 'triggered' | 'expired';
  message: string;
  currentPrice?: number;
  priceChange?: number;
}

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h: number;
  market_cap: number;
  volume_24h: number;
  image: string;
}

export interface TrendPrediction {
  symbol: string;
  prediction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  timeframe: '1h' | '4h' | '24h';
  reasoning: string;
}
