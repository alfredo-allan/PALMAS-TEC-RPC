import React from "react";
// CORREÇÃO 1: Importar Range do react-date-range (e DateRangePicker/DateRange, se necessário)
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDateRange } from "../hooks/useDateRange"; // Caminho relativo ajustado
import { format } from "date-fns";

interface DateRangePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (range: Range[]) => void;
}

// Interface auxiliar para os presets
interface DefinedRange {
  label: string;
  range: () => { startDate: Date; endDate: Date };
}

const DateRangePickerModal: React.FC<DateRangePickerModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  if (!isOpen) return null;

  // CORREÇÃO 2: O hook agora retorna definedRanges tipado
  const { range, definedRanges, handleSelect } = useDateRange();

  // Mapeia as ranges definidas no hook para o formato Range do react-date-range
  const staticRanges = definedRanges.map((item: DefinedRange) => ({
    label: item.label,
    range: item.range,
    isSelected: (range: Range) =>
      range.startDate?.getTime() === item.range().startDate.getTime(),
  }));

  const selectionRange = range[0];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 w-full max-w-[950px] mt-20">
        {/* TÍTULO */}
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[var(--orange-primary)]">
            Prazo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            X
          </button>
        </div>

        {/* CONTAINER PRINCIPAL DO CALENDÁRIO */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex-1">
            <DateRangePicker
              // CORREÇÃO 3: 'range' agora é Range[]
              ranges={range}
              onChange={handleSelect}
              months={2} // Exibe dois meses lado a lado
              direction="horizontal"
              rangeColors={["var(--orange-primary)"]} // Cor de destaque
              staticRanges={staticRanges} // Adiciona os presets
              inputRanges={[]} // Remove o campo de input personalizado (se não for usar)
            />
          </div>

          {/* RODAPÉ E BOTÕES DE AÇÃO */}
          <div className="pt-4 flex flex-col items-center border-t lg:border-t-0 lg:border-l lg:pl-4">
            {/* INPUTS DE DATA MANUAL */}
            <div className="w-full flex justify-between items-center text-sm mb-4">
              <input
                type="text"
                readOnly
                // CORREÇÃO 4: startDate e endDate existem agora
                value={format(
                  selectionRange.startDate || new Date(),
                  "dd / MM / yyyy"
                )}
                className="border p-2 rounded w-5/12 text-center"
              />
              <span>-</span>
              <input
                type="text"
                readOnly
                // CORREÇÃO 4: endDate existe agora
                value={format(
                  selectionRange.endDate || new Date(),
                  "dd / MM / yyyy"
                )}
                className="border p-2 rounded w-5/12 text-center"
              />
            </div>

            {/* BOTÕES FECHAR / OK */}
            <div className="flex space-x-4 justify-end w-full">
              <button onClick={onClose} className="btn-ghost">
                Fechar
              </button>
              <button
                onClick={() => onApply(range)}
                className="bg-[var(--orange-primary)] text-white px-4 py-2 rounded-md font-bold hover:bg-orange-600 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePickerModal;
