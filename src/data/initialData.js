export const CURRENCIES = [
  { code: 'INR', symbol: '₹', rate: 1, name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', rate: 0.012, name: 'US Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.011, name: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.0094, name: 'British Pound' },
  { code: 'JPY', symbol: '¥', rate: 1.86, name: 'Japanese Yen' }
];

export const CATEGORIES = [
  { id: 'housing', name: 'Housing & Rent', icon: 'Home', color: '#4f46e5' },
  { id: 'groceries', name: 'Groceries & Food', icon: 'ShoppingBag', color: '#10b981' },
  { id: 'dining', name: 'Dining & Cafes', icon: 'Utensils', color: '#f59e0b' },
  { id: 'transport', name: 'Transport & Fuel', icon: 'Car', color: '#06b6d4' },
  { id: 'utilities', name: 'Utilities & Bills', icon: 'Zap', color: '#8b5cf6' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Film', color: '#ec4899' },
  { id: 'shopping', name: 'Shopping & Clothes', icon: 'ShoppingBasket', color: '#3b82f6' },
  { id: 'healthcare', name: 'Health & Fitness', icon: 'HeartPulse', color: '#ef4444' },
  { id: 'salary', name: 'Salary & Income', icon: 'Briefcase', color: '#10b981' },
  { id: 'investment', name: 'Investments & Crypto', icon: 'TrendingUp', color: '#14b8a6' },
  { id: 'general', name: 'General & Others', icon: 'Tag', color: '#6b7280' }
];

export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI / GPay / Paytm', icon: 'Smartphone' },
  { id: 'credit_card', name: 'Credit Card', icon: 'CreditCard' },
  { id: 'debit_card', name: 'Debit Card', icon: 'CreditCard' },
  { id: 'bank_transfer', name: 'Net Banking', icon: 'Building' },
  { id: 'cash', name: 'Cash', icon: 'Banknote' }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    date: '2026-08-01',
    title: 'Monthly Salary Credit',
    amount: 85000,
    type: 'income',
    category: 'salary',
    merchant: 'Tech Mahindra / IT Corp',
    paymentMethod: 'bank_transfer',
    notes: 'Base salary credit for August'
  },
  {
    id: 'tx-102',
    date: '2026-08-01',
    title: 'Apartment Monthly Rent',
    amount: 22000,
    type: 'expense',
    category: 'housing',
    merchant: 'Gated Society Maintenance',
    paymentMethod: 'upi',
    notes: 'Rent + maintenance via UPI'
  },
  {
    id: 'tx-103',
    date: '2026-07-30',
    title: 'Weekly Organic Groceries',
    amount: 3450,
    type: 'expense',
    category: 'groceries',
    merchant: 'Blinkit / Zepto / Supermarket',
    paymentMethod: 'upi',
    notes: 'Vegetables, milk, fruits, wheat flour'
  },
  {
    id: 'tx-104',
    date: '2026-07-29',
    title: 'Weekend Dinner & Drinks',
    amount: 2800,
    type: 'expense',
    category: 'dining',
    merchant: 'Bawarchi Biryani / Olive Bistro',
    paymentMethod: 'credit_card',
    notes: 'Family dinner out'
  },
  {
    id: 'tx-105',
    date: '2026-07-28',
    title: 'Petrol Refill & Wash',
    amount: 2500,
    type: 'expense',
    category: 'transport',
    merchant: 'Indian Oil Petrol Bunk',
    paymentMethod: 'credit_card',
    notes: 'Full tank unleaded petrol'
  },
  {
    id: 'tx-106',
    date: '2026-07-26',
    title: 'High-Speed Broadband WiFi',
    amount: 1199,
    type: 'expense',
    category: 'utilities',
    merchant: 'Airtel Xstream Fiber',
    paymentMethod: 'upi',
    notes: '300 Mbps unlimited plan'
  },
  {
    id: 'tx-107',
    date: '2026-07-25',
    title: 'Gym Annual Membership',
    amount: 1500,
    type: 'expense',
    category: 'healthcare',
    merchant: 'Cult.fit Gym',
    paymentMethod: 'upi',
    notes: 'Monthly auto-debit'
  },
  {
    id: 'tx-108',
    date: '2026-07-22',
    title: 'Freelance Project Payout',
    amount: 15000,
    type: 'income',
    category: 'salary',
    merchant: 'Upwork Client',
    paymentMethod: 'upi',
    notes: 'React web application consulting'
  },
  {
    id: 'tx-109',
    date: '2026-07-20',
    title: 'Smart Noise-Canceling Earbuds',
    amount: 4999,
    type: 'expense',
    category: 'shopping',
    merchant: 'Amazon India',
    paymentMethod: 'credit_card',
    notes: 'Realme Buds Air Pro'
  },
  {
    id: 'tx-110',
    date: '2026-07-18',
    title: 'PVR IMAX Movie & Snacks',
    amount: 1450,
    type: 'expense',
    category: 'entertainment',
    merchant: 'PVR Cinemas',
    paymentMethod: 'upi',
    notes: 'Movie tickets & popcorn'
  },
  {
    id: 'tx-111',
    date: '2026-08-01',
    title: 'Netflix Premium 4K Subscription',
    amount: 649,
    type: 'expense',
    category: 'entertainment',
    merchant: 'Netflix India',
    paymentMethod: 'credit_card',
    notes: 'Monthly auto-renew 4K Ultra HD plan'
  },
  {
    id: 'tx-112',
    date: '2026-08-01',
    title: 'Aha OTT Monthly Pack',
    amount: 199,
    type: 'expense',
    category: 'entertainment',
    merchant: 'Aha Media',
    paymentMethod: 'upi',
    notes: 'Monthly regional OTT streaming subscription'
  },
  {
    id: 'tx-113',
    date: '2026-08-01',
    title: 'Social Media Pro / Verification',
    amount: 650,
    type: 'expense',
    category: 'entertainment',
    merchant: 'Meta / LinkedIn Pro',
    paymentMethod: 'credit_card',
    notes: 'Monthly social media badge & creator suite'
  },
  {
    id: 'tx-114',
    date: '2026-08-01',
    title: 'Google One 2TB Cloud Storage',
    amount: 210,
    type: 'expense',
    category: 'utilities',
    merchant: 'Google Cloud Services',
    paymentMethod: 'upi',
    notes: 'Monthly Google Drive & Photos 2TB storage'
  },
  {
    id: 'tx-115',
    date: '2026-08-02',
    title: 'Monthly Electricity & Power Bill',
    amount: 2450,
    type: 'expense',
    category: 'utilities',
    merchant: 'State Electricity Board / BESCOM',
    paymentMethod: 'upi',
    notes: 'Monthly electricity bill paid via GPay / UPI'
  },
  {
    id: 'tx-116',
    date: '2026-08-01',
    title: 'High-Speed Broadband Internet WiFi',
    amount: 1199,
    type: 'expense',
    category: 'utilities',
    merchant: 'Airtel Xstream Fiber / JioFiber',
    paymentMethod: 'upi',
    notes: '300 Mbps unlimited fiber internet bill'
  }
];

export const INITIAL_BUDGETS = [
  { category: 'housing', limit: 25000 },
  { category: 'groceries', limit: 12000 },
  { category: 'dining', limit: 8000 },
  { category: 'transport', limit: 6000 },
  { category: 'utilities', limit: 4000 },
  { category: 'entertainment', limit: 3500 },
  { category: 'shopping', limit: 10000 },
  { category: 'healthcare', limit: 5000 }
];

export const INITIAL_SAVINGS_GOALS = [
  {
    id: 'goal-1',
    title: 'Emergency Rainy Day Fund',
    targetAmount: 250000,
    currentAmount: 165000,
    category: 'Safety Net',
    targetDate: '2026-12-31',
    color: '#10b981'
  },
  {
    id: 'goal-2',
    title: 'Goa Holiday Trip 🏖️',
    targetAmount: 45000,
    currentAmount: 32000,
    category: 'Vacation',
    targetDate: '2026-10-15',
    color: '#ec4899'
  },
  {
    id: 'goal-3',
    title: 'New M3 MacBook Pro',
    targetAmount: 180000,
    currentAmount: 95000,
    category: 'Tech Upgrade',
    targetDate: '2026-11-01',
    color: '#4f46e5'
  }
];

export const SAMPLE_RECEIPTS = [
  {
    id: 'rec-1',
    store: 'D-Mart Supermarket',
    date: '2026-08-02',
    items: [
      { name: 'Organic Almond Milk 1L', price: 299 },
      { name: 'Basmati Rice 5kg', price: 549 },
      { name: 'Cold Pressed Sunflower Oil 2L', price: 380 },
      { name: 'Greek Yogurt 400g', price: 160 },
      { name: 'Fresh Fruits Pack', price: 250 }
    ],
    tax: 85,
    total: 1723,
    category: 'groceries',
    paymentMethod: 'upi'
  },
  {
    id: 'rec-2',
    store: 'Third Wave Coffee',
    date: '2026-08-02',
    items: [
      { name: 'Iced Hazelnut Latte', price: 325 },
      { name: 'Butter Croissant', price: 245 }
    ],
    tax: 28.50,
    total: 598.50,
    category: 'dining',
    paymentMethod: 'upi'
  },
  {
    id: 'rec-3',
    store: 'Decathlon Sports Store',
    date: '2026-07-31',
    items: [
      { name: 'Run Cushion Running Shoes', price: 2499 },
      { name: 'Quick Dry Sports T-Shirt 2pk', price: 999 }
    ],
    tax: 210,
    total: 3708,
    category: 'shopping',
    paymentMethod: 'credit_card'
  }
];

export const INITIAL_EMIS = [
  {
    id: 'emi-1',
    title: 'Car Loan (Hyundai Creta)',
    loanAmount: 600000,
    interestRate: 8.5,
    tenureMonths: 36,
    completedMonths: 14,
    monthlyEMI: 18944,
    bank: 'HDFC Bank Auto Loan',
    nextDueDate: '2026-08-10',
    category: 'transport'
  },
  {
    id: 'emi-2',
    title: 'iPhone 15 Pro (No-Cost EMI)',
    loanAmount: 120000,
    interestRate: 0,
    tenureMonths: 12,
    completedMonths: 7,
    monthlyEMI: 10000,
    bank: 'ICICI Credit Card EMI',
    nextDueDate: '2026-08-05',
    category: 'shopping'
  },
  {
    id: 'emi-3',
    title: 'Sony 55" OLED TV',
    loanAmount: 75000,
    interestRate: 12,
    tenureMonths: 9,
    completedMonths: 4,
    nextDueDate: '2026-08-15',
    category: 'entertainment'
  }
];

export const INITIAL_INSURANCES = [
  {
    id: 'ins-1',
    title: 'Comprehensive Health Guard',
    provider: 'Star Health / Care Insurance',
    policyNumber: 'SH-8920194',
    category: 'Health Insurance',
    sumAssured: 10000000, // 1 Crore Cover
    premiumAmount: 22000,
    frequency: 'Annual',
    nextDueDate: '2026-09-15',
    status: 'Active'
  },
  {
    id: 'ins-2',
    title: 'Term Life Cover (1 Cr)',
    provider: 'HDFC Life Click 2 Protect',
    policyNumber: 'HL-7739102',
    category: 'Term Life',
    sumAssured: 10000000, // 1 Crore Cover
    premiumAmount: 18500,
    frequency: 'Annual',
    nextDueDate: '2026-11-20',
    status: 'Active'
  },
  {
    id: 'ins-3',
    title: 'Hyundai Creta Bumper-to-Bumper',
    provider: 'ICICI Lombard Motor',
    category: 'Vehicle Insurance',
    sumAssured: 800000,
    premiumAmount: 8000,
    frequency: 'Annual',
    nextDueDate: '2026-10-05',
    status: 'Active'
  }
];

export const INITIAL_INVESTMENTS = [
  {
    id: 'inv-1',
    name: 'Nifty 50 Index Mutual Fund (SIP)',
    category: 'Mutual Funds / SIP',
    investedAmount: 180000,
    currentValue: 215000,
    monthlySIP: 10000,
    returnsPercent: +19.4,
    type: 'sip'
  },
  {
    id: 'inv-2',
    name: 'Reliance & HDFC Bank Stocks',
    category: 'Equity Stocks',
    investedAmount: 120000,
    currentValue: 138500,
    monthlySIP: 0,
    returnsPercent: +15.4,
    type: 'stocks'
  },
  {
    id: 'inv-3',
    name: 'Sovereign Gold Bond (SGB)',
    category: 'Digital Gold',
    investedAmount: 50000,
    currentValue: 62000,
    monthlySIP: 0,
    returnsPercent: +24.0,
    type: 'gold'
  },
  {
    id: 'inv-4',
    name: 'Bitcoin (BTC) & Ethereum (ETH)',
    category: 'Crypto Assets',
    investedAmount: 40000,
    currentValue: 48500,
    monthlySIP: 2000,
    returnsPercent: +21.25,
    type: 'crypto'
  }
];

export const INITIAL_CREDIT_CARDS = [
  {
    id: 'card-1',
    cardName: 'HDFC Regalia Gold',
    bank: 'HDFC Bank',
    cardNumber: '•••• 8920',
    totalLimit: 300000,
    currentUsed: 42500,
    rewardPoints: 14850,
    dueDate: '2026-08-15',
    statementDate: '2026-08-01'
  },
  {
    id: 'card-2',
    cardName: 'SBI Cashback Card',
    bank: 'State Bank of India',
    cardNumber: '•••• 4419',
    totalLimit: 150000,
    currentUsed: 18200,
    rewardPoints: 3420,
    dueDate: '2026-08-20',
    statementDate: '2026-08-05'
  },
  {
    id: 'card-3',
    cardName: 'ICICI Amazon Pay',
    bank: 'ICICI Bank',
    cardNumber: '•••• 1029',
    totalLimit: 200000,
    currentUsed: 8900,
    rewardPoints: 890,
    dueDate: '2026-08-25',
    statementDate: '2026-08-10'
  }
];



