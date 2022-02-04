import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { useNavigate } from "react-router-dom"

export default function EditAccountPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [account, setAccount] = useState(null)

    const fetchAccount = async () => {
        try {
            const { data } = await axios.get("/account")
            setAccount(data)
        } catch ({ response, request }) {
            if (response) {
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

    const onFormSubmit = async (event) => {
        setLoading(true)
        setError(null)

        event.preventDefault()
        const { name, email } = event.target

        const payload = {
            name: name.value,
            email: email.value
        }

        try {
            await axios.patch("/account", payload)
            navigate("/admin/dashboard")
        } catch ({ response, request }) {
            if(response && response.status === 409){
                setError("Email already taken")
            }else if (response) {
                setError("Server Error")
            } else if (request) {
                setError("Network Error")
            } else {
                setError("Unknown Error")
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAccount()
    }, [])

    if(!account && loading){
        return <Loader/>
    }

    if(!account && error){
        return <Error error={error}/>
    }

    return <>
        <h3 className="text-xl font-bold text-red-600 text-center mb-8">EDIT ACCOUNT</h3>

        {loading && <Loader />}

        {error && <Error error={error} />}

        <form onSubmit={onFormSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="font-semibold block mb-2">Name</label>
                <input className="p-2 w-full block border border-gray-300 rounded" defaultValue={account.name} name="name" type="text" required={true} minLength={2} maxLength={255} />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="font-semibold block mb-2">Email</label>
                <input className="p-2 w-full block border border-gray-300 rounded" defaultValue={account.email} name="email" type="email" required={true} maxLength={255} />
            </div>

            <input className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" type="submit" value="Edit" />
        </form>
    </>
}