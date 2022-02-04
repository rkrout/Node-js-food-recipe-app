import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import Error from "../components/Error"

export default function DeleteCategoryPage() {
    const navigate = useNavigate()
    const { categoryId } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onDeleteClick = async () => {
        setLoading(true)
        setError(null)

        try {
            await axios.delete(`/admin/categories/${categoryId}`)
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

    const onNoClick = () => {
        navigate(-1)
    }

    return <>
        {error && <Error error={error} />}

        <div className="mb-4 text-xl font-bold">Are you sure you want to delete ?</div>
        <button onClick={onNoClick} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded mr-2">No</button>
        <button onClick={onDeleteClick} disabled={loading} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded" >Yes</button>
    </>
}