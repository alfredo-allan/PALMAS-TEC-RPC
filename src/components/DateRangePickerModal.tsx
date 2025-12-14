import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfDay,
  endOfDay,
  isEqual,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, X, Calendar, Menu } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useDateRange } from "../hooks/useDateRange";

interface DualCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (range: { startDate: Date | null; endDate: Date | null }) => void;
  initialRange?: { startDate: Date | null; endDate: Date | null };
}

const DualCalendarModal: React.FC<DualCalendarModalProps> = ({
  isOpen,
  onClose,
  onApply,
  initialRange,
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Usar o hook de date range para presets
  const { definedRanges } = useDateRange();

  // Estados independentes para cada calendário
  const [startMonth, setStartMonth] = useState<Date>(
    initialRange?.startDate || new Date()
  );
  const [endMonth, setEndMonth] = useState<Date>(
    initialRange?.endDate || addMonths(new Date(), 1)
  );

  const [startDate, setStartDate] = useState<Date | null>(
    initialRange?.startDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialRange?.endDate || null
  );

  // Estado para controlar qual calendário está visível
  const [activeCalendar, setActiveCalendar] = useState<"start" | "end">(
    "start"
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // Novo estado para controlar o menu hamburguer
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  // Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  // Meses para os selects
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const fullMonths = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Anos disponíveis para seleção
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  // Gerar dias do mês
  const getMonthDays = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);

    const firstDayOfMonth = start.getDay();
    const prevMonthDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevDate = new Date(start);
      prevDate.setDate(prevDate.getDate() - (firstDayOfMonth - i));
      prevMonthDays.push(prevDate);
    }

    const daysInMonth = eachDayOfInterval({ start, end });

    // Completar 6 semanas (42 dias)
    const totalCells = 42;
    const remainingCells =
      totalCells - (prevMonthDays.length + daysInMonth.length);
    const nextMonthDays = [];

    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + i);
      nextMonthDays.push(nextDate);
    }

    return [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
  };

  const handleDateClick = (date: Date, type: "start" | "end") => {
    const clickedDate = startOfDay(date);

    if (type === "start") {
      if (endDate && clickedDate > endDate) {
        setEndDate(clickedDate);
      }
      setStartDate(clickedDate);

      // Em mobile/tablet, depois de selecionar data inicial, vai para data final
      if ((isMobile || isTablet) && !endDate) {
        setActiveCalendar("end");
      }
    } else {
      if (startDate && clickedDate < startDate) {
        setStartDate(clickedDate);
      }
      setEndDate(clickedDate);
    }

    setSelectedPreset(null);
  };

  const isDateSelected = (date: Date, type: "start" | "end") => {
    const targetDate = type === "start" ? startDate : endDate;
    return targetDate ? isSameDay(date, targetDate) : false;
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const handleMonthChange = (
    monthIndex: number,
    year: number,
    type: "start" | "end"
  ) => {
    const newDate = new Date(year, monthIndex, 1);
    if (type === "start") {
      setStartMonth(newDate);
    } else {
      setEndMonth(newDate);
    }
  };

  const handlePrevMonth = (type: "start" | "end") => {
    if (type === "start") {
      setStartMonth(subMonths(startMonth, 1));
    } else {
      setEndMonth(subMonths(endMonth, 1));
    }
  };

  const handleNextMonth = (type: "start" | "end") => {
    if (type === "start") {
      setStartMonth(addMonths(startMonth, 1));
    } else {
      setEndMonth(addMonths(endMonth, 1));
    }
  };

  const handleApply = () => {
    onApply({ startDate, endDate });
    onClose();
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedPreset(null);
    setActiveCalendar("start");
  };

  const handlePresetSelect = (presetLabel: string) => {
    const preset = definedRanges.find((p) => p.label === presetLabel);
    if (preset) {
      const range = preset.range();
      const newStartDate = startOfDay(range.startDate);
      const newEndDate = endOfDay(range.endDate);

      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setSelectedPreset(presetLabel);

      if (newStartDate) setStartMonth(startOfMonth(newStartDate));
      if (newEndDate) setEndMonth(startOfMonth(newEndDate));

      if (isMobile || isTablet) {
        setActiveCalendar("end");
      }
    }
    // Fechar o menu após selecionar no mobile/tablet
    if (isMobile || isTablet) {
      setShowPresetsMenu(false);
    }
  };

  const isPresetActive = (presetLabel: string) => {
    if (!startDate || !endDate) return false;

    const preset = definedRanges.find((p) => p.label === presetLabel);
    if (!preset) return false;

    const presetRange = preset.range();
    const presetStart = startOfDay(presetRange.startDate);
    const presetEnd = endOfDay(presetRange.endDate);

    return isEqual(startDate, presetStart) && isEqual(endDate, presetEnd);
  };

  // Componente SingleCalendar - usado em mobile/tablet
  const SingleCalendar = ({ type }: { type: "start" | "end" }) => {
    const month = type === "start" ? startMonth : endMonth;
    const currentMonthIndex = month.getMonth();
    const currentYear = month.getFullYear();

    return (
      <div className="w-full">
        {/* Cabeçalho com título */}
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`font-semibold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {type === "start"
              ? "Selecionar Data Inicial"
              : "Selecionar Data Final"}
          </h3>
        </div>

        {/* Controles de mês/ano */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => handlePrevMonth(type)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            <select
              value={currentMonthIndex}
              onChange={(e) =>
                handleMonthChange(parseInt(e.target.value), currentYear, type)
              }
              className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              {(isMobile ? months : fullMonths).map((monthName, index) => (
                <option key={index} value={index}>
                  {monthName}
                </option>
              ))}
            </select>

            <select
              value={currentYear}
              onChange={(e) =>
                handleMonthChange(
                  currentMonthIndex,
                  parseInt(e.target.value),
                  type
                )
              }
              className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleNextMonth(type)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`text-center text-xs font-medium py-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isMobile ? day.substring(0, 1) : day.substring(0, 3)}
            </div>
          ))}
        </div>

        {/* Dias do mês */}
        <div className="grid grid-cols-7 gap-1">
          {getMonthDays(month).map((date, index) => {
            const isCurrentMonth = isSameMonth(date, month);
            const isSelected = isDateSelected(date, type);
            const inRange = isDateInRange(date);
            const isStart = isDateSelected(date, "start");
            const isEnd = isDateSelected(date, "end");

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date, type)}
                className={`
                  h-10 rounded-lg flex items-center justify-center text-sm font-medium
                  transition-all
                  ${
                    !isCurrentMonth
                      ? isDarkMode
                        ? "text-gray-600"
                        : "text-gray-400"
                      : isDarkMode
                      ? "text-gray-200 hover:bg-slate-700"
                      : "text-gray-800 hover:bg-gray-100"
                  }
                  ${
                    isSelected
                      ? "bg-[var(--orange-primary)] text-white font-bold"
                      : inRange && !isStart && !isEnd
                      ? isDarkMode
                        ? "bg-orange-900/30 text-orange-200"
                        : "bg-orange-100 text-orange-800"
                      : ""
                  }
                `}
                title={format(date, "dd/MM/yyyy")}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Data selecionada */}
        <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
          <div className="text-center">
            <div
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {type === "start"
                ? "Data Inicial Selecionada"
                : "Data Final Selecionada"}
            </div>
            <div
              className={`text-lg font-bold mt-1 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {type === "start"
                ? startDate
                  ? format(startDate, "dd/MM/yyyy")
                  : "Não selecionada"
                : endDate
                ? format(endDate, "dd/MM/yyyy")
                : "Não selecionada"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente DualCalendar - usado em desktop
  const DualCalendar = () => {
    return (
      <div className="flex gap-6 lg:gap-8">
        {/* Calendário Data Inicial */}
        <div className="flex-1">
          <div className="mb-4">
            <h3
              className={`font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Data Inicial
            </h3>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => handlePrevMonth("start")}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              <select
                value={startMonth.getMonth()}
                onChange={(e) =>
                  handleMonthChange(
                    parseInt(e.target.value),
                    startMonth.getFullYear(),
                    "start"
                  )
                }
                className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              >
                {fullMonths.map((monthName, index) => (
                  <option key={index} value={index}>
                    {monthName}
                  </option>
                ))}
              </select>

              <select
                value={startMonth.getFullYear()}
                onChange={(e) =>
                  handleMonthChange(
                    startMonth.getMonth(),
                    parseInt(e.target.value),
                    "start"
                  )
                }
                className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleNextMonth("start")}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`text-center text-xs font-medium py-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getMonthDays(startMonth).map((date, index) => {
              const isCurrentMonth = isSameMonth(date, startMonth);
              const isSelected = isDateSelected(date, "start");
              const inRange = isDateInRange(date);
              const isStart = isDateSelected(date, "start");
              const isEnd = isDateSelected(date, "end");

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date, "start")}
                  className={`
                    h-10 rounded-lg flex items-center justify-center text-sm font-medium
                    transition-all
                    ${
                      !isCurrentMonth
                        ? isDarkMode
                          ? "text-gray-600"
                          : "text-gray-400"
                        : isDarkMode
                        ? "text-gray-200 hover:bg-slate-700"
                        : "text-gray-800 hover:bg-gray-100"
                    }
                    ${
                      isSelected
                        ? "bg-[var(--orange-primary)] text-white font-bold"
                        : inRange && !isStart && !isEnd
                        ? isDarkMode
                          ? "bg-orange-900/30 text-orange-200"
                          : "bg-orange-100 text-orange-800"
                        : ""
                    }
                  `}
                  title={format(date, "dd/MM/yyyy")}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divisor */}
        <div className="w-px bg-gray-300 dark:bg-slate-600 mx-2" />

        {/* Calendário Data Final */}
        <div className="flex-1">
          <div className="mb-4">
            <h3
              className={`font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Data Final
            </h3>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => handlePrevMonth("end")}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              <select
                value={endMonth.getMonth()}
                onChange={(e) =>
                  handleMonthChange(
                    parseInt(e.target.value),
                    endMonth.getFullYear(),
                    "end"
                  )
                }
                className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              >
                {fullMonths.map((monthName, index) => (
                  <option key={index} value={index}>
                    {monthName}
                  </option>
                ))}
              </select>

              <select
                value={endMonth.getFullYear()}
                onChange={(e) =>
                  handleMonthChange(
                    endMonth.getMonth(),
                    parseInt(e.target.value),
                    "end"
                  )
                }
                className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleNextMonth("end")}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`text-center text-xs font-medium py-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getMonthDays(endMonth).map((date, index) => {
              const isCurrentMonth = isSameMonth(date, endMonth);
              const isSelected = isDateSelected(date, "end");
              const inRange = isDateInRange(date);
              const isStart = isDateSelected(date, "start");
              const isEnd = isDateSelected(date, "end");

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date, "end")}
                  className={`
                    h-10 rounded-lg flex items-center justify-center text-sm font-medium
                    transition-all
                    ${
                      !isCurrentMonth
                        ? isDarkMode
                          ? "text-gray-600"
                          : "text-gray-400"
                        : isDarkMode
                        ? "text-gray-200 hover:bg-slate-700"
                        : "text-gray-800 hover:bg-gray-100"
                    }
                    ${
                      isSelected
                        ? "bg-[var(--orange-primary)] text-white font-bold"
                        : inRange && !isStart && !isEnd
                        ? isDarkMode
                          ? "bg-orange-900/30 text-orange-200"
                          : "bg-orange-100 text-orange-800"
                        : ""
                    }
                  `}
                  title={format(date, "dd/MM/yyyy")}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Componente de navegação para mobile/tablet
  const MobileTabletNav = () => (
    <div className="flex mb-6 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
      <button
        onClick={() => setActiveCalendar("start")}
        className={`flex-1 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
          activeCalendar === "start"
            ? "bg-white dark:bg-slate-800 shadow"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        <Calendar size={16} />
        Início
      </button>
      <button
        onClick={() => setActiveCalendar("end")}
        className={`flex-1 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
          activeCalendar === "end"
            ? "bg-white dark:bg-slate-800 shadow"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        <Calendar size={16} />
        Fim
      </button>
    </div>
  );

  // Botão para ir para data final em mobile/tablet
  const ContinueButton = () => (
    <div className="mt-6">
      <button
        onClick={() => setActiveCalendar("end")}
        className="w-full py-3 bg-[var(--orange-primary)] text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
      >
        Selecionar Data Final →
      </button>
    </div>
  );

  // Componente do menu hamburguer dropdown
  const HamburgerMenu = () => {
    if (!isMobile && !isTablet) return null;

    return (
      <>
        {/* Botão do menu hamburguer */}
        <button
          onClick={() => setShowPresetsMenu(!showPresetsMenu)}
          // Removido o bg-orange-primary e hover
          className={`fixed top-0.5 left-4 z-50 p-3 rounded md:flex md:relative md:top-[-455px] md:left-[40px]
bg-transparent hover:bg-transparent transition-colors sm:left-[15px]`}
        >
          {/* Ícone agora usa a cor primária (laranja) */}
          <Menu size={22} className="text-[var(--orange-primary)]" />
        </button>

        {/* Dropdown do menu */}
        {showPresetsMenu && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowPresetsMenu(false)}
          >
            <div
              className="absolute top-20 left-4 right-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-4 max-h-[70vh] max-w-[90%] overflow-y-auto md:relative md:left-[50px] md:right-[63px] md:top-[110px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Períodos Rápidos
                </h3>
                <button
                  onClick={() => setShowPresetsMenu(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <X
                    size={20}
                    className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {definedRanges.map((preset) => {
                  const isActive =
                    isPresetActive(preset.label) ||
                    selectedPreset === preset.label;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => handlePresetSelect(preset.label)}
                      className={`
                        text-left px-4 py-3 text-sm rounded-lg transition-all duration-200
                        font-medium h-[40px] w-full
                        ${
                          isActive
                            ? "bg-[var(--orange-primary)] text-white shadow-md"
                            : isDarkMode
                            ? "text-gray-300 hover:bg-slate-700 hover:text-white"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }
                      `}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      {/* Renderizar o menu hamburguer para mobile/tablet */}
      <HamburgerMenu />

      <div
        className={`rounded-xl shadow-2xl w-full max-w-[90vw] sm:max-w-[90vw] lg:max-w-[1050px] max-h-[100vh] overflow-hidden md:relative md:left-[-14px] ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-slate-700 h-[50px]">
          <h2
            className={`lg:text-[20px] sm:text-xl font-semibold text-[var(--orange-primary)] ${
              isMobile || isTablet ? "ml-12" : ""
            }`}
          >
            Selecionar Período
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-slate-700"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-140px)] overflow-hidden">
          {/* Sidebar de presets - visível apenas no desktop */}
          {!isMobile && !isTablet && (
            <div className="lg:w-64 border-b lg:border-b-0 lg:border-r dark:border-slate-700 p-4 overflow-y-auto lg:h-[557px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {definedRanges.map((preset) => {
                  const isActive =
                    isPresetActive(preset.label) ||
                    selectedPreset === preset.label;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => handlePresetSelect(preset.label)}
                      className={`
                        text-left px-4 py-3 text-sm rounded-lg transition-all duration-200
                        font-medium h-[40px]
                        ${
                          isActive
                            ? "bg-[var(--orange-primary)] text-white shadow-md"
                            : isDarkMode
                            ? "text-gray-300 hover:bg-slate-700 hover:text-white"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }
                      `}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Área principal dos calendários */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            {isMobile || isTablet ? (
              <>
                <MobileTabletNav />
                {activeCalendar === "start" ? (
                  <>
                    <SingleCalendar type="start" />
                    {startDate && !endDate && <ContinueButton />}
                  </>
                ) : (
                  <SingleCalendar type="end" />
                )}
              </>
            ) : (
              <DualCalendar />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t dark:border-slate-700 p-4 lg:mt-[-270px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    De:
                  </span>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm font-medium min-w-[120px] text-center ${
                      isDarkMode
                        ? "bg-slate-700 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {startDate ? format(startDate, "dd/MM/yyyy") : "--/--/----"}
                  </div>
                </div>

                <span
                  className={`font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  até
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Até:
                  </span>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm font-medium min-w-[120px] text-center ${
                      isDarkMode
                        ? "bg-slate-700 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {endDate ? format(endDate, "dd/MM/yyyy") : "--/--/----"}
                  </div>
                </div>
              </div>

              <button
                onClick={handleClear}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-200 hover:bg-slate-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Limpar
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Fechar
              </button>
              <button
                onClick={handleApply}
                className="px-5 py-2.5 rounded-lg bg-[var(--orange-primary)] hover:bg-orange-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!startDate || !endDate}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualCalendarModal;
