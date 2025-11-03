import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ expenses }) => {
  // Grouper les dépenses par date
  const expensesByDate = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += expense.amount;
    return acc;
  }, {});

  const sortedDates = Object.keys(expensesByDate).sort((a, b) => 
    new Date(a) - new Date(b)
  );

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Dépenses',
        data: sortedDates.map(date => expensesByDate[date]),
        borderColor: 'rgb(102, 126, 234)',
        backgroundColor: 'rgba(102, 126, 234, 0.5)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Évolution des dépenses'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ 
      background: 'white', 
      padding: '20px', 
      borderRadius: '15px', 
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default ExpenseChart;
