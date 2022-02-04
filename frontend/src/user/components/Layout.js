import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return <>
        <nav className="px-4 lg:px-32 py-4 flex justify-between items-center bg-white">
            <Link to="/" className="text-3xl font-bold">Recipe</Link>
            <Link to="/recipe/search" className="p-4 bg-gray-200 rounded-md fas fa-search"></Link>
        </nav>
        <Outlet />
    </>
}