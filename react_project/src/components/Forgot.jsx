import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/forgot", {
        email,
      });
      const data = res.data
      window.location.href = data.resetLink;
    } catch (err) {
      console.log(err);
      toast.error("User not found!!");
    }
  };
  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Forgot Password?</h2>
          <p className="login-subtitle">Create new password</p>
          <form className="login-for" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <button className="login-btn" type="submit">
              Enter
            </button>
          </form>
          <Link to="/"><p className="extra-text">Back to Login</p></Link>
        </div>
      </div>
    </>
  );
};
