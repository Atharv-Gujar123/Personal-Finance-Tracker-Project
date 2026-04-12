import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();

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
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name",data.name)
        alert("Login successful");
        navigate("/dashboard");
        window.location.reload()
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
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
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <p className="extra-text">Forget password</p>
          <Link to="/register">
            <p className="extra-text">Don't have an account?Sign up.</p>
          </Link>
        </div>
      </div>
    </>
  );
};
