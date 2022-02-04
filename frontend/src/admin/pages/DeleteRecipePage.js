import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { axios } from "../utils/network"

export default function DeleteRecipePage() {
    const { recipeId } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onDeleteClick = async () => {
        setError(null)
        setLoading(true)

        try {
            await axios.delete(`/admin/recipes/${recipeId}`)
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
        {loading && <Loader />}

        {error && <Error error={error} />}

        <div className="mb-4 text-xl font-bold">Are you sure you want to delete ?</div>
        <button onClick={onNoClick} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded mr-2">No</button>
        <button onClick={onDeleteClick} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Yes</button>
    </>
}