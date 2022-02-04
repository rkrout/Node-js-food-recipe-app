import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Error from "../components/Error"
import Loader from "../components/Loader"

export default function LoginPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onFormSubmit = async (event) => {
        setLoading(true)
        setError(null)

        event.preventDefault()
        const { email, password } = event.target
        const payload = {
            email: email.value,
            password: password.value
        }

        try {
            const { data } = await axios.post("/account/login", payload)
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            localStorage.setItem("admin", true)
            navigate("/admin/dashboard")
        } catch ({ response, request }) {
            if (response && response.status === 400) {
                setError("Invalid Email OR Password")
            } else if (response) {
                setError("Server Error")
            } else if (request) {
                setError("Network Error")
            } else {
                setError("Unknown Error")
            }
            setLoading(false)
        }
    }

    return <>
        <div className="lg:w-2/4 mx-auto my-8 p-8 bg-white rounded-md">
            <h3 class="text-xl font-bold text-red-600 text-center mb-8">LOGIN</h3>

            {loading && <Loader className="mb-4" />}

            {error && <Error error={error} className="mb-4" />}

            <form onSubmit={onFormSubmit}>
                <div class="mb-5">
                    <label htmlFor="email" className="font-semibold block mb-2">Email</label>
                    <input className="p-2 w-full block border border-gray-300 rounded" name="email" type="email" required={true} />
                </div>

                <div class="mb-5">
                    <label htmlFor="name" className="font-semibold block mb-2">Password</label>
                    <input className="p-2 w-full block border border-gray-300 rounded" name="password" type="password" required={true} minLength={8} maxLength={255} />
                </div>

                <input className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" type="submit" value="Login" />
            </form>
        </div>
    </>
}