import React, { useState } from "react";
import {
  CheckSquare,
  HelpCircle,
  Timer,
  Barcode,
  DollarSign,
} from "lucide-react";

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
}

export interface DataTableProps {
  data: TableRow[];
  onRowSelect?: (selectedRows: string[]) => void;
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

const DataTable: React.FC<DataTableProps> = ({ data, onRowSelect }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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
    <div className="bg-white dark:bg-slate-900 w-full rounded-lg border border-gray-300 dark:border-slate-700 font-medium">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[1200px]">
          {/* HEADER COM ÍCONES */}
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
            <tr className="border-b border-gray-300 dark:border-slate-600 bg-[var(--orange-primary)] h-[24px]">
              {/* Checkbox seleção */}
              <th className="w-8 px-1 py-2 border-r border-gray-300 dark:border-slate-600">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-gray-400 dark:border-slate-500 text-[#6D5AEC] focus:ring-[#6D5AEC] bg-white dark:bg-slate-700"
                />
              </th>

              {/* Cabeçalhos das colunas na ORDEM CORRETA */}
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-1 py-2 text-xs font-bold text-white border-r border-gray-300 dark:border-slate-600 ${
                    column.width
                  } ${column.align} ${
                    index === columns.length - 1 ? "" : "border-r"
                  }`}
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
                className={`border-b border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 ${
                  selectedRows.includes(row.id)
                    ? "bg-orange-50 dark:bg-orange-900/20"
                    : ""
                }`}
              >
                {/* Checkbox */}
                <td className="px-1 py-1 border-r border-gray-300 dark:border-slate-600">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="rounded border-gray-400 dark:border-slate-500 text-[#6D5AEC] focus:ring-[#6D5AEC] bg-white dark:bg-slate-700"
                  />
                </td>

                {/* Cliente com formatação especial */}
                <td className="px-2 py-1 border-r border-gray-300 dark:border-slate-600 font-medium">
                  <div className="text-xs text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {row.cliente}
                  </div>
                </td>

                {/* Demais colunas na ORDEM CORRETA */}
                {columns.slice(1).map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className={`px-1 py-1 text-xs text-gray-800 dark:text-gray-200 ${
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
    </div>
  );
};

export default DataTable;
