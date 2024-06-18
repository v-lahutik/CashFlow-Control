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
  const { labels, data } = useMemo(
    () => aggregateTransactions(displayedTransaction),
    [displayedTransaction]
  );

  const colorPalette = [
    "#FFB3BA", // Light Pink
    "#FFDFBA", // Light Orange
    "#FFFFBA", // Light Yellow
    "#BAFFC9", // Light Green
    "#BAE1FF", // Light Blue
    "#D1C4E9", // Lavender
    "#FFD1DC", // Pink Blush
    "#FFCCCB", // Misty Rose
    "#FADADD", // Pale Pink
    "#C1E1C1", // Mint Green
    "#F5D6D6", // Blush Pink
    "#FDE2E2", // Light Coral
    "#F0D9FF", // Mauve
    "#FDE3A7", // Pale Peach
    "#B4F8C8", // Mint
    "#E4C1F9", // Thistle
    "#FFCCE5", // Light Magenta
    "#FFDFD3", // Apricot
    "#C3FBD8", // Light Mint
    "#F8C3A0", // Pale Apricot
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
        display: true,
        // display: data.length > 5 ? false : true,
        // position: data.length > 5 ? undefined : "bottom",
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
    <article className="rounded-s bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 5/6">
    
      <button onClick={toggleChart}>
      <strong className="rounded border border-green-300 bg-green-300 px-3 py-1.5 text-[12px] font-medium text-grey-500">
        {chartType === "pie" ? "Click for bar chart" : "Click for pie chart"}
      </strong></button>

      <h3 className="mt-4 text-lg font-medium sm:text-xl text-center">
        <p>{chartType === "pie" ? "Pie chart" : "Bar chart"} </p>
      </h3>

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
    </article>
  );
}

export default Charts;
