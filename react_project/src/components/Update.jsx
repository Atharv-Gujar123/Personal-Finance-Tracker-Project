import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Add.css";
export const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state?.Details;
  const [Type, setType] = useState(details?.Type || "");
  const [Amount, setAmount] = useState(details?.Amount || "");
  const [Category, setCategory] = useState(details?.Category || "");
  const [Date, setDate] = useState(details?.date?.split("T")[0] || "");
  const handleUpdate = async (e) => {
    e.preventDefault();
    const NewData = {
      id: details?.id,
      type: Type,
      Amount: Amount,
      category: Category,
      date: Date,
    };
    try {
      const response = await axios.put(`http://localhost:5000/edit`, NewData);
      alert("Changes made successfully!!");
      navigate("/Transactions");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="form-container">
        <h2>Update Transaction</h2>
        <form onSubmit={handleUpdate}>
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
          <button type="submit">Update Transaction</button>
        </form>
      </div>
    </>
  );
};
