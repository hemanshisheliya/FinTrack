import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/settings.css";

function Settings() {

const [profile,setProfile] = useState({
name:"",
email:"",
phone:"",
dob:"",
gender:""
});

const [darkMode,setDarkMode] = useState(false);
const [emailNotify,setEmailNotify] = useState(true);

const [newPassword,setNewPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");


// LOAD SAVED DATA

useEffect(()=>{

const savedUser = JSON.parse(localStorage.getItem("userProfile"));
if(savedUser){
setProfile(savedUser);
}

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){
setDarkMode(true);
document.body.classList.add("dark-mode");
}

},[]);


// SAVE PROFILE

const handleSave = ()=>{

const {name,email,phone,dob,gender} = profile;

if(!name || !email || !phone || !dob || !gender){
alert("Please fill all fields!");
return;
}

if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
alert("Enter valid email!");
return;
}

if(!/^[0-9]{10}$/.test(phone)){
alert("Enter valid 10 digit phone number!");
return;
}

localStorage.setItem("userProfile",JSON.stringify(profile));

alert("Profile Updated Successfully!");

};


// DARK MODE

const toggleTheme = ()=>{

if(!darkMode){
document.body.classList.add("dark-mode");
document.body.classList.remove("light-mode");
localStorage.setItem("theme","dark");
}else{
document.body.classList.remove("dark-mode");
document.body.classList.add("light-mode");
localStorage.setItem("theme","light");
}

setDarkMode(!darkMode);

};


// CHANGE PASSWORD

const updatePassword = ()=>{

if(newPassword==="" || confirmPassword===""){
alert("Please enter both passwords!");
return;
}

if(newPassword!==confirmPassword){
alert("Passwords do not match!");
return;
}

alert("Password changed successfully!");

setNewPassword("");
setConfirmPassword("");

};


return(

<div className="layout">

<Sidebar/>

<main className="main">

<header className="topbar">
<h2>Settings</h2>
</header>


{/* PROFILE SETTINGS */}

<section className="settings-box">

<h3>Profile Settings</h3>

<div className="form-group-setting">
<label>Full Name</label>
<input
type="text"
value={profile.name}
onChange={(e)=>setProfile({...profile,name:e.target.value})}
/>
</div>

<div className="form-group-setting">
<label>Email</label>
<input
type="email"
value={profile.email}
onChange={(e)=>setProfile({...profile,email:e.target.value})}
/>
</div>

<div className="form-group-setting">
<label>Contact Number</label>
<input
type="tel"
value={profile.phone}
onChange={(e)=>setProfile({...profile,phone:e.target.value})}
/>
</div>

<div className="form-group-setting">
<label>Date of Birth</label>
<input
type="date"
value={profile.dob}
onChange={(e)=>setProfile({...profile,dob:e.target.value})}
/>
</div>

<div className="form-group-setting">
<label>Gender</label>
<select
value={profile.gender}
onChange={(e)=>setProfile({...profile,gender:e.target.value})}
>
<option value="">Select</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Others">Others</option>
</select>
</div>

<button className="btn-primary" onClick={handleSave}>
Save Changes
</button>

</section>



{/* PREFERENCES */}

<section className="settings-box">

<h3>Preferences</h3>

<div className="toggle">

<span>Dark Mode</span>

<input
type="checkbox"
checked={darkMode}
onChange={toggleTheme}
/>

</div>


<div className="toggle">

<span>Email Notifications</span>

<input
type="checkbox"
checked={emailNotify}
onChange={()=>setEmailNotify(!emailNotify)}
/>

</div>

</section>


<section className="settings-box">

<h3>Security</h3>

<div className="form-group-setting">

<label>Change Password</label>

<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>
<br></br>
<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

</div>

<button className="btn-danger" onClick={updatePassword}>
Update Password
</button>

</section>


</main>

</div>

);

}

export default Settings;