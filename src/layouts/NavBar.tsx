import DarkmodeToggle from "../components/DarkmodeToggle";
import { Listbox } from "@headlessui/react";
import ReactLogo from "../assets/images/logo.svg?react";
import ChevronDownIcon from "../assets/images/icon-arrow-down.svg?react";
import clsx from "clsx";
import { useFont } from "../contexts/FontProvider";
import { Fragment } from "react";

const fonts = ["sans-saris", "serif", "mono"];

interface NavBarProps {
    className?: string;
}

function NavBar({ className }: NavBarProps) {
    const { font, changeFont } = useFont();

    return (
        <nav className={clsx("flex justify-between", className)}>
            <div>
                <ReactLogo className="h-8" />
            </div>
            <div className="flex gap-4">
                <Listbox value={font} onChange={changeFont}>
                    <div className="relative">
                        <Listbox.Button className="flex min-w-32 items-center justify-end gap-4">
                            <span className="text-right text-base font-bold dark:text-white">
                                {font}
                            </span>
                            <span>
                                <ChevronDownIcon className="h-8" />
                            </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-nav ring-1 ring-black ring-opacity-5 dark:shadow-medium-purple focus:outline-none dark:bg-eerie-black">
                            {fonts.map((font) => (
                                <Listbox.Option
                                    key={font}
                                    value={font}
                                    as={Fragment}
                                >
                                    {({ active }) => (
                                        <li
                                            className={clsx(
                                                "relative cursor-default select-none px-3 py-2 hover:cursor-pointer dark:text-white",
                                                `${
                                                    active
                                                        ? "!text-medium-purple"
                                                        : "text-black"
                                                }`,
                                                `font-${font}`,
                                            )}
                                        >
                                            {font}
                                        </li>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
                <div className="h-8 w-[1px] bg-mercury"></div>
                <DarkmodeToggle />
            </div>
        </nav>
    );
}

export default NavBar;
