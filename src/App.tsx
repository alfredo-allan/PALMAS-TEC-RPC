import { useState } from "react";
import Header from "./components/Header";
import DataFilter from "./components/DataFilter";
import type { FilterField } from "./components/DataFilter";
import DataTable, { type TableRow } from "./components/DataTable";

function App() {
  const [filters, setFilters] = useState<FilterField[][]>([
    // Linha 0: Cliente, Período, Tipo Data
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
    // Linha 1: Empresa, Nota Fiscal, Duplicata, Pedido, Orçamento
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
    // Linha 2: Vendedor, Situação
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

  // Dados mock da tabela
  const tableData: TableRow[] = [
    {
      id: "1",
      cliente:
        "15 - SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA - 10.552.934/C 2",
      codigo: "10",
      vencimento: "04/11/2022",
      valor: "R$ 238,92",
      duplicata: "632",
      valorDuplicata: "R$ 32,50",
      valorTotal: "R$ 522,10",
    },
    {
      id: "2",
      cliente:
        "15- SOLUGAO TI ASSISTENCIA TECNICA EM INFORMATICA LTDA - 10.552.934/C 2",
      codigo: "752",
      vencimento: "04/14/2022",
      valor: "R$ 238,92",
      duplicata: "567",
      valorDuplicata: "R$ 32,50",
      valorTotal: "R$ 522,10",
    },
    {
      id: "3",
      cliente: "1652 - WEB PALMAS PAPELARIA E INFORMATICA - 10.552.934/0001-90",
      codigo: "1652",
      vencimento: "31/10/2020",
      valor: "R$ 1.500,00",
      duplicata: "789",
      valorDuplicata: "R$ 150,00",
      valorTotal: "R$ 1.650,00",
    },
  ];

  const handleRowSelect = (selectedRows: string[]) => {
    console.log("Linhas selecionadas:", selectedRows);
    // Aqui você pode integrar com os filtros ou atualizar totais
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <DataFilter filters={filters} onFilterChange={setFilters} />

      {/* Conteúdo principal com a tabela */}
      <main className="max-w-full mx-auto py-8">
        {" "}
        <div className="space-y-6">
          {/* Tabela de dados - AGORA SEM A PROP COLUMNS */}
          <DataTable data={tableData} onRowSelect={handleRowSelect} />
        </div>
      </main>
    </div>
  );
}

export default App;
