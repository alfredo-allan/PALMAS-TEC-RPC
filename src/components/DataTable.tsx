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
  codigo: string;
  vencimento: string;
  valor: string;
  duplicata: string;
  valorDuplicata: string;
  valorTotal: string;
}

export interface DataTableProps {
  data: TableRow[];
  onRowSelect?: (selectedRows: string[]) => void;
}

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

  return (
    <div className="bg-white dark:bg-slate-900 w-full rounded-lg border border-gray-300 dark:border-slate-700">
      {/* Header com ícones personalizados */}
      <div className="border-b border-gray-300 dark:border-slate-600 p-3 bg-gray-50 dark:bg-slate-800 w-full">
        <div className="flex items-center justify-between w-full gap-1">
          {/* Selecionados - Checkbox roxo #6D5AEC */}
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 font-bold mb-1">
              <CheckSquare size={16} className="text-[#6D5AEC]" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                Selecionados
              </span>
            </div>
            <div className="text-gray-800 dark:text-gray-200 font-bold text-base">
              {totals.selecionados}
            </div>
          </div>

          {/* Vencidos - Interrogação vermelha #EF4D5F */}
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 font-bold mb-1">
              <HelpCircle size={16} className="text-[#EF4D5F]" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                Vencidos
              </span>
            </div>
            <div className="text-gray-800 dark:text-gray-200 text-base">
              {totals.vencidos}
            </div>
          </div>

          {/* A Vencer - Cronômetro laranja #E69000 */}
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 font-bold mb-1">
              <Timer size={16} className="text-[#E69000]" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                A Vencer
              </span>
            </div>
            <div className="text-gray-800 dark:text-gray-200 text-base">
              {totals.aVencer}
            </div>
          </div>

          {/* Capital - Código de barras azul #2E4A8A */}
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 font-bold mb-1">
              <Barcode size={16} className="text-[#2E4A8A]" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                Capital
              </span>
            </div>
            <div className="text-gray-800 dark:text-gray-200 text-base">
              {totals.capital}
            </div>
          </div>

          {/* Total - Caixa registradora verde #009300 */}
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 font-bold mb-1">
              <DollarSign size={16} className="text-[#009300]" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                Total
              </span>
            </div>
            <div className="text-gray-800 dark:text-gray-200 font-bold text-base">
              {totals.total}
            </div>
          </div>
        </div>
      </div>

      {/* Tabela com tema dark/light */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-800">
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

              {/* Cabeçalhos */}
              <th className="px-2 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 text-left border-r border-gray-300 dark:border-slate-600 min-w-[300px]">
                Cliente
              </th>
              <th className="px-1 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 text-center border-r border-gray-300 dark:border-slate-600 min-w-[60px]">
                Código
              </th>
              <th className="px-1 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 text-center border-r border-gray-300 dark:border-slate-600 min-w-[80px]">
                Vencimento
              </th>
              <th className="px-1 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 text-right border-r border-gray-300 dark:border-slate-600 min-w-[90px]">
                Valor
              </th>
              <th className="px-1 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 text-center border-r border-gray-300 dark:border-slate-600 min-w-[70px]">
                Duplicata
              </th>
              <th className="px-1 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 text-right border-r border-gray-300 dark:border-slate-600 min-w-[90px]">
                Valor Dup.
              </th>
              <th className="px-1 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 text-right min-w-[100px]">
                Valor Total
              </th>
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

                {/* Cliente */}
                <td className="px-2 py-1 border-r border-gray-300 dark:border-slate-600">
                  <div className="text-xs text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {row.cliente}
                  </div>
                </td>

                {/* Demais colunas */}
                <td className="px-1 py-1 text-xs text-gray-800 dark:text-gray-200 text-center border-r border-gray-300 dark:border-slate-600">
                  {row.codigo}
                </td>
                <td className="px-1 py-1 text-xs text-gray-800 dark:text-gray-200 text-center border-r border-gray-300 dark:border-slate-600">
                  {row.vencimento}
                </td>
                <td className="px-1 py-1 text-xs text-gray-800 dark:text-gray-200 text-right border-r border-gray-300 dark:border-slate-600">
                  {row.valor}
                </td>
                <td className="px-1 py-1 text-xs text-gray-800 dark:text-gray-200 text-center border-r border-gray-300 dark:border-slate-600">
                  {row.duplicata}
                </td>
                <td className="px-1 py-1 text-xs text-gray-800 dark:text-gray-200 text-right border-r border-gray-300 dark:border-slate-600">
                  {row.valorDuplicata}
                </td>
                <td className="px-1 py-1 text-xs text-gray-800 dark:text-gray-200 text-right font-bold">
                  {row.valorTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Com tema dark/light */}
      <div className="lg:hidden w-full">
        <div className="overflow-x-auto w-full">
          <div className="min-w-[600px] space-y-2 w-full p-2">
            {data.map((row) => (
              <div
                key={row.id}
                className={`border border-gray-300 dark:border-slate-600 rounded p-2 w-full ${
                  selectedRows.includes(row.id)
                    ? "bg-orange-50 dark:bg-orange-900/20"
                    : "bg-white dark:bg-slate-800"
                }`}
              >
                <div className="flex items-start justify-between mb-2 w-full">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="rounded border-gray-400 dark:border-slate-500 text-[#6D5AEC] focus:ring-[#6D5AEC] bg-white dark:bg-slate-700 mt-1"
                  />
                  <div className="flex-1 ml-2 w-full">
                    <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Cliente
                    </div>
                    <div className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto w-full">
                      {row.cliente}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs w-full">
                  <div>
                    <div className="font-bold text-gray-700 dark:text-gray-300">
                      Código
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      {row.codigo}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-700 dark:text-gray-300">
                      Vencimento
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      {row.vencimento}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-700 dark:text-gray-300">
                      Valor
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      {row.valor}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-700 dark:text-gray-300">
                      Duplicata
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      {row.duplicata}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-700 dark:text-gray-300">
                      Valor Dup.
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      {row.valorDuplicata}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-700 dark:text-gray-300">
                      Valor Total
                    </div>
                    <div className="text-gray-800 dark:text-gray-200 font-bold">
                      {row.valorTotal}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
