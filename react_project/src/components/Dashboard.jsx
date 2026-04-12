import { TransactionContext } from "../Context/TransactionContext";
import { useContext, useState } from "react";
import { BarGraph } from "./BarGraph";
import { PieDiagram } from "./PieChart";
import "./Dashboard.css";
export const Dashboard = () => {
  const name = localStorage.getItem('name')
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [month, setMonth] = useState(currentMonth);
  const { transactions } = useContext(TransactionContext);
  const Total_Income = transactions
    .filter((items) => items.Type == "Income")
    .reduce((acc, items) => {
      return acc + items.Amount;
    }, 0);
  const Total_Expense = transactions
    .filter((items) => items.Type == "Expense")
    .reduce((acc, items) => {
      return acc + items.Amount;
    }, 0);
  const GroupByMonth = transactions.reduce((acc, result) => {
    const date = new Date(result.Date);
    const monthKey = date.toISOString().slice(0, 7);
    const monthYr = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
    if (!acc[monthKey]) {
      acc[monthKey] = { monthKey, monthYr, Total_Income: 0, Total_Expense: 0 };
    }
    if (result.Type === "Income") {
      acc[monthKey].Total_Income += result.Amount;
    } else {
      acc[monthKey].Total_Expense += result.Amount;
    }
    return acc;
  }, {});
  const sortedData = Object.values(GroupByMonth).sort((a, b) =>
    a.monthKey.localeCompare(b.monthKey),
  );
    const chunkedData = [];

  for (let i = 0; i < sortedData.length; i += 12) {
    chunkedData.push(sortedData.slice(i, i + 12));
  }
  const [page, setPage] = useState(0);
  const currentData = chunkedData[page] || [];
  const getYearRange = (data) => {
  if (!data.length) return "";

  const first = data[0].monthKey;  
  const last = data[data.length - 1].monthKey; 
  const startYear = first.slice(0, 4); 
  const endYear = last.slice(0, 4);    
 
  return startYear === endYear 
    ? `${startYear}` 
    : `${startYear}-${endYear}`;
};
A
  const transactionsOfMonth = transactions.filter(
    (t) => t.Date.startsWith(month) && t.Type === "Expense",
  );
  const totalPerCategory = transactionsOfMonth.reduce((acc, result) => {
    if (!acc[result.Category]) {
      acc[result.Category] = 0;
    }
    acc[result.Category] += result.Amount;
    return acc;
  }, {});
  return (
    <>
      <h1 className="heading">Welcome to the Dashboard, {name} !</h1>
      <div className="dashboard-cards">
        <div className="card">
          <span className="label">Income</span>
          <span className="value" id="income">
            ₹ {Total_Income}
          </span>
        </div>
        <div className="card">
          <span className="label">Expense</span>
          <span className="value" id="expense">
            ₹ {Total_Expense}
          </span>
        </div>
        <div className="card">
          <span className="label">Balance</span>
          <span className="value" id="balance">
            ₹ {Total_Income - Total_Expense}
          </span>
        </div>
      </div>
      <div className="superContainer">
        <div className="BarContainer">
          <h2>Monthly Income vs Expense</h2>
          <BarGraph result={currentData} />
          <div className="pagination">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="prev"
            >
              Prev
            </button>
            <span>
              {getYearRange(currentData) || "No Data"}
            </span>
            <button
              onClick={() =>
                setPage((p) => Math.min(p + 1, chunkedData.length - 1))
              }
              className="nxt"
              disabled={page === chunkedData.length - 1}
            >
              Next
            </button>
          </div>
        </div>
        <div className="PieContainer">
          <h2>Expense by Category</h2>
          <input
            className="month-input"
            type="month"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          ></input>
          <PieDiagram data={totalPerCategory} />
        </div>
      </div>
    </>
  );
};
