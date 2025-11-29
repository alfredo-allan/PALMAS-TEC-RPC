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
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[1000px]">
          {/* HEADER COM ÍCONES - AGORA DENTRO DA TABELA */}
          <thead>
            {/* Primeira linha - Ícones */}
            <tr className="border-b border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800">
              <td colSpan={8} className="p-2">
                <div className="flex items-center justify-between w-full gap-1 md:gap-4">
                  {/* Selecionados - Checkbox roxo #6D5AEC */}
                  <div className="flex items-center justify-start gap-2 font-bold flex-1">
                    <CheckSquare
                      size={20}
                      className="text-[#6D5AEC] flex-shrink-0 md:size-[27px]"
                    />
                    <div className="text-left">
                      <div className="text-xs md:text-sm text-gray-800 dark:text-gray-200">
                        Selecionados
                      </div>
                      <div className="text-gray-800 dark:text-gray-200 font-bold text-sm md:text-base">
                        {totals.selecionados}
                      </div>
                    </div>
                  </div>

                  {/* Vencidos - Interrogação vermelha #EF4D5F */}
                  <div className="flex items-center justify-start gap-2 font-bold flex-1">
                    <HelpCircle
                      size={20}
                      className="text-[#EF4D5F] flex-shrink-0 md:size-[27px]"
                    />
                    <div className="text-left">
                      <div className="text-xs md:text-sm text-gray-800 dark:text-gray-200">
                        Vencidos
                      </div>
                      <div className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
                        {totals.vencidos}
                      </div>
                    </div>
                  </div>

                  {/* A Vencer - Cronômetro laranja #E69000 */}
                  <div className="flex items-center justify-start gap-2 font-bold flex-1">
                    <Timer
                      size={20}
                      className="text-[#E69000] flex-shrink-0 md:size-[27px]"
                    />
                    <div className="text-left">
                      <div className="text-xs md:text-sm text-gray-800 dark:text-gray-200">
                        A Vencer
                      </div>
                      <div className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
                        {totals.aVencer}
                      </div>
                    </div>
                  </div>

                  {/* Capital - Código de barras azul #2E4A8A */}
                  <div className="flex items-center justify-start gap-2 font-bold flex-1">
                    <Barcode
                      size={20}
                      className="text-[#2E4A8A] flex-shrink-0 md:size-[27px]"
                    />
                    <div className="text-left">
                      <div className="text-xs md:text-sm text-gray-800 dark:text-gray-200">
                        Capital
                      </div>
                      <div className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
                        {totals.capital}
                      </div>
                    </div>
                  </div>

                  {/* Total - Caixa registradora verde #009300 */}
                  <div className="flex items-center justify-start gap-2 font-bold flex-1">
                    <DollarSign
                      size={20}
                      className="text-[#009300] flex-shrink-0 md:size-[27px]"
                    />
                    <div className="text-left">
                      <div className="text-xs md:text-sm text-gray-800 dark:text-gray-200">
                        Total
                      </div>
                      <div className="text-gray-800 dark:text-gray-200 font-bold text-sm md:text-base">
                        {totals.total}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            {/* Segunda linha - Cabeçalhos das colunas */}
            <tr className="border-b border-gray-300 dark:border-slate-600 bg-[var(--orange-primary)] h-[20px]">
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
              <th className="px-2 py-2 text-xs font-bold text-white text-left border-r border-gray-300 dark:border-slate-600 min-w-[300px]">
                Cliente
              </th>
              <th className="px-1 py-2 text-xs font-bold text-white text-center border-r border-gray-300 dark:border-slate-600 min-w-[60px]">
                Código
              </th>
              <th className="px-1 py-2 text-xs font-bold text-white text-center border-r border-gray-300 dark:border-slate-600 min-w-[80px]">
                Vencimento
              </th>
              <th className="px-1 py-2 text-xs font-bold text-white text-right border-r border-gray-300 dark:border-slate-600 min-w-[90px]">
                Valor
              </th>
              <th className="px-1 py-2 text-xs font-bold text-white text-center border-r border-gray-300 dark:border-slate-600 min-w-[70px]">
                Duplicata
              </th>
              <th className="px-1 py-2 text-xs font-bold text-white text-right border-r border-gray-300 dark:border-slate-600 min-w-[90px]">
                Valor Dup.
              </th>
              <th className="px-1 py-2 text-xs font-bold text-white text-right min-w-[100px]">
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
    </div>
  );
};

export default DataTable;
