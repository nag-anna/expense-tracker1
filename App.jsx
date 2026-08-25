
import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Trash2,
  Plus,
} from "lucide-react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Salary",
      amount: 50000,
      type: "income",
      category: "Salary",
    },
    {
      id: 2,
      title: "Food",
      amount: 500,
      type: "expense",
      category: "Food",
    },
    {
      id: 3,
      title: "Electricity Bill",
      amount: 1500,
      type: "expense",
      category: "Bills",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
  });

  const addTransaction = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Please enter title and amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
    };

    setTransactions([newTransaction, ...transactions]);

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <div className="app">
      <header>
        <div>
          <h1>Expense Tracker</h1>
          <p>Manage your income and expenses</p>
        </div>

        <Wallet size={40} />
      </header>

      <main>
        {/* Summary Cards */}
        <section className="cards">
          <div className="card balance">
            <Wallet />
            <div>
              <p>Balance</p>
              <h2>₹{balance.toLocaleString()}</h2>
            </div>
          </div>

          <div className="card income">
            <TrendingUp />
            <div>
              <p>Total Income</p>
              <h2>₹{income.toLocaleString()}</h2>
            </div>
          </div>

          <div className="card expense">
            <TrendingDown />
            <div>
              <p>Total Expenses</p>
              <h2>₹{expenses.toLocaleString()}</h2>
            </div>
          </div>
        </section>

        {/* Add Transaction */}
        <section className="form-section">
          <h2>
            <Plus size={22} />
            Add Transaction
          </h2>

          <form onSubmit={addTransaction}>
            <input
              type="text"
              placeholder="Transaction title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Health</option>
              <option>Education</option>
              <option>Salary</option>
              <option>Other</option>
            </select>

            <button type="submit">Add Transaction</button>
          </form>
        </section>

        {/* Transactions */}
        <section className="transactions">
          <h2>Recent Transactions</h2>

          {transactions.length === 0 ? (
            <p className="empty">No transactions found.</p>
          ) : (
            transactions.map((transaction) => (
              <div className="transaction" key={transaction.id}>
                <div>
                  <h3>{transaction.title}</h3>
                  <p>{transaction.category}</p>
                </div>

                <div className="transaction-right">
                  <strong
                    className={
                      transaction.type === "income"
                        ? "income-text"
                        : "expense-text"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {transaction.amount.toLocaleString()}
                  </strong>

                  <button
                    className="delete"
                    onClick={() =>
                      deleteTransaction(transaction.id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;