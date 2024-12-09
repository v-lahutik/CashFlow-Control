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
# from within the frontend directory
docker image build cashflow_frontend:latest .

# from within the backend directory
docker image build cashflow_backend:latest .
```

In order to use it, it is required to first create the needed Docker network:

```bash
docker network create cashflow
```

For security, credentials are supposed to live inside an `.env` file. Create a `.env` file at the project root with the following keys:

- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD

Now, the application with all its dependencies can be launched with:

```bash
docker compose up
```

Next, to run it in detached mode:

```bash
docker compose up -d
```

Logs can be viewed and piped, for example:

```bash
docker compose logs > logs.log
```

Note: this is a preliminary attempt for utilizing Docker.

For production, settings on the host and the docker container running MongoDB are advised. Note, the logs state that authentication is not required. My testings showed that authentication is in fact required. This message is - perhaps - generated before authentication is enforced.

Furthermore, in an production environment it is a good idea to run the frontend behind a reverse proxy and set up the Vite app correctly (currently running in dev mode).
