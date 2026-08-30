import React from 'react';
import { ScanLine, Sparkles, Smartphone, LogOut } from 'lucide-react';
import { CURRENCIES } from '../data/initialData';

export default function Navbar({ 
  selectedCurrency, 
  setSelectedCurrency, 
  userPhone,
  onOpenAuth,
  onLogout,
  onOpenReceiptScanner,
  onOpenQuickAI 
}) {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1.1rem 3.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* User Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img 
            src="/images/logo.jpg" 
            alt="Opus Financial Logo" 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              objectFit: 'cover',
              border: '1px solid #e4e4e7'
            }}
          />
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Good afternoon, Ruthvik 👋</h2>
            <p style={{ fontSize: '0.78rem', color: '#71717a' }}>Here is your Opus Financial overview for August 2026</p>
          </div>
        </div>

        {/* Right Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          <button className="btn btn-primary" onClick={onOpenQuickAI}>
            <Sparkles size={14} /> Log Expense
          </button>

          <button className="btn btn-secondary" onClick={onOpenReceiptScanner}>
            <ScanLine size={14} /> Scan Receipt
          </button>

          {/* Currency Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#f4f4f5', padding: '0.4rem 0.65rem', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{selectedCurrency.symbol}</span>
            <select
              value={selectedCurrency.code}
              onChange={(e) => {
                const found = CURRENCIES.find(c => c.code === e.target.value);
                if (found) setSelectedCurrency(found);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#18181b',
                fontWeight: 600,
                fontSize: '0.78rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Login / User Profile Pill */}
          {userPhone ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f4f4f5', padding: '0.35rem 0.75rem', borderRadius: '6px' }}>
              <Smartphone size={14} color="#16a34a" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#18181b' }}>{userPhone}</span>
              <button 
                onClick={onLogout}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#71717a', display: 'flex', alignItems: 'center', marginLeft: '0.25rem' }}
                title="Log Out"
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" onClick={onOpenAuth} style={{ fontSize: '0.78rem' }}>
              <Smartphone size={14} color="#2563eb" /> Mobile Login
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
