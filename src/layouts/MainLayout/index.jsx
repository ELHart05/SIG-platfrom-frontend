import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import MenuDrawer from "../../components/MenuDrawer";

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useState } from "react";

function MainLayout() {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="bg-greener text-white px-10 py-4 flex w-full items-center justify-between">
                <ul className="flex items-center w-full">
                    <li>
                        <Link to="/report" className="text-3xl font-bold relative z-[100000000000]">SIG</Link>
                    </li>
                </ul>
                <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer transition-all">
                    {
                        !open
                        ?
                            <MenuIcon fontSize="large" />
                        :
                            <MenuOpenIcon fontSize="large" />
                    }
                </div>
            </nav>
            <MenuDrawer open={open} setOpen={setOpen} />
            <Outlet />
            <footer className="bg-greener text-white p-4">
                <p className="text-center text-xl">© {new Date().getFullYear()} HR Technology. Tous droits réservés.</p>
            </footer>
        </div>
    );
}

export default MainLayout;