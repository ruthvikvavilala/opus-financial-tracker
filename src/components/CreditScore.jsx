import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle, RefreshCw, Zap } from 'lucide-react';

export default function CreditScore({ creditCards, emis, currency }) {
  const [score, setScore] = useState(785);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(785);
  const [selectedScenario, setSelectedScenario] = useState(null);

  // Compute metrics from actual user data
  const totalLimit = creditCards.reduce((sum, c) => sum + c.totalLimit, 0);
  const totalUsed = creditCards.reduce((sum, c) => sum + c.currentUsed, 0);
  const utilizationRatio = totalLimit > 0 ? Math.round((totalUsed / totalLimit) * 100) : 0;

  const handleRefreshScore = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setScore(788);
      setSimulatedScore(788);
    }, 1000);
  };

  const scenarios = [
    { id: 'pay_loan', title: 'Pay off Hyundai Creta Car Loan', points: +18, text: 'Closing an active loan reduces debt-to-income ratio.' },
    { id: 'reduce_usage', title: 'Lower Credit Card Utilization below 10%', points: +14, text: 'Keeping utilization under 10% shows responsible credit management.' },
    { id: 'apply_card', title: 'Apply for a New Personal Loan', points: -12, text: 'Triggers a hard credit enquiry which temporarily dips your score.' },
    { id: 'miss_payment', title: 'Miss 1 EMI Due Date by 30 days', points: -75, text: 'Late payments severely impact your 35% payment history factor.' }
  ];

  const handleApplyScenario = (scenario) => {
    setSelectedScenario(scenario.id);
    setSimulatedScore(score + scenario.points);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Credit Score & Health Check</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Real-time CIBIL / Experian credit analysis & score simulator</p>
        </div>

        <button 
          className="btn btn-secondary"
          onClick={handleRefreshScore}
          disabled={isRefreshing}
        >
          <RefreshCw size={14} className={isRefreshing ? 'ai-pulse' : ''} /> Refresh Credit Report
        </button>
      </div>

      {/* Credit Score Gauge Card */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          
          {/* Visual Score Dial Container */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'conic-gradient(#16a34a 0% 78%, #e4e4e7 78% 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '0.72rem', color: '#71717a', fontWeight: 600, textTransform: 'uppercase' }}>CIBIL SCORE</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#18181b', lineHeight: 1 }} className="mono-amount">
                  {simulatedScore}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', marginTop: '0.2rem' }}>
                  Excellent
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#71717a', marginTop: '0.85rem' }}>
              Scale: 300 to 900 • Updated Aug 2026
            </p>
          </div>

          {/* Key Score Drivers Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Credit Health Breakdown</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              
              <div style={{ padding: '0.85rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block', fontWeight: 600 }}>PAYMENT HISTORY</span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#16a34a' }}>99.8% On-Time</span>
                <span style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginTop: '0.1rem' }}>35% Impact • High</span>
              </div>

              <div style={{ padding: '0.85rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block', fontWeight: 600 }}>CREDIT UTILIZATION</span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: utilizationRatio < 30 ? '#16a34a' : '#d97706' }}>{utilizationRatio}% Used</span>
                <span style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginTop: '0.1rem' }}>30% Impact • High</span>
              </div>

              <div style={{ padding: '0.85rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block', fontWeight: 600 }}>CREDIT AGE</span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#18181b' }}>4 Yrs 8 Mos</span>
                <span style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginTop: '0.1rem' }}>15% Impact • Medium</span>
              </div>

              <div style={{ padding: '0.85rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
                <span style={{ fontSize: '0.72rem', color: '#71717a', display: 'block', fontWeight: 600 }}>ACTIVE LOANS & CARDS</span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#18181b' }}>{creditCards.length + emis.length} Accounts</span>
                <span style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginTop: '0.1rem' }}>10% Impact • Low</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Credit Score Simulator Widget */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Zap size={18} color="#2563eb" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Interactive "What-If" Credit Simulator</h3>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '1rem' }}>
          Test how future financial decisions will impact your CIBIL score before taking action:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {scenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => handleApplyScenario(sc)}
              style={{
                padding: '1rem',
                borderRadius: '10px',
                border: selectedScenario === sc.id ? '2px solid #18181b' : '1px solid #e4e4e7',
                background: selectedScenario === sc.id ? '#f4f4f5' : '#ffffff',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#18181b' }}>{sc.title}</span>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: sc.points >= 0 ? '#16a34a' : '#dc2626',
                  background: sc.points >= 0 ? '#f0fdf4' : '#fef2f2',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px'
                }}>
                  {sc.points >= 0 ? `+${sc.points}` : sc.points} pts
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#71717a', lineHeight: 1.4 }}>{sc.text}</p>
            </button>
          ))}
        </div>

        {selectedScenario && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', padding: '0.85rem 1.25rem', background: '#f4f4f5', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Simulated Estimated Score: <strong style={{ fontSize: '1rem' }}>{simulatedScore}</strong></span>
            <button className="btn btn-secondary" style={{ fontSize: '0.72rem' }} onClick={() => { setSelectedScenario(null); setSimulatedScore(score); }}>
              Reset Simulation
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
