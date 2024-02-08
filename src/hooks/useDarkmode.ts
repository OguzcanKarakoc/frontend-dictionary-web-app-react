import { useEffect, useCallback } from "react";
import { useSafeLocalStorage } from "./useSafeLocalStorage";
import { usePrefersDarkMode } from "./usePrefersDarkMode";

export function useDarkMode(): [boolean, (enabled: boolean) => void] {
    const [isEnabled, setIsEnabled] = useSafeLocalStorage(
        "dark-mode",
        undefined
    );
    const prefersDarkMode = usePrefersDarkMode();

    const enabled = isEnabled === undefined ? prefersDarkMode : isEnabled;

    const applyDarkModeClass = useCallback(async () => {
        if (typeof window === "undefined") return;

        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        await new Promise((resolve) => setTimeout(resolve, 0)); // Allow time for DOM to update
        root.classList.add(enabled ? "dark" : "light");
    }, [enabled]);

    useEffect(() => {
        applyDarkModeClass();
    }, [applyDarkModeClass]);

    return [enabled, setIsEnabled];
}
