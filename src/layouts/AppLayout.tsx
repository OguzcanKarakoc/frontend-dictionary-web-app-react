import clsx from "clsx";
import { useFont } from "../contexts/FontProvider";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function AppLayout() {
    const { font } = useFont();

    return (
        <div className={clsx("dark:bg-vampire-black min-h-screen", `font-${font}`)}>
            <div className="mx-auto flex w-full max-w-screen-md flex-col gap-6 p-6 md:gap-10 md:px-9 md:pt-14">
                <NavBar />
                <main className="flex flex-col gap-7 lg:gap-14 md:gap-12">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
