import React from 'react';
import { LayoutDashboard, ReceiptText, PieChart, Target, TrendingUp, CreditCard, Shield, LineChart, ShieldCheck, Bell, Users, Landmark, Printer, Calculator, Sparkles } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'budgets', label: 'Budgets', icon: PieChart },
    { id: 'investments', label: 'Investments', icon: LineChart },
    { id: 'cards', label: 'Credit Cards', icon: CreditCard },
    { id: 'emis', label: 'EMI & Loans', icon: CreditCard },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'tax', label: 'Tax Optimizer', icon: Calculator },
    { id: 'predict', label: 'AI Predictor', icon: Sparkles },
    { id: 'reminders', label: 'Bill Reminders', icon: Bell },
    { id: 'splitter', label: 'Bill Splitter', icon: Users },
    { id: 'networth', label: 'Net Worth', icon: Landmark },
    { id: 'score', label: 'Credit Score', icon: ShieldCheck },
    { id: 'reports', label: 'Reports & PDF', icon: Printer },
    { id: 'goals', label: 'Savings Goals', icon: Target },
    { id: 'analytics', label: 'Insights', icon: TrendingUp },
  ];

  return (
    <aside style={{
      width: '220px',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid #1e293b',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.25rem', marginBottom: '2.5rem' }}>
        <img 
          src="/images/logo.jpg" 
          alt="Opus Financial Logo" 
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            objectFit: 'cover',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        />
        <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Opus Financial</span>
      </div>

      {/* Nav List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map(item => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                background: isActive ? '#f4f4f5' : 'transparent',
                color: isActive ? '#18181b' : '#71717a',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.1s ease'
              }}
            >
              <IconComponent size={16} color={isActive ? '#18181b' : '#a1a1aa'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
