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
  LucideIcon,
} from "lucide-react";

// Importe as imagens do logo
import HsoftBlack from "../../assets/Hsoft-black.png";
import HsoftWhite from "../../assets/Hsoft-white.png";

// Interfaces para tipagem
interface NavigationItem {
  icon: LucideIcon;
  label: string;
  iconColor: string;
}

interface ActionButton {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

// Props do componente Header
interface HeaderProps {
  onIncluirClick?: () => void; // Prop para receber a função do modal
  onAlterarClick?: () => void;
  onCancelaClick?: () => void;
  onBaixaClick?: () => void;
  onImprimirClick?: () => void;
  onEnviarClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onIncluirClick,
  onAlterarClick,
  onCancelaClick,
  onBaixaClick,
  onImprimirClick,
  onEnviarClick,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState<boolean>(false);

  const navigationItems: NavigationItem[] = [
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

  // Action buttons com callbacks das props
  const actionButtons: ActionButton[] = [
    {
      icon: Plus,
      label: "Incluir",
      onClick: onIncluirClick,
    },
    {
      icon: Edit3,
      label: "Alterar",
      onClick: onAlterarClick,
    },
    {
      icon: Trash2,
      label: "Cancela",
      onClick: onCancelaClick,
    },
    {
      icon: Download,
      label: "Baixa",
      onClick: onBaixaClick,
    },
    {
      icon: Printer,
      label: "Imprimir",
      onClick: onImprimirClick,
    },
    {
      icon: Send,
      label: "Enviar",
      onClick: onEnviarClick,
    },
  ];

  // Handlers para melhor organização
  const handleMobileMenuToggle = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileActionsToggle = (): void => {
    setMobileActionsOpen(!mobileActionsOpen);
  };

  // Função padrão para botões sem callback
  const defaultClickHandler = (label: string) => {
    console.log(`Botão ${label} clicado - Função não implementada`);
    // Você pode adicionar um toast ou alerta aqui se quiser
  };

  return (
    <header className="bg-white dark:bg-slate-900 font-sora transition-colors duration-300">
      {/* Top Bar - Logo + Navigation + Icons */}
      <div className="border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Section: Logo + Navigation */}
            <div className="flex items-center space-x-6 flex-1">
              {/* Logo com imagens para temas claro e escuro */}
              <div className="logo-container items-center">
                <img
                  src={HsoftBlack}
                  alt="Hsoft"
                  className="block dark:hidden h-12 w-auto"
                />
                <img
                  src={HsoftWhite}
                  alt="Hsoft"
                  className="hidden dark:block h-12 w-auto"
                />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item, index) => (
                  <button key={`nav-${index}`} className="btn-ghost">
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
                  aria-label={`Mudar para tema ${
                    theme === "light" ? "escuro" : "claro"
                  }`}
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
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </div>

      {/* CONTAS A RECEBER Section with Orange Line */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 relative">
        {/* Linha laranja em FULL WIDTH */}
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

            {/* Action Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2 ml-4">
              {actionButtons.map((btn, index) => (
                <button
                  key={`action-${index}`}
                  className="btn-action"
                  onClick={
                    btn.onClick || (() => defaultClickHandler(btn.label))
                  }
                  title={btn.label}
                >
                  <btn.icon size={16} strokeWidth={2} />
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Actions Menu Button */}
            <button
              onClick={handleMobileActionsToggle}
              className="md:hidden p-2 bg-white dark:bg-slate-700 rounded-md text-orange-600 dark:text-orange-400 shadow-sm ml-4"
              aria-label="Ações"
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
                    key={`mobile-action-${index}`}
                    className="flex items-center space-x-2 px-3 py-2 text-orange-600 dark:text-orange-400 rounded-md hover:bg-orange-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                    onClick={
                      btn.onClick || (() => defaultClickHandler(btn.label))
                    }
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
                key={`mobile-nav-${index}`}
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
