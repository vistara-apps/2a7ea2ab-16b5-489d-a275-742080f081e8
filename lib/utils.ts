export function formatPrice(price: number): string {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
}

export function getStatusColor(percentage: number): string {
  if (percentage > 0) return 'status-positive';
  if (percentage < 0) return 'status-negative';
  return 'status-neutral';
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateMockCryptoData() {
  const cryptos = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
    { id: 'solana', symbol: 'SOL', name: 'Solana' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
    { id: 'polygon', symbol: 'MATIC', name: 'Polygon' },
    { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  ];

  return cryptos.map(crypto => ({
    ...crypto,
    current_price: Math.random() * 1000 + 10,
    price_change_percentage_24h: (Math.random() - 0.5) * 20,
    price_change_percentage_1h: (Math.random() - 0.5) * 5,
    market_cap: Math.random() * 1e12,
    volume_24h: Math.random() * 1e10,
    image: `https://assets.coingecko.com/coins/images/1/${crypto.id}.png`,
  }));
}
