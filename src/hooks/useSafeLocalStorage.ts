import { useState } from "react";

export function useSafeLocalStorage(
    key: string,
    initialValue: boolean | undefined
): [boolean, (value: boolean) => void] {
    const [valueProxy, setValueProxy] = useState<boolean>(() => {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: boolean) => {
        try {
            window.localStorage.setItem(key, String(value));
            setValueProxy(value);
        } catch {
            setValueProxy(value);
        }
    };

    return [valueProxy, setValue];
}
