import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import "../styles/sidebar.css";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@fintrack.com",
    phone: "+91 98765 43210",
    dob: "2005-04-17",
    gender: "Female"
  });

  useEffect(() => {

    const savedUser = JSON.parse(localStorage.getItem("userProfile"));

    if (savedUser) {
      setUser(savedUser);
    }

  }, []);


  const formatDate = (date) => {

    if (!date) return "";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };



  return (

    <div className="layout">

      <Sidebar />

      <main className="main">

        <header className="topbar">
          <h2>User Profile</h2>
        </header>

        <section className="profile-card">

          <div className="profile-top">

            <div className="avatar">
              <img src="/Image/profile.jpg" alt="profile" />
            </div>

            <div>
              <h3 id="profileName">{user.name}</h3>
            </div>

          </div>


          <div className="details">

            <div className="row">
              <span>Full Name</span>
              <p id="displayName">{user.name}</p>
            </div>

            <div className="row">
              <span>Email Address</span>
              <p id="displayEmail">{user.email}</p>
            </div>

            <div className="row">
              <span>Phone Number</span>
              <p id="displayPhone">{user.phone}</p>
            </div>

            <div className="row">
              <span>Date of Birth</span>
              <p id="displayDOB">{formatDate(user.dob)}</p>
            </div>

            <div className="row">
              <span>Gender</span>
              <p id="displayGender">{user.gender}</p>
            </div>

            <div className="row">
              <span>Account Status</span>
              <p className="active">Active</p>
            </div>

            <div className="row">
              <span>Member Since</span>
              <p>January 2026</p>
            </div>

            <div className="row">
              <span>Last Login</span>
              <p>22 Jan 2026, 10:15 AM</p>
            </div>

          </div>

        </section>


        <div className="changes">

          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            Back to home
          </button>

          <button className="edit-btn" onClick={() => navigate("/settings")}>
            Edit Profile
          </button>

        </div>

      </main>

    </div>

  );
}

export default Profile;