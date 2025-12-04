// Header.tsx - REFATORADO e PRONTO
import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import NavBar from "../Navbar";
import { useNavigation } from "../../hooks/useNavigation";
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
  LucideIcon,
  Moon,
  Sun,
} from "lucide-react";

// Importe as imagens do logo
import HsoftBlack from "../../assets/Hsoft-black.png";
import HsoftWhite from "../../assets/Hsoft-white.png";

// Interfaces para tipagem - ATUALIZADA
interface NavigationItem {
  icon: LucideIcon;
  label: string;
  iconColor: string;
  href?: string;
  columns?: {
    title: string;
    links: {
      label: string;
      href?: string;
    }[];
  }[];
}

interface ActionButton {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

// Props do componente Header
interface HeaderProps {
  onIncluirClick?: () => void;
  onAlterarClick?: () => void;
  onCancelaClick?: () => void;
  onBaixaClick?: () => void;
  onImprimirClick?: () => void;
  onEnviarClick?: () => void;
}

// Mapeamento de cores para cada label
const labelColors: Record<string, string> = {
  Cadastros: "#CCFAE3",
  Comercial: "#CCDAF5",
  Financeiro: "#FAE0CC",
  Fiscal: "#E6CCFA",
  Relatórios: "#CCF2FA",
};

const textColors: Record<string, string> = {
  Cadastros: "#008A45",
  Comercial: "#0047CC",
  Financeiro: "#E66400",
  Fiscal: "#8300E6",
  Relatórios: "#0096B8",
};

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
  const [mobileMegaMenu, setMobileMegaMenu] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // ✅ USANDO O HOOK CORRETAMENTE
  const { navigationItems } = useNavigation();

  // DEBUG: Verifique os dados
  console.log("🔍 DADOS DO HOOK:", navigationItems);
  console.log(
    "🔍 FINANCEIRO TEM COLUMNS?",
    navigationItems.find((item) => item.label === "Financeiro")?.columns
  );

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

  const handleMobileMenuToggle = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Fechar mega menu se estiver aberto
    if (mobileMegaMenu) setMobileMegaMenu(null);
  };

  const handleMobileActionsToggle = (): void => {
    setMobileActionsOpen(!mobileActionsOpen);
  };

  const defaultClickHandler = (label: string) => {
    console.log(`Botão ${label} clicado - Função não implementada`);
  };

  const handleNavClick = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  // Handler para abrir mega menu no mobile
  const handleMobileMegaMenu = (label: string) => {
    setMobileMegaMenu(mobileMegaMenu === label ? null : label);
    // Fechar menu mobile simples
    setMobileMenuOpen(false);
  };

  // Fechar todos os menus
  const closeAllMenus = () => {
    setMobileMegaMenu(null);
    setOpenMenu(null);
    setMobileMenuOpen(false);
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

              {/* Desktop Navigation usando NavBar */}
              <div className="flex-1">
                {/* ✅ PASSANDO OS DADOS DO HOOK PARA O NAVBAR */}
                <NavBar
                  items={navigationItems}
                  onItemClick={(item) => handleNavClick(item.label)}
                />
              </div>
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
        <div className="absolute left-0 right-0 bottom-0 h-px bg-[var(--orange-primary)]"></div>
        <div className="max-w-full mx-auto px-4 relative z-10">
          <div className="flex items-center py-3 lg:py-[11px]">
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
                onClick={() => handleMobileMegaMenu(item.label)}
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

      {/* Mega Menu para Mobile/Tablet */}
      {mobileMegaMenu && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeAllMenus}
          />

          {/* Mega Menu Container - MESMO FUNDO DO DESKTOP */}
          <div
            className="absolute top-0 left-0 right-0 h-full overflow-y-auto"
            style={{ backgroundColor: labelColors[mobileMegaMenu] }}
          >
            {/* Header do Mega Menu Mobile - COM COR DO TEXTO */}
            <div
              className="sticky top-0 flex items-center justify-between p-4 border-b"
              style={{
                borderColor: textColors[mobileMegaMenu],
                backgroundColor: textColors[mobileMegaMenu],
              }}
            >
              <h2 className="text-xl font-bold text-white">{mobileMegaMenu}</h2>
              <button
                onClick={closeAllMenus}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Conteúdo do Mega Menu DINÂMICO */}
            <div className="p-4">
              {(() => {
                const currentItem = navigationItems.find(
                  (item) => item.label === mobileMegaMenu
                );

                if (!currentItem?.columns) {
                  return (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-300">
                        Menu {mobileMegaMenu} em desenvolvimento
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Conteúdo será adicionado em breve
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-8">
                    {currentItem.columns.map((col, index) => (
                      <div key={index} className="space-y-3">
                        {/* Título da coluna - COR DO TEXTO IGUAL DESKTOP */}
                        <h3
                          className="font-semibold text-lg pb-2 border-b"
                          style={{
                            color: textColors[mobileMegaMenu],
                            borderColor: textColors[mobileMegaMenu],
                          }}
                        >
                          {col.title}
                        </h3>

                        {/* Links da coluna - COR DO HOVER IGUAL DESKTOP */}
                        <div className="space-y-2">
                          {col.links.map((link, linkIndex) => (
                            <div
                              key={linkIndex}
                              className="
                          text-gray-800 dark:text-gray-200
                          cursor-pointer p-3 rounded-lg

                          transition-colors duration-200
                          
                          hover:pl-4
                        "
                              style={{
                                borderColor: textColors[mobileMegaMenu],
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color =
                                  textColors[mobileMegaMenu];
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "";
                              }}
                              onClick={() => {
                                console.log(`Mobile: Clicou em ${link.label}`);
                                closeAllMenus();
                              }}
                            >
                              {link.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Botão de ação - COM COR DO TEXTO */}
                    <div
                      className="pt-6 border-t"
                      style={{ borderColor: textColors[mobileMegaMenu] + "40" }}
                    >
                      <button
                        className="w-full py-3 rounded-lg font-medium text-white text-center transition-colors hover:opacity-90"
                        style={{
                          backgroundColor: textColors[mobileMegaMenu],
                        }}
                        onClick={closeAllMenus}
                      >
                        Fechar Menu
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
