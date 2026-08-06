import React, { useState } from 'react';
import { Calendar, Bell, CheckCircle, Plus, Clock, AlertTriangle, X } from 'lucide-react';

export const INITIAL_BILLS = [
  {
    id: 'bill-1',
    title: 'Airtel Xstream Fiber WiFi',
    category: 'Utilities',
    amount: 1199,
    dueDate: '2026-08-10',
    status: 'Upcoming',
    biller: 'Airtel India',
    autoPay: true
  },
  {
    id: 'bill-2',
    title: 'Monthly House Rent',
    category: 'Housing',
    amount: 22000,
    dueDate: '2026-08-05',
    status: 'Due Soon',
    biller: 'Landlord Direct',
    autoPay: false
  },
  {
    id: 'bill-3',
    title: 'Hyundai Creta Car Loan EMI',
    category: 'EMI & Loans',
    amount: 18944,
    dueDate: '2026-08-10',
    status: 'Upcoming',
    biller: 'HDFC Auto Loan',
    autoPay: true
  },
  {
    id: 'bill-4',
    title: 'State Electricity Board Power Bill',
    category: 'Utilities',
    amount: 2450,
    dueDate: '2026-08-12',
    status: 'Upcoming',
    biller: 'BESCOM / Electricity Board',
    autoPay: false
  },
  {
    id: 'bill-5',
    title: 'Netflix 4K Ultra HD',
    category: 'Entertainment',
    amount: 649,
    dueDate: '2026-08-15',
    status: 'Upcoming',
    biller: 'Netflix Services',
    autoPay: true
  }
];

export default function BillReminders({ onAddTransaction, currency }) {
  const [bills, setBills] = useState(INITIAL_BILLS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newBill, setNewBill] = useState({
    title: '',
    category: 'Utilities',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0],
    biller: ''
  });

  const totalUpcomingAmount = bills
    .filter(b => b.status !== 'Paid')
    .reduce((sum, b) => sum + b.amount, 0);

  const handleMarkAsPaid = (billItem) => {
    setBills(prev => prev.map(b => b.id === billItem.id ? { ...b, status: 'Paid' } : b));

    // Log transaction
    onAddTransaction({
      id: 'tx-bill-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: `${billItem.title} Paid`,
      amount: billItem.amount,
      type: 'expense',
      category: billItem.category.toLowerCase(),
      merchant: billItem.biller,
      paymentMethod: 'upi',
      notes: `Bill payment for ${billItem.title}`
    });
  };

  const handleAddBillSubmit = (e) => {
    e.preventDefault();
    if (!newBill.title || !newBill.amount) return;

    setBills(prev => [
      ...prev,
      {
        id: 'bill-' + Date.now(),
        title: newBill.title,
        category: newBill.category,
        amount: parseFloat(newBill.amount),
        dueDate: newBill.dueDate,
        status: 'Upcoming',
        biller: newBill.biller || 'Biller Service',
        autoPay: false
      }
    ]);

    setIsAddModalOpen(false);
    setNewBill({
      title: '',
      category: 'Utilities',
      amount: '',
      dueDate: new Date().toISOString().split('T')[0],
      biller: ''
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Automated Bill Reminders</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Never miss a payment with automated bill tracking & 1-click payoff</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>TOTAL UPCOMING BILLS</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
              {currency.symbol}{(totalUpcomingAmount * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>PENDING COUNT</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#18181b' }}>
              {bills.filter(b => b.status !== 'Paid').length} Bills
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Upcoming Bills */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Upcoming Scheduled Payments</h3>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={14} /> Add Bill Reminder
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {bills.map(item => {
            const isPaid = item.status === 'Paid';

            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem', opacity: isPaid ? 0.65 : 1 }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, textDecoration: isPaid ? 'line-through' : 'none' }}>{item.title}</h4>
                    <span style={{ fontSize: '0.72rem', color: '#71717a' }}>{item.biller} • {item.category}</span>
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '99px',
                    background: isPaid ? '#f0fdf4' : '#fffbe6',
                    color: isPaid ? '#16a34a' : '#d97706'
                  }}>
                    {item.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', padding: '0.75rem 1rem', borderRadius: '8px', margin: '0.5rem 0 1rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Due Date</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#18181b' }}>
                      {item.dueDate}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Bill Amount</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: isPaid ? '#16a34a' : '#dc2626' }} className="mono-amount">
                      {currency.symbol}{(item.amount * currency.rate).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {isPaid ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#16a34a', fontWeight: 700 }}>
                    <CheckCircle size={14} /> Paid & Logged to Transactions
                  </div>
                ) : (
                  <button
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.78rem' }}
                    onClick={() => handleMarkAsPaid(item)}
                  >
                    <CheckCircle size={13} color="#16a34a" /> Mark as Paid ({currency.symbol}{(item.amount * currency.rate).toLocaleString('en-IN')})
                  </button>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* Add Bill Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Add Bill Reminder</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddBillSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Bill Title</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. Water Supply Bill"
                  value={newBill.title}
                  onChange={e => setNewBill({ ...newBill, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="select-field"
                    value={newBill.category}
                    onChange={e => setNewBill({ ...newBill, category: e.target.value })}
                  >
                    <option value="Utilities">Utilities</option>
                    <option value="Housing">Housing</option>
                    <option value="EMI & Loans">EMI & Loans</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Amount ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    required
                    placeholder="1500"
                    value={newBill.amount}
                    onChange={e => setNewBill({ ...newBill, amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={newBill.dueDate}
                  onChange={e => setNewBill({ ...newBill, dueDate: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
