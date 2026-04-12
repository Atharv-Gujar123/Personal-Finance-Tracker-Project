import './Navbar.css';
import { Link } from 'react-router-dom';
const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
}
export const Navbar = () => {
    return(
        <div className="nav">
        <ul className='Navbar'>
            <li><Link to = "/dashboard" className='nav-link'>Dashboard</Link></li>
            <li><Link to = "/add" className = 'nav-link'>Add Transactions</Link></li>
            <li><Link to = "/Transactions" className='nav-link'>All Transactions</Link></li>
            <li onClick={handleClick}><Link to = "/" className='nav-link'>Logout</Link></li>
        </ul>
        </div>
    )
}