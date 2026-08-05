import React, { useState } from 'react';
import { TrendingUp, Plus, ArrowUpRight, ShieldCheck, X } from 'lucide-react';

export default function InvestmentsTracker({ 
  investments, 
  onAddInvestment, 
  currency 
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalInvested = investments.reduce((sum, i) => sum + i.investedAmount, 0);
  const totalCurrentValue = investments.reduce((sum, i) => sum + i.currentValue, 0);
  const totalMonthlySIP = investments.reduce((sum, i) => sum + i.monthlySIP, 0);

  const overallProfit = totalCurrentValue - totalInvested;
  const overallReturnsPercent = totalInvested > 0 ? ((overallProfit / totalInvested) * 100).toFixed(1) : '0';

  const [newInv, setNewInv] = useState({
    name: '',
    category: 'Mutual Funds / SIP',
    investedAmount: '',
    currentValue: '',
    monthlySIP: '0',
    type: 'sip'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newInv.name || !newInv.investedAmount) return;

    const invested = parseFloat(newInv.investedAmount);
    const current = parseFloat(newInv.currentValue || newInv.investedAmount);
    const returns = invested > 0 ? parseFloat((((current - invested) / invested) * 100).toFixed(1)) : 0;

    onAddInvestment({
      id: 'inv-' + Date.now(),
      name: newInv.name,
      category: newInv.category,
      investedAmount: invested,
      currentValue: current,
      monthlySIP: parseFloat(newInv.monthlySIP || 0),
      returnsPercent: returns,
      type: newInv.type
    });

    setIsAddModalOpen(false);
    setNewInv({
      name: '',
      category: 'Mutual Funds / SIP',
      investedAmount: '',
      currentValue: '',
      monthlySIP: '0',
      type: 'sip'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header Summary */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Investments & Wealth Portfolio</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Track stocks, mutual funds, SIPs, gold, and crypto growth</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>PORTFOLIO VALUE</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
              {currency.symbol}{(totalCurrentValue * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>TOTAL RETURNS</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: overallProfit >= 0 ? '#16a34a' : '#dc2626' }} className="mono-amount">
              {overallProfit >= 0 ? '+' : ''}{currency.symbol}{(overallProfit * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })} ({overallReturnsPercent}%)
            </span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>MONTHLY SIP</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2563eb' }} className="mono-amount">
              {currency.symbol}{(totalMonthlySIP * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Active Investment Cards */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Your Asset Holdings</h3>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={14} /> Add Asset / SIP
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {investments.map(item => {
            const profit = item.currentValue - item.investedAmount;

            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.name}</h4>
                    <span style={{ fontSize: '0.72rem', color: '#71717a' }}>{item.category}</span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '99px',
                    background: profit >= 0 ? '#f0fdf4' : '#fef2f2',
                    color: profit >= 0 ? '#16a34a' : '#dc2626'
                  }}>
                    {profit >= 0 ? '+' : ''}{item.returnsPercent}%
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', padding: '0.75rem 1rem', borderRadius: '8px', margin: '0.5rem 0 0.85rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Current Value</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
                      {currency.symbol}{(item.currentValue * currency.rate).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Invested</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#71717a' }} className="mono-amount">
                      {currency.symbol}{(item.investedAmount * currency.rate).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {item.monthlySIP > 0 && (
                  <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>
                    Auto Monthly SIP: {currency.symbol}{(item.monthlySIP * currency.rate).toLocaleString('en-IN')}/month
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Investment Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Add Asset / Investment</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div className="form-group">
                <label className="form-label">Asset / Fund Name</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. Parag Parikh Flexi Cap Fund"
                  value={newInv.name}
                  onChange={e => setNewInv({ ...newInv, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="select-field"
                    value={newInv.category}
                    onChange={e => setNewInv({ ...newInv, category: e.target.value })}
                  >
                    <option value="Mutual Funds / SIP">Mutual Funds / SIP</option>
                    <option value="Equity Stocks">Equity Stocks</option>
                    <option value="Digital Gold">Digital Gold</option>
                    <option value="Crypto Assets">Crypto Assets</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Monthly SIP ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="0"
                    value={newInv.monthlySIP}
                    onChange={e => setNewInv({ ...newInv, monthlySIP: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Invested Amount ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    required
                    placeholder="50000"
                    value={newInv.investedAmount}
                    onChange={e => setNewInv({ ...newInv, investedAmount: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Value ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="58000"
                    value={newInv.currentValue}
                    onChange={e => setNewInv({ ...newInv, currentValue: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Investment
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
