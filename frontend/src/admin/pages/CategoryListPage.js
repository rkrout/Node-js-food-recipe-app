import { axios } from "../utils/network";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import CategoryRow from "../components/CategoryRow"

export default function CategoryListPage() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get("/admin/categories")
            if (data.length) {
                setCategories(data)
            } else {
                setError("No Category Found")
            }
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

    if (loading) {
        return <Loader />
    }

    return <>
        <Link to="/admin/categories/create" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-4 inline-block">Add New</Link>

        {error && <Error error={error} className="mb-4" />}

        <table className="w-full rounded-md text-center">
            <thead>
                <tr>
                    <th className="border p-4">Name</th>
                    <th className="border p-4">Image</th>
                    <th className="border p-4">Created</th>
                    <th className="border p-4">Action</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(category => <CategoryRow category={category} />)}
            </tbody>
        </table>
    </>
}