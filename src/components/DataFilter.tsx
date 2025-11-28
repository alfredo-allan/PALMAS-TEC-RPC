import React from "react";

export type FieldType = "text" | "select" | "date" | "radio";

export interface FilterField {
  label: string;
  value: string;
  placeholder?: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
}

export interface DataFilterProps {
  filters: FilterField[][];
  onFilterChange: (filters: FilterField[][]) => void;
}

const DataFilter: React.FC<DataFilterProps> = ({ filters, onFilterChange }) => {
  const handleFieldChange = (
    rowIndex: number,
    fieldIndex: number,
    value: string
  ) => {
    const updatedFilters = filters.map((row) => [...row]);
    updatedFilters[rowIndex][fieldIndex].value = value;
    onFilterChange(updatedFilters);
  };

  const renderField = (
    field: FilterField,
    rowIndex: number,
    fieldIndex: number
  ) => {
    // Classe base para inputs maiores
    const inputBaseClass =
      "w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm";

    switch (field.type) {
      case "select":
        return (
          <select
            value={field.value}
            onChange={(e) =>
              handleFieldChange(rowIndex, fieldIndex, e.target.value)
            }
            className={inputBaseClass}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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
            className={inputBaseClass}
          />
        );

      case "radio":
        return (
          <div className="flex flex-wrap gap-4">
            {field.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={field.label}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) =>
                    handleFieldChange(rowIndex, fieldIndex, e.target.value)
                  }
                  className="text-orange-500 focus:ring-orange-500 w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={field.value}
            onChange={(e) =>
              handleFieldChange(rowIndex, fieldIndex, e.target.value)
            }
            placeholder={field.placeholder}
            className={inputBaseClass}
          />
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-full mx-auto px-4 py-6">
        {/* Layout em duas colunas flexíveis */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna esquerda - Campos grandes */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                Cliente
              </label>
              {filters[0]?.[0] && renderField(filters[0][0], 0, 0)}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                Empresa
              </label>
              {filters[1]?.[0] && renderField(filters[1][0], 1, 0)}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                Vendedor
              </label>
              {filters[2]?.[0] && renderField(filters[2][0], 2, 0)}
            </div>
          </div>

          {/* Coluna direita - Campos organizados em grid */}
          <div className="flex-1 space-y-6">
            {/* Linha 1: Período + Tipo Data lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Período
                </label>
                {filters[0]?.[1] && renderField(filters[0][1], 0, 1)}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Tipo Data
                </label>
                {filters[0]?.[2] && renderField(filters[0][2], 0, 2)}
              </div>
            </div>

            {/* Linha 2: Nota Fiscal + Duplicata + Pedido + Orçamento em 4 colunas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Nota Fiscal
                </label>
                {filters[1]?.[1] && renderField(filters[1][1], 1, 1)}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Duplicata
                </label>
                {filters[1]?.[2] && renderField(filters[1][2], 1, 2)}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Pedido
                </label>
                {filters[1]?.[3] && renderField(filters[1][3], 1, 3)}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Orçamento
                </label>
                {filters[1]?.[4] && renderField(filters[1][4], 1, 4)}
              </div>
            </div>

            {/* Linha 3: Situação */}
            <div className="space-y-2">
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
