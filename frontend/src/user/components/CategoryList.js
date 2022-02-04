import Category from "./Category";

export default function CategoryList({ categories }) {
    return <>
        <div className="py-8 px-4 lg:px-32">
            <h2 className="text-2xl font-bold mb-3">Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(category => <Category category={category} />)}
            </div>
        </div>
    </>
}