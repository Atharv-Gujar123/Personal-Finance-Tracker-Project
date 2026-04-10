import './login.css'
export const Register = () => {
  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Sign up to get started</p>
          <form className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Set password" />
            </div>
            <button className="login-btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
