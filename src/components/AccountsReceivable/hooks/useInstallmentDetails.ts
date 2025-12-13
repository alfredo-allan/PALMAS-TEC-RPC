// src/components/AccountsReceivable/hooks/useInstallmentDetails.ts

import { TableRow } from "../DataTable"; // Assumindo que TableRow está disponível

export interface ParcelaDetalhe {
  par: number;
  vencimento: string;
  valor: string;
  dias: number | string;
  multa: string;
  juros: string;
  desconto: string;
  valorPago: string;
  dataPagamento: string;
  tipo: string;
}

// Função utilitária para formatar Date para DD/MM/AAAA
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const useInstallmentDetails = (rowData: TableRow | null) => {
  if (!rowData || !rowData.valorTotal || !rowData.vencimento) {
    return [];
  }

  const totalParcelas = 13;

  // 1. DEFINIR DATA BASE DE PARTIDA E DIA FIXO
  const baseVencimentoParts = rowData.vencimento.split("/"); // Ex: ["04", "11", "2022"]

  const initialMonth = parseInt(baseVencimentoParts[1]) - 1;
  const initialYear = parseInt(baseVencimentoParts[2]);

  // Dia fixo para o vencimento (O mockup Frame 396.png usa o dia 5)
  const fixedDay = 5;

  // Cria a data base para a PRIMEIRA PARCELA da sequência, fixando o dia.
  // Usamos o mês do rowData.vencimento, mas forçamos o dia 5.
  const initialBaseDate = new Date(initialYear, initialMonth, fixedDay);

  if (isNaN(initialBaseDate.getTime())) {
    console.error("Data de Vencimento da linha inválida:", rowData.vencimento);
    return [];
  }

  // 2. CÁLCULOS DE VALORES (Mantidos)
  const valorTotalNumerico = parseFloat(
    rowData.valorTotal.replace("R$", "").replace(/\./g, "").replace(",", ".")
  );

  const valorParcelaBase = valorTotalNumerico / totalParcelas;
  const multaFixaPorParcela = 1.21;
  const jurosFixosPorParcela = 2.54;

  const formatCurrency = (value: number) =>
    `R$ ${value.toFixed(2).replace(".", ",")}`;

  const parcelas: ParcelaDetalhe[] = Array.from(
    { length: totalParcelas },
    (_, index) => {
      const numParcela = index + 1;

      // 3. CALCULAR VENCIMENTO SEQUENCIAL (Index-Based com CLONAGEM SEGURA)

      // CLONAGEM SEGURA: Garante que cada iteração começa com uma data limpa
      const vencimentoDate = new Date(initialBaseDate.getTime());

      // Avança o mês exatamente pelo índice (0, 1, 2, 3... meses)
      // ESTA É A MUDANÇA PRINCIPAL: O setMonth avança o mês a partir do mês inicial + index
      vencimentoDate.setMonth(vencimentoDate.getMonth() + index);

      // Garante que o dia é mantido (corrige o bug de 31 dias)
      // Se o setMonth pulou o dia (ex: foi para 3 de março), setDate(fixedDay) traz ele de volta.
      if (vencimentoDate.getDate() !== fixedDay) {
        vencimentoDate.setDate(fixedDay);
      }

      const vencimentoCalculado = formatDate(vencimentoDate);

      // Simulação de Data de Pagamento: 5 dias após o vencimento
      const dataPagamentoObj = new Date(vencimentoDate);
      dataPagamentoObj.setDate(vencimentoDate.getDate() + 5);
      const dataPagamentoSimulada = formatDate(dataPagamentoObj);

      const diasSimulados = 5;
      const valorPago =
        valorParcelaBase + multaFixaPorParcela + jurosFixosPorParcela;

      return {
        par: numParcela,
        vencimento: vencimentoCalculado,
        valor: formatCurrency(valorParcelaBase),
        dias: diasSimulados,
        multa: formatCurrency(multaFixaPorParcela),
        juros: formatCurrency(jurosFixosPorParcela),
        desconto: formatCurrency(0),
        valorPago: formatCurrency(valorPago),
        dataPagamento: dataPagamentoSimulada,
        tipo: "Boleto",
      };
    }
  );

  return parcelas;
};

export default useInstallmentDetails;
