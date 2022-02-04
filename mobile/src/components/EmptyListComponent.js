import PageLoader from "./PageLoader"
import PageError from "./PageError"

export default function EmptyListComponent({ error, loading }) {
    if (loading) {
        return <PageLoader />
    } else {
        return <PageError error={error} />
    }
}