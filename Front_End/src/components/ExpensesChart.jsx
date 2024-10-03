import React, { useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { BudgetContext } from '../context/Context.jsx';

Chart.register(...registerables); // Register Chart.js components

const ExpenseCategoryChart = () => {
  const { state } = useContext(BudgetContext); // Get the budget context

  useEffect(() => {
    const ctx = document.getElementById('expenseCategoryChart').getContext('2d');

    // Group data by month and category
    const categoryData = {};

    state.transactions.forEach(transaction => {
      // Only include expense transactions
      if (transaction.type === "expenses") {
        const month = transaction.month;
        const category = transaction.category;
        const amount = parseFloat(transaction.amount); // Convert amount to number

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

    const labels = months; // Use static month labels
    const categories = [...new Set(state.transactions
      .filter(t => t.type === "expenses") // Only include expense transactions
      .map(t => t.category))]; // Unique categories

    const data = {
      labels: labels,
      datasets: categories.map(category => ({
        label: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize category names
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`, // Random color for each category
        borderColor: 'rgba(255, 255, 255, 1)', // White border for better contrast
        data: months.map(month => Math.abs(categoryData[month]?.[category] || 0)), // Get data for each category, using absolute values
      })),
    };

    const config = {
      type: 'bar', // Use 'bar' for grouped bar chart
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            text: 'Monthly Specific Expenses',
            display: false,
            font: {
              size: 24,
              weight: 'bold',
              color: 'white', // White title color (if displayed)
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
              color: 'white', // Set x-axis ticks color to white
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Light grid lines for x-axis
            },
          },
          y: {
            stacked: false, // Stack false to display grouped bars
            title: {
              display: true,
              text: 'Amount (€)',
              color: 'white', // Set y-axis title color to white
            },
            ticks: {
              color: 'white', // Set y-axis ticks color to white
            },
            beginAtZero: true,
            min: 0, // Set the minimum value to 0
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Light grid lines for y-axis
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
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Monthly Expenses</h2>
      <div style={{ position: 'relative', height: '500px', width: '100%' }}>
        <canvas id="expenseCategoryChart"></canvas>
      </div>
    </div>
  );
};

export default ExpenseCategoryChart;
