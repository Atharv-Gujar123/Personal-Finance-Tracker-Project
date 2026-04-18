import { toast } from 'react-toastify';
import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
export const Reset = () => {
  const navigate = useNavigate();
     const [searchParams] = useSearchParams();
      const token = searchParams.get("token")
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
      const [visible, setVisible] = useState({
        mode: "visibility",
        type: "password",
      });
      const handleVisible = () => {
        visible.mode === "visibility"
          ? setVisible({ mode: "visibility_off", type: "text" })
          : setVisible({ mode: "visibility", type: "password" });
      };
      const handleSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    try{
      const res = await axios.post("http://localhost:5000/reset",{
        password,token
      })
      const data = res.data;
      toast.success("password changed successfully!")
      navigate("/");
    } catch(err){
      toast.error(err.response?.data?.message || "Something went wrong!")
    }
      }
    return(
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Reset Password</h2>
                <p className="login-subtitle">Enter new password</p>
                <form onSubmit={handleSubmit} className="login-for">
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
            </div>
        </div>
    )
}