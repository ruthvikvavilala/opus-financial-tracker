import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransactionsList from './components/TransactionsList';
import BudgetManager from './components/BudgetManager';
import SavingsGoals from './components/SavingsGoals';
import EMITracker from './components/EMITracker';
import InsuranceTracker from './components/InsuranceTracker';
import InvestmentsTracker from './components/InvestmentsTracker';
import CreditCardsTracker from './components/CreditCardsTracker';
import CreditScore from './components/CreditScore';
import BillReminders from './components/BillReminders';
import ExpenseSplitter from './components/ExpenseSplitter';
import NetWorth from './components/NetWorth';
import ExportReports from './components/ExportReports';
import TaxOptimizer from './components/TaxOptimizer';
import AIForecaster from './components/AIForecaster';
import Analytics from './components/Analytics';
import QuickAddAI from './components/QuickAddAI';
import ReceiptScannerModal from './components/ReceiptScannerModal';
import AuthModal from './components/AuthModal';

import { 
  INITIAL_TRANSACTIONS, 
  INITIAL_BUDGETS, 
  INITIAL_SAVINGS_GOALS, 
  INITIAL_EMIS,
  INITIAL_INSURANCES,
  INITIAL_INVESTMENTS,
  INITIAL_CREDIT_CARDS,
  CURRENCIES 
} from './data/initialData';
import { generateAIInsights } from './utils/aiParser';

export default function App() {
  const [userPhone, setUserPhone] = useState(() => {
    return localStorage.getItem('opus_user_phone') || '+91 98765 43210';
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('spendpulse_v4_bills_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('spendpulse_v2_inr_budgets');
    return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
  });

  const [savingsGoals, setSavingsGoals] = useState(() => {
    const saved = localStorage.getItem('spendpulse_v2_inr_goals');
    return saved ? JSON.parse(saved) : INITIAL_SAVINGS_GOALS;
  });

  const [emis, setEmis] = useState(() => {
    const saved = localStorage.getItem('spendpulse_v2_inr_emis');
    return saved ? JSON.parse(saved) : INITIAL_EMIS;
  });

  const [insurances, setInsurances] = useState(() => {
    const saved = localStorage.getItem('spendpulse_v2_inr_insurances');
    return saved ? JSON.parse(saved) : INITIAL_INSURANCES;
  });

  const [investments, setInvestments] = useState(() => {
    const saved = localStorage.getItem('spendpulse_v3_investments');
    return saved ? JSON.parse(saved) : INITIAL_INVESTMENTS;
  });

  const [creditCards, setCreditCards] = useState(() => {
    const saved = localStorage.getItem('spendpulse_v3_cards');
    return saved ? JSON.parse(saved) : INITIAL_CREDIT_CARDS;
  });

  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Modal States
  const [isQuickAIOpen, setIsQuickAIOpen] = useState(false);
  const [isReceiptScannerOpen, setIsReceiptScannerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    if (userPhone) {
      localStorage.setItem('opus_user_phone', userPhone);
    } else {
      localStorage.removeItem('opus_user_phone');
    }
  }, [userPhone]);

  useEffect(() => {
    localStorage.setItem('spendpulse_v4_bills_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('spendpulse_v2_inr_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('spendpulse_v2_inr_goals', JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  useEffect(() => {
    localStorage.setItem('spendpulse_v2_inr_emis', JSON.stringify(emis));
  }, [emis]);

  useEffect(() => {
    localStorage.setItem('spendpulse_v2_inr_insurances', JSON.stringify(insurances));
  }, [insurances]);

  useEffect(() => {
    localStorage.setItem('spendpulse_v3_investments', JSON.stringify(investments));
  }, [investments]);

  useEffect(() => {
    localStorage.setItem('spendpulse_v3_cards', JSON.stringify(creditCards));
  }, [creditCards]);

  // Handlers
  const handleLoginSuccess = (phone) => {
    setUserPhone(phone);
  };

  const handleLogout = () => {
    setUserPhone('');
  };

  const handleAddTransaction = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (txId) => {
    setTransactions(prev => prev.filter(t => t.id !== txId));
  };

  const handleUpdateBudget = (category, limit) => {
    setBudgets(prev => prev.map(b => b.category === category ? { ...b, limit } : b));
  };

  const handleAddGoal = (newGoal) => {
    setSavingsGoals(prev => [...prev, newGoal]);
  };

  const handleUpdateGoalAmount = (goalId, addedAmount) => {
    setSavingsGoals(prev => prev.map(g => g.id === goalId ? { ...g, currentAmount: g.currentAmount + addedAmount } : g));
  };

  const handleAddEMI = (newEMI) => {
    setEmis(prev => [...prev, newEMI]);
  };

  const handlePayEMI = (emiItem) => {
    setEmis(prev => prev.map(e => e.id === emiItem.id ? { ...e, completedMonths: Math.min(e.completedMonths + 1, e.tenureMonths) } : e));
    
    const emiTx = {
      id: 'tx-emi-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: `${emiItem.title} Payment`,
      amount: emiItem.monthlyEMI,
      type: 'expense',
      category: emiItem.category || 'shopping',
      merchant: emiItem.bank,
      paymentMethod: 'upi',
      notes: `EMI Payment installment for ${emiItem.title}`
    };
    handleAddTransaction(emiTx);
  };

  const handleAddInsurance = (newIns) => {
    setInsurances(prev => [...prev, newIns]);
  };

  const handlePayInsurancePremium = (insItem) => {
    const insTx = {
      id: 'tx-ins-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: `${insItem.title} Premium Payment`,
      amount: insItem.premiumAmount,
      type: 'expense',
      category: 'healthcare',
      merchant: insItem.provider,
      paymentMethod: 'upi',
      notes: `Annual premium payment for ${insItem.title} (${insItem.policyNumber})`
    };
    handleAddTransaction(insTx);
  };

  const handleAddInvestment = (newInv) => {
    setInvestments(prev => [...prev, newInv]);
  };

  const handleAddCreditCard = (newCard) => {
    setCreditCards(prev => [...prev, newCard]);
  };

  const handlePayCardBill = (cardItem) => {
    setCreditCards(prev => prev.map(c => c.id === cardItem.id ? { ...c, currentUsed: 0 } : c));
    
    const cardTx = {
      id: 'tx-card-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: `${cardItem.cardName} Bill Payment`,
      amount: cardItem.currentUsed,
      type: 'expense',
      category: 'utilities',
      merchant: cardItem.bank,
      paymentMethod: 'bank_transfer',
      notes: `Credit Card monthly statement bill payoff`
    };
    handleAddTransaction(cardTx);
  };

  const aiInsights = generateAIInsights(transactions, budgets);

  return (
    <div className="app-container">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="main-content">
        
        {/* Top Navbar */}
        <Navbar
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          userPhone={userPhone}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          onOpenReceiptScanner={() => setIsReceiptScannerOpen(true)}
          onOpenQuickAI={() => setIsQuickAIOpen(true)}
        />

        {/* Content Body */}
        <main className="content-body">
          {activeTab === 'dashboard' && (
            <Dashboard
              transactions={transactions}
              budgets={budgets}
              insights={aiInsights}
              currency={selectedCurrency}
              onNavigateTab={setActiveTab}
              onOpenQuickAI={() => setIsQuickAIOpen(true)}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsList
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              onDeleteTransaction={handleDeleteTransaction}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'budgets' && (
            <BudgetManager
              budgets={budgets}
              transactions={transactions}
              onUpdateBudget={handleUpdateBudget}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'investments' && (
            <InvestmentsTracker
              investments={investments}
              onAddInvestment={handleAddInvestment}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'cards' && (
            <CreditCardsTracker
              creditCards={creditCards}
              onAddCreditCard={handleAddCreditCard}
              onPayCardBill={handlePayCardBill}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'emis' && (
            <EMITracker
              emis={emis}
              onAddEMI={handleAddEMI}
              onPayEMI={handlePayEMI}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'insurance' && (
            <InsuranceTracker
              insurances={insurances}
              onAddInsurance={handleAddInsurance}
              onPayPremium={handlePayInsurancePremium}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'tax' && (
            <TaxOptimizer
              transactions={transactions}
              insurances={insurances}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'predict' && (
            <AIForecaster
              transactions={transactions}
              budgets={budgets}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'reminders' && (
            <BillReminders
              onAddTransaction={handleAddTransaction}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'splitter' && (
            <ExpenseSplitter
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'networth' && (
            <NetWorth
              transactions={transactions}
              investments={investments}
              emis={emis}
              creditCards={creditCards}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'score' && (
            <CreditScore
              creditCards={creditCards}
              emis={emis}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'reports' && (
            <ExportReports
              transactions={transactions}
              budgets={budgets}
              investments={investments}
              emis={emis}
              insurances={insurances}
              creditCards={creditCards}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'goals' && (
            <SavingsGoals
              goals={savingsGoals}
              onAddGoal={handleAddGoal}
              onUpdateGoalAmount={handleUpdateGoalAmount}
              currency={selectedCurrency}
            />
          )}

          {activeTab === 'analytics' && (
            <Analytics
              transactions={transactions}
              budgets={budgets}
              insights={aiInsights}
              currency={selectedCurrency}
            />
          )}
        </main>
      </div>

      {/* Auth Mobile Login Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Quick AI Logger Modal */}
      <QuickAddAI
        isOpen={isQuickAIOpen}
        onClose={() => setIsQuickAIOpen(false)}
        onAddTransaction={handleAddTransaction}
        currency={selectedCurrency}
      />

      {/* Simulated OCR Receipt Scanner Modal */}
      <ReceiptScannerModal
        isOpen={isReceiptScannerOpen}
        onClose={() => setIsReceiptScannerOpen(false)}
        onAddBatchTransactions={(items) => {
          items.forEach(handleAddTransaction);
        }}
        currency={selectedCurrency}
      />

    </div>
  );
}
