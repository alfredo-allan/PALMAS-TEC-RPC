// components/ViewInstallmentModal.tsx
import React, { useState } from "react"; // <--- ADICIONADO useState
// Importação única de X e dos ícones Lucide React:
import { X, NotebookPen, ClipboardList, File, Paperclip } from "lucide-react";

// === INTEGRAÇÃO FINAL: IMPORTAÇÃO DO HOOK REAL ===
import useInstallmentDetails, {
  ParcelaDetalhe,
} from "@/components/AccountsReceivable/hooks/useInstallmentDetails";
// Certifique-se de que o caminho acima está correto.

// A INTERFACE TableRow deve ser importada ou definida de onde ela é exportada (ex: DataTable.tsx)
// Para simplificar, vou mantê-la definida aqui, assumindo que ela é a fonte de verdade para este arquivo.
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

  // NOVOS CAMPOS
  vendedor: string;
  caixa: string;
  dataOrcamento: string;
  condicao: string;
  dataVenda: string;
  totalVenda: string;
}

interface ViewInstallmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  rowData?: TableRow;
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

// Colunas para a Tabela de Detalhes
const detalheColumnLabels = [
  "Par",
  "Vencimento",
  "Valor",
  "Dias",
  "Multa",
  "Juros",
  "Desconto",
  "Valor Pago",
  "Data Pagamento",
  "Tipo",
];

const ViewInstallmentModal: React.FC<ViewInstallmentModalProps> = ({
  isOpen,
  onClose,
  title = "Visualizar Parcela",
  children,
  rowData,
}) => {
  if (!isOpen) return null;

  // === ESTADO 1: Para rastrear a linha selecionada na tabela de detalhes ===
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

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
      vendedor: "",
      caixa: "",
      dataOrcamento: "",
      condicao: "",
      dataVenda: "",
      totalVenda: "",
    } as TableRow);

  // === CONSUMINDO O HOOK REAL CORRIGIDO ===
  const detalhesParcela = useInstallmentDetails(rowData ?? null);

  const headerAndGridHeight = 57 + 24 + 32;

  // === Variável de estilo movida para antes do return ===
  const iconStyle = { color: "var(--orange-primary)" };
  // ===============================================================

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
                     border-[var(--orange-primary-dark)] dark:border-[var(--orange-primary-dark)] h-[36px]"
        >
          <h3
            className="text-lg font-semibold
                       text-[var(--orange-primary)] dark:text-[var(--orange-primary)] text-[14px]"
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

        {/* SEÇÃO 2: RESUMO DA PARCELA (Grid de 11 Colunas) */}
        <div className="w-full text-white overflow-x-auto mt-3 mx-auto">
          <div className="min-w-[1230px]">
            {/* LINHA 1: TÍTULOS (24px de altura) */}
            <div
              className={`grid h-[24px] text-xs font-bold items-center text-center border-b border-gray-300 dark:border-slate-700`}
              style={{
                backgroundColor: "var(--orange-primary)",
                gridTemplateColumns: `443px repeat(10, minmax(0, 1fr))`,
              }}
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
              className="grid h-[32px] text-[12px]  font-medium items-center text-center border-b border-gray-300 dark:border-slate-700"
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
                    // === CORREÇÃO: text-[12px] aplicado a TODOS os spans ===
                    className={`text-[12px] ${
                      index === 0
                        ? "whitespace-normal leading-none"
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

        {/* SEÇÃO 3: CONTEÚDO PRINCIPAL (Corpo do Modal) - CORRIGIDO */}
        <div
          // Adicionado flex-col e py-4 (padding vertical)
          className="flex flex-col flex-1 py-4 overflow-hidden"
          style={{ height: `calc(680px - ${headerAndGridHeight}px - 12px)` }}
        >
          {/* === 3a: CONTEÚDO DE ALTURA FIXA (Infos Detalhadas, Título) === */}
          <div className="px-6">
            {/* CLASSE FIXA: NÃO ALTERADA */}
            <div className="p-[10px] grid grid-cols-4 max-lg:grid-cols-2 gap-x-[23%] lg:whitespace-nowrap gap-y-4 text-[12px]  dark:text-gray-200 justify-center mt-[-20px]">
              {/* COLUNA 1: Cliente e Empresa */}
              <div>
                <div className="font-bold text-gray-700 dark:text-gray-300">
                  Cliente:
                </div>
                <div className="text-[12px] ">{data.cliente}</div>

                <div className="font-bold text-gray-700 dark:text-gray-300text-[12px]  mt-4">
                  Empresa:
                </div>
                <div className="text-[12px] ">
                  2 - PALMAS TEC DISTRIBUIDORA EIRELI
                </div>
              </div>

              {/* COLUNA 2: Vendedor e Caixa */}
              <div>
                <div className="font-bold text-gray-700 dark:text-gray-300">
                  Vendedor:
                </div>
                <div className="text-[12px] ">{data.vendedor}</div>

                <div className="font-bold text-gray-700 dark:text-gray-300 text-[12px] mt-4">
                  Caixa:
                </div>
                <div className="text-[12px] ">{data.caixa}</div>
              </div>

              {/* COLUNA 3: Datas (Orçamento/Venda) */}
              <div>
                <div className="font-bold text-gray-700 dark:text-gray-300">
                  Data Orçamento:
                </div>
                <div className="text-[12px] ">{data.dataOrcamento}</div>

                <div className="font-bold text-gray-700 dark:text-gray-300 text-[12px] mt-4">
                  Data Venda:
                </div>
                <div className="text-[12px] ">{data.dataVenda}</div>
              </div>

              {/* COLUNA 4: Condição e Total da Venda */}
              <div>
                <div className="font-bold text-gray-700 dark:text-gray-300">
                  Condição:
                </div>
                <div className="text-[12px] ">{data.condicao}</div>

                <div className="font-bold text-gray-700 dark:text-gray-300 text-[12px] mt-4">
                  Total da Venda:
                </div>
                <div className="font-bold text-green-600 dark:text-green-400 text-[12px] ">
                  {data.totalVenda}
                </div>
              </div>
            </div>
          </div>
          {/* === FIM 3a (CONTEÚDO FIXO) === */}

          {/* === 3b: TABELA QUE DEVE ROLAR (Recebe flex-1 para ocupar o espaço restante) === */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* CONTAINER DA TABELA (Mantido W-FULL) */}
            {/* O overflow-x-auto é movido para este container para permitir a rolagem horizontal interna da tabela */}
            <div className="overflow-x-auto w-full border-t border-b border-gray-300 dark:border-slate-700">
              <table className="min-w-[1200px] w-full">
                <thead>
                  <tr className="h-[32px] bg-gray-100 dark:bg-slate-700 text-xs font-bold text-gray-700 dark:text-gray-300">
                    {detalheColumnLabels.map((label, index) => (
                      <th
                        key={index}
                        className="px-2 text-center border-r border-gray-300 dark:border-slate-600 last:border-r-0 whitespace-nowrap"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detalhesParcela.map((parcela, rowIndex) => (
                    <tr
                      key={rowIndex}
                      // === ADICIONADO: Condição de seleção e classe de hover ===
                      onClick={() => setSelectedRowIndex(rowIndex)}
                      className={`h-[32px] text-xs border-b border-gray-200 dark:border-slate-700 last:border-b-0 cursor-pointer transition-colors
                        ${
                          selectedRowIndex === rowIndex
                            ? "bg-[var(--mouse-over)] dark:bg-orange-900/40" // Cor de seleção laranja
                            : "hover:bg-[var(--mouse-over)] dark:hover:bg-slate-700/50" // Cor de hover
                        }`}
                    >
                      {/* Usando ParcelaDetalhe para mapear os dados */}
                      {Object.keys(parcela).map((key, colIndex) => (
                        <td
                          key={colIndex}
                          className={`px-2 text-center text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-slate-700 last:border-r-0 whitespace-nowrap ${
                            key === "valor" ||
                            key === "valorPago" ||
                            key === "multa" ||
                            key === "juros" ||
                            key === "desconto"
                              ? "text-right"
                              : "text-center"
                          }`}
                        >
                          {parcela[key as keyof ParcelaDetalhe]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {detalhesParcela.length === 0 && (
                    <tr>
                      <td
                        colSpan={detalheColumnLabels.length}
                        className="text-center py-4 text-gray-500"
                      >
                        Nenhuma parcela detalhada encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* === FIM DA SEÇÃO 3b === */}

          {/* === SEÇÃO 3c: BOTÕES DE AÇÃO - CORRIGIDA A SINTAXE JSX e BORDAS === */}
          <div className="py-[10px] px-6">
            {/* Container de Centralização e Flexbox */}
            <div className="flex justify-center flex-wrap gap-x-[20px] gap-y-3">
              {/* Botão 1: Orçamento (NotebookPen) */}
              <button
                // Borda corrigida e ícone correto
                className="btn-ghost w-[110px] h-[28px] justify-center border border-[var(--orange-primary)] rounded-md text-[10px] text-[var(--orange-primary)] gap-1"
                title="Visualizar Orçamento"
              >
                <NotebookPen size={18} style={iconStyle} />
                <span className="whitespace-nowrap">Orçamento</span>
              </button>

              {/* Botão 2: Pedido (ClipboardList) */}
              <button
                className="btn-ghost w-[110px] h-[28px] justify-center border border-[var(--orange-primary)] rounded-md text-[10px] text-[var(--orange-primary)] gap-1"
                title="Visualizar Pedido"
              >
                <ClipboardList size={18} style={iconStyle} />
                <span className="whitespace-nowrap">Pedido</span>
              </button>

              {/* Botão 3: Nota Fiscal (File) */}
              <button
                className="btn-ghost w-[110px] h-[28px] justify-center border border-[var(--orange-primary)] rounded-md text-[10px] text-[var(--orange-primary)] gap-1"
                title="Visualizar Nota Fiscal"
              >
                <File size={18} style={iconStyle} />
                <span className="whitespace-nowrap">Nota</span>
              </button>

              {/* Botão 4: Anexo (Paperclip) */}
              <button
                className="btn-ghost w-[110px] h-[28px] justify-center border border-[var(--orange-primary)] rounded-md text-[10px] text-[var(--orange-primary)] gap-1"
                title="Visualizar Anexo"
              >
                <Paperclip size={18} style={iconStyle} />
                <span className="whitespace-nowrap">Anexo</span>
              </button>
            </div>
          </div>
          {/* === FIM DA SEÇÃO 3c === */}

          {/* Área de Debug/Children (Se houver) */}
          {children && <div className="px-6 mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default ViewInstallmentModal;
