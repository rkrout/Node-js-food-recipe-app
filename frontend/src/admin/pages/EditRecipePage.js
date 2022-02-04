import Loader from "../components/Loader"
import Error from "../components/Error"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axios } from "../utils/network"
import { checkImageSize } from "../utils/validators"

export default function EditRecipePage() {
    const navigate = useNavigate()
    const { recipeId } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [recipe, setRecipe] = useState(null)
    const [categories, setCategories] = useState(null)

    const fetchInitialData = async () => {
        try {
            const recipe = await axios.get(`/admin/recipes/${recipeId}`)
            const categories = await axios.get("/admin/categories")
            setCategories(categories.data)
            setRecipe(recipe.data)
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
        const { name, process, image, category } = event.target

        const payload = new FormData()
        payload.append("name", name.value)
        payload.append("process", process.value)
        payload.append("categoryId", category.value)
        payload.append("image", image.files[0])

        try {
            await axios.patch(`/admin/recipes/${recipeId}`, payload)
            navigate(-1)
        } catch ({ response, request }) {
            if (response) {
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
        fetchInitialData()
    }, [])

    if (!recipe && loading) {
        return <Loader />
    }

    if (!recipe && error) {
        return <Error error={error} />
    }

    return <>
        <h3 className="text-xl font-bold text-red-600 text-center mb-8">EDIT RECIPE</h3>

        {loading && <Loader className="mb-5" />}

        {error && <Error error={error} className="mb-5" />}

        <form onSubmit={onFormSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="font-semibold block mb-2">Name</label>
                <input className="p-2 w-full block border border-gray-300 rounded" defaultValue={recipe.name} name="name" type="text" required={true} minLength={2} maxLength={255} />
            </div>

            <div className="mb-5">
                <label htmlFor="image" className="font-semibold block mb-2">Image</label>
                <input className="p-2 w-full block border border-gray-300 rounded" onChange={checkImageSize} name="image" type="file" accept="image/jpg image/jpeg image/png" />
            </div>

            <div className="mb-5">
                <label htmlFor="category" className="font-semibold block mb-2">Category</label>
                <select className="p-2 w-full block border border-gray-300 rounded" name="category">
                    {categories.map(category => <option value={category.id} selected={category.id == recipe.categoryId}>{category.name}</option>)}
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="process" className="font-semibold block mb-2">Process</label>
                <input className="p-2 w-full block border border-gray-300 rounded" name="process" defaultValue={recipe.process} type="text" minLength={10} maxLength={5000} required={true} />
            </div>

            <input className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" type="submit" value="Update" />
        </form>
    </>
}