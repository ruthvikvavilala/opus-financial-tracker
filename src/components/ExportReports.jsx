import React, { useState } from 'react';
import { Download, FileText, Printer, Calendar, CheckCircle2, FileSpreadsheet, ShieldCheck } from 'lucide-react';

export default function ExportReports({ 
  transactions, 
  budgets, 
  investments, 
  emis, 
  insurances, 
  creditCards, 
  currency 
}) {
  const [dateRange, setDateRange] = useState('aug_2026');
  const [reportType, setReportType] = useState('executive');

  // Compute metrics
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netSavings = totalIncome - totalExpense;
  const portfolioVal = investments.reduce((sum, i) => sum + i.currentValue, 0);

  // Generate CSV data for export
  const handleExportCSV = () => {
    const headers = ['ID,Date,Title,Type,Category,Merchant,Amount (INR),Payment Method,Notes'];
    const rows = transactions.map(t => 
      `"${t.id}","${t.date}","${t.title}","${t.type}","${t.category}","${t.merchant || ''}","${t.amount}","${t.paymentMethod || ''}","${t.notes || ''}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `opus_financial_statement_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }} className="no-print">
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Financial Statements & Reports</h2>
          <p style={{ fontSize: '0.8rem', color: '#71717a' }}>Generate formatted PDF wealth statements and Excel CSV exports</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <FileSpreadsheet size={14} color="#16a34a" /> Export CSV Spreadsheet
          </button>
          <button className="btn btn-primary" onClick={handlePrintPDF}>
            <Printer size={14} /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Report Controls (No-Print) */}
      <div className="glass-card no-print" style={{ padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} color="#71717a" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Period:</span>
          </div>

          <select
            className="select-field"
            style={{ width: '180px' }}
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
          >
            <option value="aug_2026">August 2026 (Current)</option>
            <option value="q3_2026">Q3 2026 (Jul - Sep)</option>
            <option value="ytd_2026">Year to Date (YTD 2026)</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className={`btn ${reportType === 'executive' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem' }}
            onClick={() => setReportType('executive')}
          >
            Executive Summary
          </button>
          <button
            className={`btn ${reportType === 'detailed' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem' }}
            onClick={() => setReportType('detailed')}
          >
            Full Transaction Ledger
          </button>
        </div>
      </div>

      {/* Printable Executive Statement Preview Sheet */}
      <div 
        id="printable-statement"
        className="glass-card" 
        style={{ 
          padding: '2.5rem', 
          background: '#ffffff', 
          borderRadius: '12px',
          border: '1px solid #e4e4e7',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}
      >
        
        {/* Printable Letterhead Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '2px solid #18181b', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/images/logo.jpg" alt="Logo" style={{ width: '42px', height: '42px', borderRadius: '10px' }} />
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#18181b' }}>Opus Financial</h1>
              <span style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 600 }}>PRIVATE WEALTH & EXPENSE STATEMENT</span>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#71717a' }}>
            <div style={{ fontWeight: 700, color: '#18181b' }}>Statement Date: Aug 30, 2026</div>
            <div>Account Holder: Ruthvik Vavilala</div>
            <div>Reference: OPUS-STMT-89201</div>
          </div>
        </div>

        {/* Executive Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
            <span style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 600, display: 'block' }}>TOTAL INCOME</span>
            <strong style={{ fontSize: '1.15rem', color: '#16a34a' }} className="mono-amount">
              {currency.symbol}{(totalIncome * currency.rate).toLocaleString('en-IN')}
            </strong>
          </div>

          <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
            <span style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 600, display: 'block' }}>TOTAL OUTFLOW</span>
            <strong style={{ fontSize: '1.15rem', color: '#dc2626' }} className="mono-amount">
              {currency.symbol}{(totalExpense * currency.rate).toLocaleString('en-IN')}
            </strong>
          </div>

          <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
            <span style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 600, display: 'block' }}>NET SAVINGS</span>
            <strong style={{ fontSize: '1.15rem', color: '#18181b' }} className="mono-amount">
              {currency.symbol}{(netSavings * currency.rate).toLocaleString('en-IN')}
            </strong>
          </div>

          <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
            <span style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 600, display: 'block' }}>PORTFOLIO VALUE</span>
            <strong style={{ fontSize: '1.15rem', color: '#2563eb' }} className="mono-amount">
              {currency.symbol}{(portfolioVal * currency.rate).toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1rem', color: '#18181b' }}>Transaction Outflow Breakdown</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e4e4e7', textAlign: 'left', color: '#71717a' }}>
                <th style={{ padding: '0.6rem 0.5rem' }}>Date</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Transaction</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Category</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Method</th>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 10).map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f4f4f5' }}>
                  <td style={{ padding: '0.6rem 0.5rem', color: '#71717a' }}>{t.date}</td>
                  <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>{t.title}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textTransform: 'capitalize', color: '#71717a' }}>{t.category}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textTransform: 'uppercase', fontSize: '0.72rem', color: '#71717a' }}>{t.paymentMethod || 'UPI'}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right', fontWeight: 700, color: t.type === 'income' ? '#16a34a' : '#18181b' }} className="mono-amount">
                    {t.type === 'income' ? '+' : '-'}{currency.symbol}{(t.amount * currency.rate).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1rem', borderTop: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#71717a' }}>
          <span>Generated by Opus Financial • Certified Private Wealth System</span>
          <span>Page 1 of 1</span>
        </div>

      </div>

    </div>
  );
}
