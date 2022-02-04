export default function SearchNavbar({ onQueryChange, onSearchClick }) {
    return <>
        <nav className="my-8 px-8 mx-4 lg:mx-32 py-8 bg-white rounded-md">
            <div className="text-xl font-bold mb-2 block">Search Here</div>
            <div className="flex w-full">
                <input onChange={onQueryChange} type="search" className="p-2 w-full border border-r-0 border-gray-400 outline-none rounded-l-md" />
                <button onClick={onSearchClick} className="px-4 bg-red-600 hover:bg-red-700 text-white rounded-r-md">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </nav>
    </>
}