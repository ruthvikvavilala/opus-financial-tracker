import React, { useState } from 'react';
import { ScanLine, UploadCloud, CheckCircle2, FileText, ArrowRight, X, Sparkles, ShoppingCart } from 'lucide-react';
import { SAMPLE_RECEIPTS } from '../data/initialData';

export default function ReceiptScannerModal({ isOpen, onClose, onAddBatchTransactions, currency }) {
  const [selectedReceipt, setSelectedReceipt] = useState(SAMPLE_RECEIPTS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  if (!isOpen) return null;

  const handleStartScan = (receipt) => {
    setSelectedReceipt(receipt);
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1200);
  };

  const handleCommitReceipt = () => {
    if (!selectedReceipt) return;

    // Convert receipt to transaction
    const newTx = {
      id: 'tx-ocr-' + Date.now(),
      date: selectedReceipt.date,
      title: `${selectedReceipt.store} Receipt Scan`,
      amount: selectedReceipt.total,
      type: 'expense',
      category: selectedReceipt.category,
      merchant: selectedReceipt.store,
      paymentMethod: selectedReceipt.paymentMethod,
      notes: `OCR Scanned ${selectedReceipt.items.length} items (${selectedReceipt.items.map(i => i.name).join(', ')})`
    };

    onAddBatchTransactions([newTx]);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ padding: '0.5rem', background: 'var(--gradient-primary)', borderRadius: '10px', color: '#fff' }}>
              <ScanLine size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>AI OCR Receipt Scanner</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Upload or select a receipt to automatically extract itemized costs.</p>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Receipt Selector Tabs */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Select Sample Receipt to Scan:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {SAMPLE_RECEIPTS.map(rec => (
              <button
                key={rec.id}
                type="button"
                onClick={() => handleStartScan(rec)}
                style={{
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: selectedReceipt.id === rec.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: selectedReceipt.id === rec.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rec.store}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>
                  {currency.symbol}{(rec.total * currency.rate).toFixed(2)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Scanning Preview Container */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.5rem', 
            marginBottom: '1.25rem', 
            position: 'relative', 
            overflow: 'hidden',
            background: 'var(--bg-card)'
          }}
        >
          {isScanning && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'var(--gradient-primary)',
              boxShadow: '0 0 15px var(--accent-primary)',
              animation: 'pulseGlow 0.6s infinite alternate'
            }} />
          )}

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            
            {/* Visual Receipt Paper Mock */}
            <div style={{
              width: '180px',
              background: '#ffffff',
              color: '#111827',
              borderRadius: '8px',
              padding: '1rem 0.875rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              <div style={{ textTransform: 'uppercase', textAlign: 'center', fontWeight: 700, borderBottom: '1px dashed #9ca3af', paddingBottom: '0.35rem', marginBottom: '0.5rem' }}>
                {selectedReceipt.store}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
                {selectedReceipt.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem' }}>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90px' }}>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px dashed #9ca3af', paddingTop: '0.35rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>TOTAL</span>
                <span>${selectedReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Extracted Details */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--accent-secondary)" />
                <span style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Itemized OCR Extraction</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {selectedReceipt.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{item.name}</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700 }} className="mono-amount">
                      {currency.symbol}{(item.price * currency.rate).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>Grand Total</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-secondary)' }} className="mono-amount">
                  {currency.symbol}{(selectedReceipt.total * currency.rate).toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleCommitReceipt}
          >
            Import Scanned Receipt <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
