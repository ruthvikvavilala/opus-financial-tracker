import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Trash2, Edit2, ArrowUpDown, Tag, Calendar, CreditCard, X } from 'lucide-react';
import { CATEGORIES, PAYMENT_METHODS } from '../data/initialData';

export default function TransactionsList({ 
  transactions, 
  onAddTransaction, 
  onDeleteTransaction, 
  currency 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Transaction Form State
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'groceries',
    merchant: '',
    paymentMethod: 'credit_card',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Filtering Logic
  const filtered = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || tx.category === selectedCategory;
    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesPayment = selectedPayment === 'all' || tx.paymentMethod === selectedPayment;

    return matchesSearch && matchesCategory && matchesType && matchesPayment;
  });

  // Sorting Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount-desc') return b.amount - a.amount;
    if (sortBy === 'amount-asc') return a.amount - b.amount;
    return 0;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    const newTx = {
      id: 'tx-manual-' + Date.now(),
      ...formData,
      amount: parseFloat(formData.amount)
    };

    onAddTransaction(newTx);
    setIsAddModalOpen(false);
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: 'groceries',
      merchant: '',
      paymentMethod: 'credit_card',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Date', 'Title', 'Amount', 'Type', 'Category', 'Merchant', 'Payment Method', 'Notes'];
    const rows = sorted.map(t => [
      t.id, t.date, `"${t.title}"`, t.amount, t.type, t.category, `"${t.merchant}"`, t.paymentMethod, `"${t.notes || ''}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `opus_financial_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header & Main Controls */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Transactions Management</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Showing {sorted.length} of {transactions.length} total logged transactions
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={exportToCSV}>
              <Download size={16} /> Export CSV
            </button>
            <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={16} /> Add Manual Log
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search title, merchant..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.25rem' }}
            />
          </div>

          {/* Category Filter */}
          <select
            className="select-field"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            className="select-field"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="expense">Expenses Only</option>
            <option value="income">Income Only</option>
          </select>

          {/* Payment Method Filter */}
          <select
            className="select-field"
            value={selectedPayment}
            onChange={e => setSelectedPayment(e.target.value)}
          >
            <option value="all">All Payment Methods</option>
            {PAYMENT_METHODS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            className="select-field"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>

        </div>
      </div>

      {/* Transactions Data Table */}
      <div className="glass-card" style={{ padding: '0.5rem' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title / Merchant</th>
                <th>Category</th>
                <th>Payment Method</th>
                <th>Notes</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    No transactions match your current filters.
                  </td>
                </tr>
              ) : (
                sorted.map(tx => {
                  const catObj = CATEGORIES.find(c => c.id === tx.category);
                  return (
                    <tr key={tx.id}>
                      <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{tx.date}</td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{tx.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{tx.merchant}</div>
                      </td>
                      <td>
                        <span className="badge" style={{ background: `${catObj?.color}20`, color: catObj?.color || 'var(--accent-primary)', border: `1px solid ${catObj?.color}40` }}>
                          {catObj ? catObj.name : tx.category}
                        </span>
                      </td>
                      <td style={{ textTransform: 'capitalize', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                        {tx.paymentMethod.replace('_', ' ')}
                      </td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {tx.notes || '-'}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800, color: tx.type === 'income' ? 'var(--accent-secondary)' : 'var(--text-primary)' }} className="mono-amount">
                        {tx.type === 'income' ? '+' : '-'}{currency.symbol}{(tx.amount * currency.rate).toFixed(2)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn btn-secondary btn-icon"
                          style={{ padding: '0.35rem' }}
                          onClick={() => onDeleteTransaction(tx.id)}
                          title="Delete Transaction"
                        >
                          <Trash2 size={15} color="var(--accent-danger)" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add Transaction Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Add Manual Transaction</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    className="select-field"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Amount ({currency.symbol})</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    required
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Title / Description</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. Weekly Groceries"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="select-field"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="select-field"
                    value={formData.paymentMethod}
                    onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                  >
                    {PAYMENT_METHODS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Merchant / Payee</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Target"
                    value={formData.merchant}
                    onChange={e => setFormData({ ...formData, merchant: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  className="textarea-field"
                  rows={2}
                  placeholder="Additional context..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Transaction
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
