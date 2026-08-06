import React, { useState } from 'react';
import { Users, Plus, CheckCircle2, ArrowUpRight, ArrowDownRight, X, DollarSign } from 'lucide-react';

export const INITIAL_FRIENDS = [
  { id: 'f-1', name: 'Rahul Sharma', avatar: '👨‍💼', oweStatus: 'owes_you', amount: 4500, note: 'Goa Resort Villa Booking' },
  { id: 'f-2', name: 'Priya Verma', avatar: '👩‍💻', oweStatus: 'owes_you', amount: 1200, note: 'Weekend Gourmet Dinner' },
  { id: 'f-3', name: 'Ankit Patel', avatar: '👨‍🔧', oweStatus: 'you_owe', amount: 850, note: 'Monthly Gas & Water Bill' }
];

export default function ExpenseSplitter({ currency }) {
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalOwedToYou = friends
    .filter(f => f.oweStatus === 'owes_you')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalYouOwe = friends
    .filter(f => f.oweStatus === 'you_owe')
    .reduce((sum, f) => sum + f.amount, 0);

  const netBalance = totalOwedToYou - totalYouOwe;

  const [newSplit, setNewSplit] = useState({
    name: '',
    amount: '',
    note: '',
    type: 'owes_you'
  });

  const handleSettleUp = (friendId) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
  };

  const handleAddSplitSubmit = (e) => {
    e.preventDefault();
    if (!newSplit.name || !newSplit.amount) return;

    setFriends(prev => [
      ...prev,
      {
        id: 'f-' + Date.now(),
        name: newSplit.name,
        avatar: '👤',
        oweStatus: newSplit.type,
        amount: parseFloat(newSplit.amount),
        note: newSplit.note || 'Shared Expense'
      }
    ]);

    setIsAddModalOpen(false);
    setNewSplit({
      name: '',
      amount: '',
      note: '',
      type: 'owes_you'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Family & Shared Expense Splitter</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Split restaurant bills, house rent, and vacation trips with friends</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>YOU ARE OWED</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#16a34a' }} className="mono-amount">
              {currency.symbol}{(totalOwedToYou * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>YOU OWE</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
              {currency.symbol}{(totalYouOwe * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Shared Expenses */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Active Balances</h3>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={14} /> Split an Expense
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {friends.map(item => {
            const owesYou = item.oweStatus === 'owes_you';

            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{item.avatar}</span>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.name}</h4>
                      <span style={{ fontSize: '0.72rem', color: '#71717a' }}>{item.note}</span>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '99px',
                    background: owesYou ? '#f0fdf4' : '#fef2f2',
                    color: owesYou ? '#16a34a' : '#dc2626'
                  }}>
                    {owesYou ? 'Owes you' : 'You owe'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', padding: '0.75rem 1rem', borderRadius: '8px', margin: '0.5rem 0 1rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Balance Amount</span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: owesYou ? '#16a34a' : '#dc2626' }} className="mono-amount">
                      {currency.symbol}{(item.amount * currency.rate).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.78rem' }}
                  onClick={() => handleSettleUp(item.id)}
                >
                  <CheckCircle2 size={13} color="#16a34a" /> Settle Up Balance
                </button>

              </div>
            );
          })}
        </div>
      </div>

      {/* Add Split Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Add Shared Expense</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddSplitSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Person / Group Name</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. Vikram / Roommates"
                  value={newSplit.name}
                  onChange={e => setNewSplit({ ...newSplit, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    className="select-field"
                    value={newSplit.type}
                    onChange={e => setNewSplit({ ...newSplit, type: e.target.value })}
                  >
                    <option value="owes_you">They owe you</option>
                    <option value="you_owe">You owe them</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Amount ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    required
                    placeholder="1200"
                    value={newSplit.amount}
                    onChange={e => setNewSplit({ ...newSplit, amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description / Note</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Dinner & Drinks"
                  value={newSplit.note}
                  onChange={e => setNewSplit({ ...newSplit, note: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Split
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
