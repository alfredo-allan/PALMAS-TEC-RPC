import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import AccountsReceivable from "./pages/AccountsReceivable";
export default function App() {
    return (_jsx(ThemeProvider, { children: _jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(AccountsReceivable, {}) }) }) }) }));
}
