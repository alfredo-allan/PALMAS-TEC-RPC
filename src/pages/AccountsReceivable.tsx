import { useState } from "react";
import Header from "../components/AccountsReceivable/Header";
import DataFilter from "../components/AccountsReceivable/DataFilter";
import type { FilterField } from "../components/AccountsReceivable/DataFilter";
import DataTable, {
  type TableRow,
} from "../components/AccountsReceivable/DataTable";
import ModalIncluirParcela from "../components/AccountsReceivable/ModalIncludeInstallment";

// Interface para os dados do formulário do modal
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

// Dados fictícios para o modal
const mockParcelaData: ParcelaData = {
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

export default function AccountsReceivable() {
  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState<FilterField[][]>([
    [
      {
        label: "Cliente",
        value: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
        type: "select",
        options: [
          {
            value: "1652",
            label:
              "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
          },
          { value: "outro", label: "Outro cliente" },
        ],
      },
      {
        label: "Período",
        value: "31/10/2010 até 31/10/2020",
        type: "text",
      },
      {
        label: "Tipo Data",
        value: "Vencimento",
        type: "select",
        options: [
          { value: "vencimento", label: "Vencimento" },
          { value: "emissao", label: "Emissão" },
        ],
      },
    ],
    [
      {
        label: "Empresa",
        value: "0- TODAS AS EMPRESAS",
        type: "select",
        options: [
          { value: "0", label: "0- TODAS AS EMPRESAS" },
          { value: "1", label: "1- EMPRESA A" },
        ],
      },
      {
        label: "Nota Fiscal",
        value: "",
        type: "text",
        placeholder: "Número da nota",
      },
      {
        label: "Duplicata",
        value: "",
        type: "text",
        placeholder: "Número duplicata",
      },
      {
        label: "Pedido",
        value: "",
        type: "text",
        placeholder: "Número pedido",
      },
      {
        label: "Orçamento",
        value: "",
        type: "text",
        placeholder: "Número orçamento",
      },
    ],
    [
      {
        label: "Vendedor",
        value: "12 - ICARO ALEGRANDRO PEREIRA NASCIMENTO - 886.654.258-33",
        type: "select",
        options: [
          {
            value: "12",
            label: "12 - ICARO ALEGRANDRO PEREIRA NASCIMENTO - 886.654.258-33",
          },
          { value: "outro", label: "Outro vendedor" },
        ],
      },
      {
        label: "Situação",
        value: "abertas",
        type: "radio",
        options: [
          { value: "abertas", label: "Abertas" },
          { value: "baixadas", label: "Baixadas" },
          { value: "canceladas", label: "Canceladas" },
          { value: "todos", label: "Todos" },
        ],
      },
    ],
  ]);

  const tableData: TableRow[] = [
    {
      id: "1",
      cliente:
        "15 - SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA - 10.552.934/C 2",
      emp: "2",
      pedido: "752",
      nota: "567",
      parc: "10",
      vencimento: "04/11/2022",
      valor: "R$ 238,92",
      dias: "5",
      multa: "R$ 11,95",
      juros: "R$ 4,78",
      valorTotal: "R$ 522,10",
    },
    {
      id: "2",
      cliente:
        "15- SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA - 10.552.934/C 2",
      emp: "2",
      pedido: "752",
      nota: "567",
      parc: "10",
      vencimento: "04/14/2022",
      valor: "R$ 238,92",
      dias: "8",
      multa: "R$ 19,11",
      juros: "R$ 7,64",
      valorTotal: "R$ 522,10",
    },
    {
      id: "3",
      cliente: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
      emp: "2",
      pedido: "752",
      nota: "567",
      parc: "10",
      vencimento: "31/10/2020",
      valor: "R$ 1.500,00",
      dias: "15",
      multa: "R$ 75,00",
      juros: "R$ 30,00",
      valorTotal: "R$ 1.650,00",
    },
  ];

  const handleRowSelect = (selectedRows: string[]) => {
    console.log("Linhas selecionadas:", selectedRows);
  };

  // Funções para controlar o modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = (data: ParcelaData) => {
    console.log("Dados da parcela a ser incluída:", data);
    // Aqui você faria a chamada para a API
    alert("Parcela incluída com sucesso!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Passa a função para abrir o modal para o Header */}
      <Header onIncluirClick={handleOpenModal} />

      <DataFilter filters={filters} onFilterChange={setFilters} />

      <main className="max-w-full mx-auto py-8">
        <div className="space-y-6">
          <DataTable data={tableData} onRowSelect={handleRowSelect} />
        </div>
      </main>

      {/* Modal de Incluir Parcela */}
      <ModalIncluirParcela
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        initialData={mockParcelaData}
      />
    </div>
  );
}
