import { Navigate } from "react-router-dom"

export default function Protected({ element }) {
    if (localStorage.getItem("accessToken")) {
        return element
    } else {
        return <Navigate to="/admin/login" />
    }
}