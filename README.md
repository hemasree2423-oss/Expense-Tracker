# Expense Tracker

A full-stack web application built to manage personal income and expenses. Users can add, edit, delete, search, and filter transactions while tracking their financial summary through interactive charts.

## Features

- Add income and expense transactions
- Edit existing transactions
- Delete transactions
- View total income, expenses, and balance
- Search transactions by title
- Filter transactions by type and category
- Visualize income vs expenses
- View expenses by category

## Tech Stack

**Frontend**

- HTML
- CSS
- JavaScript

**Backend**

- Java
- Spring Boot
- Spring Data JPA
- REST APIs

**Database**

- MySQL

## Project Structure

```text
ExpenseTracker/
├── backend/
│   └── src/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## How to Run

### 1. Database Setup

- Install and start MySQL.
- Create a database named `expense_tracker`.
- Configure your MySQL username and password in the backend's `application.properties`.

### 2. Run the Backend

Open a terminal inside the `backend` folder and execute:

```bash
.\mvnw.cmd spring-boot:run
```

The backend runs at:

`http://localhost:8080`

### 3. Run the Frontend

Open `frontend/index.html` in your browser, preferably using the VS Code Live Server extension.

## REST API Endpoints

| Method | Endpoint                 | Purpose               |
| ------ | ------------------------ | --------------------- |
| POST   | `/api/transactions`      | Add transaction       |
| GET    | `/api/transactions`      | Get all transactions  |
| GET    | `/api/transactions/{id}` | Get transaction by ID |
| PUT    | `/api/transactions/{id}` | Update transaction    |
| DELETE | `/api/transactions/{id}` | Delete transaction    |

## Learning Outcomes

- Connecting a JavaScript frontend to a Spring Boot backend
- Building REST APIs
- Performing CRUD operations
- Connecting Spring Boot with MySQL using JPA
- Fetching and displaying backend data using JavaScript
- Visualizing data using Chart.js

## Author

Developed as an individual full-stack development project.
