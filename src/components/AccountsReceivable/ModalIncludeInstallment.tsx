// ModalIncludeInstallment.tsx
import React, { useState } from "react";
import { X, Search, Calendar } from "lucide-react";

// Tipos para os props do modal
interface ModalIncludeInstallmentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (data: ParcelaData) => void;
  initialData?: ParcelaData;
}

// Interface para os dados do formulário
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

// Dados fictícios para exemplo
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

const ModalIncludeInstallment: React.FC<ModalIncludeInstallmentProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialData = mockData,
}) => {
  const [formData, setFormData] = useState<ParcelaData>(initialData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof ParcelaData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(formData);
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal Container - 777x585px */}
      <div
        className="relative w-[777px] h-[585px] bg-white dark:bg-slate-800 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho Laranja */}
        <div className="w-full h-[40px] border-b border-gray-200 dark:border-slate-700 rounded-t-lg flex items-center justify-between px-4">
          <h2 className="text-[#e66400] dark:text-[#e66400] font-bold text-lg">
            Incluir Parcela Avulsa
          </h2>
          <button
            onClick={onClose}
            className="text-[#e66400] dark:text-[#e66400] hover:bg-orange-50 dark:hover:bg-orange-900/20 p-1 rounded transition-colors"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>
        {/* Conteúdo do Modal */}
        <div className="p-4 h-[calc(585px-40px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-[20.30px]">
            {/* Linha 1: Fatura */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fatura
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.fatura}
                  onChange={(e) => handleInputChange("fatura", e.target.value)}
                  className="w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                />
                <Search
                  size={16}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#e66400]"
                />
              </div>
            </div>

            {/* Linha 2: Cliente */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cliente
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => handleInputChange("cliente", e.target.value)}
                  className="w-full h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                />
                <Search
                  size={16}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#e66400]"
                />
              </div>
            </div>

            {/* Linha 3: Empresa */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Empresa
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => handleInputChange("empresa", e.target.value)}
                  className="w-full h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                />
                <Search
                  size={16}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#e66400]"
                />
              </div>
            </div>

            {/* Linha 4: Vendedor */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Vendedor
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.vendedor}
                  onChange={(e) =>
                    handleInputChange("vendedor", e.target.value)
                  }
                  className="w-full h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                />
                <Search
                  size={16}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#e66400]"
                />
              </div>
            </div>

            {/* Grid com duas colunas */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* Coluna da Esquerda */}
              <div className="space-y-[20.30px]">
                {/* Data da Fatura */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data da fatura
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.dataFatura}
                      onChange={(e) =>
                        handleInputChange("dataFatura", e.target.value)
                      }
                      className="w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                    />
                    <Calendar
                      size={16}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#e66400]"
                    />
                  </div>
                </div>

                {/* Valor Total */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Valor Total
                  </label>
                  <input
                    type="text"
                    value={formData.valorTotal}
                    onChange={(e) =>
                      handleInputChange("valorTotal", e.target.value)
                    }
                    className="w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                  />
                </div>

                {/* Pedido */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pedido
                  </label>
                  <input
                    type="text"
                    value={formData.pedido}
                    onChange={(e) =>
                      handleInputChange("pedido", e.target.value)
                    }
                    className="w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                  />
                </div>

                {/* Nota */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nota
                  </label>
                  <input
                    type="text"
                    value={formData.nota}
                    onChange={(e) => handleInputChange("nota", e.target.value)}
                    className="w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                  />
                </div>

                {/* Cupom */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cupom
                  </label>
                  <input
                    type="text"
                    value={formData.cupom}
                    onChange={(e) => handleInputChange("cupom", e.target.value)}
                    className="w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                  />
                </div>

                {/* O.S. */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    O.S.
                  </label>
                  <input
                    type="text"
                    value={formData.os}
                    onChange={(e) => handleInputChange("os", e.target.value)}
                    className="w-[239px] h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Coluna da Direita */}
              <div className="space-y-[20.30px]">
                {/* Histórico */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Histórico
                  </label>
                  <input
                    type="text"
                    value={formData.historico}
                    onChange={(e) =>
                      handleInputChange("historico", e.target.value)
                    }
                    className="w-full h-[28px] px-3 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent"
                  />
                </div>

                {/* Observação */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Observação
                  </label>
                  <textarea
                    value={formData.observacao}
                    onChange={(e) =>
                      handleInputChange("observacao", e.target.value)
                    }
                    className="w-full h-[221px] px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#e66400] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-3 pt-6 mt-4 border-t border-gray-200 dark:border-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                Fechar
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-[#e66400] rounded hover:bg-[#d45a00] transition-colors"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalIncludeInstallment;
