import React, { useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { BudgetContext } from '../context/Context.jsx';

Chart.register(...registerables); 

const IncomeChart = () => {
  const { state } = useContext(BudgetContext); 

  useEffect(() => {
    const ctx = document.getElementById('incomeCategoryChart').getContext('2d');

    // Group data by month and category
    const categoryData = {};

    state.transactions.forEach(transaction => {
      // Only include income transactions
      if (transaction.type === "income") {
        const month = transaction.month;
        const category = transaction.category;
        const amount = parseFloat(transaction.amount); 

        // Initialize the structure if not already present
        if (!categoryData[month]) {
          categoryData[month] = {};
        }

        // Initialize category if not present
        if (!categoryData[month][category]) {
          categoryData[month][category] = 0;
        }

        // Aggregate the amount
        categoryData[month][category] += amount;
      }
    });

    // Define a static list of months from January to December
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const labels = months; 
    const categories = [...new Set(state.transactions
      .filter(t => t.type === "income") // Only include income transactions
      .map(t => t.category))]; // Unique categories

    const data = {
      labels: labels,
      datasets: categories.map(category => ({
        label: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize category names
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`, // Random color for each category
        borderColor: 'rgba(255, 255, 255, 1)', 
        data: months.map(month => Math.abs(categoryData[month]?.[category] || 0)), 
      })),
    };

    const config = {
      type: 'bar', 
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            text: 'Monthly Specific Income',
            display: false,
            font: {
              size: 24,
              weight: 'bold',
              color: 'white', 
            },
          },
        },
        scales: {
          x: {
            stacked: false, // Stack false to display grouped bars
            title: {
              display: false,
              text: 'Month',
            },
            ticks: {
              autoSkip: false, // Ensure all months are displayed
              color: 'white', 
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', 
            },
          },
          y: {
            stacked: false, // Stack false to display grouped bars
            title: {
              display: true,
              text: 'Amount (€)',
              color: 'white', 
            },
            ticks: {
              color: 'white', 
            },
            beginAtZero: true,
            min: 0, 
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', 
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);

    // Cleanup the chart instance on component unmount
    return () => {
      chart.destroy();
    };
  }, [state.transactions]); // Update the chart if transactions change

  return (
    <div className="my-8 mx-auto max-w-screen-lg p-4 bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Monthly Income</h2>
      <div style={{ position: 'relative', height: '500px', width: '100%' }}>
        <canvas id="incomeCategoryChart"></canvas>
      </div>
    </div>
  );
};

export default IncomeChart;
