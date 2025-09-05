export const SUBSCRIPTION_TIERS = {
  basic: {
    name: 'Basic',
    price: 5,
    features: [
      'Real-time price breakout alerts',
      'Up to 10 watchlist coins',
      'Basic trend indicators',
      'Email notifications'
    ]
  },
  premium: {
    name: 'Premium',
    price: 15,
    features: [
      'All Basic features',
      'AI-powered trend predictions',
      'Unlimited watchlist coins',
      'Custom portfolio alerts',
      'Advanced analytics',
      'Priority support'
    ]
  }
} as const;

export const ALERT_TYPES = {
  breakout: {
    name: 'Price Breakout',
    description: 'Significant price increases',
    icon: '📈'
  },
  trend: {
    name: 'Trend Signal',
    description: 'AI-predicted market shifts',
    icon: '🔮'
  },
  portfolio: {
    name: 'Portfolio Alert',
    description: 'Your holdings updates',
    icon: '💼'
  }
} as const;

export const TREND_TIMEFRAMES = ['1h', '4h', '24h'] as const;
export const TREND_PREDICTIONS = ['bullish', 'bearish', 'neutral'] as const;
