import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/reports.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
Chart as ChartJS,
ArcElement,
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
ArcElement,
BarElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
);

function Reports(){

const [transactions,setTransactions] = useState([]);
const [filter,setFilter] = useState("month");

useEffect(()=>{

const saved = JSON.parse(localStorage.getItem("transactions")) || [];
setTransactions(saved);

},[]);

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();


// FILTER TRANSACTIONS

const filteredTransactions = transactions.filter((t)=>{

const d = new Date(t.date);

if(filter==="month"){
return d.getMonth()===currentMonth && d.getFullYear()===currentYear;
}

if(filter==="lastMonth"){

const lastMonth = currentMonth===0 ? 11 : currentMonth-1;
const year = currentMonth===0 ? currentYear-1 : currentYear;

return d.getMonth()===lastMonth && d.getFullYear()===year;
}

if(filter==="year"){
return d.getFullYear()===currentYear;
}

return true;

});


// TOTAL INCOME

const totalIncome = filteredTransactions
.filter(t=>t.type==="Income")
.reduce((sum,t)=>sum+Number(t.amount),0);


// TOTAL EXPENSE

const totalExpense = filteredTransactions
.filter(t=>t.type==="Expense")
.reduce((sum,t)=>sum+Number(t.amount),0);


const netSaving = totalIncome-totalExpense;


// PDF DOWNLOAD FUNCTION
const downloadPDF = () => {

const doc = new jsPDF();

doc.setFont("Helvetica","bold");
doc.setFontSize(20);
doc.text("FinTrack Financial Report", 60, 20);

doc.setFont("Helvetica","normal");
doc.setFontSize(12);

// FORMAT NUMBER FUNCTION
const format = (num) => {
return Number(num).toLocaleString("en-IN");
};

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB").replace(/\//g, "-");
  };
  
doc.text(`Total Income : Rs ${format(totalIncome)}`,20,40);
doc.text(`Total Expense : Rs ${format(totalExpense)}`,20,50);
doc.text(`Net Savings : Rs ${format(netSaving)}`,20,60);


// TABLE DATA
const tableColumn = ["Date","Category","Type","Amount"];

const tableRows = filteredTransactions.map((t)=>[
formatDate(t.date),
t.category,
t.type,
`Rs ${format(t.amount)}`
]);

autoTable(doc,{
head:[tableColumn],
body:tableRows,
startY:80,
theme:"grid",
styles:{
font:"helvetica",
fontSize:11
},
headStyles:{
fillColor:[59,130,246]
}
});

doc.save("FinTrack_Report.pdf");

};

// INCOME VS EXPENSE CHART

const incomeExpenseData = {

labels:["Income","Expense"],

datasets:[{
data:[totalIncome,totalExpense],
backgroundColor:["#22c55e","#ef4444"]
}]

};


// MONTHLY TRANSACTION DATA

const months = [
"Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"
];

const monthlyCounts = new Array(12).fill(0);

transactions.forEach((t)=>{

const d = new Date(t.date);
const m = d.getMonth();
monthlyCounts[m]++;

});

const monthlyData = {

labels:months,

datasets:[{

label:"Transactions",
data:monthlyCounts,
backgroundColor:"#3b82f6"

}]

};


// CATEGORY EXPENSE ANALYSIS

const categoryTotals = {};

filteredTransactions.forEach((t)=>{

if(t.type==="Expense"){

if(!categoryTotals[t.category]){
categoryTotals[t.category]=0;
}

categoryTotals[t.category]+=Number(t.amount);

}

});

const totalCategoryExpense = Object.values(categoryTotals)
.reduce((a,b)=>a+b,0);



return(

<div className="layout">

<Sidebar/>

<main className="main">

<header className="topbar">

<h2>Reports & Analytics</h2>

<div className="report-controls">

<select onChange={(e)=>setFilter(e.target.value)}>

<option value="month">This Month</option>
<option value="lastMonth">Last Month</option>
<option value="year">This Year</option>

</select>

<button className="downloadBtn" onClick={downloadPDF}>
Download PDF Report
</button>

</div>

</header>



{/* SUMMARY */}

<section className="summary">

<div className="card">
<h3>₹ {totalIncome}</h3>
<p>Total Income</p>
</div>

<div className="card">
<h3>₹ {totalExpense}</h3>
<p>Total Expense</p>
</div>

<div className="card">
<h3>₹ {netSaving}</h3>
<p>Net Savings</p>
</div>

</section>



{/* CHARTS */}

<section className="charts">

<div className="chart-box">

<h4>Income vs Expense</h4>

<Doughnut data={incomeExpenseData}/>

</div>


<div className="chart-box">

<h4>Monthly Transactions</h4>

<Bar data={monthlyData}/>

</div>

</section>



{/* CATEGORY TABLE */}

<section className="report-table">

<h4>Category-wise Expense</h4>

<table>

<thead>
<tr>
<th>Category</th>
<th>Amount</th>
<th>Percentage</th>
</tr>
</thead>

<tbody>

{Object.keys(categoryTotals).length===0 ?(

<tr>
<td colSpan="3" style={{textAlign:"center"}}>No Expense Data</td>
</tr>

):(Object.entries(categoryTotals).map(([cat,amt])=>{

const percent = ((amt/totalCategoryExpense)*100).toFixed(1);

return(

<tr key={cat}>

<td>{cat}</td>

<td className="red">₹ {amt}</td>

<td>{percent}%</td>

</tr>

);

}))}

</tbody>

</table>

</section>
</main>

</div>

);

}

export default Reports;