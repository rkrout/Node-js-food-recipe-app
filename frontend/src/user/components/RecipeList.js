import Recipe from "./Recipe"

export default function RecipeList({ title, recipes }) {
    return <>
        <div className="py-8 px-4 lg:px-32">
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map(recipe => <Recipe recipe={recipe} />)}
            </div>
        </div>
    </>
}