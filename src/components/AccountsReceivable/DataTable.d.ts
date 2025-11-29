import React from "react";
export interface TableRow {
    id: string;
    selected?: boolean;
    cliente: string;
    codigo: string;
    vencimento: string;
    valor: string;
    duplicata: string;
    valorDuplicata: string;
    valorTotal: string;
}
export interface DataTableProps {
    data: TableRow[];
    onRowSelect?: (selectedRows: string[]) => void;
}
declare const DataTable: React.FC<DataTableProps>;
export default DataTable;
