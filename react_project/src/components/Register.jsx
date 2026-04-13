import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Register = () => {
  const [visible,setVisible] = useState({mode: 'visibility', type: 'password'})
  const handleVisible = () => {
    visible.mode === 'visibility'?setVisible({mode: 'visibility_off',type : 'text'}):setVisible({mode: 'visibility',type:'password'})
  }
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
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 201) {
        toast.success("Registration successful");
        setTimeout(() => {navigate("/"); },1000)
        
      } else {
        console.log(data)
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
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Sign up to get started</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="name"
                name="name"
                placeholder="Enter name"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Set password"
                onChange={handleChange}
              />
              <span className="material-icons" onClick={handleVisible}>{visible.mode}</span>
              </span>
            </div>
            <button className="login-btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
