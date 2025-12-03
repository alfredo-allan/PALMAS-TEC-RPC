// hooks/useGenerateInstallmentsModal.ts
import { useState, useCallback } from "react";

// Tipos específicos para o modal de gerar parcelas
export interface GenerateInstallmentsData {
  empresa?: string;
  cliente?: string;
  tipo: string;
  acrescimo: boolean;
  desconto: boolean;
  outros: boolean;
  valor: string;
  especie: string;
  portador: string;
  prazo: string;
}

export interface ParcelaGerada {
  numero: number;
  dias: number;
  vencimento: string;
  valor: string;
}

interface UseGenerateInstallmentsModalReturn {
  isOpen: boolean;
  modalData: GenerateInstallmentsData | null;
  parcelas: ParcelaGerada[];

  openModal: (data?: Partial<GenerateInstallmentsData>) => void;
  closeModal: () => void;

  generateParcelas: (data: GenerateInstallmentsData) => ParcelaGerada[];
  updateParcelas: (novasParcelas: ParcelaGerada[]) => void;
  clearParcelas: () => void;

  calcularTotal: () => string;
  contarParcelas: () => number;
}

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

export const useGenerateInstallmentsModal =
  (): UseGenerateInstallmentsModalReturn => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<GenerateInstallmentsData | null>(
      null
    );
    const [parcelas, setParcelas] = useState<ParcelaGerada[]>([]);

    const openModal = useCallback(
      (data?: Partial<GenerateInstallmentsData>) => {
        const mergedData = {
          ...DEFAULT_DATA,
          ...data,
        };

        setModalData(mergedData);

        // Gera parcelas iniciais automaticamente
        if (mergedData.valor && mergedData.prazo) {
          const parcelasGeradas = generateParcelas(mergedData);
          setParcelas(parcelasGeradas);
        }

        setIsOpen(true);
      },
      []
    );

    const closeModal = useCallback(() => {
      setIsOpen(false);
      setModalData(null);
      setParcelas([]);
    }, []);

    const generateParcelas = useCallback(
      (data: GenerateInstallmentsData): ParcelaGerada[] => {
        const novasParcelas: ParcelaGerada[] = [];

        try {
          // Converte valor para número
          const valorNumerico = parseFloat(
            data.valor
              .replace(/\./g, "")
              .replace(",", ".")
              .replace("R$", "")
              .trim()
          );

          if (isNaN(valorNumerico) || valorNumerico <= 0) {
            return [];
          }

          const prazo = parseInt(data.prazo) || 30;
          const numParcelas = 10; // Padrão de 10 parcelas
          const valorPorParcela = valorNumerico / numParcelas;

          for (let i = 1; i <= numParcelas; i++) {
            const dias = i * prazo;
            const dataVencimento = new Date();
            dataVencimento.setDate(dataVencimento.getDate() + dias);

            novasParcelas.push({
              numero: i,
              dias,
              vencimento: dataVencimento.toLocaleDateString("pt-BR"),
              valor: valorPorParcela.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            });
          }
        } catch (error) {
          console.error("Erro ao gerar parcelas:", error);
        }

        return novasParcelas;
      },
      []
    );

    const updateParcelas = useCallback((novasParcelas: ParcelaGerada[]) => {
      setParcelas(novasParcelas);
    }, []);

    const clearParcelas = useCallback(() => {
      setParcelas([]);
    }, []);

    const calcularTotal = useCallback((): string => {
      if (parcelas.length === 0) return "0,00";

      const total = parcelas.reduce((sum, parcela) => {
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
    }, [parcelas]);

    const contarParcelas = useCallback((): number => {
      return parcelas.length;
    }, [parcelas]);

    return {
      isOpen,
      modalData,
      parcelas,
      openModal,
      closeModal,
      generateParcelas,
      updateParcelas,
      clearParcelas,
      calcularTotal,
      contarParcelas,
    };
  };
