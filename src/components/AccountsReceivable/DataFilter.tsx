import React, { useCallback, useState } from "react"; // <-- ADICIONADO: useState
import { CalendarDays } from "lucide-react"; // <-- ADICIONADO: Ícone Lucide
import DateRangePickerModal from "../DateRangePickerModal"; // <-- ADICIONADO: Modal do calendário
import SelectCliente from "./SelectCliente";

// Tipos e Interfaces existentes mantidos
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

// Interface para os itens de configuração dos filtros
interface FilterConfigItem {
  label: string;
  row: number;
  col: number;
}

// ====================================================================
// COMPONENTE PRINCIPAL
// ====================================================================

const DataFilter: React.FC<DataFilterProps> = ({ filters, onFilterChange }) => {
  // === ESTADO ADICIONADO PARA O MODAL DO CALENDÁRIO ===
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  // === Funções de Callback ===

  const handleFieldChange = useCallback(
    (rowIndex: number, fieldIndex: number, value: string) => {
      const updated = filters.map((row) => row.map((f) => ({ ...f })));
      updated[rowIndex][fieldIndex].value = value;
      onFilterChange(updated);
    },
    [filters, onFilterChange]
  );

  // Função para aplicar o intervalo de datas (implementação simples aqui)
  const handleApplyDateRange = useCallback(
    (ranges: any) => {
      // Nota: ranges[0].startDate e ranges[0].endDate
      // Aqui você faria a lógica para formatar e aplicar o filtro.
      // Exemplo:
      // const startDate = format(ranges[0].startDate, 'yyyy-MM-dd');
      // const endDate = format(ranges[0].endDate, 'yyyy-MM-dd');

      // Se o campo Período estiver em [0][1], você atualizaria assim:
      // handleFieldChange(0, 1, `${startDate} a ${endDate}`);

      setIsCalendarModalOpen(false);
    },
    [handleFieldChange]
  );

  // === Lógica de Renderização de Campos ===
  const renderField = (
    field: FilterField,
    rowIndex: number,
    fieldIndex: number
  ) => {
    // Campos especiais com dropdown customizado
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

    // Campo Período (para chamar o modal, assumindo que usa input type="text" ou "date")
    if (field.label === "Período") {
      return (
        <div className="relative">
          <input
            type="text" // Mantido como texto para exibir o range selecionado
            value={field.value}
            onChange={(e) =>
              handleFieldChange(rowIndex, fieldIndex, e.target.value)
            }
            placeholder={field.placeholder ?? "Selecione o período"}
            className={inputBase + " pr-9 cursor-pointer"} // Adiciona padding à direita
            readOnly // Geralmente readOnly para calendários
            onClick={() => setIsCalendarModalOpen(true)} // Abre o modal no clique no input
          />

          {/* ÍCONE DE CALENDÁRIO CLICÁVEL */}
          <CalendarDays
            size={20}
            onClick={() => setIsCalendarModalOpen(true)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors"
            style={{ color: "var(--orange-primary, #e66400)" }}
          />
        </div>
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

  // Configuração dos filtros da coluna esquerda
  const leftColumnFilters = [
    { label: "Cliente", path: filters[0]?.[0] },
    { label: "Empresa", path: filters[1]?.[0] },
    { label: "Vendedor", path: filters[2]?.[0] },
  ];

  // Configuração dos filtros da coluna direita - primeira linha
  const rightColumnFirstRow: FilterConfigItem[] = [
    { label: "Período", row: 0, col: 1 },
    { label: "Tipo Data", row: 0, col: 2 },
  ];

  // Configuração dos filtros da coluna direita - segunda linha
  const rightColumnSecondRow: FilterConfigItem[] = [
    { label: "Nota Fiscal", row: 1, col: 1 },
    { label: "Duplicata", row: 1, col: 2 },
    { label: "Pedido", row: 1, col: 3 },
    { label: "Orçamento", row: 1, col: 4 },
  ];

  return (
    <>
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-full mx-auto px-[10px] py-[10px] lg:py-0">
          <div className="flex flex-col lg:flex-row gap-6   lg:px-[10px] lg:pt-[10px] lg:pb-[10px] ">
            {/* Coluna Esquerda */}
            <div className="flex-mb-[-10px]">
              {leftColumnFilters.map((item, i) => (
                <div key={i} className="-mb-[-10px]">
                  <label
                    className="block text-sm font-semibold"
                    style={{
                      color: "var(--orange-primary, #e66400)",
                    }}
                  >
                    {" "}
                    {item.label}
                  </label>
                  {item.path && renderField(item.path, i, 0)}
                </div>
              ))}
            </div>

            {/* Coluna Direita */}
            <div className="flex-mb-[-10px]">
              {/* Período + Tipo Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rightColumnFirstRow.map((item, i) => (
                  <div key={i} className="-mb-[-10px]">
                    <label
                      className="block text-sm font-semibold"
                      style={{
                        color: "var(--orange-primary, #e66400)",
                      }}
                    >
                      {" "}
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
                {rightColumnSecondRow.map((item, i) => (
                  <div key={i} className="-mb-[-10px]">
                    <label
                      className="block text-sm font-semibold"
                      style={{
                        color: "var(--orange-primary, #e66400)",
                      }}
                    >
                      {" "}
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
              <div className="-mb-[-10px]">
                <label className="block text-sm font-semibold text-orange-600 dark:text-orange-400">
                  Situação
                </label>
                {filters[2]?.[1] && renderField(filters[2][1], 2, 1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DO CALENDÁRIO */}
      <DateRangePickerModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        onApply={handleApplyDateRange}
      />
    </>
  );
};

export default DataFilter;
