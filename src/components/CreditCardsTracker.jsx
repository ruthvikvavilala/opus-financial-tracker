import React, { useState } from 'react';
import { CreditCard, Plus, CheckCircle, ArrowRight, X, Award } from 'lucide-react';

export default function CreditCardsTracker({ 
  creditCards, 
  onAddCreditCard, 
  onPayCardBill, 
  currency 
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalLimit = creditCards.reduce((sum, c) => sum + c.totalLimit, 0);
  const totalUsed = creditCards.reduce((sum, c) => sum + c.currentUsed, 0);
  const totalRewards = creditCards.reduce((sum, c) => sum + c.rewardPoints, 0);

  const [newCard, setNewCard] = useState({
    cardName: '',
    bank: '',
    cardNumber: '•••• 1234',
    totalLimit: '150000',
    currentUsed: '0',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCard.cardName || !newCard.totalLimit) return;

    onAddCreditCard({
      id: 'card-' + Date.now(),
      cardName: newCard.cardName,
      bank: newCard.bank || 'Bank',
      cardNumber: newCard.cardNumber || '•••• 5678',
      totalLimit: parseFloat(newCard.totalLimit),
      currentUsed: parseFloat(newCard.currentUsed || 0),
      rewardPoints: 500,
      dueDate: newCard.dueDate,
      statementDate: new Date().toISOString().split('T')[0]
    });

    setIsAddModalOpen(false);
    setNewCard({
      cardName: '',
      bank: '',
      cardNumber: '•••• 1234',
      totalLimit: '150000',
      currentUsed: '0',
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header Summary */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Credit Cards & Rewards</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Monitor credit limits, bill due dates, and reward points balances</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>TOTAL OUTSTANDING</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
              {currency.symbol}{(totalUsed * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>TOTAL LIMIT</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
              {currency.symbol}{(totalLimit * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>REWARD POINTS</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#d97706' }}>
              {totalRewards.toLocaleString('en-IN')} pts
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Credit Cards */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Your Active Credit Cards</h3>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={14} /> Add Credit Card
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {creditCards.map(item => {
            const usageRatio = item.totalLimit > 0 ? (item.currentUsed / item.totalLimit) : 0;
            const percentUsed = Math.min(Math.round(usageRatio * 100), 100);

            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.cardName}</h4>
                    <span style={{ fontSize: '0.72rem', color: '#71717a' }}>{item.bank} • {item.cardNumber}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Award size={13} /> {item.rewardPoints} pts
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ height: '4px', background: '#f4f4f5', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  <div style={{
                    height: '100%',
                    width: `${percentUsed}%`,
                    background: percentUsed > 50 ? '#dc2626' : '#18181b',
                    borderRadius: '99px'
                  }} />
                </div>

                {/* Usage Amounts */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', padding: '0.75rem 1rem', borderRadius: '8px', margin: '0.5rem 0 1rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Bill Outstanding</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
                      {currency.symbol}{(item.currentUsed * currency.rate).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Credit Limit</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#71717a' }} className="mono-amount">
                      {currency.symbol}{(item.totalLimit * currency.rate).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', marginBottom: '1rem' }}>
                  <span style={{ color: '#71717a' }}>
                    Payment Due: <strong style={{ color: '#18181b' }}>{item.dueDate}</strong>
                  </span>
                </div>

                <button
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.78rem' }}
                  onClick={() => onPayCardBill(item)}
                >
                  <CheckCircle size={13} color="#16a34a" /> Pay Card Bill ({currency.symbol}{(item.currentUsed * currency.rate).toLocaleString('en-IN')})
                </button>

              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Card Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Add Credit Card</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div className="form-group">
                <label className="form-label">Card Name</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. HDFC Regalia Gold"
                  value={newCard.cardName}
                  onChange={e => setNewCard({ ...newCard, cardName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Bank Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="HDFC / SBI / ICICI"
                    value={newCard.bank}
                    onChange={e => setNewCard({ ...newCard, bank: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last 4 Digits</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="•••• 8920"
                    value={newCard.cardNumber}
                    onChange={e => setNewCard({ ...newCard, cardNumber: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Total Limit ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    required
                    placeholder="200000"
                    value={newCard.totalLimit}
                    onChange={e => setNewCard({ ...newCard, totalLimit: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Used ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="15000"
                    value={newCard.currentUsed}
                    onChange={e => setNewCard({ ...newCard, currentUsed: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Card
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
