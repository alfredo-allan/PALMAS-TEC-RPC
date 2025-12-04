import { LucideIcon } from "lucide-react";
import {
  NotebookTabs,
  Store,
  DollarSign,
  Building2,
  ChartColumnIncreasing,
} from "lucide-react";

export interface NavigationColumn {
  title: string;
  links: {
    label: string;
    href?: string;
  }[];
}

export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  iconColor: string;
  href?: string;
  columns?: NavigationColumn[];
}

export const useNavigation = () => {
  const navigationItems: NavigationItem[] = [
    {
      icon: NotebookTabs,
      label: "Cadastros",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      href: "/cadastros",
      columns: [
        {
          title: "Cadastros",
          links: [
            { label: "Cliente" },
            { label: "Usuário" },
            { label: "Empresa" },
            { label: "Fornecedor" },
            { label: "Transportadora" },
          ],
        },
        {
          title: "Produtos",
          links: [
            { label: "Produtos" },
            { label: "Acerto de Estoque" },
            { label: "Entrada e Saída Manual" },
          ],
        },
        {
          title: "Sub-section Title",
          links: [
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
          ],
        },
        {
          title: "Sub-section Title",
          links: [
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
          ],
        },
        {
          title: "Sub-section Title",
          links: [
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
          ],
        },
      ],
    },
    {
      icon: Store,
      label: "Comercial",
      iconColor: "text-blue-600 dark:text-blue-400",
      href: "/comercial",
      columns: [
        {
          title: "Sub-section Title",
          links: [
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
          ],
        },
      ],
    },
    {
      icon: DollarSign,
      label: "Financeiro",
      iconColor: "text-amber-600 dark:text-amber-400",
      href: "/financeiro",
      columns: [
        {
          title: "Contas a Receber",
          links: [{ label: "Contas a Receber" }, { label: "Crédito Cliente" }],
        },
        {
          title: "Contas a Pagar",
          links: [{ label: "Contas a Pagar" }],
        },
        {
          title: "Boletos",
          links: [
            { label: "Remessa de Boletos" },
            { label: "Retorno de Boletos" },
          ],
        },
        {
          title: "Banco",
          links: [{ label: "Cadastro Bancário" }],
        },
        {
          title: "Sub-section Title",
          links: [
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
          ],
        },
      ],
    },
    {
      icon: Building2,
      label: "Fiscal",
      iconColor: "text-purple-600 dark:text-purple-400",
      href: "/fiscal",
      columns: [
        {
          title: "Sub-section Title",
          links: [
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
          ],
        },
      ],
    },
    {
      icon: ChartColumnIncreasing,
      label: "Relatórios",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      href: "/relatorios",
      columns: [
        {
          title: "Sub-section Title",
          links: [
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
            { label: "Sub-section Item" },
          ],
        },
      ],
    },
  ];
  return { navigationItems };
};
