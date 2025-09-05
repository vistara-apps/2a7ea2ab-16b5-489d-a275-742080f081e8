'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { CryptoList } from '@/components/CryptoList';
import { AlertsPanel } from '@/components/AlertsPanel';
import { PortfolioOverview } from '@/components/PortfolioOverview';
import { TrendPredictions } from '@/components/TrendPredictions';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { NotificationBanner } from '@/components/ui/NotificationBanner';
import { Activity, Bell, Wallet as WalletIcon, Brain, BarChart3 } from 'lucide-react';

type TabType = 'market' | 'alerts' | 'portfolio' | 'trends';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('market');
  const [isConnected, setIsConnected] = useState(false);
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const tabs = [
    { id: 'market' as TabType, label: 'Market', icon: BarChart3 },
    { id: 'alerts' as TabType, label: 'Alerts', icon: Bell },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: WalletIcon },
    { id: 'trends' as TabType, label: 'AI Trends', icon: Brain },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'market':
        return <CryptoList />;
      case 'alerts':
        return <AlertsPanel />;
      case 'portfolio':
        return <PortfolioOverview />;
      case 'trends':
        return <TrendPredictions />;
      default:
        return <CryptoList />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-gray-700">
        <div className="w-full max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-text-primary">CryptoTrend Alert</h1>
                <p className="text-xs text-text-secondary">Catch trends before they happen</p>
              </div>
            </div>
            
            <Wallet>
              <ConnectWallet>
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      {!isConnected && (
        <div className="w-full max-w-md mx-auto px-4 py-4">
          <NotificationBanner
            type="info"
            title="Welcome to CryptoTrend Alert!"
            message="Connect your wallet to set up personalized alerts and track your portfolio."
          />
        </div>
      )}

      {/* Tab Navigation */}
      <nav className="w-full max-w-md mx-auto px-4 py-4">
        <div className="flex items-center gap-1 p-1 bg-surface rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-md mx-auto px-4 pb-8">
        {renderTabContent()}
      </main>

      {/* Subscription CTA */}
      {activeTab === 'trends' && (
        <div className="w-full max-w-md mx-auto px-4 pb-8">
          <div className="glass-card p-6 text-center border-accent/20">
            <Brain className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-bold text-text-primary mb-2">Unlock Premium AI Insights</h3>
            <p className="text-text-secondary mb-4">
              Get advanced trend predictions, custom portfolio alerts, and priority support.
            </p>
            <div className="space-y-2 mb-4">
              <PrimaryButton className="w-full">
                Upgrade to Premium - $15/month
              </PrimaryButton>
              <PrimaryButton variant="outline" className="w-full">
                Start with Basic - $5/month
              </PrimaryButton>
            </div>
            <p className="text-xs text-text-secondary">
              7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
