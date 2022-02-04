import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Error from "../components/Error"
import Loader from "../components/Loader"
import { axios } from "../utils/network"
import { checkImageSize } from "../utils/validators"

export default function CreateRecipePage() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/admin/categories")
            setCategories(data)
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
        const { name, process, category, image } = event.target

        const payload = new FormData()
        payload.append("name", name.value)
        payload.append("process", process.value)
        payload.append("categoryId", category.value)
        payload.append("image", image.files[0])

        try {
            await axios.post("/admin/recipes", payload)
            navigate(-1)
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

    useEffect(() => {
        fetchCategories()
    }, [])

    if (!categories && loading) {
        return <Loader />
    }

    if (!categories && error) {
        return <Error error={error} />
    }

    return <>
        <h3 className="text-xl font-bold text-red-600 text-center mb-8">ADD NEW RECIPE</h3>

        {loading && <Loader className="mb-5" />}

        {error && <Error error={error} className="mb-5" />}

        <form onSubmit={onFormSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="font-semibold block mb-2">Name</label>
                <input className="p-2 w-full block border border-gray-300 rounded" name="name" type="text" required={true} minLength={2} maxLength={255} />
            </div>

            <div className="mb-5">
                <label htmlFor="image" className="font-semibold block mb-2">Image</label>
                <input className="p-2 w-full block border border-gray-300 rounded" onChange={checkImageSize} type="file" accept="image/jpg image/jpeg image/png" name="image" required={true} />
            </div>

            <div className="mb-5">
                <label htmlFor="name" className="font-semibold block mb-2">Category</label>
                <select className="p-2 w-full block border border-gray-300 rounded" name="category">
                    {categories.map(category => <option value={category.id}>{category.name}</option>)}
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="name" className="font-semibold block mb-2">Process</label>
                <input className="p-2 w-full block border border-gray-300 rounded" required={true} minLength={2} maxLength={5000} name="process" />
            </div>

            <input className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" type="submit" value="Save" />
        </form>
    </>
}