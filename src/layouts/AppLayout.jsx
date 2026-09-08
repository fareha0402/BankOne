import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";

function AppLayout(){
    return (
        <div className="app-layout">
            <Header/>
            <Sidebar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default AppLayout;