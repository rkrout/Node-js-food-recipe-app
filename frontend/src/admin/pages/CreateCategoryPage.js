import { useState } from "react"
import axios from "axios"
import Error from "../components/Error"
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom"
import { checkImageSize } from "../utils/validators"

export default function CreateCategoryPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onFormSubmit = async (event) => {
        setLoading(true)
        setError(null)

        event.preventDefault()
        const { name, image } = event.target
        const payload = new FormData()
        payload.append("name", name.value)
        payload.append("image", image.files[0])

        try {
            await axios.post("/admin/categories", payload)
            navigate(-1)
        } catch ({ response, request }) {
            if (response && response.status === 409) {
                setError("Category Already Exist")
            } else if (response) {
                setError("Server Error")
            } else if (request) {
                setError("Network Error")
            } else {
                setError("Unknown error")
            }
        } finally {
            setLoading(false)
        }
    }

    return <>
        <h3 className="text-xl font-bold text-red-600 text-center mb-8">ADD NEW CATEGORY</h3>

        {loading && <Loader />}

        {error && <Error error={error} />}

        <form onSubmit={onFormSubmit}>
            <div class="mb-5">
                <label className="font-semibold block mb-2" htmlFor="name">Name</label>
                <input className="p-2 w-full block border border-gray-300 rounded" name="name" minLength={2} maxLength={255} required={true} />
            </div>

            <div class="mb-5">
                <label htmlFor="image" className="font-semibold block mb-2">Image</label>
                <input className="p-2 w-full block border border-gray-300 rounded" name="image" onChange={checkImageSize} type="file" accept="image/jpg image/jpeg image/png" required={true} />
            </div>

            <input className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer" type="submit" disabled={loading} />
        </form>
    </>
}