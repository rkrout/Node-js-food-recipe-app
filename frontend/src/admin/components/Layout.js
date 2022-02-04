import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

export default function Layout() {
    return <div className="my-8 mx-2 lg:mx-32 grid grid-cols-5 gap-4">
        <div className="col-span-4 lg:col-span-1">
            <div className="bg-white rounded-md">
                <SideBar />
            </div>
        </div>

        <div className="col-span-4 lg:col-span-4">
            <div className="bg-white rounded-md p-8">
                <Outlet />
            </div>
        </div>
    </div>
}