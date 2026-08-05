import React, { useState, useEffect } from 'react';
import { Sparkles, Check, X, ArrowRight, Tag, CreditCard, ShoppingBag, DollarSign } from 'lucide-react';
import { parseNaturalLanguageInput } from '../utils/aiParser';
import { CATEGORIES } from '../data/initialData';

export default function QuickAddAI({ isOpen, onClose, onAddTransaction, currency }) {
  const [inputText, setInputText] = useState('');
  const [parsedResult, setParsedResult] = useState(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const samplePrompts = [
    "Spent ₹3,450 on groceries at Supermarket with UPI",
    "Received ₹15,000 freelance bonus payment",
    "Paid ₹1,500 for gym membership at Cult.fit",
    "Spent ₹450 on coffee and snacks at cafe via GPay"
  ];

  useEffect(() => {
    if (inputText.trim().length > 3) {
      const res = parseNaturalLanguageInput(inputText);
      setParsedResult(res);
    } else {
      setParsedResult(null);
    }
  }, [inputText]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!parsedResult || !parsedResult.amount) return;

    onAddTransaction(parsedResult);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setInputText('');
      setParsedResult(null);
      onClose();
    }, 800);
  };

  const selectedCategoryObj = parsedResult 
    ? CATEGORIES.find(c => c.id === parsedResult.category) 
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ padding: '0.5rem', background: 'var(--gradient-primary)', borderRadius: '10px', color: '#fff' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>AI Natural Language Logger</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Type naturally and Opus Financial AI will auto-extract all transaction details!</p>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <textarea
              className="textarea-field"
              rows={3}
              placeholder='e.g., "Spent $68 on dinner at Bistro Italian with Sapphire Card"'
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              autoFocus
              style={{ fontSize: '0.9375rem', padding: '1rem', borderRadius: 'var(--radius-md)' }}
            />
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText('')}
                style={{ position: 'absolute', right: '12px', top: '12px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Prompts */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
              Try sample prompts:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputText(prompt)}
                  style={{
                    fontSize: '0.75rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          {/* Live AI Extraction Preview Card */}
          {parsedResult && (
            <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', borderColor: 'rgba(99, 102, 241, 0.4)', background: 'rgba(99, 102, 241, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-purple">
                  <Sparkles size={12} /> AI Live Extracted
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Date: {parsedResult.date}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Extracted Amount</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: parsedResult.type === 'income' ? 'var(--accent-secondary)' : 'var(--text-primary)' }} className="mono-amount">
                    {currency.symbol}{(parsedResult.amount * currency.rate).toFixed(2)}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Merchant / Vendor</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {parsedResult.merchant}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Category</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                    <span className="badge" style={{ background: `${selectedCategoryObj?.color}20`, color: selectedCategoryObj?.color || 'var(--accent-primary)', border: `1px solid ${selectedCategoryObj?.color}40` }}>
                      <Tag size={12} /> {selectedCategoryObj ? selectedCategoryObj.name : parsedResult.category}
                    </span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Payment Method</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem', fontSize: '0.875rem', fontWeight: 600 }}>
                    <CreditCard size={14} color="var(--accent-primary)" />
                    <span style={{ textTransform: 'capitalize' }}>{parsedResult.paymentMethod.replace('_', ' ')}</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Action Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!parsedResult || !parsedResult.amount}
              style={{ opacity: (!parsedResult || !parsedResult.amount) ? 0.5 : 1 }}
            >
              {successMsg ? (
                <>
                  <Check size={16} /> Logged Successfully!
                </>
              ) : (
                <>
                  Add Transaction <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
