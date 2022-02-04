import { useNavigate } from "react-router-dom"

export default function LogoutPage() {
    const navigate = useNavigate()

    const onYesClick = async () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/admin/login")
    }

    return <>
        <div className="mb-4 text-xl font-bold">Are you sure you want to logout ?</div>
        <button onClick={onYesClick} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Yes</button>
    </>
}