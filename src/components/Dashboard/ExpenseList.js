import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ExpenseInfo = styled.div`
  flex: 1;
`;

const ExpenseAmount = styled.div`
  font-weight: bold;
  color: #e53e3e;
  font-size: 1.1rem;
`;

const ViewMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;

  &:hover {
    background: #5a67d8;
  }
`;

const ExpenseList = ({ expenses, onViewMore, showAll }) => {
  if (expenses.length === 0) {
    return (
      <ListContainer>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Aucune dépense enregistrée
        </p>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Dépenses récentes</h3>
      {expenses.map((expense, index) => (
        <ExpenseItem key={index}>
          <ExpenseInfo>
            <div style={{ fontWeight: 'bold', color: '#333' }}>
              {expense.item}
            </div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              {expense.description}
            </div>
            <div style={{ color: '#999', fontSize: '0.8rem' }}>
              {new Date(expense.date).toLocaleDateString()}
            </div>
          </ExpenseInfo>
          <ExpenseAmount>
            {expense.amount.toFixed(2)}
          </ExpenseAmount>
        </ExpenseItem>
      ))}
      {expenses.length >= 5 && (
        <ViewMoreButton onClick={onViewMore}>
          {showAll ? 'Voir moins' : 'Voir plus'}
        </ViewMoreButton>
      )}
    </ListContainer>
  );
};

export default ExpenseList;
