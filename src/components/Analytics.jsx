import React from 'react';
import { TrendingUp, Sparkles, AlertCircle, CheckCircle, Store, CreditCard, PieChart, Lightbulb, ArrowUpRight } from 'lucide-react';
import { CATEGORIES, PAYMENT_METHODS } from '../data/initialData';

export default function Analytics({ transactions, budgets, insights, currency }) {
  
  // Calculate Merchant Breakdown
  const merchantTotals = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      merchantTotals[t.merchant] = (merchantTotals[t.merchant] || 0) + t.amount;
    });

  const sortedMerchants = Object.entries(merchantTotals)
    .map(([merchant, amount]) => ({ merchant, amount: amount * currency.rate }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  // Payment Method Breakdown
  const paymentTotals = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      paymentTotals[t.paymentMethod] = (paymentTotals[t.paymentMethod] || 0) + t.amount;
    });

  const totalExpense = Object.values(paymentTotals).reduce((a, b) => a + b, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* AI Financial Coach Card */}
      <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--accent-primary)', background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.625rem', background: 'var(--gradient-primary)', borderRadius: '12px', color: '#fff' }}>
            <Sparkles size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Opus Financial AI Coach</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Automated pattern analysis & customized recommendations
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {insights.map(item => (
            <div key={item.id} className="glass-card" style={{ padding: '1.25rem', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {item.type === 'danger' ? (
                  <AlertCircle size={18} color="var(--accent-danger)" />
                ) : item.type === 'warning' ? (
                  <AlertCircle size={18} color="var(--accent-warning)" />
                ) : (
                  <CheckCircle size={18} color="var(--accent-secondary)" />
                )}
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{item.title}</h4>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Grid: Top Merchants & Payment Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Top Merchants */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
            <Store size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Top Outflow Merchants</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {sortedMerchants.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
                    #{idx + 1}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.merchant}</span>
                </div>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }} className="mono-amount">
                  {currency.symbol}{item.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method Usage */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
            <CreditCard size={20} color="var(--accent-purple)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Payment Method Distribution</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.entries(paymentTotals).map(([pmId, amt]) => {
              const pmObj = PAYMENT_METHODS.find(p => p.id === pmId);
              const percent = totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0;
              return (
                <div key={pmId}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8125rem' }}>
                    <span style={{ fontWeight: 600 }}>{pmObj ? pmObj.name : pmId}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{percent}% ({currency.symbol}{(amt * currency.rate).toFixed(2)})</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-input)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${percent}%`,
                      background: 'var(--gradient-primary)',
                      borderRadius: 'var(--radius-full)'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
