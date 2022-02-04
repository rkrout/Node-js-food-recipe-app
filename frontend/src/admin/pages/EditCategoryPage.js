import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Error from "../components/Error"
import Loader from "../components/Loader"
import { checkImageSize } from "../utils/validators"

export default function EditCategoryPage() {
    const navigate = useNavigate()
    const { categoryId } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [category, setCategory] = useState(null)

    const fetchCategory = async () => {
        try {
            const { data } = await axios.get(`/admin/categories/${categoryId}`)
            setCategory(data)
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
        const { name, image } = event.target

        const payload = new FormData()
        payload.append("name", name.value)
        payload.append("image", image.files[0])

        try {
            await axios.patch(`/admin/categories/${categoryId}`, payload)
            navigate(-1)
        } catch ({ response, request }) {
            if (response && response.status === 409) {
                setError("Category Already Exist")
            } else if (response) {
                setError("Server Error")
            } else if(request){
                setError("Network Error")
            } else{
                setError("Unknown Error")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    if (!category && loading) {
        return <Loader />
    }

    if (!category && loading) {
        return <Error error={error} />
    }

    return <>
        <h3 class="text-xl font-bold text-red-600 text-center mb-8">EDIT CATEGORY</h3>

        {loading && <Loader className="mb-4" />}

        {error && <Error error={error} className="mb-4" />}

        <form onSubmit={onFormSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="font-semibold block mb-2">Name</label>
                <input className="p-2 w-full block border border-gray-300 rounded" name="name" type="text" minLength={2} maxLength={255} defaultValue={category.name} required={true} />
            </div>

            <div className="mb-5">
                <label htmlFor="image" className="font-semibold block mb-2">Image</label>
                <input className="p-2 w-full block border border-gray-300 rounded" onChange={checkImageSize} name="image" type="file" accept="image/jpg, image/png, image/jpeg" />
            </div>

            <input type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" disabled={loading} value="Edit" />
        </form>
    </>
}