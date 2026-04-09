import './Navbar.css';
import { Link } from 'react-router-dom';
export const Navbar = () => {
    return(
        <div className="nav">
        <ul className='Navbar'>
            <li><Link to = "/dashboard" className='nav-link'>Dashboard</Link></li>
            <li><Link to = "/add" className = 'nav-link'>Add Transactions</Link></li>
            <li><Link to = "/Transactions" className='nav-link'>All Transactions</Link></li>
        </ul>
        </div>
    )
}