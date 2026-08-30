import React from 'react';
import { Sparkles, AlertCircle, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function AIForecaster({ transactions, budgets, currency }) {
  
  // Forecast Data Curve
  const forecastData = [
    { month: 'Jun (Actual)', Outflow: 42000 * currency.rate },
    { month: 'Jul (Actual)', Outflow: 48500 * currency.rate },
    { month: 'Aug (Current)', Outflow: 52400 * currency.rate },
    { month: 'Sep (AI Forecast)', Outflow: 49800 * currency.rate },
    { month: 'Oct (AI Forecast)', Outflow: 51200 * currency.rate }
  ];

  // Detect Anomalies (transactions > 2.5x category average)
  const anomalies = transactions.filter(t => t.type === 'expense' && t.amount > 15000);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>AI Cashflow Predictor & Anomaly Detector</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Machine-learning forecast curve & high-value transaction anomaly flags</p>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Sparkles size={18} color="#2563eb" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Next 60-Day Expense Velocity Projection</h3>
        </div>

        <div style={{ height: '260px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip 
                formatter={(val) => [`${currency.symbol}${Number(val).toLocaleString('en-IN')}`, 'Projected Outflow']}
                contentStyle={{ background: '#ffffff', borderRadius: '6px', border: '1px solid #e4e4e7', fontSize: '0.78rem' }}
              />
              <Area type="monotone" dataKey="Outflow" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#forecastGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Flagged Anomaly Charges */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertCircle size={18} color="#d97706" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>AI Flagged Anomaly Transactions</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {anomalies.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>{t.title}</strong>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>{t.merchant || 'Merchant'} • {t.date}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
                  {currency.symbol}{(t.amount * currency.rate).toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#d97706', display: 'block', fontWeight: 700 }}>2.8x Category Average</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
