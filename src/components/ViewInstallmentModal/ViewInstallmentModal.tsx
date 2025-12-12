// components/ViewInstallmentModal.tsx
import React from "react";
import { X } from "lucide-react";

// É crucial importar ou definir a interface TableRow para evitar erros de tipagem
export interface TableRow {
  id: string;
  selected?: boolean;
  cliente: string;
  emp: string;
  pedido: string;
  nota: string;
  parc: string;
  vencimento: string;
  valor: string;
  dias: string;
  multa: string;
  juros: string;
  valorTotal: string;
  status?: "aberta" | "baixada" | "cancelada";
}

interface ViewInstallmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  rowData?: TableRow; // Usamos TableRow, que é a interface real
}

// Nomes amigáveis dos cabeçalhos (11 colunas)
const columnLabels = [
  "Cliente",
  "Emp",
  "Pedido",
  "Nota",
  "Parc",
  "Vencimento",
  "Valor",
  "Dias",
  "Multa",
  "Juros",
  "Total",
];

// Mapeamento das chaves do JSON (11 campos no total)
const columnKeys: Array<keyof TableRow> = [
  "cliente",
  "emp",
  "pedido",
  "nota",
  "parc",
  "vencimento",
  "valor",
  "dias",
  "multa",
  "juros",
  "valorTotal",
];

const ViewInstallmentModal: React.FC<ViewInstallmentModalProps> = ({
  isOpen,
  onClose,
  title = "Visualizar Parcela",
  children,
  rowData, // JSON real da linha
}) => {
  if (!isOpen) return null;

  // Utiliza os dados passados (rowData) ou um fallback vazio para evitar crashes
  const data =
    rowData ||
    ({
      id: "FALLBACK",
      cliente: "FALHA AO CARREGAR DADOS",
      emp: "",
      pedido: "",
      nota: "",
      parc: "",
      vencimento: "",
      valor: "",
      dias: "",
      multa: "",
      juros: "",
      valorTotal: "",
    } as TableRow);

  const headerAndGridHeight = 57 + 24 + 32;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl
                    w-[1230px] h-[680px]
                    max-lg:w-[95vw] max-lg:h-[90vh] max-lg:overflow-hidden
                    flex flex-col"
      >
        {/* SEÇÃO 1: CABEÇALHO DO MODAL (TITLE) */}
        <div
          className="flex items-center justify-between p-4 border-b
                     border-[var(--orange-primary-dark)] dark:border-[var(--orange-primary-dark)]"
        >
          <h3
            className="text-lg font-semibold
                       text-[var(--orange-primary)] dark:text-[var(--orange-primary)]"
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Fechar Modal"
          >
            <X size={20} />
          </button>
        </div>
        {/* SEÇÃO 2: RESUMO DA PARCELA (Grid de 11 Colunas - Responsiva com Scroll) */}
        <div
          // 1. Removido style={minWidth: "1230px"} e max-w-[1230px] para permitir scroll
          // 2. Adicionado mx-auto e mt-3 (12px)
          className="w-full text-white overflow-x-auto mt-3 mx-auto"
        >
          {/* Container Interno para forçar a largura total da Grid (1230px) */}
          <div className="min-w-[1230px]">
            {/* LINHA 1: TÍTULOS (24px de altura) */}
            <div
              className={`grid h-[24px] text-xs font-bold items-center text-center border-b border-gray-300 dark:border-slate-700`}
              // 3. PADRONIZANDO GRID ARBITRÁRIA NO TAILWIND: [grid-cols:estrutura]
              style={{
                backgroundColor: "var(--orange-primary)",
                gridTemplateColumns: `443px repeat(10, minmax(0, 1fr))`,
              }}
              // Se você puder mapear a estrutura da grid no seu tailwind.config.js, seria melhor.
              // Por enquanto, mantemos o style={} para a estrutura de coluna, pois é complexa.
            >
              {columnLabels.map((label, index) => (
                <div
                  key={index}
                  className={`h-full flex items-center justify-center px-1 overflow-hidden
                              border-r border-gray-300 dark:border-slate-700
                              ${index === 0 ? "text-left pl-4" : ""}
                              ${
                                index === columnLabels.length - 1
                                  ? "border-r-0"
                                  : ""
                              }`}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* LINHA 2: DADOS CORRESPONDENTES (32px de altura) */}
            <div
              className="grid h-[32px] text-sm font-medium items-center text-center border-b border-gray-300 dark:border-slate-700"
              // 3. PADRONIZANDO GRID ARBITRÁRIA NO TAILWIND
              style={{
                gridTemplateColumns: `443px repeat(10, minmax(0, 1fr))`,
              }}
            >
              {columnKeys.map((key, index) => (
                <div
                  key={key}
                  className={`h-full flex items-center justify-center px-1
                              text-gray-800 dark:text-gray-200
                              border-r border-gray-300 dark:border-slate-700
                              ${
                                index === columnKeys.length - 1
                                  ? "border-r-0"
                                  : ""
                              }
                              ${
                                index === 0
                                  ? "text-left pl-4 items-start pt-1"
                                  : "text-center"
                              }`}
                >
                  <span
                    className={`${
                      index === 0
                        ? "whitespace-normal text-xs leading-none"
                        : "whitespace-nowrap"
                    }`}
                  >
                    {data[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* SEÇÃO 3: CONTEÚDO PRINCIPAL (Corpo do Modal) */}
        <div
          className="p-6 flex-1 overflow-y-auto"
          style={{ height: `calc(680px - ${headerAndGridHeight}px - 12px)` }}
        >
          {children || (
            // AQUI É ONDE SEUS DADOS ADICIONAIS OU COMPONENTES VÃO SER RENDERIZADOS
            <div className="text-gray-500 dark:text-gray-400">
              {/* Se você não passar children, a informação de debug/dados da linha é exibida: */}
              <h4 className="text-lg font-bold mb-3 dark:text-white">
                Dados da Linha Recebida (Debug):
              </h4>
              <pre className="bg-gray-100 dark:bg-slate-700 p-4 rounded-md overflow-x-auto text-xs">
                {JSON.stringify(data, null, 2)}
              </pre>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                *Este é o conteúdo principal que será substituído pelo layout
                final do Figma.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInstallmentModal;
