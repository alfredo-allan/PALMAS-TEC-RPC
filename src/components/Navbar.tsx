// NavBar.tsx - VERSÃO COMPLETA COM MOBILE INTEGRADO
import React, { useState } from "react";
import { X } from "lucide-react";
import { NavigationItem } from "../hooks/useNavigation";

interface NavBarProps {
  items: NavigationItem[];
  onItemClick?: (item: NavigationItem) => void;
  mobileOpen?: boolean; // Controle mobile do Header
  onMobileClose?: () => void; // Fechar mobile do Header
}

const NavBar: React.FC<NavBarProps> = ({
  items,
  onItemClick,
  mobileOpen = false,
  onMobileClose,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMegaMenu, setMobileMegaMenu] = useState<string | null>(null);

  // Mapeamento de cores de fundo (tons claros)
  const labelColors: Record<string, string> = {
    Cadastros: "#CCFAE3",
    Comercial: "#CCDAF5",
    Financeiro: "#FAE0CC",
    Fiscal: "#E6CCFA",
    Relatórios: "#CCF2FA",
  };

  // Mapeamento de cores de texto/títulos (tons escuros)
  const textColors: Record<string, string> = {
    Cadastros: "#008A45",
    Comercial: "#0047CC",
    Financeiro: "#E66400",
    Fiscal: "#8300E6",
    Relatórios: "#0096B8",
  };

  // Função para hover dinâmico
  const getHoverColorClass = (label: string) => {
    const colorMap: Record<string, string> = {
      Cadastros: "hover:text-[#008A45]",
      Comercial: "hover:text-[#0047CC]",
      Financeiro: "hover:text-[#E66400]",
      Fiscal: "hover:text-[#8300E6]",
      Relatórios: "hover:text-[#0096B8]",
    };
    return colorMap[label] || "hover:text-[#E66400]";
  };

  // Handlers desktop
  const handleDesktopNavClick = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
    if (onItemClick) {
      const item = items.find((i) => i.label === label);
      if (item) onItemClick(item);
    }
  };

  const handleCloseDesktopMenu = () => {
    setOpenMenu(null);
  };

  // Handlers mobile
  const handleMobileNavClick = (label: string) => {
    setMobileMegaMenu((prev) => (prev === label ? null : label));
    if (onItemClick) {
      const item = items.find((i) => i.label === label);
      if (item) onItemClick(item);
    }
  };

  const handleCloseMobileMenu = () => {
    setMobileMegaMenu(null);
    if (onMobileClose) onMobileClose();
  };

  const closeAllMenus = () => {
    setOpenMenu(null);
    setMobileMegaMenu(null);
    if (onMobileClose) onMobileClose();
  };

  // Renderizar conteúdo do mega menu (compartilhado desktop/mobile)
  const renderMegaMenuContent = (
    item: NavigationItem,
    isMobile: boolean = false
  ) => {
    if (!item.columns) {
      return (
        <div className={`text-center ${isMobile ? "py-8" : "py-8"}`}>
          <p
            className={`${
              isMobile ? "text-white/80" : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Menu {item.label} em desenvolvimento
          </p>
          <p
            className={`text-sm ${
              isMobile
                ? "text-white/60 mt-2"
                : "text-gray-500 dark:text-gray-400 mt-2"
            }`}
          >
            Conteúdo será adicionado em breve
          </p>
        </div>
      );
    }

    return (
      <div
        className={
          isMobile
            ? "space-y-8"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        }
      >
        {item.columns.map((col, index) => (
          <div key={index} className={isMobile ? "space-y-3" : "space-y-3"}>
            {/* Título da coluna */}
            <h3
              className={`font-semibold text-lg pb-2 ${
                isMobile ? "border-b text-white" : ""
              }`}
              style={{
                color: isMobile ? "#FFFFFF" : textColors[item.label],
                borderColor: isMobile
                  ? "rgba(255,255,255,0.3)"
                  : textColors[item.label],
              }}
            >
              {col.title}
            </h3>

            {/* Links da coluna */}
            <div className={isMobile ? "space-y-2" : "space-y-2"}>
              {col.links.map((link, linkIndex) => (
                <div
                  key={linkIndex}
                  className={`
                    ${
                      isMobile
                        ? "text-white/80 hover:text-white cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-colors border-l-2 border-transparent hover:border-l-4 hover:pl-4"
                        : `text-gray-800 dark:text-black cursor-pointer p-2 rounded  transition-colors duration-200  hover:pl-3 ${getHoverColorClass(
                            item.label
                          )} dark:${getHoverColorClass(item.label).replace(
                            "hover:",
                            "hover:"
                          )}`
                    }
                  `}
                  style={{
                    borderColor: isMobile
                      ? "rgba(255,255,255,0.5)"
                      : textColors[item.label],
                  }}
                  onClick={() => {
                    console.log(
                      `${isMobile ? "Mobile" : "Desktop"}: Clicou em ${
                        link.label
                      }`
                    );
                    closeAllMenus();
                  }}
                >
                  {link.label}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Botão de fechar para mobile */}
        {isMobile && (
          <div className="pt-6 border-t border-white/20">
            <button
              className="w-full py-3 rounded-lg font-medium text-white text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              onClick={closeAllMenus}
            >
              Fechar Menu
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* DESKTOP NAVIGATION */}
      <nav className="hidden lg:flex items-center space-x-1 w-full">
        {items.map((item) => (
          <div key={item.label} className="relative">
            <button
              className="btn-ghost flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-slate-800 px-3 py-2 rounded-md transition-colors"
              onClick={() => handleDesktopNavClick(item.label)}
            >
              <item.icon
                size={27}
                className={`w-[27px] h-[27px] min-w-[27px] min-h-[27px] ${item.iconColor}`}
                strokeWidth={2}
              />
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {item.label}
              </span>
            </button>

            {/* Mega menu DESKTOP */}
            {openMenu === item.label && (
              <div
                className="
                  fixed left-0 right-0 w-screen
                  shadow-lg z-50 border-t-2
                  top-16
                  lg:max-h-[60vh] lg:overflow-y-auto
                  max-lg:h-[calc(100vh-4rem)] max-lg:overflow-y-auto
                  animate-in fade-in slide-in-from-top-2 duration-200
                "
                style={{
                  backgroundColor: labelColors[item.label],
                  borderColor: textColors[item.label],
                }}
              >
                {/* Botão X para fechar - APENAS MOBILE */}
                <button
                  onClick={handleCloseDesktopMenu}
                  className="
                    lg:hidden
                    absolute top-4 right-4
                    p-2 rounded-full
                    bg-white/20 hover:bg-white/30
                    transition-colors
                    z-10
                  "
                  aria-label="Fechar menu"
                >
                  <X size={20} className="text-white" />
                </button>

                {/* Container interno */}
                <div className="max-w-[1400px] mx-auto px-6 py-6">
                  {renderMegaMenuContent(item, false)}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* MOBILE SIMPLE MENU (quando hamburger é clicado) */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
          <nav className="px-4 py-3 space-y-2">
            {items.map((item, index) => (
              <button
                key={`mobile-nav-${index}`}
                onClick={() => handleMobileNavClick(item.label)}
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

      {/* MOBILE MEGA MENU */}
      {mobileMegaMenu && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseMobileMenu}
          />

          {/* Mega Menu Container */}
          <div
            className="absolute top-0 left-0 right-0 h-full overflow-y-auto"
            style={{ backgroundColor: textColors[mobileMegaMenu] }} // Cores escuras para mobile
          >
            {/* Header do Mega Menu Mobile */}
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-white/20 bg-black/10 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white">{mobileMegaMenu}</h2>
              <button
                onClick={handleCloseMobileMenu}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Conteúdo do Mega Menu */}
            <div className="p-4">
              {(() => {
                const currentItem = items.find(
                  (item) => item.label === mobileMegaMenu
                );
                return currentItem
                  ? renderMegaMenuContent(currentItem, true)
                  : null;
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
