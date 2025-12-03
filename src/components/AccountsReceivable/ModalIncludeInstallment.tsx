// ModalIncludeInstallment.tsx - VERSÃO COM COMMAND PARA CLIENTE
"use client";

import React, { useState } from "react";
import { X, SquareArrowDown, Calendar, Copy } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

// Tipos
interface ModalIncludeInstallmentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (data: ParcelaData) => void;
  initialData?: ParcelaData;
  onGenerateClick?: () => void;
}

interface ParcelaData {
  fatura: string;
  cliente: string;
  empresa: string;
  vendedor: string;
  dataFatura: string;
  valorTotal: string;
  pedido: string;
  nota: string;
  cupom: string;
  os: string;
  historico: string;
  observacao: string;
}

const mockData: ParcelaData = {
  fatura: "77",
  cliente: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
  empresa: "2 - PALMAS TEC DISTRIBUIDORA EIRELI - 11.882.938/0001-00",
  vendedor: "12 - ICARO ALERRANDRO PEREIRA NASCIMENTO - 886.654.258-33",
  dataFatura: "10/10/2021",
  valorTotal: "730.000,00",
  pedido: "23154",
  nota: "5312",
  cupom: "231",
  os: "",
  historico: "",
  observacao: "",
};

// Dados dos clientes extraídos da página principal
const clientesOptions = [
  {
    value: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
    label: "1652 - WEB PALMAS PAPELARIA E INFORMATICA",
    details: "10.552.934/0001-90",
  },
  {
    value:
      "15 - SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA - 10.552.934/C 2",
    label: "15 - SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA",
    details: "10.552.934/C 2",
  },
  {
    value:
      "15- SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA - 10.552.934/C 2",
    label: "15- SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA",
    details: "10.552.934/C 2",
  },
  {
    value: "Outro cliente",
    label: "Outro cliente",
    details: "Selecione para personalizar",
  },
];

const ModalIncludeInstallment: React.FC<ModalIncludeInstallmentProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialData = mockData,
  onGenerateClick,
}) => {
  const [formData, setFormData] = useState<ParcelaData>(initialData);
  const [clienteSquareArrowDownOpen, setClienteSquareArrowDownOpen] =
    useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof ParcelaData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectCliente = (selectedValue: string) => {
    handleInputChange("cliente", selectedValue);
    setClienteSquareArrowDownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal Container - Responsivo */}
      <div
        className="relative w-full max-w-[777px] max-h-[585px] overflow-y-auto md:overflow-y-visible bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-2 md:p-[8px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="w-full md:w-[777px] h-[40px] md:h-[29px] border-b border-gray-200 dark:border-slate-700 rounded-t-lg flex items-center justify-between px-4 text-[16px] md:text-[14px]">
          <h2 className="text-[color:var(--orange-primary)] font-bold text-lg md:-ml-4">
            Incluir Parcela Avulsa
          </h2>
          <button
            onClick={onClose}
            className="text-[color:var(--orange-primary)] hover:bg-orange-50 dark:hover:bg-orange-900/20 p-1 rounded transition-colors"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-3 md:p-2 md:ml-[-8px]">
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col gap-px md:gap-[0px]"
          >
            {/* LINHAS 1-4: Campos superiores - RESPONSIVO */}
            <div
              className="space-y- md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-px mb-4 md:mb-px mt-0 md:mt-0
"
            >
              {/* Fatura */}
              <div className="md:col-span-1">
                <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                  Fatura
                </label>
                <div className="relative w-[239px]">
                  <input
                    type="text"
                    value={formData.fatura}
                    onChange={(e) =>
                      handleInputChange("fatura", e.target.value)
                    }
                    className="w-full h-[28px] px-3 pr-8 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                  />
                  <Copy
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
                  />
                </div>
              </div>

              {/* EMPTY DIV para manter grid */}
              <div className="hidden md:block"></div>

              {/* CLIENTE COM COMMAND */}
              <div className="md:col-span-2 md:mt-px md:mb-px">
                <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                  Cliente
                </label>
                <div className="relative">
                  {/* Input NORMAL - permite digitar */}
                  <input
                    type="text"
                    value={formData.cliente}
                    onChange={(e) =>
                      setFormData({ ...formData, cliente: e.target.value })
                    } // Permite digitar
                    className="w-full md:w-[761px] h-[28px] px-3 pr-8 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent cursor-text hover:border-[color:var(--orange-primary)]"
                    placeholder="Digite ou selecione um cliente" // Placeholder opcional
                  />

                  {/* Ícone que abre o SelectCliente - CLICA AQUI */}
                  <button
                    type="button"
                    onClick={() => setClienteSquareArrowDownOpen(true)}
                    className="absolute right-0 top-0 h-full w-8 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-r"
                    aria-label="Abrir lista de clientes"
                  >
                    <SquareArrowDown
                      size={16}
                      className="text-[color:var(--orange-primary)]"
                    />
                  </button>
                </div>
              </div>

              {/* Vendedor */}
              <div className="md:col-span-2 md:mt-px md:mb-px">
                <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                  Vendedor
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.vendedor}
                    onChange={(e) =>
                      handleInputChange("vendedor", e.target.value)
                    }
                    className="

w-full md:w-[761px] h-[28px] px-3 pr-8 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent cursor-pointer hover:border-[color:var(--orange-primary)]"
                  />
                  <SquareArrowDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[color:var(--orange-primary)] pointer-events-none"
                  />
                </div>
              </div>

              {/* Empresa */}
              <div className="md:col-span-2 md:mt-px md:mb-px">
                <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                  Empresa
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) =>
                      handleInputChange("empresa", e.target.value)
                    }
                    className="w-full md:w-[761px] h-[28px] px-3 pr-8 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                  />
                  <SquareArrowDown
                    size={16}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[color:var(--orange-primary)] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* LINHAS 5-10: Grid 2 colunas - RESPONSIVO */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-start mb-4 md:mb-[8px]">
              {/* COLUNA ESQUERDA */}
              <div className="block text-sm font-medium mb-1 mt-0 md:mt-0">
                {/* Data da Fatura */}
                <div>
                  <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                    {" "}
                    Data da fatura
                  </label>
                  <div className="relative w-full md:w-[239px]">
                    <input
                      type="text"
                      value={formData.dataFatura}
                      onChange={(e) =>
                        handleInputChange("dataFatura", e.target.value)
                      }
                      className="w-full h-[28px] px-3 pr-8 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                    />
                    <Calendar
                      size={16}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[color:var(--orange-primary)] pointer-events-none"
                    />
                  </div>
                </div>

                {/* VALOR TOTAL */}
                <div>
                  <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                    Valor Total
                  </label>
                  <input
                    type="text"
                    value={formData.valorTotal}
                    onChange={(e) =>
                      handleInputChange("valorTotal", e.target.value)
                    }
                    className="w-full md:w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                  />
                </div>

                {/* PEDIDO */}
                <div>
                  <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                    Pedido
                  </label>
                  <input
                    type="text"
                    value={formData.pedido}
                    onChange={(e) =>
                      handleInputChange("pedido", e.target.value)
                    }
                    className="w-full md:w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                  />
                </div>

                {/* NOTA */}
                <div>
                  <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                    Nota
                  </label>
                  <input
                    type="text"
                    value={formData.nota}
                    onChange={(e) => handleInputChange("nota", e.target.value)}
                    className="w-full md:w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                  />
                </div>

                {/* CUPOM */}
                <div>
                  <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                    Cupom
                  </label>
                  <input
                    type="text"
                    value={formData.cupom}
                    onChange={(e) => handleInputChange("cupom", e.target.value)}
                    className="w-full md:w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                  />
                </div>

                {/* O.S. */}
                <div>
                  <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                    O.S.
                  </label>
                  <input
                    type="text"
                    value={formData.os}
                    onChange={(e) => handleInputChange("os", e.target.value)}
                    className="w-full md:w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                  />
                </div>
              </div>

              {/* COLUNA DIREITA */}
              <div className="flex flex-col lg:h-[221px] lg:w-[514px] lg:-ml-[131px]">
                {/* Histórico */}
                <div className="mt-[2px] mb-2">
                  <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                    {" "}
                    Histórico
                  </label>
                  <input
                    type="text"
                    value={formData.historico}
                    onChange={(e) =>
                      handleInputChange("historico", e.target.value)
                    }
                    className="w-full lg:w-[514px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent"
                  />
                </div>

                {/* Observação */}
                <div className="flex-1 flex flex-col mt-[-5px]">
                  <label className="block text-[12px] font-medium text-[color:var(--orange-primary)] mb-1 md:mb-0 md:mt-0">
                    {" "}
                    Observação
                  </label>
                  <textarea
                    value={formData.observacao}
                    onChange={(e) =>
                      handleInputChange("observacao", e.target.value)
                    }
                    className="w-full lg:w-[514px] min-h-[150px] lg:h-[221px] px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange-primary)] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* LINHA 11: Botões */}
            <div className="pt-2 mt-[-23px] dark:border-slate-700">
              <div className="mt-[20px] flex justify-between sm:justify-end sm:space-x-[13px]">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-[71px] h-[28px] text-sm font-medium text-[color:var(--orange-primary)] bg-gray-100 dark:bg-slate-700 rounded hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors order-2 sm:order-1"
                >
                  Fechar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // Primeiro executa onConfirm se existir (para salvar)
                    if (onConfirm) {
                      onConfirm(formData);
                    }

                    // Depois fecha o modal
                    onClose();

                    // Finalmente chama o outro modal
                    if (onGenerateClick) {
                      onGenerateClick();
                    }
                  }}
                  className="w-[71px] h-[28px] text-sm font-medium text-white bg-[color:var(--orange-primary)] rounded hover:bg-[#d45a00] transition-colors order-1 sm:order-2"
                >
                  OK
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* COMMAND DIALOG PARA BUSCA DE CLIENTE - COM ESTILO PERSONALIZADO */}
      <CommandDialog
        open={clienteSquareArrowDownOpen}
        onOpenChange={setClienteSquareArrowDownOpen}
      >
        <CommandInput
          placeholder="Buscar cliente por nome, código ou CNPJ..."
          className="border-0 focus:ring-0 h-12 rounded-none"
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Nenhum cliente encontrado.
          </CommandEmpty>
          <CommandGroup heading="Clientes disponíveis">
            {clientesOptions.map((cliente) => (
              <CommandItem
                key={cliente.value}
                value={cliente.value}
                onSelect={handleSelectCliente}
                className="relative flex gap-2 select-none items-center rounded-sm text-sm outline-none
            data-[disabled=true]:pointer-events-none
            data-[selected=true]:bg-[color:var(--orange-primary)]
            data-[selected=true]:text-white
            data-[disabled=true]:opacity-50
            [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
            px-4 py-2 cursor-pointer
            hover:bg-orange-50 dark:hover:bg-slate-700
            border-b border-gray-100 dark:border-slate-600 last:border-b-0"
              >
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100 group-data-[selected=true]:text-white">
                      {cliente.label.split(" - ")[0]}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-data-[selected=true]:text-orange-100">
                      {cliente.label.split(" - ")[1]}
                    </span>
                  </div>
                  {cliente.details && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 group-data-[selected=true]:text-orange-100">
                      {cliente.details}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default ModalIncludeInstallment;
