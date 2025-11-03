import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExpenseChart from './ExpenseChart';
import ExpenseList from './ExpenseList';
import { getExpenses, addExpense } from '../../services/expenses';
import { useAuth } from '../../services/auth';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SummaryCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

const TotalAmount = styled.h2`
  color: #333;
  font-size: 2.5rem;
  margin: 0;
`;

const AddExpenseForm = styled.form`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
  min-width: 150px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #5a67d8;
  }
`;

const ShareButton = styled(Button)`
  background: #48bb78;
  margin-left: 10px;

  &:hover {
    background: #38a169;
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    item: ''
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    const userExpenses = getExpenses(user.id);
    setExpenses(userExpenses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString(),
      userId: user.id
    };
    
    addExpense(newExpense);
    loadExpenses();
    setFormData({ amount: '', description: '', item: '' });
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const shareExpenses = (period) => {
    const now = new Date();
    let filtered = expenses;

    if (period === 'day') {
      filtered = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.toDateString() === now.toDateString();
      });
    } else if (period === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = expenses.filter(exp => new Date(exp.date) >= weekAgo);
    } else if (period === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = expenses.filter(exp => new Date(exp.date) >= monthAgo);
    }

    const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
    const text = `Dépenses ${period} (${filtered.length} transactions): ${total.toFixed(2)}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mes dépenses',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Dépenses copiées dans le presse-papiers!');
    }
  };

  return (
    <DashboardContainer>
      <SummaryCard>
        <h3>Total des dépenses</h3>
        <TotalAmount>{totalExpenses.toFixed(2)}</TotalAmount>
      </SummaryCard>

      <AddExpenseForm onSubmit={handleSubmit}>
        <Input
          type="number"
          step="0.01"
          placeholder="Montant"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
        />
        <Input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <Input
          type="text"
          placeholder="Article"
          value={formData.item}
          onChange={(e) => setFormData({...formData, item: e.target.value})}
          required
        />
        <Button type="submit">Ajouter</Button>
      </AddExpenseForm>

      <ExpenseChart expenses={expenses} />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <ShareButton onClick={() => shareExpenses('day')}>Partager (Jour)</ShareButton>
        <ShareButton onClick={() => shareExpenses('week')}>Partager (Semaine)</ShareButton>
        <ShareButton onClick={() => shareExpenses('month')}>Partager (Mois)</ShareButton>
      </div>

      <ExpenseList 
        expenses={showAll ? expenses : expenses.slice(0, 5)} 
        onViewMore={() => setShowAll(!showAll)}
        showAll={showAll}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
