import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/transactions.css";

function Transactions() {

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);

  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Completed");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {

    if (!date || !desc || !type || !category || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      date,
      desc,
      type,
      category,
      amount,
      status
    };

    setTransactions(prev => [newTransaction, ...prev]);

    setDate("");
    setDesc("");
    setType("");
    setCategory("");
    setAmount("");
    setStatus("Completed");

    setShowModal(false);
  };

  const filteredTransactions = transactions.filter((t) => {

    const matchSearch =
      t.desc.toLowerCase().includes(search.toLowerCase());

    const matchType =
      typeFilter === "All" || t.type === typeFilter;

    const matchDate =
      !dateFilter || t.date === dateFilter;

    return matchSearch && matchType && matchDate;

  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB").replace(/\//g, "-");
  };

  return (
    <>
      <div className="layout">

        <Sidebar />

        <main className="main">

          {/* HEADER */}

          <header className="topbar">
            <h2>Transactions</h2>

            <button
              className="add-btn"
              onClick={() => setShowModal(true)}
            >
              Add Transaction
            </button>
          </header>


          {/* FILTERS */}

          <section className="filters">

            <input
              type="text"
              placeholder="Search description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />

          </section>


          {/* TABLE */}

          <section className="table-box">

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredTransactions.length === 0 ? (

                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No Transactions Found
                    </td>
                  </tr>

                ) : (

                  filteredTransactions.map((t) => (

                    <tr key={t.id}>

                      <td>{formatDate(t.date)}</td>

                      <td>{t.desc}</td>

                      <td>{t.type}</td>

                      <td>{t.category}</td>

                      <td className={t.type === "Income" ? "green" : "red"}>
                        {t.type === "Income" ? "+" : "-"} ₹{t.amount}
                      </td>

                      <td>{t.status}</td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </section>

        </main>

      </div>


      {/* MODAL */}

      {showModal && (

        <div className="modal">

          <div className="modal-box">

            <h3>Add Transaction</h3>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>


            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>

              {type === "Income" && (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Business">Business</option>
                  <option value="Investment">Investment</option>
                  <option value="Other Income">Other Income</option>
                </>
              )}

              {type === "Expense" && (
                <>
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Bill">Bill</option>
                </>
              )}

            </select>


            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>


            <div className="modal-actions">

              <button onClick={addTransaction}>
                Save
              </button>

              <button
                className="cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  );
}

export default Transactions;