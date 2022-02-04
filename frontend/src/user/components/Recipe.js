import { Link } from "react-router-dom";

export default function Recipe({ recipe }) {
    return <>
        <Link to={`/recipe/details/${recipe.id}`} className="rounded-md overflow-hidden cursor-pointer">
            <img src={`/${recipe.image}`} />
            <div className="bg-white p-4">
                <div className="font-bold">{recipe.name}</div>
                <div className="mt-5">
                    <i className="far fa-clock mr-2"></i> {recipe.createdAt}
                </div>
            </div>
        </Link>
    </>
}