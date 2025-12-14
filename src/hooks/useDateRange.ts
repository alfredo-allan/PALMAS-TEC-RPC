import { useState, useCallback } from "react";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  subDays,
  startOfMonth,
  endOfMonth,
  subMonths,
  Locale,
  startOfDay,
  endOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";

// Interface auxiliar para garantir a tipagem
interface DefinedRange {
  label: string;
  range: () => { startDate: Date; endDate: Date };
}

// 2. Definição dos Presets (RANGES) usando ptBR para cálculos de semana/mês
const definedRanges = (locale: Locale = ptBR): DefinedRange[] => [
  {
    label: "Prazo",
    range: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: "Hoje",
    range: () => ({
      startDate: startOfDay(new Date()),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Ontem",
    range: () => ({
      startDate: startOfDay(subDays(new Date(), 1)),
      endDate: endOfDay(subDays(new Date(), 1)),
    }),
  },
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
      startDate: startOfDay(subDays(new Date(), 29)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Últimos 90 dias",
    range: () => ({
      startDate: startOfDay(subDays(new Date(), 89)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Últimos 180 dias",
    range: () => ({
      startDate: startOfDay(subDays(new Date(), 179)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Tudo",
    range: () => ({
      startDate: startOfDay(subDays(new Date(), 365 * 10)), // 10 anos
      endDate: endOfDay(new Date()),
    }),
  },
];

// 3. O Hook principal
export const useDateRange = () => {
  const [range, setRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleSelect = useCallback((type: "start" | "end", date: Date) => {
    setRange((prev) => {
      const newDate = startOfDay(date);

      if (type === "start") {
        // Se já existe data final e a nova data inicial é depois dela, ajusta
        if (prev.endDate && newDate > prev.endDate) {
          return {
            startDate: newDate,
            endDate: newDate,
          };
        }
        return {
          ...prev,
          startDate: newDate,
        };
      } else {
        // Se já existe data inicial e a nova data final é antes dela, ajusta
        if (prev.startDate && newDate < prev.startDate) {
          return {
            startDate: newDate,
            endDate: newDate,
          };
        }
        return {
          ...prev,
          endDate: newDate,
        };
      }
    });
  }, []);

  const handlePresetSelect = useCallback((presetLabel: string) => {
    const preset = definedRanges().find((p) => p.label === presetLabel);
    if (preset) {
      const range = preset.range();
      setRange({
        startDate: range.startDate,
        endDate: range.endDate,
      });
    }
  }, []);

  const clearRange = useCallback(() => {
    setRange({ startDate: null, endDate: null });
  }, []);

  return {
    range,
    definedRanges: definedRanges(),
    handleSelect,
    handlePresetSelect,
    clearRange,
    locale: ptBR,
  };
};
