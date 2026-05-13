import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/home.css";

function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    setTransactions(savedTransactions);
    setTasks(savedTasks);

  }, []);

  const latestTransactions = transactions.slice(0, 5);
  const latestTasks = tasks.slice(0, 5);

  const totalBalance = transactions.reduce((total, t) => {
    return t.type === "Income"
      ? total + Number(t.amount)
      : total - Number(t.amount);
  }, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

  /* Spending Personality */
  const savingPercent =
    totalIncome === 0 ? 0 : Math.round(((totalIncome - totalExpense) / totalIncome) * 100);

  let personality = "Balanced Spender";
  if (savingPercent > 60) personality = "Saver";
  else if (savingPercent < 30) personality = "Big Spender";

  // No Spend Streak
const expenseTransactions = transactions.filter(
  (t) => t.type === "Expense"
);

let noSpendDays = 0;

if (expenseTransactions.length > 0) {

  const latestExpenseDate = new Date(expenseTransactions[0].date);
  const today = new Date();

  const diffTime = today - latestExpenseDate;
  noSpendDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

}

  const tips = [
    "Saving ₹100 per day can become ₹36,500 per year.",
    "Track small expenses to improve savings.",
    "Set a weekly spending limit.",
    "Avoid unnecessary subscriptions.",
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <header className="topbar">
          <h2>Dashboard</h2>

          <div className="user">
            <a href="/profile">
              <i className="fa-solid fa-circle-user"></i> Profile
            </a>
          </div>
        </header>

        <div className="totalBal">Total Balance</div>

        {/* SUMMARY CARDS */}
        <section className="cards">

          <div className="card">
            <h3>₹ {totalBalance}</h3>
            <p>Total Balance</p>
          </div>

          <div className="card">
            <h3>{transactions.length}</h3>
            <p>Recent Transactions</p>
          </div>

          <div className="card">
            <h3>{pendingTasks}</h3>
            <p>Pending Tasks</p>
          </div>

          <div className="card">
            <h3>2</h3>
            <p>Monthly Reports</p>
          </div>

        </section>

        {/* MAIN CONTENT */}
        <section className="content">

          {/* Latest Transactions */}
          <div className="box">
            <h4>Latest Transactions</h4>

            <table>
              <tbody>

                {latestTransactions.length === 0 ? (
                  <tr>
                    <td>No Transactions</td>
                  </tr>
                ) : (
                  latestTransactions.map((t) => {

                    const formattedDate = new Date(t.date)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-");

                    return (
                      <tr key={t.id}>
                        <td>{formattedDate}</td>
                        <td>{t.desc}</td>

                        <td className={t.type === "Income" ? "green" : "red"}>
                          {t.type === "Income" ? "+" : "-"} ₹{t.amount}
                        </td>

                      </tr>
                    );

                  })
                )}

              </tbody>
            </table>

          </div>

          {/* Tasks */}
          <div className="box">
            <h4>Task Overview</h4>

            <ul>

              {latestTasks.length === 0 ? (
                <li>No Tasks</li>
              ) : (
                latestTasks.map((task) => (

                  <li key={task.id}>

                    {task.status === "Completed" ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i className="fa-solid fa-xmark"></i>
                    )}

                    {" "} {task.desc}

                  </li>

                ))
              )}

            </ul>

          </div>

        </section>

        {/* NEW SMART SECTION */}

        <section className="smart">

          <div className="smartCard greenCard">
            <h4>Spending Personality</h4>
            <p>You are a <b>{personality}</b></p>
            <p>You save around {savingPercent}% of your income.</p>
          </div>

          <div className="smartCard yellowCard">
          <h4>No Spend Days</h4>
          <p>
            No Spend Streak: {noSpendDays} Day{noSpendDays !== 1 ? "s" : ""} 🔥
          </p>
        </div>

          <div className="smartCard">
            <h4>Tip of the Day</h4>
            <p>{randomTip}</p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;