import React, { useState } from 'react';
import { Shield, Plus, CheckCircle, ArrowRight, X } from 'lucide-react';

export const HEALTH_INSURANCE_COMPANIES = [
  { id: 'star_health', name: 'Star Health Insurance', logo: '🌟', type: 'Health Leader' },
  { id: 'niva_bupa', name: 'Niva Bupa Health', logo: '🛡️', type: 'Health Leader' },
  { id: 'care_health', name: 'Care Health Insurance', logo: '💚', type: 'Health Specialist' },
  { id: 'hdfc_ergo', name: 'HDFC ERGO Health', logo: '🏦', type: 'Top Rated' },
  { id: 'aditya_birla', name: 'Aditya Birla Health', logo: '🏢', type: 'Wellness Cover' },
  { id: 'icici_lombard', name: 'ICICI Lombard Health', logo: '🔵', type: 'General & Health' },
  { id: 'bajaj_allianz', name: 'Bajaj Allianz Health', logo: '🏎️', type: 'Cashless Care' },
  { id: 'tata_aig', name: 'Tata AIG Health', logo: '🌐', type: 'Global Protect' },
  { id: 'lic', name: 'LIC of India', logo: '🏛️', type: 'National Giant' }
];

export default function InsuranceTracker({ 
  insurances, 
  onAddInsurance, 
  onPayPremium, 
  currency 
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Stats
  const totalAnnualPremium = insurances.reduce((sum, i) => sum + i.premiumAmount, 0);
  const totalCoverage = insurances.reduce((sum, i) => sum + i.sumAssured, 0);

  const [newPolicy, setNewPolicy] = useState({
    title: '',
    provider: HEALTH_INSURANCE_COMPANIES[0].name,
    policyNumber: '',
    category: 'Health Insurance',
    sumAssured: '10000000',
    premiumAmount: '22000',
    frequency: 'Annual',
    nextDueDate: new Date().toISOString().split('T')[0]
  });

  const handleAddPolicySubmit = (e) => {
    e.preventDefault();
    if (!newPolicy.title || !newPolicy.premiumAmount) return;

    onAddInsurance({
      id: 'ins-' + Date.now(),
      title: newPolicy.title,
      provider: newPolicy.provider,
      policyNumber: newPolicy.policyNumber || `POL-${Math.floor(100000 + Math.random() * 900000)}`,
      category: newPolicy.category,
      sumAssured: parseFloat(newPolicy.sumAssured || 0),
      premiumAmount: parseFloat(newPolicy.premiumAmount),
      frequency: newPolicy.frequency,
      nextDueDate: newPolicy.nextDueDate,
      status: 'Active'
    });

    setIsAddModalOpen(false);
    setNewPolicy({
      title: '',
      provider: HEALTH_INSURANCE_COMPANIES[0].name,
      policyNumber: '',
      category: 'Health Insurance',
      sumAssured: '10000000',
      premiumAmount: '22000',
      frequency: 'Annual',
      nextDueDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header Summary */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Health Insurance & Policies</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Track policies, health insurance companies, and annual premium renewals</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>ANNUAL PREMIUM</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
              {currency.symbol}{(totalAnnualPremium * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600, display: 'block' }}>TOTAL HEALTH & LIFE COVER</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#16a34a' }} className="mono-amount">
              {currency.symbol}{(totalCoverage * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Active Insurance Policy Cards */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Your Active Policies</h3>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={14} /> Add Insurance Policy
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {insurances.map(item => {
            const matchedCompany = HEALTH_INSURANCE_COMPANIES.find(c => item.provider.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]));
            const companyLogo = matchedCompany ? matchedCompany.logo : '🛡️';

            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{companyLogo}</span>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.title}</h4>
                      <span style={{ fontSize: '0.72rem', color: '#71717a' }}>{item.provider} • {item.policyNumber}</span>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', background: '#f4f4f5', borderRadius: '4px', fontWeight: 600 }}>
                    {item.category}
                  </span>
                </div>

                {/* Cover & Premium Details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', padding: '0.75rem 1rem', borderRadius: '8px', margin: '0.75rem 0 1rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Sum Insured</span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#16a34a' }} className="mono-amount">
                      {currency.symbol}{(item.sumAssured * currency.rate).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block' }}>Premium ({item.frequency})</span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#18181b' }} className="mono-amount">
                      {currency.symbol}{(item.premiumAmount * currency.rate).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', marginBottom: '1rem' }}>
                  <span style={{ color: '#71717a' }}>
                    Next Renewal: <strong style={{ color: '#18181b' }}>{item.nextDueDate}</strong>
                  </span>
                </div>

                <button
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.78rem' }}
                  onClick={() => onPayPremium(item)}
                >
                  <CheckCircle size={13} color="#16a34a" /> Pay Renewal Premium ({currency.symbol}{(item.premiumAmount * currency.rate).toLocaleString('en-IN')})
                </button>

              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Policy Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Add Health / Policy Insurance</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddPolicySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div className="form-group">
                <label className="form-label">Health Insurance Company</label>
                <select
                  className="select-field"
                  value={newPolicy.provider}
                  onChange={e => setNewPolicy({ ...newPolicy, provider: e.target.value })}
                >
                  {HEALTH_INSURANCE_COMPANIES.map(company => (
                    <option key={company.id} value={company.name}>
                      {company.logo} {company.name} ({company.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Plan / Policy Title</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. Star Comprehensive Health Plan"
                  value={newPolicy.title}
                  onChange={e => setNewPolicy({ ...newPolicy, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="select-field"
                    value={newPolicy.category}
                    onChange={e => setNewPolicy({ ...newPolicy, category: e.target.value })}
                  >
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Term Life">Term Life</option>
                    <option value="Vehicle Insurance">Vehicle Insurance</option>
                    <option value="Property Cover">Property Cover</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Policy Number</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="SH-8920194"
                    value={newPolicy.policyNumber}
                    onChange={e => setNewPolicy({ ...newPolicy, policyNumber: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Sum Insured ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="10000000"
                    value={newPolicy.sumAssured}
                    onChange={e => setNewPolicy({ ...newPolicy, sumAssured: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Premium Amount ({currency.symbol})</label>
                  <input
                    type="number"
                    className="input-field"
                    required
                    placeholder="22000"
                    value={newPolicy.premiumAmount}
                    onChange={e => setNewPolicy({ ...newPolicy, premiumAmount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Next Renewal Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={newPolicy.nextDueDate}
                  onChange={e => setNewPolicy({ ...newPolicy, nextDueDate: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Policy
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
