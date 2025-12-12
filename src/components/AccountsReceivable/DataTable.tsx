import React, { useState, useRef, useEffect } from "react";
import {
  CheckSquare,
  HelpCircle,
  Timer,
  Barcode,
  DollarSign,
} from "lucide-react";
import TableActionsHover from "../TableActionsHover/TableActionsHover";
import ViewInstallmentModal from "../ViewInstallmentModal/ViewInstallmentModal";
// ^^^ CERTIFIQUE-SE DE AJUSTAR ESTE CAMINHO DE IMPORTAÇÃO ^^^

// ===============================================
// 1. DEFINIÇÕES DE INTERFACE (MOVEMOS TUDO PARA O TOPO)
// ===============================================

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

export interface DataTableProps {
  data: TableRow[];
  onRowSelect?: (selectedRows: string[]) => void;
  onRowView?: (row: TableRow) => void;
  onRowCopy?: (row: TableRow) => void;
  onRowSend?: (row: TableRow) => void;
  onRowPrint?: (row: TableRow) => void;
}

// Interface para as colunas
interface TableColumn {
  key: keyof TableRow;
  label: string;
  width: string;
  align: string;
  isBold?: boolean;
}

// Componente para os cards de totais
const TotalCard: React.FC<{
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  iconColor: string;
}> = ({ icon: Icon, title, value, iconColor }) => (
  <div className="flex items-center justify-center gap-2 font-bold flex-1 first:justify-start last:justify-end">
    <Icon size={20} className={`${iconColor} flex-shrink-0 md:size-[27px]`} />
    <div className="text-left">
      <div className="text-xs md:text-sm text-gray-800 dark:text-gray-200">
        {title}
      </div>
      <div className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
        {value}
      </div>
    </div>
  </div>
);

// ===============================================
// 2. COMPONENTE PRINCIPAL
// ===============================================

const DataTable: React.FC<DataTableProps> = ({
  data,
  onRowSelect,
  onRowView,
  onRowCopy,
  onRowSend,
  onRowPrint,
}) => {
  // ... (Estados existentes) ...
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isActionsHovered, setIsActionsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());
  const actionsRef = useRef<HTMLDivElement>(null);
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState<TableRow | null>(null);

  // ===============================================
  // 3. FUNÇÕES DE AÇÃO E CONTROLE (TIPAGEM CORRIGIDA)
  // ===============================================

  const handleCloseActions = () => {
    setClickedRowId(null);
    setHoveredRowId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalRowData(null);
  };

  // FUNÇÃO PRINCIPAL: on View (Abre Modal)
  const handleViewDetails = (row: TableRow) => {
    // TIPO EXPLÍCITO APLICADO AQUI
    setModalRowData(row);
    setIsModalOpen(true);
    handleCloseActions();
    onRowView?.(row);
  };

  // FUNÇÃO: on Copy
  const handleCopyAction = (row: TableRow) => {
    // TIPO EXPLÍCITO APLICADO AQUI
    onRowCopy?.(row);
    handleCloseActions();
  };

  // FUNÇÃO: on Send
  const handleSendAction = (row: TableRow) => {
    // TIPO EXPLÍCITO APLICADO AQUI
    onRowSend?.(row);
    handleCloseActions();
  };

  // FUNÇÃO: on Print
  const handlePrintAction = (row: TableRow) => {
    // TIPO EXPLÍCITO APLICADO AQUI
    onRowPrint?.(row);
    handleCloseActions();
  };

  // ... (Outras funções de controle como handleClickRow, handleMouseEnterRow, etc.) ...

  const handleClickRow = (rowId: string, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    // CORREÇÃO DO ERRO DE TIPAGEM 'type'
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      return;
    }
    // Lógica de toggle
    if (clickedRowId === rowId) {
      setClickedRowId(null);
    } else {
      setClickedRowId(rowId);
      setHoveredRowId(null);
      updateHoverPosition(rowId);
    }
  };

  const handleMouseEnterRow = (rowId: string, event: React.MouseEvent) => {
    if (clickedRowId) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredRowId(rowId);
    updateHoverPosition(rowId);
  };

  const handleMouseLeaveRow = () => {
    if (clickedRowId) return;
    if (!isActionsHovered) {
      hoverTimeoutRef.current = setTimeout(() => {
        if (!isActionsHovered) {
          setHoveredRowId(null);
        }
      }, 300);
    }
  };

  const handleRowSelect = (rowId: string) => {
    const newSelectedRows = selectedRows.includes(rowId)
      ? selectedRows.filter((id) => id !== rowId)
      : [...selectedRows, rowId];

    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleSelectAll = () => {
    const allIds = data.map((row) => row.id);
    const newSelectedRows = selectedRows.length === data.length ? [] : allIds;
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleMouseEnterActions = () => {
    setIsActionsHovered(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleMouseLeaveActions = () => {
    setIsActionsHovered(false);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredRowId(null);
    }, 200);
  };

  const updateHoverPosition = (rowId: string) => {
    const rowElement = rowRefs.current.get(rowId);
    if (rowElement) {
      const rect = rowElement.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setHoverPosition({
        x: rect.right - 250,
        y: rect.top + scrollTop + rect.height / 2 - 16,
      });
    }
  };

  const handleMouseMoveRow = (rowId: string) => {
    if (hoveredRowId === rowId && !clickedRowId) {
      updateHoverPosition(rowId);
    }
  };

  // Atualiza refs das linhas
  useEffect(() => {
    rowRefs.current.clear();
    data.forEach((row) => {
      const element = document.getElementById(`row-${row.id}`);
      if (element) {
        rowRefs.current.set(row.id, element as HTMLTableRowElement);
      }
    });
  }, [data]);

  // Limpa timeouts ao desmontar
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const activeRowId = clickedRowId || hoveredRowId;
  const activeRow = activeRowId
    ? data.find((row) => row.id === activeRowId)
    : null;

  // Header com totais - ÍCONES COM CORES ESPECÍFICAS
  const totals = {
    selecionados: "R$ 700,00",
    vencidos: "R$ 932,00",
    aVencer: "R$ 1.200,00",
    capital: "R$ 10.200,00",
    total: "R$ 10.200,00",
  };

  // Definição das colunas na ORDEM CORRETA
  const columns: TableColumn[] = [
    {
      key: "cliente",
      label: "Cliente",
      width: "min-w-[300px]",
      align: "text-left",
    },
    { key: "emp", label: "Emp", width: "min-w-[50px]", align: "text-center" },
    {
      key: "pedido",
      label: "Pedido",
      width: "min-w-[60px]",
      align: "text-center",
    },
    { key: "nota", label: "Nota", width: "min-w-[60px]", align: "text-center" },
    { key: "parc", label: "Parc", width: "min-w-[50px]", align: "text-center" },
    {
      key: "vencimento",
      label: "Vencimento",
      width: "min-w-[80px]",
      align: "text-center",
    },
    {
      key: "valor",
      label: "Valor",
      width: "min-w-[90px]",
      align: "text-right",
    },
    { key: "dias", label: "Dias", width: "min-w-[60px]", align: "text-center" },
    {
      key: "multa",
      label: "Multa",
      width: "min-w-[80px]",
      align: "text-right",
    },
    {
      key: "juros",
      label: "Juros",
      width: "min-w-[80px]",
      align: "text-right",
    },
    {
      key: "valorTotal",
      label: "Total",
      width: "min-w-[100px]",
      align: "text-right",
      isBold: true,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 w-full border-gray-300 dark:border-slate-700 font-medium relative">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[1200px]" ref={tableRef}>
          {/* ... (Header, Totais, e Thead mantidos) ... */}
          <thead>
            {/* Primeira linha - Ícones */}
            <tr className="border-b border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800">
              <td colSpan={columns.length + 1} className="p-2">
                <div className="flex items-center justify-center w-full gap-1 md:gap-12 px-4 md:px-12 mx-auto">
                  <TotalCard
                    icon={CheckSquare}
                    title="Selecionados"
                    value={totals.selecionados}
                    iconColor="text-[#6D5AEC]"
                  />
                  <TotalCard
                    icon={HelpCircle}
                    title="Vencidos"
                    value={totals.vencidos}
                    iconColor="text-[#EF4D5F]"
                  />
                  <TotalCard
                    icon={Timer}
                    title="A Vencer"
                    value={totals.aVencer}
                    iconColor="text-[#E69000]"
                  />
                  <TotalCard
                    icon={Barcode}
                    title="Capital"
                    value={totals.capital}
                    iconColor="text-[#2E4A8A]"
                  />
                  <TotalCard
                    icon={DollarSign}
                    title="Total"
                    value={totals.total}
                    iconColor="text-[#009300]"
                  />
                </div>
              </td>
            </tr>

            {/* Segunda linha - Cabeçalhos das colunas */}
            <tr className="border-b border-gray-300 dark:border-slate-600 bg-[var(--orange-primary)]">
              {/* Checkbox seleção */}
              <th className="w-8 px-1 py-0 h-[24px] border-r border-gray-300 dark:border-slate-600">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onChange={handleSelectAll}
                  className=" text-[#6D5AEC] focus:ring-[#6D5AEC] bg-white dark:bg-slate-700"
                />
              </th>

              {/* Cabeçalhos das colunas na ORDEM CORRETA */}
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-1 py-0 h-[24px]
 text-xs font-bold text-white border-r border-gray-300 dark:border-slate-600 ${
   column.width
 } ${column.align} ${index === columns.length - 1 ? "" : "border-r"}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                id={`row-${row.id}`}
                className={`
    border-b border-gray-300 dark:border-slate-600
    hover:bg-[#FAE0CC]/30
    ${row.status === "baixada" ? "text-[#008A45] hover:text-[#008A45]" : ""}
    ${row.status === "cancelada" ? "text-[#0047CC] hover:text-[#0047CC]" : ""}
    ${selectedRows.includes(row.id) ? "bg-orange-50 dark:bg-orange-900/20" : ""}
    ${clickedRowId === row.id ? "bg-orange-50 dark:bg-orange-900/20" : ""}
    group cursor-pointer
  `}
                // Desktop Hover
                onMouseEnter={(e) => handleMouseEnterRow(row.id, e)}
                onMouseLeave={handleMouseLeaveRow}
                onMouseMove={() => handleMouseMoveRow(row.id)}
                // Mobile/Tablet Click
                onClick={(e) => handleClickRow(row.id, e)}
              >
                {/* Checkbox */}
                <td className="px-1 py-1 border-r border-gray-300 dark:border-slate-600">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className=" text-[#6D5AEC] focus:ring-[#6D5AEC] bg-white dark:bg-slate-700"
                  />
                </td>

                {/* Cliente com formatação especial */}
                <td className="px-2 py-1 border-r border-gray-300 dark:border-slate-600 font-medium">
                  <div className="text-xs whitespace-nowrap">{row.cliente}</div>
                </td>

                {/* Demais colunas na ORDEM CORRETA */}
                {columns.slice(1).map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className={`px-1 py-1 text-xs ${
                      column.align
                    } border-r border-gray-300 dark:border-slate-600 ${
                      column.isBold ? "font-bold" : ""
                    }`}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TableActionsHover flutuante com área de hover estendida */}
      {activeRow && (
        <div
          ref={actionsRef}
          className={`fixed z-50 transition-all duration-200 ${
            clickedRowId ? "shadow-2xl" : ""
          }`}
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
          }}
          // Desktop Hover Controls
          onMouseEnter={handleMouseEnterActions}
          onMouseLeave={handleMouseLeaveActions}
        >
          {/* O ELEMENTO [X] DE FECHAR MOBILE FOI REMOVIDO DAQUI */}

          <TableActionsHover
            rowData={activeRow}
            rowStatus={activeRow.status}
            // 1. AÇÃO PRINCIPAL: Visualizar (Abre Modal)
            onView={() => handleViewDetails(activeRow)}
            // 2. AÇÕES SECUNDÁRIAS: Chamam as novas funções de ação
            onCopy={() => handleCopyAction(activeRow)}
            onSend={() => handleSendAction(activeRow)}
            onPrint={() => handlePrintAction(activeRow)}
          />
        </div>
      )}

      {/* 3. Renderização do Modal de Visualização (onView) */}
      {modalRowData && (
        <ViewInstallmentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Visualizar Parcela`}
          // === FUNCIONALIDADE CORRIGIDA: PASSANDO OS DADOS REAIS ===
          rowData={modalRowData}
          // =========================================================
        >
          {/* Conteúdo detalhado da Parcela (Mantido no body do modal) */}
          <div className="text-sm dark:text-white">
            <h4 className="text-lg font-bold mb-3">Dados da Linha:</h4>
            <pre className="bg-gray-100 dark:bg-slate-700 p-4 rounded-md overflow-x-auto text-xs">
              {/* O modal agora usa o JSON real no seu interior */}
              {JSON.stringify(modalRowData, null, 2)}
            </pre>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              *Este é o conteúdo principal que será substituído pelo layout
              final do Figma.
            </p>
          </div>
        </ViewInstallmentModal>
      )}
    </div>
  );
};

export default DataTable;
