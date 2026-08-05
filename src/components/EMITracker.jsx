import React, { useState } from 'react';
import { Calculator, Plus, CheckCircle, CreditCard, ArrowRight, X } from 'lucide-react';

export default function EMITracker({ 
  emis, 
  onAddEMI, 
  onPayEMI, 
  currency 
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // EMI Calculator State
  const [calcPrincipal, setCalcPrincipal] = useState(500000);
  const [calcRate, setCalcRate] = useState(9.5);
  const [calcTenure, setCalcTenure] = useState(36); // months

  // Calculate EMI formula
  const monthlyRate = (calcRate / 12) / 100;
  let calculatedEMI = 0;
  if (monthlyRate > 0) {
    calculatedEMI = Math.round(
      (calcPrincipal * monthlyRate * Math.pow(1 + monthlyRate, calcTenure)) /
      (Math.pow(1 + monthlyRate, calcTenure) - 1)
    );
  } else {
    calculatedEMI = Math.round(calcPrincipal / calcTenure);
  }

  const totalPayment = calculatedEMI * calcTenure;
  const totalInterest = Math.max(0, totalPayment - calcPrincipal);

  // Stats
  const totalMonthlyOutflow = emis.reduce((sum, e) => sum + e.monthlyEMI, 0);

  // New EMI Modal Form State
  const [newEMI, setNewEMI] = useState({
    title: '',
    loanAmount: '',
    interestRate: '',
    tenureMonths: '',
    monthlyEMI: '',
    bank: '',
    nextDueDate: new Date().toISOString().split('T')[0],
    category: 'shopping'
  });

  const handleAddEMISubmit = (e) => {
    e.preventDefault();
    if (!newEMI.title || !newEMI.monthlyEMI) return;

    onAddEMI({
      id: 'emi-' + Date.now(),
      title: newEMI.title,
      loanAmount: parseFloat(newEMI.loanAmount || calcPrincipal),
      interestRate: parseFloat(newEMI.interestRate || calcRate),
      tenureMonths: parseInt(newEMI.tenureMonths || calcTenure, 10),
      completedMonths: 0,
      monthlyEMI: parseFloat(newEMI.monthlyEMI),
      bank: newEMI.bank || 'Bank / Lender',
      nextDueDate: newEMI.nextDueDate,
      category: newEMI.category
    });

    setIsAddModalOpen(false);
    setNewEMI({
      title: '',
      loanAmount: '',
      interestRate: '',
      tenureMonths: '',
      monthlyEMI: '',
      bank: '',
      nextDueDate: new Date().toISOString().split('T')[0],
      category: 'shopping'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header Summary */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>EMI & Loans Manager</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Track active installments and calculate monthly EMI costs</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>MONTHLY EMI OUTFLOW</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#dc2626' }} className="mono-amount">
              {currency.symbol}{(totalMonthlyOutflow * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>ACTIVE LOANS</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#18181b' }}>
              {emis.length} Loans
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Active EMIs Cards */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Your Active EMIs</h3>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={14} /> Add Loan EMI
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {emis.map(item => {
            const percentCompleted = Math.min(Math.round((item.completedMonths / item.tenureMonths) * 100), 100);

            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.title}</h4>
                    <span style={{ fontSize: '0.72rem', color: '#71717a' }}>{item.bank} • {item.interestRate}% p.a.</span>
                  </div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
                    {currency.symbol}{(item.monthlyEMI * currency.rate).toLocaleString('en-IN')}<span style={{ fontSize: '0.72rem', color: '#71717a', fontWeight: 500 }}>/mo</span>
                  </span>
                </div>

                {/* Progress */}
                <div style={{ height: '4px', background: '#f4f4f5', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  <div style={{
                    height: '100%',
                    width: `${percentCompleted}%`,
                    background: '#18181b',
                    borderRadius: '99px'
                  }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', marginBottom: '1.15rem' }}>
                  <span style={{ color: '#71717a' }}>
                    Tenure: <strong>{item.completedMonths} / {item.tenureMonths} Months</strong>
                  </span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>
                    {percentCompleted}% Paid
                  </span>
                </div>

                <button
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.78rem' }}
                  onClick={() => onPayEMI(item)}
                >
                  <CheckCircle size={13} color="#16a34a" /> Pay Month EMI ({currency.symbol}{(item.monthlyEMI * currency.rate).toLocaleString('en-IN')})
                </button>

              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive EMI Calculator Card */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Calculator size={18} />
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Smart EMI Calculator</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Principal */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 600 }}>Loan Amount</span>
                <span style={{ fontWeight: 800 }} className="mono-amount">{currency.symbol}{(calcPrincipal * currency.rate).toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={calcPrincipal}
                onChange={e => setCalcPrincipal(parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 600 }}>Interest Rate (% p.a.)</span>
                <span style={{ fontWeight: 800 }}>{calcRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="0.5"
                value={calcRate}
                onChange={e => setCalcRate(parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            {/* Tenure */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 600 }}>Tenure (Months)</span>
                <span style={{ fontWeight: 800 }}>{calcTenure} Months ({Math.round(calcTenure/12*10)/10} Yrs)</span>
              </div>
              <input
                type="range"
                min="3"
                max="84"
                step="3"
                value={calcTenure}
                onChange={e => setCalcTenure(parseInt(e.target.value, 10))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

          </div>

          {/* Results Summary Box */}
          <div style={{ background: '#f4f4f5', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 600, display: 'block' }}>CALCULATED MONTHLY EMI</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#18181b', margin: '0.25rem 0 1rem 0' }} className="mono-amount">
                {currency.symbol}{(calculatedEMI * currency.rate).toLocaleString('en-IN')}<span style={{ fontSize: '0.85rem', color: '#71717a' }}>/mo</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#71717a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Principal Loan Amount:</span>
                  <span style={{ color: '#18181b', fontWeight: 700 }} className="mono-amount">{currency.symbol}{(calcPrincipal * currency.rate).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Interest Payable:</span>
                  <span style={{ color: '#dc2626', fontWeight: 700 }} className="mono-amount">{currency.symbol}{(totalInterest * currency.rate).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e4e4e7', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                  <span>Total Repayment Amount:</span>
                  <span style={{ color: '#18181b', fontWeight: 800 }} className="mono-amount">{currency.symbol}{(totalPayment * currency.rate).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ marginTop: '1.25rem', width: '100%' }}
              onClick={() => {
                setNewEMI({
                  title: 'New Calculated Loan',
                  loanAmount: calcPrincipal.toString(),
                  interestRate: calcRate.toString(),
                  tenureMonths: calcTenure.toString(),
                  monthlyEMI: calculatedEMI.toString(),
                  bank: 'Bank Loan',
                  nextDueDate: new Date().toISOString().split('T')[0],
                  category: 'shopping'
                });
                setIsAddModalOpen(true);
              }}
            >
              Add to Active EMIs <ArrowRight size={14} />
            </button>

          </div>

        </div>
      </div>

      {/* Add New Loan EMI Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Add Loan / EMI</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddEMISubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div className="form-group">
                <label className="form-label">Loan / Item Name</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. Laptop EMI / Car Loan"
                  value={newEMI.title}
                  onChange={e => setNewEMI({ ...newEMI, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Monthly EMI ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    required
                    placeholder="3500"
                    value={newEMI.monthlyEMI}
                    onChange={e => setNewEMI({ ...newEMI, monthlyEMI: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Bank / Lender</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="HDFC / Credit Card"
                    value={newEMI.bank}
                    onChange={e => setNewEMI({ ...newEMI, bank: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Total Tenure (Months)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="12"
                    value={newEMI.tenureMonths}
                    onChange={e => setNewEMI({ ...newEMI, tenureMonths: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    placeholder="8.5"
                    value={newEMI.interestRate}
                    onChange={e => setNewEMI({ ...newEMI, interestRate: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Active EMI
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
