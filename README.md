# E-Wallet System (MERN)

This is a web application designed to help individuals manage their expenses and income more effectively. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application allows users to track transactions across multiple accounts, categorize expenses, and generate insightful reports.

## Features

### Core Functionalities
- **Transaction Management**:
  - Track all income and expenses across various accounts (e.g., bank accounts, mobile money, cash).
  - Add transactions according  seamlessly.

- **Budgeting**:
  - Set a budget limit for specific Transaction Category.
  - Notify the user when the budget is exceeded.

- **Categories and Subcategories**:
  - Create custom categories and subcategories to organize expenses (e.g., Food > Groceries, Utilities > Fuel).
  - Link transactions to relevant categories or subcategories.

- **Reports and Analytics**:
  - Generate reports based on custom time intervals)(Between the date you suggested) (e.g., weekly, monthly).
  - Display transaction summaries with data visualizations such as a Doc(PDF).

### Advanced Features
- **Real-time Notifications**:
  - Alerts for budget overages.

- **Customizable Views**:
  - Filter and sort transactions by account and time period.

## How to Start the Project

### Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v14 or later) and npm
- **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)
- **Git** for version control

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/izibyosevictoire/E-Wallet.git
   cd E-wallet

2. **Backend setup**

  Navigate to the backend directory:
```bash
cd server
```
Install dependencies:

```bash
npm install
```


Create a .env file in the backend directory and define the following variables:
```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
```


Start the backend server:
```bash
npm run dev
```


3. **Frontend Setup**

Navigate to the frontend directory:
```bash
cd Frontend
```
Install dependencies:
```bash
npm install
```
Start the development server:

```bash
npm start
