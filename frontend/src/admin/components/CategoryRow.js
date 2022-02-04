import { Link } from "react-router-dom"

export default function CategoryRow({ category }) {
    return <>
        <tr>
            <td className="border p-4">{category.name}</td>
            <td className="border p-4">
                <img src={`/${category.image}`} className="rounded h-16 w-24 object-cover mx-auto" />
            </td>
            <td className="border p-4">{category.createdAt}</td>
            <td className="border p-4">
                <Link to={`edit/${category.id}`} className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 mr-2">
                    <i className="fas fa-edit"></i>
                </Link>
                <Link to={`delete/${category.id}`} className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">
                    <i className="fas fa-trash"></i>
                </Link>
            </td>
        </tr>
    </>
}