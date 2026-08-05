import { CATEGORIES, PAYMENT_METHODS } from '../data/initialData';

/**
 * Natural Language AI Parser for Smart Expense Logging
 */
export function parseNaturalLanguageInput(input) {
  if (!input || typeof input !== 'string') return null;

  const text = input.trim().toLowerCase();

  // 1. Extract Amount
  let amount = null;
  const currencyMatch = text.match(/(?:[$€£₹¥]|usd|eur|gbp|inr|jpy)?\s*(\d+(?:\.\d{1,2})?)\s*(?:[$€£₹¥]|usd|eur|gbp|inr|jpy|bucks|dollars|rupees)?/i);
  if (currencyMatch && currencyMatch[1]) {
    amount = parseFloat(currencyMatch[1]);
  }

  // 2. Determine Income vs Expense
  let type = 'expense';
  const incomeKeywords = ['received', 'earned', 'got paid', 'salary', 'income', 'bonus', 'refund', 'freelance', 'credited'];
  if (incomeKeywords.some(keyword => text.includes(keyword))) {
    type = 'income';
  }

  // 3. Category Detection
  let category = type === 'income' ? 'salary' : 'general';
  
  const categoryMap = {
    housing: ['rent', 'mortgage', 'apartment', 'lease', 'house', 'maintenance'],
    groceries: ['grocery', 'groceries', 'supermarket', 'whole foods', 'trader joe', 'walmart', 'food', 'milk', 'vegetable', 'fruit'],
    dining: ['dinner', 'lunch', 'breakfast', 'restaurant', 'cafe', 'coffee', 'pizza', 'burger', 'bistro', 'starbucks', 'sushi', 'eat'],
    transport: ['uber', 'lyft', 'cab', 'taxi', 'gas', 'fuel', 'petrol', 'bus', 'train', 'metro', 'parking', 'toll'],
    utilities: ['electric', 'electricity', 'water', 'internet', 'wifi', 'broadband', 'phone', 'mobile', 'bill'],
    entertainment: ['movie', 'cinema', 'netflix', 'spotify', 'game', 'gaming', 'concert', 'ticket', 'theater'],
    shopping: ['shoes', 'clothes', 'clothing', 'amazon', 'apple', 'nike', 'gadget', 'laptop', 'shopping', 'store'],
    healthcare: ['doctor', 'pharmacy', 'medicine', 'gym', 'fitness', 'hospital', 'clinic', 'dentist']
  };

  if (type === 'expense') {
    for (const [catKey, keywords] of Object.entries(categoryMap)) {
      if (keywords.some(kw => text.includes(kw))) {
        category = catKey;
        break;
      }
    }
  }

  // 4. Merchant Extraction
  let merchant = 'General Merchant';
  const atMatch = text.match(/(?:at|from|to|in)\s+([a-z0-9\s'&]+?)(?:\s+(?:with|using|for|on|date|via)|$)/i);
  if (atMatch && atMatch[1]) {
    merchant = atMatch[1].replace(/^(a|an|the)\s+/i, '').trim();
    merchant = merchant.charAt(0).toUpperCase() + merchant.slice(1);
  } else {
    // Attempt fallback from category
    if (category === 'groceries') merchant = 'Supermarket';
    else if (category === 'dining') merchant = 'Restaurant';
    else if (category === 'transport') merchant = 'Transit';
    else if (category === 'shopping') merchant = 'Retail Store';
  }

  // 5. Payment Method Extraction
  let paymentMethod = 'credit_card';
  if (text.includes('cash')) paymentMethod = 'cash';
  else if (text.includes('debit')) paymentMethod = 'debit_card';
  else if (text.includes('bank') || text.includes('transfer')) paymentMethod = 'bank_transfer';
  else if (text.includes('upi') || text.includes('online') || text.includes('gpay') || text.includes('paytm')) paymentMethod = 'upi';

  // 6. Title generation
  let title = merchant;
  if (text.includes('for ')) {
    const forMatch = text.match(/for\s+([a-z0-9\s'&]+?)(?:\s+(?:at|with|using|via)|$)/i);
    if (forMatch && forMatch[1]) {
      title = forMatch[1].trim();
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }
  }

  const dateStr = new Date().toISOString().split('T')[0];

  return {
    id: 'tx-' + Date.now(),
    date: dateStr,
    title: title || 'Quick Logged Expense',
    amount: amount || 0,
    type,
    category,
    merchant,
    paymentMethod,
    notes: `AI Auto-parsed from: "${input}"`
  };
}

/**
 * AI Financial Advice & Anomaly Detector Generator
 */
export function generateAIInsights(transactions, budgets) {
  const insights = [];

  // Calculate stats
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  // Check budget warnings
  budgets.forEach(b => {
    const spent = categoryTotals[b.category] || 0;
    const ratio = spent / b.limit;
    if (ratio >= 1.0) {
      const catObj = CATEGORIES.find(c => c.id === b.category);
      insights.push({
        id: `alert-over-${b.category}`,
        type: 'danger',
        title: `Budget Exceeded for ${catObj ? catObj.name : b.category}`,
        message: `You've spent ₹${spent.toFixed(0)} out of ₹${b.limit} budget cap (${Math.round(ratio * 100)}%). Consider pausing non-essential spending.`,
        actionText: 'Review Budget'
      });
    } else if (ratio >= 0.8) {
      const catObj = CATEGORIES.find(c => c.id === b.category);
      insights.push({
        id: `alert-warn-${b.category}`,
        type: 'warning',
        title: `High Spending in ${catObj ? catObj.name : b.category}`,
        message: `You have reached ${Math.round(ratio * 100)}% of your ₹${b.limit} monthly budget threshold.`,
        actionText: 'Check Details'
      });
    }
  });

  // Check top spending category recommendation
  let topCat = null;
  let topCatAmount = 0;
  Object.entries(categoryTotals).forEach(([cat, amt]) => {
    if (amt > topCatAmount && cat !== 'housing') {
      topCatAmount = amt;
      topCat = cat;
    }
  });

  if (topCat) {
    const catObj = CATEGORIES.find(c => c.id === topCat);
    insights.push({
      id: 'tip-smart-saving',
      type: 'info',
      title: `Smart Savings Opportunity`,
      message: `Your highest variable spending this month is in "${catObj ? catObj.name : topCat}" (₹${topCatAmount.toFixed(0)}). Cutting 15% here could save you ₹${(topCatAmount * 0.15).toFixed(0)} each month!`,
      actionText: 'View Insights'
    });
  }

  // General Positive Encouragement
  if (insights.length === 0) {
    insights.push({
      id: 'tip-healthy',
      type: 'success',
      title: 'Financial Health Status: Excellent',
      message: 'All your expense categories are within healthy budget boundaries. Keep up the great work!',
      actionText: 'View Analytics'
    });
  }

  return insights;
}
