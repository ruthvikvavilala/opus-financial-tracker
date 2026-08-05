import React, { useState } from 'react';
import { 
  Home, ShoppingBag, Utensils, Car, Zap, Film, ShoppingBasket, 
  HeartPulse, Briefcase, TrendingUp, Tag, Edit3, X 
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export default function BudgetManager({ 
  budgets, 
  transactions, 
  onUpdateBudget, 
  currency 
}) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newLimitInput, setNewLimitInput] = useState('');

  // Custom Category Cover Images
  const categoryImageMap = {
    housing: '/images/housing.jpg',
    groceries: '/images/groceries.jpg',
    dining: '/images/dining.jpg',
    transport: '/images/transport.jpg',
    utilities: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
    entertainment: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    shopping: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
    healthcare: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=600&q=80'
  };

  const iconMap = {
    Home, ShoppingBag, Utensils, Car, Zap, Film, ShoppingBasket, 
    HeartPulse, Briefcase, TrendingUp, Tag
  };

  // Compute category spent amounts
  const categorySpentMap = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categorySpentMap[t.category] = (categorySpentMap[t.category] || 0) + t.amount;
    });

  const totalCap = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = Object.values(categorySpentMap).reduce((sum, amt) => sum + amt, 0);
  const remainingTotal = totalCap - totalSpent;
  const overallPercent = totalCap > 0 ? Math.min(Math.round((totalSpent / totalCap) * 100), 100) : 0;

  const handleEditClick = (b) => {
    setEditingCategory(b.category);
    setNewLimitInput(b.limit.toString());
  };

  const handleSaveBudget = (e) => {
    e.preventDefault();
    if (!editingCategory || !newLimitInput) return;
    onUpdateBudget(editingCategory, parseFloat(newLimitInput));
    setEditingCategory(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Executive Budget Summary Banner */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Visual Category Budgets</h2>
            <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Photo-backed monthly category spending caps & limit tracking</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#71717a', fontWeight: 600, display: 'block' }}>TOTAL CAP</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
                {currency.symbol}{(totalCap * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div style={{ width: '1px', height: '28px', background: '#e4e4e7' }} />

            <div>
              <span style={{ fontSize: '0.72rem', color: '#71717a', fontWeight: 600, display: 'block' }}>SPENT SO FAR</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: totalSpent > totalCap ? '#dc2626' : '#18181b' }} className="mono-amount">
                {currency.symbol}{(totalSpent * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div style={{ width: '1px', height: '28px', background: '#e4e4e7' }} />

            <div>
              <span style={{ fontSize: '0.72rem', color: '#71717a', fontWeight: 600, display: 'block' }}>REMAINING</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: remainingTotal < 0 ? '#dc2626' : '#16a34a' }} className="mono-amount">
                {remainingTotal < 0 ? '-' : ''}{currency.symbol}{(Math.abs(remainingTotal) * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* Overall Overall Budget Usage Meter */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem', color: '#71717a' }}>
            <span>Overall Monthly Budget Used</span>
            <span style={{ color: overallPercent > 90 ? '#dc2626' : '#18181b' }}>{overallPercent}%</span>
          </div>
          <div style={{ height: '6px', background: '#f4f4f5', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${overallPercent}%`,
              background: overallPercent > 90 ? '#dc2626' : '#18181b',
              borderRadius: '99px'
            }} />
          </div>
        </div>
      </div>

      {/* Grid of Photo-Covered Category Budget Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.5rem' }}>
        {budgets.map(b => {
          const catObj = CATEGORIES.find(c => c.id === b.category);
          const spent = categorySpentMap[b.category] || 0;
          const ratio = b.limit > 0 ? (spent / b.limit) : 0;
          const percent = Math.min(Math.round(ratio * 100), 100);
          const leftAmount = b.limit - spent;

          const coverImage = categoryImageMap[b.category] || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80';

          let meterColor = '#18181b';
          if (ratio >= 1.0) meterColor = '#dc2626';
          else if (ratio >= 0.8) meterColor = '#d97706';

          return (
            <div key={b.category} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* Photo Header Cover */}
              <div style={{
                height: '140px',
                width: '100%',
                position: 'relative',
                backgroundImage: `url(${coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                {/* Gradient overlay for clear contrast */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)'
                }} />

                {/* Edit Button */}
                <button
                  className="btn btn-secondary btn-icon"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.72rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    backdropFilter: 'blur(4px)'
                  }}
                  onClick={() => handleEditClick(b)}
                >
                  <Edit3 size={12} color="#18181b" /> Edit Cap
                </button>

                {/* Category Title & Remaining Pill */}
                <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: '#ffffff' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                      {catObj ? catObj.name : b.category}
                    </h3>
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '99px',
                    background: leftAmount < 0 ? 'rgba(220, 38, 38, 0.9)' : 'rgba(22, 163, 74, 0.9)',
                    color: '#ffffff'
                  }}>
                    {leftAmount < 0 ? `+${currency.symbol}${Math.abs(leftAmount * currency.rate).toFixed(0)} Over` : `${currency.symbol}${(leftAmount * currency.rate).toFixed(0)} Left`}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, justifyContent: 'space-between' }}>
                
                {/* Spent vs Limit */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: '#71717a', fontSize: '0.75rem', display: 'block' }}>Spent</span>
                    <strong style={{ color: '#18181b', fontSize: '1rem' }} className="mono-amount">
                      {currency.symbol}{(spent * currency.rate).toLocaleString('en-IN')}
                    </strong>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#71717a', fontSize: '0.75rem', display: 'block' }}>Budget Cap</span>
                    <strong style={{ color: '#71717a', fontSize: '1rem' }} className="mono-amount">
                      {currency.symbol}{(b.limit * currency.rate).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: meterColor, marginBottom: '0.35rem' }}>
                    <span>Progress</span>
                    <span>{percent}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#e4e4e7', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${percent}%`,
                      background: meterColor,
                      borderRadius: '99px'
                    }} />
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Edit Budget Modal */}
      {editingCategory && (
        <div className="modal-overlay" onClick={() => setEditingCategory(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Edit Category Cap</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setEditingCategory(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveBudget}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Monthly Limit ({currency.symbol})</label>
                <input
                  type="number"
                  step="500"
                  className="input-field"
                  required
                  value={newLimitInput}
                  onChange={e => setNewLimitInput(e.target.value)}
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingCategory(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Cap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
