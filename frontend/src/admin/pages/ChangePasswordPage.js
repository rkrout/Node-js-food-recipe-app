import { useRef, useState } from "react"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { axios } from "../utils/network"
import { useNavigate } from "react-router-dom"

export default function ChangePasswordPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const newPassword = useRef()
    const confirmPassword = useRef()

    const onFormSubmit = async (event) => {
        setError(null)
        setLoading(true)

        event.preventDefault()
        const { oldPassword, newPassword } = event.target
        const payload = {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value
        }

        try {
            await axios.patch("/account/change_password", payload)
            navigate("/admin/dashboard")
        } catch ({ response, request }) {
            if (response && response.status === 400) {
                setError("Old Password Mismatch")
            } else if (response) {
                setError("Server Error")
            } else if (request) {
                setError("Network Error")
            } else {
                setError("Unknown Error")
            }
        } finally {
            setLoading(false)
        }
    }

    const onPasswordChange = () => {
        if (newPassword.current.value !== confirmPassword.current.value) {
            confirmPassword.current.setCustomValidity("Password Mismatch")
        } else {
            confirmPassword.current.setCustomValidity("")
        }
    }

    return <>
        <h3 class="text-xl font-bold text-red-600 text-center mb-8">CHANGE PASSWORD</h3>

        {loading && <Loader className="mb-5" />}

        {error && <Error error={error} className="mb-5" />}

        <form onSubmit={onFormSubmit}>
            <div className="mb-5">
                <label htmlFor="oldPassword" className="font-semibold block mb-2">Old Password</label>
                <input className="p-2 w-full block border border-gray-300 rounded" name="oldPassword" type="password" minLength={8} maxLength={20} required={true} />
            </div>

            <div className="mb-5">
                <label htmlFor="oldPassword" className="font-semibold block mb-2">New Password</label>
                <input className="p-2 w-full block border border-gray-300 rounded" ref={newPassword} name="newPassword" onChange={onPasswordChange} type="password" minLength={8} maxLength={20} required={true} />
            </div>

            <div className="mb-5">
                <label htmlFor="oldPassword" className="font-semibold block mb-2">Confirm Password</label>
                <input className="p-2 w-full block border border-gray-300 rounded" ref={confirmPassword} name="confirmPassword" onChange={onPasswordChange} type="password" minLength={8} maxLength={20} required={true} />
            </div>

            <input disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" type="submit" value="Change" />
        </form>
    </>
}