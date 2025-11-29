export type Theme = "light" | "dark";
export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
export declare const ThemeContext: import("react").Context<ThemeContextType>;
