export const getExpenses = (userId) => {
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  return expenses.filter(exp => exp.userId === userId);
};

export const addExpense = (expense) => {
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

export const deleteExpense = (expenseId) => {
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  const filtered = expenses.filter(exp => exp.date !== expenseId);
  localStorage.setItem('expenses', JSON.stringify(filtered));
};
