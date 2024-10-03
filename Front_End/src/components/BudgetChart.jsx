import React, { useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { BudgetContext } from '../context/Context.jsx';
import ExpenseCategoryChart from './ExpensesChart.jsx';
import IncomeChart from './IncomeChart.jsx';

Chart.register(...registerables); // Register Chart.js components

const BudgetChart = () => {
  const { state } = useContext(BudgetContext); // Get the budget context

  useEffect(() => {
    const ctx = document.getElementById('budgetChart').getContext('2d');

    const labels = state.monthlyTracking.map(month => month.month); // Extract month labels

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Actual Income',
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Light green
          borderColor: 'rgba(75, 192, 192, 1)',
          data: state.monthlyTracking.map(month => Math.abs(month.actualIncome)), // Use absolute values
        },
        {
          label: 'Actual Expenses',
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // Light red
          borderColor: 'rgba(255, 99, 132, 1)',
          data: state.monthlyTracking.map(month => Math.abs(month.actualExpenses)), // Use absolute values
        }
      ],
    };

    const config = {
      type: 'bar', // Use 'bar' as the main type
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to take full width
        plugins: {
          title: {
            text: ' Income and Expenses',
            display: false,
            font: {
              size: 24,
              weight: 'bold',
              color: 'white', 
            },
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const datasetLabel = tooltipItem.dataset.label || '';
                const value = tooltipItem.raw;

                // Display expenses as negative
                if (datasetLabel === 'Actual Expenses') {
                  return `${datasetLabel}: -€${value.toFixed(2)}`;
                }
                return `${datasetLabel}: €${value.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          x: {
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
            title: {
              display: true,
              text: 'Amount (€)',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Light grid lines for y-axis
            },
            ticks: {
              color: 'white', // Set y-axis ticks color to white
            },
            beginAtZero: true, // Start y-axis at zero
          },
        },
      },
    };

    const chart = new Chart(ctx, config);

    // Cleanup the chart instance on component unmount
    return () => {
      chart.destroy();
    };
  }, [state.monthlyTracking]); // Update the chart if monthlyTracking changes

  return (
    <>
      <div className="my-8 mx-auto max-w-screen-lg p-4 bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Yearly Income and Expenses Overview</h2> 
        <div style={{ position: 'relative', height: '400px', width: '100%' }}>
          <canvas id="budgetChart"></canvas>
        </div>
      </div>
      <ExpenseCategoryChart />
      <IncomeChart />
    </>
  );
};

export default BudgetChart;
