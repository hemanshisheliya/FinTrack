import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

function HomePage() {
  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src="/Image/FinTrack.png" alt="FinTrack" />
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <Link to="/login" className="btn">
            Login
          </Link>
        </nav>
      </header>

      <section className="main" id="home">
        <h1>Manage Your Finance & Workflow Smartly</h1>
        <p>
          Track income, expenses, tasks, and reports — all in one place.
        </p>

        <Link to="/login" className="cta">
          Get Started
        </Link>
      </section>

      <section id="features" className="features">
        <h2>Core Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            💰
            <h3>Amount Handling</h3>
            <p>Track income and expenses easily.</p>
          </div>

          <div className="feature-card">
            🔁
            <h3>Transactions</h3>
            <p>Manage and monitor all transactions.</p>
          </div>

          <div className="feature-card">
            ✅
            <h3>Workflow & Tasks</h3>
            <p>Stay updated with task statuses.</p>
          </div>

          <div className="feature-card">
            📊
            <h3>Reports & Analytics</h3>
            <p>Visualize data with reports.</p>
          </div>

          <div className="feature-card">
            ⚙
            <h3>User System</h3>
            <p>Login system with UI state control.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About FinTrack</h2>
        <p>
          FinTrack is a streamlined finance and workflow management
          application designed to deliver clarity, efficiency, and control
          over financial operations and task workflows. The system provides a
          centralized interface where users can monitor transactions, manage
          tasks, and analyze reports in real time.
        </p>
      </section>

      <footer className="footer">
        <p>© 2026 FinTrack | Finance & Workflow Project</p>
      </footer>
    
    </>
  );
}

export default HomePage;