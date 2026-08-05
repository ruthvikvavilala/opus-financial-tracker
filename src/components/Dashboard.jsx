import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function Dashboard({ 
  transactions, 
  currency 
}) {

  // Calculate Metrics
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Monthly Area Chart Data
  const chartData = [
    { month: 'May', Balance: 30000 * currency.rate },
    { month: 'Jun', Balance: 33000 * currency.rate },
    { month: 'Jul', Balance: 36000 * currency.rate },
    { month: 'Aug', Balance: netBalance * currency.rate }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* 3 Neat KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        
        {/* Net Balance */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 600 }}>Total Net Balance</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#18181b', marginTop: '0.35rem', marginBottom: '0.35rem' }} className="mono-amount">
            {currency.symbol}{(netBalance * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
            <ArrowUpRight size={14} /> +14.2% this month
          </div>
        </div>

        {/* Total Income */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 600 }}>Monthly Income</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a', marginTop: '0.35rem', marginBottom: '0.35rem' }} className="mono-amount">
            {currency.symbol}{(totalIncome * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#71717a' }}>Base Salary + Bonus</span>
        </div>

        {/* Total Expenses */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 600 }}>Total Expenses</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', marginTop: '0.35rem', marginBottom: '0.35rem' }} className="mono-amount">
            {currency.symbol}{(totalExpense * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>
            <ArrowDownRight size={14} /> Outflow tracked
          </div>
        </div>

      </div>

      {/* Smooth Minimal Balance Trend Chart */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Net Savings Growth</h3>
            <p style={{ fontSize: '0.75rem', color: '#71717a' }}>Monthly accumulated wealth trajectory</p>
          </div>
        </div>

        <div style={{ height: '260px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#18181b" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#18181b" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip 
                formatter={(val) => [`${currency.symbol}${Number(val).toLocaleString('en-IN')}`, 'Net Balance']}
                contentStyle={{ background: '#ffffff', borderRadius: '6px', border: '1px solid #e4e4e7', fontSize: '0.78rem' }}
              />
              <Area type="monotone" dataKey="Balance" stroke="#18181b" strokeWidth={2} fillOpacity={1} fill="url(#balanceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
