import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [visible, setVisible] = useState({
    mode: "visibility",
    type: "password",
  });
  const handleVisible = () => {
    visible.mode === "visibility"
      ? setVisible({ mode: "visibility_off", type: "text" })
      : setVisible({ mode: "visibility", type: "password" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/forgot", {
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
    toast.success("Password Changed Successfully!!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
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
            <div className="form-group">
              <label>New Password</label>
              <span className="password">
                <input
                  type={visible.type}
                  name="password"
                  placeholder="Enter new password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <span className="material-icons" onClick={handleVisible}>
                  {visible.mode}
                </span>
              </span>
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <span className="password">
                <input
                  type={visible.type}
                  name="confirm_password"
                  placeholder="Confirm new password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
                <span className="material-icons" onClick={handleVisible}>
                  {visible.mode}
                </span>
              </span>
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
