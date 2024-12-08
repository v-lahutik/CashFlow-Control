# 💰 CashFlow Control

CashFlow Control is a web application designed for personal budget planning and tracking. It allows users to track income, expenses, set budget goals, and securely manage data through authentication and database storage.

## Live Demo 🌐

Check out the live version of [here...](https://cashflow-control-xxx4.onrender.com/)

## 🌟 Features

- **🎯 Budget Goals**: Users can set budget goals to track their financial targets.
- **➕ Adding Transactions**: Users can add income and expense transactions.
- **📂 Adding Custom Categories**: Users can create new custom categories for transactions.
- **📊 Transaction Table**: Displays transactions in a table format.
- **🔍 Filtering**: Transactions can be filtered by income or expense.
- **💾 Database Storage**: User data is securely saved in a database instead of local storage.
- **📈 Summary Charts**: Provides visual summary charts of income and/or expenses.
-.

## 🛠️ Technologies Used

- **Frontend**: JavaScript, React, Tailwind
- **Backend**: Node.js, Express, Mongoose, bcrypt
- **Database**: MongoDB
- **Deployment**: Render 

## Include Docker

For the back- and frontend there is a Dockerfile for building respective images. To ease deployment in development, there is also a docker compose file located at the project's root directory.

Build the two images (in the respective folders):

```bash
docker image build cashflow_frontend:latest .

docker image build cashflow_backend:latest .
```

In order to use it, it is required to first create the needed Docker network:

```bash
docker network create cashflow
```

Now, the application with all its dependencies can be launched with:

```bash
docker compose up
```

Note: this is a preliminary attempt for utilizing Docker.
