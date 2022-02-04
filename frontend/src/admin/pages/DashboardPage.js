import { axios } from "../utils/network"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import Error from "../components/Error"

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const fetchStatisticalData = async () => {
        try {
            const { data } = await axios.get("/admin/statistic")
            setData(data)
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
        fetchStatisticalData()
    }, [])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error error={error} />
    }

    return <>
        <div class="flex justify-around">
            <div class="w-72 rounded-md bg-red-600 text-center relative overflow-hidden h-36">
                <div class="text-2xl text-white font-bold mt-8">Total Recipes</div>
                <div class="text-4xl text-white font-bold bg-red-700 absolute left-0 right-0 bottom-0 py-2">{data.totalRecipes}</div>
            </div>
            <div class="w-72 rounded-md bg-yellow-500 text-center relative overflow-hidden h-36">
                <div class="text-2xl text-white font-bold mt-8">Total Categories</div>
                <div class="text-4xl text-white font-bold bg-yellow-600 absolute left-0 right-0 bottom-0 py-2">{data.totalCategories}</div>
            </div>
        </div>
    </>
}