import { NavLink } from "react-router-dom";
import './SideBar.css'

function Sidebar(){
    return(
        <aside className="sidebar">
             <div className="sidebar-logo">
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className="sidebar-link">
                    Dashboard
                </NavLink>
                <NavLink to="/accounts" className="sidebar-link">
                    Accounts
                </NavLink>
                <NavLink to="/transactions" className="sidebar-link">
                    Transactions
                </NavLink>
                <NavLink to="/payments" className="sidebar-link">
                    Payments
                </NavLink>
                <NavLink to="/cards" className="sidebar-link">
                    Cards
                </NavLink>
                <NavLink to="/beneficiaries" className="sidebar-link">
                    Beneficiaries
                </NavLink>
            </nav>
            <div className="sidebar-footer">
                <button onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }}>
                    Logout
                </button>
            </div>
        </aside>
      )
}
export default Sidebar;