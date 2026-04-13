import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Add.css";
export const Add = () => {
  const navigate = useNavigate()
  const [Type, setType] = useState("Income");
  const [Amount, setAmount] = useState("");
  const [Category, setCategory] = useState("");
  const [Date, setDate] = useState("");
  const handleAdd = async (e) => {
    e.preventDefault()
    const NewData = {
      type: Type,
      Amount: Amount,
      category: Category,
      date: Date,
    };
    try {
      const token = localStorage.getItem('token')
      if(!token){
        return
      }
      const response = await axios.post(
        "http://localhost:5000/submit",
        NewData, {headers: {Authorization: `Bearer ${token}`}}
      );
      toast.success("New Transaction added successfully!")
      setTimeout(() => { navigate("/Transactions")
      window.location.reload()},1000)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="form-container">
        <h2>Add Transactions</h2>
      <form onSubmit={handleAdd}>
        <div className="input-group">
        <label>Type</label>
        <select
          className="inputs"
          value={Type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          required
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        </div>
        <div className="input-group">
        <label>Amount</label>
        <input
          className="inputs"
          type="number"
          name="Amount"
          value={Amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          placeholder="amount"
          required
        />
        </div>
        <div className="input-group">
        <label>Category</label>
        <input
          className="inputs"
          type="text"
          name="Category"
          value={Category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="category"
          required
        />
        </div>
        <div className="input-group">
        <label>Date</label>
        <input
          className="inputs"
          type="Date"
          name="Date"
          value={Date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          required
        />
        </div>
        <button>
          Add Transaction
        </button>
      </form>
      </div>
    </>
  );
};
