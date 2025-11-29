import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
export const ThemeProvider = ({ children, }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme)
            return savedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
    const value = {
        theme,
        toggleTheme,
    };
    return (_jsx(ThemeContext.Provider, { value: value, children: children }));
};
