import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import {
  Search,
  Bell,
  HelpCircle,
  Settings,
  User,
  Menu,
  X,
  Plus,
  Edit3,
  Trash2,
  Download,
  Printer,
  Send,
  NotebookTabs,
  Store,
  DollarSign,
  Building2,
  ChartColumnIncreasing,
  Moon,
  Sun,
} from "lucide-react";

// Importe as imagens do logo
import HsoftBlack from "../../assets/Hsoft-black.png";
import HsoftWhite from "../../assets/Hsoft-white.png";

const Header: React.FC = () => {
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

  return (
    <header className="bg-white dark:bg-slate-900 font-sora transition-colors duration-300">
      {/* Top Bar - Logo + Navigation + Icons */}
      <div className="border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Section: Logo + Navigation */}
            <div className="flex items-center space-x-6 flex-1">
              {/* Logo - AGORA COM IMAGENS */}
              <div className="logo-container items-center">
                {/* Imagem para tema claro */}
                <img
                  src={HsoftBlack}
                  alt="Hsoft"
                  className="block dark:hidden h-14 w-auto"
                />

                {/* Imagem para tema escuro */}
                <img
                  src={HsoftWhite}
                  alt="Hsoft"
                  className="hidden dark:block h-12 w-auto"
                />
              </div>
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item, index) => (
                  <button key={index} className="btn-ghost">
                    <item.icon
                      size={27}
                      className={`w-[27px] h-[27px] min-w-[27px] min-h-[27px] ${item.iconColor}`}
                      strokeWidth={2}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Section: Search + Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-2">
                <Search size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-32"
                />
              </div>

              {/* Icons */}
              {/* Icons - Responsivo */}
              <div className="flex items-center space-x-1 sm:space-x-3">
                {/* Ícones que ficam HIDDEN no mobile */}
                <button className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors hidden sm:flex">
                  <Bell
                    size={25}
                    className="text-yellow-400 dark:text-yellow-300"
                  />
                </button>

                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors hidden md:flex">
                  <HelpCircle
                    size={25}
                    className="text-red-500 dark:text-red-400"
                  />
                </button>

                <button className="p-2 hover:bg-gray-50 dark:hover:bg-slate-700/70 rounded-lg transition-colors hidden md:flex">
                  <Settings
                    size={25}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </button>

                {/* Theme Toggle - SEMPRE VISÍVEL */}
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {theme === "light" ? (
                    <Moon size={25} className="text-gray-600" />
                  ) : (
                    <Sun size={25} className="text-amber-400" />
                  )}
                </button>

                {/* User - SEMPRE VISÍVEL */}
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <User
                    size={25}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </div>

      {/* CONTAS A RECEBER Section with Orange Line */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 relative">
        {/* Linha laranja em FULL WIDTH - FORA DO CONTAINER */}
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-[var(--orange-primary)]"></div>
        <div className="max-w-full mx-auto px-4 relative z-10">
          <div className="flex items-center py-3">
            {/* Title */}
            <div className="flex items-center flex-1">
              <div className="header-title">
                <h1 className="text-white text-lg font-bold tracking-wide">
                  CONTAS A RECEBER
                </h1>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-2 ml-4">
              {actionButtons.map((btn, index) => (
                <button key={index} className="btn-action">
                  <btn.icon size={16} strokeWidth={2} />
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Actions Menu */}
            <button
              onClick={() => setMobileActionsOpen(!mobileActionsOpen)}
              className="md:hidden p-2 bg-white dark:bg-slate-700 rounded-md text-orange-600 dark:text-orange-400 shadow-sm ml-4"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Mobile Actions Dropdown */}
          {mobileActionsOpen && (
            <div className="md:hidden pb-3">
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-2 grid grid-cols-2 gap-2">
                {actionButtons.map((btn, index) => (
                  <button
                    key={index}
                    className="flex items-center space-x-2 px-3 py-2 text-orange-600 dark:text-orange-400 rounded-md hover:bg-orange-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                  >
                    <btn.icon size={16} strokeWidth={2} />
                    <span>{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
          <nav className="px-4 py-3 space-y-2">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center space-x-3 w-full px-4 py-3 bg-white dark:bg-slate-800 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all border border-gray-200 dark:border-slate-600"
              >
                <item.icon
                  size={25}
                  className={item.iconColor}
                  strokeWidth={2}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
