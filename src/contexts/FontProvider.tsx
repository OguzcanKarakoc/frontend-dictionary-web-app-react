import React, { createContext, useContext, useEffect, useState } from "react";

interface FontContextType {
    font: string;
    changeFont: (newFont: string) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
    const storedFont = localStorage.getItem("selectedFont");
    const [font, setFont] = useState<string>(storedFont || "defaultFont");

    const changeFont = (newFont: string) => {
        setFont(newFont);
        localStorage.setItem("selectedFont", newFont);
    };

    useEffect(() => {
        // Add cleanup logic if needed
    }, [font]);

    return (
        <FontContext.Provider value={{ font, changeFont }}>
            {children}
        </FontContext.Provider>
    );
};

export const useFont = (): FontContextType => {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error("useFont must be used within a FontProvider");
    }
    return context;
};
