import { Link } from "react-router-dom";

export default function Category({ category }) {
    return <>
        <Link to={`/recipe/list/${category.id}`} className="rounded-md overflow-hidden cursor-pointer">
            <div className="relative">
                <img src={category.image} className="block" />
                <h4 className="absolute inset-x-0 bottom-0 py-4 bg-black/30 text-white text-center font-bold text-xl">{category.name}</h4>
            </div>
        </Link>
    </>
}