import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Search, Bell, HelpCircle, Settings, User, Menu, X, Plus, Edit3, Trash2, Download, Printer, Send, NotebookTabs, Store, DollarSign, Building2, ChartColumnIncreasing, Moon, Sun, } from "lucide-react";
// Importe as imagens do logo
import HsoftBlack from "../../assets/Hsoft-black.png";
import HsoftWhite from "../../assets/Hsoft-white.png";
const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
    const navigationItems = [
        {
            icon: NotebookTabs,
            label: "Cadastros",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
            icon: Store,
            label: "Comercial",
            iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
            icon: DollarSign,
            label: "Financeiro",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
        {
            icon: Building2,
            label: "Fiscal",
            iconColor: "text-purple-600 dark:text-purple-400",
        },
        {
            icon: ChartColumnIncreasing,
            label: "Relatórios",
            iconColor: "text-cyan-600 dark:text-cyan-400",
        },
    ];
    const actionButtons = [
        { icon: Plus, label: "Incluir" },
        { icon: Edit3, label: "Alterar" },
        { icon: Trash2, label: "Cancela" },
        { icon: Download, label: "Baixa" },
        { icon: Printer, label: "Imprimir" },
        { icon: Send, label: "Enviar" },
    ];
    return (_jsxs("header", { className: "bg-white dark:bg-slate-900 font-sora transition-colors duration-300", children: [_jsx("div", { className: "border-b border-gray-200 dark:border-slate-700", children: _jsx("div", { className: "max-w-full mx-auto px-4", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs("div", { className: "flex items-center space-x-6 flex-1", children: [_jsxs("div", { className: "logo-container items-center", children: [_jsx("img", { src: HsoftBlack, alt: "Hsoft", className: "block dark:hidden h-14 w-auto" }), _jsx("img", { src: HsoftWhite, alt: "Hsoft", className: "hidden dark:block h-12 w-auto" })] }), _jsx("nav", { className: "hidden lg:flex items-center space-x-1", children: navigationItems.map((item, index) => (_jsxs("button", { className: "btn-ghost", children: [_jsx(item.icon, { size: 27, className: `w-[27px] h-[27px] min-w-[27px] min-h-[27px] ${item.iconColor}`, strokeWidth: 2 }), _jsx("span", { children: item.label })] }, index))) })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "hidden md:flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-2", children: [_jsx(Search, { size: 18, className: "text-gray-500 mr-2" }), _jsx("input", { type: "text", placeholder: "Pesquisar...", className: "bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-32" })] }), _jsxs("div", { className: "flex items-center space-x-1 sm:space-x-3", children: [_jsx("button", { className: "p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors hidden sm:flex", children: _jsx(Bell, { size: 25, className: "text-yellow-400 dark:text-yellow-300" }) }), _jsx("button", { className: "p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors hidden md:flex", children: _jsx(HelpCircle, { size: 25, className: "text-red-500 dark:text-red-400" }) }), _jsx("button", { className: "p-2 hover:bg-gray-50 dark:hover:bg-slate-700/70 rounded-lg transition-colors hidden md:flex", children: _jsx(Settings, { size: 25, className: "text-gray-400 dark:text-gray-500" }) }), _jsx("button", { onClick: toggleTheme, className: "p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: theme === "light" ? (_jsx(Moon, { size: 25, className: "text-gray-600" })) : (_jsx(Sun, { size: 25, className: "text-amber-400" })) }), _jsx("button", { className: "p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(User, { size: 25, className: "text-gray-600 dark:text-gray-300" }) })] })] }), _jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: mobileMenuOpen ? _jsx(X, { size: 25 }) : _jsx(Menu, { size: 25 }) })] }) }) }), _jsxs("div", { className: "bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 relative", children: [_jsx("div", { className: "absolute left-0 right-0 bottom-0 h-0.5 bg-[var(--orange-primary)]" }), _jsxs("div", { className: "max-w-full mx-auto px-4 relative z-10", children: [_jsxs("div", { className: "flex items-center py-3", children: [_jsx("div", { className: "flex items-center flex-1", children: _jsx("div", { className: "header-title", children: _jsx("h1", { className: "text-white text-lg font-bold tracking-wide", children: "CONTAS A RECEBER" }) }) }), _jsx("div", { className: "hidden md:flex items-center space-x-2 ml-4", children: actionButtons.map((btn, index) => (_jsxs("button", { className: "btn-action", children: [_jsx(btn.icon, { size: 16, strokeWidth: 2 }), _jsx("span", { children: btn.label })] }, index))) }), _jsx("button", { onClick: () => setMobileActionsOpen(!mobileActionsOpen), className: "md:hidden p-2 bg-white dark:bg-slate-700 rounded-md text-orange-600 dark:text-orange-400 shadow-sm ml-4", children: _jsx(Menu, { size: 18 }) })] }), mobileActionsOpen && (_jsx("div", { className: "md:hidden pb-3", children: _jsx("div", { className: "bg-white dark:bg-slate-700 rounded-lg shadow-lg p-2 grid grid-cols-2 gap-2", children: actionButtons.map((btn, index) => (_jsxs("button", { className: "flex items-center space-x-2 px-3 py-2 text-orange-600 dark:text-orange-400 rounded-md hover:bg-orange-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium", children: [_jsx(btn.icon, { size: 16, strokeWidth: 2 }), _jsx("span", { children: btn.label })] }, index))) }) }))] })] }), mobileMenuOpen && (_jsx("div", { className: "lg:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700", children: _jsx("nav", { className: "px-4 py-3 space-y-2", children: navigationItems.map((item, index) => (_jsxs("button", { className: "flex items-center space-x-3 w-full px-4 py-3 bg-white dark:bg-slate-800 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all border border-gray-200 dark:border-slate-600", children: [_jsx(item.icon, { size: 25, className: item.iconColor, strokeWidth: 2 }), _jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", children: item.label })] }, index))) }) }))] }));
};
export default Header;
