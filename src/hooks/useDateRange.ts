import { useState } from "react";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  subDays,
  startOfMonth,
  endOfMonth,
  subMonths,
  Locale,
} from "date-fns";
import { Range } from "react-date-range"; // <--- CORREÇÃO: Importar Range em vez de DateRange

// 1. Definição do Formato da Seleção
// CORREÇÃO: Usando a interface Range correta
export const defaultSelection: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

// 2. Definição dos Presets (RANGES) conforme seu layout
const definedRanges = (locale?: Locale) => [
  {
    label: "Hoje",
    // CORREÇÃO: O objeto retornado é um Range, que deve ter startDate e endDate
    range: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: "Ontem",
    range: () => ({
      startDate: subDays(new Date(), 1),
      endDate: subDays(new Date(), 1),
    }),
  },
  // ... (Resto dos presets mantidos e funcionando com o tipo Range implícito) ...
  {
    label: "Esta semana",
    range: () => ({
      startDate: startOfWeek(new Date(), { locale }),
      endDate: endOfWeek(new Date(), { locale }),
    }),
  },
  {
    label: "Semana anterior",
    range: () => ({
      startDate: startOfWeek(subDays(new Date(), 7), { locale }),
      endDate: endOfWeek(subDays(new Date(), 7), { locale }),
    }),
  },
  {
    label: "Este mês",
    range: () => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
    }),
  },
  {
    label: "Mês anterior",
    range: () => ({
      startDate: startOfMonth(subMonths(new Date(), 1)),
      endDate: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
  {
    label: "Últimos 30 dias",
    range: () => ({
      startDate: subDays(new Date(), 29),
      endDate: new Date(),
    }),
  },
  {
    label: "Últimos 90 dias",
    range: () => ({
      startDate: subDays(new Date(), 89),
      endDate: new Date(),
    }),
  },
  {
    label: "Últimos 180 dias",
    range: () => ({
      startDate: subDays(new Date(), 179),
      endDate: new Date(),
    }),
  },
  {
    label: "Tudo",
    range: () => ({
      startDate: subDays(new Date(), 365 * 10),
      endDate: new Date(),
    }),
  },
];

// 3. O Hook principal
export const useDateRange = () => {
  // CORREÇÃO: Inicializar o estado como Range[]
  const [range, setRange] = useState<Range[]>([defaultSelection]);

  const handleSelect = (ranges: any) => {
    // ranges.selection é do tipo Range, então podemos atribuir
    setRange([ranges.selection]);
  };

  const handleClear = () => {
    setRange([defaultSelection]);
  };

  // Definindo a interface para o preset, para ser usada no Modal
  interface DefinedRange {
    label: string;
    range: () => { startDate: Date; endDate: Date };
  }

  return {
    range,
    definedRanges: definedRanges() as DefinedRange[], // Tipando o array de retorno
    handleSelect,
    handleClear,
    defaultSelection,
  };
};
