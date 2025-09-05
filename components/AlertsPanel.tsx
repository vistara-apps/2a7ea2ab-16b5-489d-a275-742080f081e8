'use client';

import { useState, useEffect } from 'react';
import { Alert } from '@/lib/types';
import { AlertCard } from './AlertCard';
import { PrimaryButton } from './ui/PrimaryButton';
import { NotificationBanner } from './ui/NotificationBanner';
import { Bell, Plus, Filter } from 'lucide-react';

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'triggered'>('all');

  useEffect(() => {
    // Generate mock alerts
    const mockAlerts: Alert[] = [
      {
        alertId: '1',
        userId: 'user1',
        type: 'breakout',
        cryptoSymbol: 'BTC',
        threshold: 45000,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        status: 'triggered',
        message: 'Bitcoin has broken above $45,000 resistance level with strong volume!',
        currentPrice: 46250,
        priceChange: 8.5
      },
      {
        alertId: '2',
        userId: 'user1',
        type: 'trend',
        cryptoSymbol: 'ETH',
        threshold: 2800,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'active',
        message: 'AI predicts bullish trend for Ethereum based on on-chain metrics and social sentiment.',
        currentPrice: 2750,
        priceChange: 3.2
      },
      {
        alertId: '3',
        userId: 'user1',
        type: 'portfolio',
        cryptoSymbol: 'SOL',
        threshold: 100,
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        status: 'triggered',
        message: 'Your Solana holdings have reached your target price of $100!',
        currentPrice: 102.5,
        priceChange: 12.8
      }
    ];
    
    setAlerts(mockAlerts);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;
  const triggeredAlertsCount = alerts.filter(a => a.status === 'triggered').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-text-primary">Your Alerts</h2>
        </div>
        <PrimaryButton size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Alert
        </PrimaryButton>
      </div>

      {triggeredAlertsCount > 0 && (
        <NotificationBanner
          type="success"
          title="Alert Triggered!"
          message={`${triggeredAlertsCount} of your alerts have been triggered. Check them out below.`}
        />
      )}

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          All ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'active' 
              ? 'bg-primary text-white' 
              : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Active ({activeAlertsCount})
        </button>
        <button
          onClick={() => setFilter('triggered')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'triggered' 
              ? 'bg-primary text-white' 
              : 'bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          Triggered ({triggeredAlertsCount})
        </button>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard key={alert.alertId} alert={alert} />
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No alerts found</h3>
            <p className="text-text-secondary mb-4">
              {filter === 'all' 
                ? "You don't have any alerts set up yet." 
                : `No ${filter} alerts at the moment.`}
            </p>
            <PrimaryButton>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Alert
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}
