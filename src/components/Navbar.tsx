// NavBar.tsx - Versão atualizada
import React, { useState } from "react";
import { X } from "lucide-react"; // Importar X
import { NavigationItem } from "../hooks/useNavigation";

interface NavBarProps {
  items: NavigationItem[];
  onItemClick?: (item: NavigationItem) => void;
}

const NavBar: React.FC<NavBarProps> = ({ items, onItemClick }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Mapeamento de cores
  const labelColors: Record<string, string> = {
    Cadastros: "#CCFAE3",
    Comercial: "#CCDAF5",
    Financeiro: "#FAE0CC",
    Fiscal: "#E6CCFA",
    Relatórios: "#CCF2FA",
  };

  const handleNavClick = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
    if (onItemClick) {
      const item = items.find((i) => i.label === label);
      if (item) onItemClick(item);
    }
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  return (
    <nav className="hidden lg:flex items-center space-x-1 w-full">
      {items.map((item) => (
        <div key={item.label} className="relative">
          <button
            className="btn-ghost flex items-center space-x-1"
            onClick={() => handleNavClick(item.label)}
          >
            <item.icon
              size={27}
              className={`w-[27px] h-[27px] min-w-[27px] min-h-[27px] ${item.iconColor}`}
              strokeWidth={2}
            />
            <span>{item.label}</span>
          </button>

          {/* Mega menu - RESPONSIVO */}
          {openMenu === item.label && (
            <div
              className="
              fixed left-0 right-0 w-screen
              shadow-lg z-50 border-t-2 border-b-2

              /* Posição responsiva */
              top-16

              /* Desktop */
              lg:max-h-[60vh] lg:overflow-y-auto

              /* Mobile/Tablet */
              max-lg:h-[calc(100vh-4rem)] max-lg:overflow-y-auto

              /* Animações */
              animate-in fade-in slide-in-from-top-2 duration-200
            "
              style={{
                backgroundColor: labelColors[item.label],
                borderColor: labelColors[item.label],
              }}
            >
              {/* Botão X para fechar - APENAS MOBILE */}
              <button
                onClick={handleCloseMenu}
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

              {/* Container interno responsivo */}
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Título com cor de texto baseada no tema */}
                <p
                  className="
                  text-lg font-medium mb-4
                  dark:text-white text-black
                "
                >
                  {item.label} - Conteúdo do menu
                </p>

                {/* Conteúdo responsivo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Conteúdo do menu aqui */}
                  <div className="space-y-2 bg-white/10 dark:bg-black/10 p-3 rounded-lg">
                    <h3 className="font-medium dark:text-white text-black text-base">
                      Cliente
                    </h3>
                    <div className="space-y-1 pl-2">
                      <div className="dark:text-gray-200 text-gray-800 hover:opacity-80 cursor-pointer p-1 rounded">
                        Selecione...
                      </div>
                      <div className="dark:text-gray-200 text-gray-800 hover:opacity-80 cursor-pointer p-1 rounded">
                        Empresa
                      </div>
                    </div>
                  </div>

                  {/* Mais conteúdo conforme necessário */}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
