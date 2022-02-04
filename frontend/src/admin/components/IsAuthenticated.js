import { Navigate } from "react-router-dom";

export default function IsAuthenticated({ element }) {
    if (localStorage.getItem("accessToken")) {
        return <Navigate to="/admin/dashboard" state={{ replace: true }} />
    } else {
        return element
    }
}