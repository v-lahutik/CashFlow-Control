import { Chart } from "primereact/chart";
import { useContext, useState, useMemo } from "react";
import { BudgetContext } from "../context/Context";

function Charts() {
  const { displayedTransaction } = useContext(BudgetContext);

  // Function to aggregate transactions by category
  const aggregateTransactions = (transactions) => {
    const aggregatedData = transactions.reduce((acc, curr) => {
      const category = curr.transaction.category;
      const amount = parseFloat(curr.transaction.amount);
      if (acc[category]) {
        acc[category] += amount;
      } else {
        acc[category] = amount;
      }
      return acc;
    }, {});

    const labels = Object.keys(aggregatedData);
    const data = Object.values(aggregatedData);

    return { labels, data };
  };

  // Aggregate the transactions
  const { labels, data } = useMemo(() => aggregateTransactions(displayedTransaction), [displayedTransaction]);

  const colorPalette = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Cyan
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#1AFFD5", // Aqua
    "#FF74E6", // Pink
    "#6BF442", // Lime
    "#F49242", // Amber
  ];
  const backgroundColors = colorPalette.slice(0, labels.length);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: data.length > 5 ? false : true,
        position: data.length > 5 ? undefined : "bottom"
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EUR",
              }).format(context.raw);
            }
            return label;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend for bar chart
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EUR",
              }).format(context.raw);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
  };

  const [chartType, setChartType] = useState("pie");
  const toggleChart = () => {
    setChartType((prevChartType) => (prevChartType === "pie" ? "bar" : "pie"));
  };

  return (
    <div className="chart">
      <button onClick={toggleChart}>
        {chartType === "pie" ? "Click for bar chart" : "Click for pie chart"}
      </button>
      <h2>{chartType === "pie" ? "Pie chart" : "Bar chart"}</h2>
      {chartType === "pie" ? (
        <Chart
          type="pie"
          data={chartData}
          options={chartOptions}
          className="w-full md:w-30rem"
        />
      ) : (
        <Chart type="bar" data={chartData} options={barChartOptions} />
      )}
    </div>
  );
}

export default Charts;
