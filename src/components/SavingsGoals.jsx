import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function SavingsGoals({ 
  goals, 
  onAddGoal, 
  onUpdateGoalAmount, 
  currency 
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [depositModalGoal, setDepositModalGoal] = useState(null);
  const [depositAmountInput, setDepositAmountInput] = useState('');

  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '0',
    category: 'General',
    targetDate: '2026-12-31',
    color: '#18181b'
  });

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetAmount) return;

    onAddGoal({
      id: 'goal-' + Date.now(),
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount || 0),
      category: newGoal.category,
      targetDate: newGoal.targetDate,
      color: newGoal.color
    });

    setIsAddModalOpen(false);
    setNewGoal({
      title: '',
      targetAmount: '',
      currentAmount: '0',
      category: 'General',
      targetDate: '2026-12-31',
      color: '#18181b'
    });
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (!depositModalGoal || !depositAmountInput) return;
    onUpdateGoalAmount(depositModalGoal.id, parseFloat(depositAmountInput));
    setDepositModalGoal(null);
    setDepositAmountInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Savings Goals</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Track your milestone savings and deposit progress</p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={14} /> New Goal
        </button>
      </div>

      {/* Neat Goals Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {goals.map(goal => {
          const ratio = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) : 0;
          const percent = Math.min(Math.round(ratio * 100), 100);

          return (
            <div key={goal.id} className="glass-card" style={{ padding: '1.5rem' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{goal.title}</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a' }}>
                  {percent}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: '4px', background: '#f4f4f5', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                <div style={{
                  height: '100%',
                  width: `${percent}%`,
                  background: '#18181b',
                  borderRadius: '99px'
                }} />
              </div>

              {/* Amounts */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <span style={{ color: '#71717a' }}>
                  Saved: <strong style={{ color: '#18181b' }} className="mono-amount">{currency.symbol}{(goal.currentAmount * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong>
                </span>
                <span style={{ color: '#71717a' }}>
                  Target: <strong style={{ color: '#18181b' }} className="mono-amount">{currency.symbol}{(goal.targetAmount * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong>
                </span>
              </div>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', fontSize: '0.78rem' }}
                onClick={() => {
                  setDepositModalGoal(goal);
                  setDepositAmountInput('');
                }}
              >
                + Add Deposit
              </button>

            </div>
          );
        })}
      </div>

      {/* Add Deposit Modal */}
      {depositModalGoal && (
        <div className="modal-overlay" onClick={() => setDepositModalGoal(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Deposit to "{depositModalGoal.title}"</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setDepositModalGoal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleDepositSubmit}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Amount ({currency.symbol})</label>
                <input
                  type="number"
                  step="500"
                  className="input-field"
                  required
                  placeholder="e.g. 5000"
                  value={depositAmountInput}
                  onChange={e => setDepositAmountInput(e.target.value)}
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setDepositModalGoal(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Goal Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>New Savings Goal</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div className="form-group">
                <label className="form-label">Goal Title</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. Goa Vacation"
                  value={newGoal.title}
                  onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Target Amount ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    required
                    placeholder="50000"
                    value={newGoal.targetAmount}
                    onChange={e => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Starting Amount ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="0"
                    value={newGoal.currentAmount}
                    onChange={e => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Goal
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
