import React, { useState } from 'react';
import { Landmark, TrendingUp, ShieldAlert, ArrowUpRight, Plus, X } from 'lucide-react';

export default function NetWorth({ 
  transactions, 
  investments, 
  emis, 
  creditCards, 
  currency 
}) {

  // Calculate Liquid Cash from Transactions
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const liquidCash = Math.max(totalIncome - totalExpense, 0);

  // Investment Portfolio Value
  const investmentsValue = investments.reduce((sum, i) => sum + i.currentValue, 0);

  // Liabilities
  const creditCardBills = creditCards.reduce((sum, c) => sum + c.currentUsed, 0);
  const emiRemainingDebt = emis.reduce((sum, e) => sum + Math.max(e.loanAmount - (e.monthlyEMI * e.completedMonths), 0), 0);

  const [customAssets, setCustomAssets] = useState([
    { id: 'ca-1', name: 'Hyundai Creta Car (Resale IDV)', amount: 800000 },
    { id: 'ca-2', name: 'Emergency Fixed Deposit (FD)', amount: 250000 }
  ]);

  const [customLiabilities, setCustomLiabilities] = useState([
    { id: 'cl-1', name: 'Personal Loan Outstanding', amount: 50000 }
  ]);

  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', amount: '' });

  const totalAssets = liquidCash + investmentsValue + customAssets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = creditCardBills + emiRemainingDebt + customLiabilities.reduce((sum, l) => sum + l.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  const handleAddAssetSubmit = (e) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.amount) return;

    setCustomAssets(prev => [
      ...prev,
      { id: 'ca-' + Date.now(), name: newAsset.name, amount: parseFloat(newAsset.amount) }
    ]);

    setIsAddAssetOpen(false);
    setNewAsset({ name: '', amount: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Executive Net Worth Header */}
      <div className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>TOTAL NET WORTH</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#18181b', marginTop: '0.25rem', marginBottom: '0.25rem' }} className="mono-amount">
              {currency.symbol}{(netWorth * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ArrowUpRight size={14} /> Total Assets exceed Liabilities by {((netWorth / totalAssets) * 100).toFixed(1)}%
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ padding: '1rem 1.5rem', background: '#ffffff', borderRadius: '10px', border: '1px solid #e4e4e7' }}>
              <span style={{ fontSize: '0.72rem', color: '#71717a', fontWeight: 600, display: 'block' }}>TOTAL ASSETS</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#16a34a' }} className="mono-amount">
                {currency.symbol}{(totalAssets * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div style={{ padding: '1rem 1.5rem', background: '#ffffff', borderRadius: '10px', border: '1px solid #e4e4e7' }}>
              <span style={{ fontSize: '0.72rem', color: '#71717a', fontWeight: 600, display: 'block' }}>TOTAL LIABILITIES</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
                {currency.symbol}{(totalLiabilities * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Assets vs Liabilities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        
        {/* Assets Box */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#16a34a' }}>🟢 Asset Holdings</h3>
            <button className="btn btn-secondary btn-icon" onClick={() => setIsAddAssetOpen(true)} style={{ fontSize: '0.75rem' }}>
              <Plus size={12} /> Add Asset
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: '6px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Liquid Bank Cash</strong>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Savings Account</span>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
                {currency.symbol}{(liquidCash * currency.rate).toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: '6px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Investment Portfolio</strong>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Stocks, Funds & Gold</span>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
                {currency.symbol}{(investmentsValue * currency.rate).toLocaleString('en-IN')}
              </span>
            </div>

            {customAssets.map(a => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: '6px' }}>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>{a.name}</strong>
                  <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Property / Vehicle / Gold</span>
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
                  {currency.symbol}{(a.amount * currency.rate).toLocaleString('en-IN')}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Liabilities Box */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#dc2626' }}>🔴 Outstanding Liabilities</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: '6px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Credit Card Bills</strong>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Current Statement Outstanding</span>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
                {currency.symbol}{(creditCardBills * currency.rate).toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: '6px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Remaining EMI Loans</strong>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Car Loan & Electronics</span>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
                {currency.symbol}{(emiRemainingDebt * currency.rate).toLocaleString('en-IN')}
              </span>
            </div>

            {customLiabilities.map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#fafafa', borderRadius: '6px' }}>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>{l.name}</strong>
                  <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Personal Debt</span>
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
                  {currency.symbol}{(l.amount * currency.rate).toLocaleString('en-IN')}
                </span>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* Add Asset Modal */}
      {isAddAssetOpen && (
        <div className="modal-overlay" onClick={() => setIsAddAssetOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Add Custom Asset</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddAssetOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddAssetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Asset Name</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. Land Property / Real Estate"
                  value={newAsset.name}
                  onChange={e => setNewAsset({ ...newAsset, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Value ({currency.symbol})</label>
                <input
                  type="number"
                  className="input-field"
                  required
                  placeholder="500000"
                  value={newAsset.amount}
                  onChange={e => setNewAsset({ ...newAsset, amount: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddAssetOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
