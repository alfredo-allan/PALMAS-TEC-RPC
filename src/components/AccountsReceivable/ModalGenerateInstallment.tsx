// components/AccountsReceivable/ModalGenerateInstallments.tsx
"use client";

import React, { useState, useEffect } from "react";
import { X, SquareArrowDown } from "lucide-react";

// Tipos importados do hook
import type {
  GenerateInstallmentsData,
  ParcelaGerada,
} from "./hooks/useGenerateInstallmentsModal";

interface ModalGenerateInstallmentsProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (parcelas: ParcelaGerada[]) => void;
  onGenerateParcelas?: (data: GenerateInstallmentsData) => ParcelaGerada[];
  onUpdateParcelas?: (parcelas: ParcelaGerada[]) => void;
  initialData?: GenerateInstallmentsData;
  parcelas?: ParcelaGerada[];
}

// Dados padrão
const DEFAULT_DATA: GenerateInstallmentsData = {
  empresa: "2 - PALMAS TEC DISTRIBUIDORA EIRELI - 11.882.936/0001-00",
  cliente: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
  tipo: "À Vista",
  acrescimo: false,
  desconto: false,
  outros: false,
  valor: "10.000,00",
  especie: "Dinheiro",
  portador: "",
  prazo: "30",
};

// Opções para dropdowns
const ESPECIE_OPTIONS = [
  "Dinheiro",
  "Cartão de Crédito",
  "Cartão de Débito",
  "Transferência",
  "Boleto",
  "PIX",
  "Cheque",
];

const TIPO_OPTIONS = [
  "À Vista",
  "Parcelado",
  "Entrada + Parcelas",
  "Boleto",
  "Cartão",
];

const ModalGenerateInstallments: React.FC<ModalGenerateInstallmentsProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onGenerateParcelas,
  onUpdateParcelas,
  initialData = DEFAULT_DATA,
  parcelas = [],
}) => {
  const [formData, setFormData] =
    useState<GenerateInstallmentsData>(initialData);
  const [localParcelas, setLocalParcelas] = useState<ParcelaGerada[]>(parcelas);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sincroniza parcelas externas
  useEffect(() => {
    setLocalParcelas(parcelas);
  }, [parcelas]);

  // Sincroniza dados iniciais
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleInputChange = (
    field: keyof GenerateInstallmentsData,
    value: string | boolean
  ) => {
    const newData = {
      ...formData,
      [field]: value,
    };

    setFormData(newData);

    // Auto-gera parcelas ao mudar valor ou prazo
    if (
      (field === "valor" || field === "prazo") &&
      value &&
      formData.valor &&
      formData.prazo
    ) {
      autoGenerateParcelas(newData);
    }
  };

  const autoGenerateParcelas = (data: GenerateInstallmentsData) => {
    if (!data.valor || !data.prazo) return;

    setIsGenerating(true);

    setTimeout(() => {
      if (onGenerateParcelas) {
        const novasParcelas = onGenerateParcelas(data);
        setLocalParcelas(novasParcelas);
        if (onUpdateParcelas) onUpdateParcelas(novasParcelas);
      }
      setIsGenerating(false);
    }, 300);
  };

  const handleGerarParcelas = () => {
    setIsGenerating(true);

    setTimeout(() => {
      if (onGenerateParcelas) {
        const novasParcelas = onGenerateParcelas(formData);
        setLocalParcelas(novasParcelas);
        if (onUpdateParcelas) onUpdateParcelas(novasParcelas);
      }
      setIsGenerating(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm && localParcelas.length > 0) {
      onConfirm(localParcelas);
    }
    onClose();
  };

  const calcularTotal = (): string => {
    if (localParcelas.length === 0) return "0,00";

    const total = localParcelas.reduce((sum, parcela) => {
      const valor = parseFloat(
        parcela.valor
          .replace(/\./g, "")
          .replace(",", ".")
          .replace("R$", "")
          .trim()
      );
      return sum + (isNaN(valor) ? 0 : valor);
    }, 0);

    return total.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatCurrency = (value: string): string => {
    const num = parseFloat(value.replace(/\./g, "").replace(",", "."));
    if (isNaN(num)) return value;

    return num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleValorChange = (value: string) => {
    // Remove caracteres não numéricos, exceto vírgula
    const cleaned = value.replace(/[^\d,]/g, "");
    // Formata como moeda
    const formatted = formatCurrency(cleaned);
    handleInputChange("valor", formatted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal Container - DIMENSÕES DO FIGMA */}
      <div
        className="
    relative
    w-full                    /* Mobile: 100% da tela */
    max-w-[806px]             /* Desktop: Largura máxima do Figma */
    h-auto                    /* Altura automática no mobile */
    max-h-[90vh]              /* Mobile: 90% da altura da tela */
    md:h-[680px]              /* Desktop: Altura fixa do Figma */
    md:max-h-[680px]          /* Desktop: Altura máxima do Figma */
    overflow-y-auto           /* Scroll vertical quando necessário */
    md:overflow-y-visible     /* Desktop: sem scroll */
    bg-white
    dark:bg-slate-800
    rounded-lg
    shadow-2xl
    pt-[36px]                 /* Padding top do Figma */
    p-2
    md:p-[8px]
    flex
    flex-col
    gap-[10px]                /* Gap do Figma */

    /* Garante posicionamento central */
    mx-auto
    my-4 md:my-auto
  "
      >
        {/* Conteúdo do modal */}
        {/* Cabeçalho */}
        <div className="w-full h-[36px] border-b border-gray-200 dark:border-slate-700 rounded-t-lg flex items-center justify-between px-4 absolute top-0 left-0">
          <h2 className="text-[color:var(--orange-primary)] font-bold text-lg">
            Gerar Parcelas Avulsas
          </h2>
          <button
            onClick={onClose}
            className="text-[color:var(--orange-primary)] hover:bg-orange-50 dark:hover:bg-orange-900/20 p-1 rounded transition-colors"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-0">
          {/* SEÇÃO SUPERIOR: Empresa e Cliente */}
          <div className="mt-[13px] space-y-4 mb-6">
            {/* Empresa */}
            <div className="h-[32px] md:h-[48px]">
              {" "}
              {/* Altura: 32px mobile, 48px desktop */}
              <label className="block text-sm font-medium text-[color:var(--orange-primary)] mb-1">
                Empresa
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => handleInputChange("empresa", e.target.value)}
                  className="w-full md:w-[786px]
  h-[32px] md:h-[28px]
  px-3 pr-8 text-sm
  border border-gray-300 dark:border-slate-600
  rounded
  bg-white dark:bg-slate-700
  text-gray-900 dark:text-gray-100
  focus:outline-none
  focus:ring-2 focus:ring-[color:var(--orange-primary)]
  focus:border-transparent"
                />
                <SquareArrowDown
                  size={16}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[color:var(--orange-primary)]"
                />
              </div>
            </div>

            {/* Cliente */}
            <div className="h-[32px] md:h-[48px] mt-[10px]">
              {" "}
              <label className="block text-sm font-medium text-[color:var(--orange-primary)] mb-1">
                Cliente
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => handleInputChange("cliente", e.target.value)}
                  className="w-full md:w-[786px]
  h-[32px] md:h-[28px]
  px-3 pr-8 text-sm
  border border-gray-300 dark:border-slate-600
  rounded
  bg-white dark:bg-slate-700
  text-gray-900 dark:text-gray-100
  focus:outline-none
  focus:ring-2 focus:ring-[color:var(--orange-primary)]
  focus:border-transparent"
                />
                <SquareArrowDown
                  size={16}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[color:var(--orange-primary)]"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO MEIO: Formulário de Geração */}
          <div className="">
            {/* LINHA 1: TIPO + CHECKBOXES + VALOR */}
            <div
              className="
  grid grid-cols-4
  gap-[10px]
  w-full
  md:w-[786px]
  mx-auto
"
            >
              {/* Tipo */}
              <div className="flex flex-col md:h-[48px]">
                <label
                  className="
      text-[12px] md:text-[14px]
      font-medium text-[color:var(--orange-primary)]
      mb-[4px]
    "
                >
                  Tipo
                </label>

                <input
                  type="text"
                  value={formData.tipo}
                  onChange={(e) => handleInputChange("tipo", e.target.value)}
                  className="w-[189px] h-[28px]
px-3 text-sm
border border-gray-300 dark:border-slate-600
rounded
bg-white dark:bg-slate-700
text-gray-900 dark:text-gray-100
focus:outline-none
focus:ring-2 focus:ring-[color:var(--orange-primary)]
md:h-12              /* 48px de altura (12 * 4px) */
sm:mt-[-5px]       /* Margin top -5px apenas no desktop */
"
                />
              </div>

              {/* Acréscimo */}
              <div className="flex flex-col md:h-[48px]">
                <label
                  className="
      text-[12px] md:text-[14px]
      font-medium text-[color:var(--orange-primary)]
      mb-[4px]
    "
                >
                  Acréscimo
                </label>

                <input
                  type="text"
                  value={String(formData.acrescimo)}
                  onChange={(e) =>
                    handleInputChange("acrescimo", e.target.value)
                  }
                  className="w-[189px] h-[28px]
px-3 text-sm
border border-gray-300 dark:border-slate-600
rounded
bg-white dark:bg-slate-700
text-gray-900 dark:text-gray-100
focus:outline-none
focus:ring-2 focus:ring-[color:var(--orange-primary)]
md:h-12              /* 48px de altura (12 * 4px) */
sm:mt-[-5px]       /* Margin top -5px apenas no desktop */
"
                />
              </div>

              {/* Desconto */}
              <div className="flex flex-col md:h-[48px]">
                <label
                  className="
      text-[12px] md:text-[14px]
      font-medium text-[color:var(--orange-primary)]
      mb-[4px]
    "
                >
                  Desconto
                </label>

                <input
                  type="text"
                  value={String(formData.desconto)}
                  onChange={(e) =>
                    handleInputChange("desconto", e.target.value)
                  }
                  className="w-[189px] h-[28px]
px-3 text-sm
border border-gray-300 dark:border-slate-600
rounded
bg-white dark:bg-slate-700
text-gray-900 dark:text-gray-100
focus:outline-none
focus:ring-2 focus:ring-[color:var(--orange-primary)]
md:h-12              /* 48px de altura (12 * 4px) */
sm:mt-[-5px]       /* Margin top -5px apenas no desktop */
"
                />
              </div>

              {/* Outros */}
              <div className="flex flex-col md:h-[48px]">
                <label
                  className="
      text-[12px] md:text-[14px]
      font-medium text-[color:var(--orange-primary)]
      mb-[4px]
    "
                >
                  Outros
                </label>

                <input
                  type="text"
                  value={String(formData.outros)}
                  onChange={(e) => handleInputChange("outros", e.target.value)}
                  className="w-[189px] h-[28px]
px-3 text-sm
border border-gray-300 dark:border-slate-600
rounded
bg-white dark:bg-slate-700
text-gray-900 dark:text-gray-100
focus:outline-none
focus:ring-2 focus:ring-[color:var(--orange-primary)]
md:h-12              /* 48px de altura (12 * 4px) */
sm:mt-[-5px]       /* Margin top -5px apenas no desktop */
"
                />
              </div>
            </div>

            {/* LINHA 2: ESPÉCIE */}
            <div className="grid grid-cols-5 gap-2 mb-6 items-start">
              <div className="col-span-1 h-[40px] md:h-[48px]">
                <label
                  className="block
  text-[12px]
  md:text-[14px]
  font-medium
  text-[color:var(--orange-primary)]
  mb-1
  md:mb-[6px]
  md:h-[20px]
  md:leading-[20px]"
                >
                  Espécie
                </label>
              </div>
              <div className="col-span-4 h-[40px] md:h-[48px]">
                <div className="relative">
                  <select
                    value={formData.especie}
                    onChange={(e) =>
                      handleInputChange("especie", e.target.value)
                    }
                    className="w-full h-[28px] px-3 pr-8 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent appearance-none"
                  >
                    {ESPECIE_OPTIONS.map((especie) => (
                      <option key={especie} value={especie}>
                        {especie}
                      </option>
                    ))}
                  </select>
                  <SquareArrowDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[color:var(--orange-primary)] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* LINHA 3: PORTADOR + BOTÃO */}
            <div className="grid grid-cols-5 gap-2 mb-6 items-start">
              <div className="col-span-1 h-[40px] md:h-[48px]">
                <label
                  className="block
  text-[12px]
  md:text-[14px]
  font-medium
  text-[color:var(--orange-primary)]
  mb-1
  md:mb-[6px]
  md:h-[20px]
  md:leading-[20px]"
                >
                  Portador
                </label>
              </div>
              <div className="col-span-3 h-[40px] md:h-[48px]">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.portador}
                    onChange={(e) =>
                      handleInputChange("portador", e.target.value)
                    }
                    className="w-full h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                    placeholder="Nome do portador"
                  />
                </div>
              </div>
              <div className="col-span-1 h-[40px] md:h-[48px]">
                <label
                  className="block
  text-[12px]
  md:text-[14px]
  font-medium
  text-[color:var(--orange-primary)]
  mb-1
  md:mb-[6px]
  md:h-[20px]
  md:leading-[20px] invisible"
                >
                  Botão
                </label>
                <button
                  type="button"
                  onClick={handleGerarParcelas}
                  disabled={isGenerating || !formData.valor || !formData.prazo}
                  className="w-full h-[28px] text-sm font-medium text-white bg-[color:var(--orange-primary)] rounded hover:bg-[#d45a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? "Gerando..." : "Gerar Parcelas"}
                </button>
              </div>
            </div>

            {/* LINHA 4: PRAZO */}
            <div className="grid grid-cols-5 gap-2 items-start">
              <div className="col-span-1 h-[40px] md:h-[48px]">
                <label
                  className="block
  text-[12px]
  md:text-[14px]
  font-medium
  text-[color:var(--orange-primary)]
  mb-1
  md:mb-[6px]
  md:h-[20px]
  md:leading-[20px]"
                >
                  Prazo
                </label>
              </div>
              <div className="col-span-4 h-[40px] md:h-[48px]">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formData.prazo}
                      onChange={(e) =>
                        handleInputChange("prazo", e.target.value)
                      }
                      className="w-full h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                      placeholder="Dias entre parcelas"
                    />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    dias
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO INFERIOR: Tabela de Parcelas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-[color:var(--orange-primary)]">
                Parcelas Geradas
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {localParcelas.length} parcelas • Total: R$ {calcularTotal()}
              </div>
            </div>

            {localParcelas.length > 0 ? (
              <div className="border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden">
                {/* Cabeçalho da tabela */}
                <div className="grid grid-cols-4 bg-gray-100 dark:bg-slate-900 border-b border-gray-300 dark:border-slate-600">
                  <div className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    N°
                  </div>
                  <div className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    Días
                  </div>
                  <div className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    Vencimento
                  </div>
                  <div className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    Valor (R$)
                  </div>
                </div>

                {/* Corpo da tabela */}
                <div className="max-h-[200px] overflow-y-auto">
                  {localParcelas.map((parcela) => (
                    <div
                      key={parcela.numero}
                      className="grid grid-cols-4 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="p-2 text-sm text-gray-900 dark:text-gray-100 text-center">
                        {parcela.numero}
                      </div>
                      <div className="p-2 text-sm text-gray-900 dark:text-gray-100 text-center">
                        {parcela.dias}
                      </div>
                      <div className="p-2 text-sm text-gray-900 dark:text-gray-100 text-center">
                        {parcela.vencimento}
                      </div>
                      <div className="p-2 text-sm text-gray-900 dark:text-gray-100 text-center font-medium">
                        {parcela.valor}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-2">
                  Nenhuma parcela gerada
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Preencha os campos e clique em "Gerar Parcelas"
                </div>
              </div>
            )}

            {/* Footer da tabela */}
            {localParcelas.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-900/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium text-[color:var(--orange-primary)]">
                      NUEVA ENA INFORMATICA LTDA – 10.5/52.03.4/f
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Parcelas:{" "}
                      </span>
                      <span className="font-bold">{localParcelas.length}</span>
                    </div>
                    <div className="text-lg font-bold text-[color:var(--orange-primary)]">
                      R$ {calcularTotal()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botões do rodapé */}
        <div className="border-t border-gray-200 dark:border-slate-700 pt-4 px-4">
          <div className="flex justify-between sm:justify-end sm:space-x-[13px]">
            <button
              type="button"
              onClick={onClose}
              className="w-[71px] h-[28px] text-sm font-medium text-[color:var(--orange-primary)] bg-gray-100 dark:bg-slate-700 rounded hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors order-2 sm:order-1"
            >
              Fechar
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={localParcelas.length === 0}
              className="w-[71px] h-[28px] text-sm font-medium text-white bg-[color:var(--orange-primary)] rounded hover:bg-[#d45a00] transition-colors order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGenerateInstallments;
