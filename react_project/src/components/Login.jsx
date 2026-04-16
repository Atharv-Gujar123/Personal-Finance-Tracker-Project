import axios from "axios";
import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Login = () => {
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
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      const data = res.data;
      // if (!res.ok) {
      //   toast.error(data.message || "Login failed");
      //   return;
      // }
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        toast.success("Login successful");
        setTimeout(() => {navigate("/dashboard");
        window.location.reload();},1000)
        
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };
  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Login to your account</p>
          <form className="login-for" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <span className="password">
                <input
                  type={visible.type}
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
                <span className="material-icons" onClick={handleVisible}>
                  {visible.mode}
                </span>
              </span>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <Link to="/forgot">
          <p className="extra-text">Forgot password</p>
          </Link>
          <Link to="/register">
            <p className="extra-text">Don't have an account?Sign up.</p>
          </Link>
        </div>
      </div>
    </>
  );
};
