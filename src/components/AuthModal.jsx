import React, { useState } from 'react';
import { Smartphone, Lock, ArrowRight, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [step, setStep] = useState(1); // 1: Mobile Number, 2: OTP Verification
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      // Auto-fill simulated OTP for easy testing
      setOtp(['4', '8', '2', '9']);
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next box
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 4) {
      setErrorMsg('Please enter the 4-digit OTP code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(`${countryCode} ${phoneNumber}`);
      onClose();
    }, 600);
  };

  const handleDemoFill = () => {
    setPhoneNumber('9876543210');
    setErrorMsg('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '440px', padding: '2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img src="/images/logo.jpg" alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
            <span style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Opus Financial</span>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {step === 1 ? (
          /* Step 1: Mobile Number Input */
          <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.2rem' }}>Log in via Mobile Number</h3>
              <p style={{ fontSize: '0.78rem', color: '#71717a' }}>Enter your registered mobile number to receive a 4-digit OTP</p>
            </div>

            {errorMsg && (
              <div style={{ fontSize: '0.75rem', color: '#dc2626', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                {errorMsg}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  className="select-field"
                  style={{ width: '90px' }}
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                
                <input
                  type="tel"
                  className="input-field"
                  required
                  placeholder="98765 43210"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoFill}
              style={{ fontSize: '0.75rem', color: '#2563eb', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}
            >
              ⚡ Quick Fill Demo Number (+91 98765 43210)
            </button>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={isLoading}>
              {isLoading ? 'Sending OTP...' : <>Send OTP Code <ArrowRight size={14} /></>}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'center', fontSize: '0.72rem', color: '#a1a1aa', marginTop: '0.5rem' }}>
              <ShieldCheck size={13} color="#16a34a" /> 256-bit Encrypted OTP Authentication
            </div>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.2rem' }}>Enter 4-Digit OTP</h3>
              <p style={{ fontSize: '0.78rem', color: '#71717a' }}>
                OTP sent to <strong>{countryCode} {phoneNumber}</strong>{' '}
                <button type="button" onClick={() => setStep(1)} style={{ color: '#2563eb', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>
                  Edit
                </button>
              </p>
            </div>

            {errorMsg && (
              <div style={{ fontSize: '0.75rem', color: '#dc2626', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                {errorMsg}
              </div>
            )}

            {/* 4 OTP Input Boxes */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  style={{
                    width: '54px',
                    height: '54px',
                    textAlign: 'center',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    background: '#fafafa',
                    outline: 'none'
                  }}
                />
              ))}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={isLoading}>
              {isLoading ? 'Verifying...' : <>Verify & Log In <CheckCircle2 size={14} /></>}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#71717a' }}>
              Didn't receive code?{' '}
              <button type="button" onClick={handleSendOTP} style={{ color: '#2563eb', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>
                Resend OTP
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
