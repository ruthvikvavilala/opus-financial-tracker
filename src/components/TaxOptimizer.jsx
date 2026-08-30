import React, { useState } from 'react';
import { ShieldCheck, Calculator, TrendingDown, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TaxOptimizer({ transactions, insurances, currency }) {
  const [grossAnnualIncome, setGrossAnnualIncome] = useState(1500000); // 15 Lakhs default
  const [hraExemption, setHraExemption] = useState(120000);
  const [section80C, setSection80C] = useState(135000); // PPF, ELSS, Insurance
  const [section80D, setSection80D] = useState(22000); // Health insurance

  // Tax Slab Calculations (India FY 2026-27)
  // New Regime: 0-3L 0%, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, >15L 30% (+ Standard Deduction 75k)
  const newRegimeStdDeduction = 75000;
  const taxableIncomeNew = Math.max(grossAnnualIncome - newRegimeStdDeduction, 0);

  let taxNew = 0;
  if (taxableIncomeNew > 1500000) taxNew += (taxableIncomeNew - 1500000) * 0.30 + 150000;
  else if (taxableIncomeNew > 1200000) taxNew += (taxableIncomeNew - 1200000) * 0.20 + 90000;
  else if (taxableIncomeNew > 1000000) taxNew += (taxableIncomeNew - 1000000) * 0.15 + 60000;
  else if (taxableIncomeNew > 700000) taxNew += (taxableIncomeNew - 700000) * 0.10 + 30000;
  else if (taxableIncomeNew > 300000) taxNew += (taxableIncomeNew - 300000) * 0.05;

  // Old Regime: Std Ded 50k + 80C (max 1.5L) + 80D (max 25k) + HRA
  const oldRegimeDeductions = 50000 + Math.min(section80C, 150000) + Math.min(section80D, 25000) + hraExemption;
  const taxableIncomeOld = Math.max(grossAnnualIncome - oldRegimeDeductions, 0);

  let taxOld = 0;
  if (taxableIncomeOld > 1000000) taxOld += (taxableIncomeOld - 1000000) * 0.30 + 112500;
  else if (taxableIncomeOld > 500000) taxOld += (taxableIncomeOld - 500000) * 0.20 + 12500;
  else if (taxableIncomeOld > 250000) taxOld += (taxableIncomeOld - 250000) * 0.05;

  const recommendedRegime = taxNew <= taxOld ? 'New Tax Regime' : 'Old Tax Regime';
  const taxSavings = Math.abs(taxOld - taxNew);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Income Tax Optimizer & Slabs</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Compare Old vs New Tax Regime & maximize Section 80C/80D deductions</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f0fdf4', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
          <Sparkles size={16} color="#16a34a" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#15803d' }}>
            Recommended: {recommendedRegime} (Save {currency.symbol}{(taxSavings * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })})
          </span>
        </div>
      </div>

      {/* Grid: Inputs & Tax Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Income & Deductions Form */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Annual Income & Deductions</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Gross Annual Salary ({currency.symbol})</label>
              <input
                type="number"
                step="50000"
                className="input-field"
                value={grossAnnualIncome}
                onChange={e => setGrossAnnualIncome(parseFloat(e.target.value || 0))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Section 80C Investments (Max ₹1.5L)</label>
              <input
                type="number"
                className="input-field"
                value={section80C}
                onChange={e => setSection80C(parseFloat(e.target.value || 0))}
              />
              <span style={{ fontSize: '0.72rem', color: '#71717a' }}>EPF, PPF, ELSS Mutual Funds, Life Insurance</span>
            </div>

            <div className="form-group">
              <label className="form-label">Section 80D Health Insurance (Max ₹25k)</label>
              <input
                type="number"
                className="input-field"
                value={section80D}
                onChange={e => setSection80D(parseFloat(e.target.value || 0))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">HRA Exemption / House Rent ({currency.symbol})</label>
              <input
                type="number"
                className="input-field"
                value={hraExemption}
                onChange={e => setHraExemption(parseFloat(e.target.value || 0))}
              />
            </div>
          </div>
        </div>

        {/* Regime Side-by-Side Comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* New Tax Regime Card */}
          <div className="glass-card" style={{ padding: '1.5rem', border: taxNew <= taxOld ? '2px solid #16a34a' : '1px solid #e4e4e7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>New Tax Regime (Default)</h4>
              {taxNew <= taxOld && (
                <span style={{ fontSize: '0.72rem', background: '#16a34a', color: '#ffffff', padding: '0.2rem 0.55rem', borderRadius: '99px', fontWeight: 700 }}>
                  Cheaper
                </span>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#71717a', marginBottom: '0.35rem' }}>
              <span>Standard Deduction</span>
              <span>-₹75,000</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #f4f4f5' }}>
              <span>Estimated Tax</span>
              <span style={{ color: '#18181b' }} className="mono-amount">
                {currency.symbol}{(taxNew * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          {/* Old Tax Regime Card */}
          <div className="glass-card" style={{ padding: '1.5rem', border: taxOld < taxNew ? '2px solid #16a34a' : '1px solid #e4e4e7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>Old Tax Regime</h4>
              {taxOld < taxNew && (
                <span style={{ fontSize: '0.72rem', background: '#16a34a', color: '#ffffff', padding: '0.2rem 0.55rem', borderRadius: '99px', fontWeight: 700 }}>
                  Cheaper
                </span>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#71717a', marginBottom: '0.35rem' }}>
              <span>Total Deductions (80C+80D+HRA)</span>
              <span>-₹{oldRegimeDeductions.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #f4f4f5' }}>
              <span>Estimated Tax</span>
              <span style={{ color: '#18181b' }} className="mono-amount">
                {currency.symbol}{(taxOld * currency.rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
