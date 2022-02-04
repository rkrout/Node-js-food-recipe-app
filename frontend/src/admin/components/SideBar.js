import { NavLink } from "react-router-dom"

export default function SideBar() {
    const className = ({ isActive }) => {
        return isActive ? "p-4 border block bg-red-600 text-white" : "p-4 border block"
    }

    return <>
        <NavLink to="/admin/dashboard" className={className}>Dashboard</NavLink>
        <NavLink to="/admin/recipes" className={className}>Recipe</NavLink>
        <NavLink to="/admin/categories" className={className}>Category</NavLink>
        <NavLink to="/admin/account/change-password" className={className}>Change Password</NavLink>
        <NavLink to="/admin/account/edit" className={className}>Edit Account</NavLink>
        <NavLink to="/admin/logout" className={className}>Logout</NavLink>
    </>
}