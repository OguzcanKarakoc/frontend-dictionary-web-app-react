import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { useDarkMode } from "../hooks/useDarkmode";
import Moon from "../assets/images/icon-moon.svg?react";

export default function DarkmodeToggle() {
    const [isDark, setIsDark] = useDarkMode();

    return (
        <Switch.Group as="div" className="flex items-center">
            <Switch
                checked={isDark}
                onChange={setIsDark}
                className={clsx(
                    isDark ? "bg-medium-purple" : "bg-sonic-silver",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-medium-purple focus:ring-offset-2"
                )}
            >
                <span
                    aria-hidden="true"
                    className={clsx(
                        isDark ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                />
            </Switch>
            <Switch.Label as="span" className="ml-3 text-sm">
                <Moon className="h-8 stroke-sonic-silver dark:stroke-medium-purple" />
            </Switch.Label>
        </Switch.Group>
    );
}
