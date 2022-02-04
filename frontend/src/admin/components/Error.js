export default function Error({ error, className }) {
    return <>
        <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ${className}`}>
            <div className="font-bold text-center">{error}</div>
        </div>
    </>
}