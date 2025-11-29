import React, { useCallback } from "react";
import SelectCliente from "@/components/AccountsReceivable/SelectCliente";

export type FieldType = "text" | "select" | "date" | "radio";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField {
  label: string;
  value: string;
  placeholder?: string;
  type?: FieldType;
  options?: FilterOption[];
}

export interface DataFilterProps {
  filters: FilterField[][];
  onFilterChange: (filters: FilterField[][]) => void;
}

const inputBase =
  "w-full h-[28px] px-3 py-1 rounded border border-gray-300 dark:border-slate-600 " +
  "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 " +
  "focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent text-sm";

const DataFilter: React.FC<DataFilterProps> = ({ filters, onFilterChange }) => {
  const handleFieldChange = useCallback(
    (rowIndex: number, fieldIndex: number, value: string) => {
      const updated = filters.map((row) => row.map((f) => ({ ...f })));
      updated[rowIndex][fieldIndex].value = value;
      onFilterChange(updated);
    },
    [filters, onFilterChange]
  );

  const renderField = (
    field: FilterField,
    rowIndex: number,
    fieldIndex: number
  ) => {
    // Campos especiais com dropdown do Figma
    if (
      field.label === "Cliente" ||
      field.label === "Empresa" ||
      field.label === "Vendedor"
    ) {
      return (
        <SelectCliente
          value={field.value}
          options={field.options ?? []}
          onChange={(v) => handleFieldChange(rowIndex, fieldIndex, v)}
        />
      );
    }

    switch (field.type) {
      case "select":
        return (
          <select
            value={field.value}
            onChange={(e) =>
              handleFieldChange(rowIndex, fieldIndex, e.target.value)
            }
            className={inputBase}
          >
            <option value="">Selecione...</option>
            {field.options?.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        );

      case "date":
        return (
          <input
            type="date"
            value={field.value}
            onChange={(e) =>
              handleFieldChange(rowIndex, fieldIndex, e.target.value)
            }
            className={inputBase}
          />
        );

      case "radio":
        return (
          <div className="flex gap-4 flex-wrap">
            {field.options?.map((op) => (
              <label key={op.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.label}
                  value={op.value}
                  checked={field.value === op.value}
                  onChange={(e) =>
                    handleFieldChange(rowIndex, fieldIndex, e.target.value)
                  }
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm">{op.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <div className="relative">
            <input
              type="text"
              value={field.value}
              onChange={(e) =>
                handleFieldChange(rowIndex, fieldIndex, e.target.value)
              }
              placeholder={field.placeholder}
              className={inputBase}
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-full mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Coluna Esquerda */}
          <div className="flex-1 space-y-4">
            {[
              { label: "Cliente", path: filters[0]?.[0] },
              { label: "Empresa", path: filters[1]?.[0] },
              { label: "Vendedor", path: filters[2]?.[0] },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                  {item.label}
                </label>
                {item.path && renderField(item.path, i, 0)}
              </div>
            ))}
          </div>

          {/* Coluna Direita */}
          <div className="flex-1 space-y-4">
            {/* Período + Tipo Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Período", row: 0, col: 1 },
                { label: "Tipo Data", row: 0, col: 2 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                    {item.label}
                  </label>
                  {filters[item.row]?.[item.col] &&
                    renderField(
                      filters[item.row][item.col],
                      item.row,
                      item.col
                    )}
                </div>
              ))}
            </div>

            {/* Nota Fiscal, Duplicata, Pedido, Orçamento */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Nota Fiscal", row: 1, col: 1 },
                { label: "Duplicata", row: 1, col: 2 },
                { label: "Pedido", row: 1, col: 3 },
                { label: "Orçamento", row: 1, col: 4 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                    {item.label}
                  </label>
                  {filters[item.row]?.[item.col] &&
                    renderField(
                      filters[item.row][item.col],
                      item.row,
                      item.col
                    )}
                </div>
              ))}
            </div>

            {/* Situação */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                Situação
              </label>
              {filters[2]?.[1] && renderField(filters[2][1], 2, 1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFilter;
