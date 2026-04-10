import './login.css'
import { Link } from 'react-router-dom';
export const Login = () => {
    return (
        <>
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Login to your account</p>
                <form className="login-for">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="extra-text">Forget password</p>
                    <Link to = "/register"><p className="extra-text">Don't have an account?Sign up.</p></Link>
            </div>
        </div>
        </>
    )
}