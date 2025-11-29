import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from "react";
import SelectCliente from "@/components/AccountsReceivable/SelectCliente";
const inputBase = "w-full h-[28px] px-3 py-1 rounded border border-gray-300 dark:border-slate-600 " +
    "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 " +
    "focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent text-sm";
const DataFilter = ({ filters, onFilterChange }) => {
    const handleFieldChange = useCallback((rowIndex, fieldIndex, value) => {
        const updated = filters.map((row) => row.map((f) => ({ ...f })));
        updated[rowIndex][fieldIndex].value = value;
        onFilterChange(updated);
    }, [filters, onFilterChange]);
    const renderField = (field, rowIndex, fieldIndex) => {
        // Campos especiais com dropdown do Figma
        if (field.label === "Cliente" ||
            field.label === "Empresa" ||
            field.label === "Vendedor") {
            return (_jsx(SelectCliente, { value: field.value, options: field.options ?? [], onChange: (v) => handleFieldChange(rowIndex, fieldIndex, v) }));
        }
        switch (field.type) {
            case "select":
                return (_jsxs("select", { value: field.value, onChange: (e) => handleFieldChange(rowIndex, fieldIndex, e.target.value), className: inputBase, children: [_jsx("option", { value: "", children: "Selecione..." }), field.options?.map((op) => (_jsx("option", { value: op.value, children: op.label }, op.value)))] }));
            case "date":
                return (_jsx("input", { type: "date", value: field.value, onChange: (e) => handleFieldChange(rowIndex, fieldIndex, e.target.value), className: inputBase }));
            case "radio":
                return (_jsx("div", { className: "flex gap-4 flex-wrap", children: field.options?.map((op) => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "radio", name: field.label, value: op.value, checked: field.value === op.value, onChange: (e) => handleFieldChange(rowIndex, fieldIndex, e.target.value), className: "w-4 h-4 text-orange-500 focus:ring-orange-500" }), _jsx("span", { className: "text-sm", children: op.label })] }, op.value))) }));
            default:
                return (_jsx("div", { className: "relative", children: _jsx("input", { type: "text", value: field.value, onChange: (e) => handleFieldChange(rowIndex, fieldIndex, e.target.value), placeholder: field.placeholder, className: inputBase }) }));
        }
    };
    return (_jsx("div", { className: "bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm", children: _jsx("div", { className: "max-w-full mx-auto px-4 py-4", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [_jsx("div", { className: "flex-1 space-y-4", children: [
                            { label: "Cliente", path: filters[0]?.[0] },
                            { label: "Empresa", path: filters[1]?.[0] },
                            { label: "Vendedor", path: filters[2]?.[0] },
                        ].map((item, i) => (_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "block text-sm font-semibold text-orange-600 dark:text-orange-400", children: item.label }), item.path && renderField(item.path, i, 0)] }, i))) }), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
                                    { label: "Período", row: 0, col: 1 },
                                    { label: "Tipo Data", row: 0, col: 2 },
                                ].map((item, i) => (_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "block text-sm font-semibold text-orange-600 dark:text-orange-400", children: item.label }), filters[item.row]?.[item.col] &&
                                            renderField(filters[item.row][item.col], item.row, item.col)] }, i))) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
                                    { label: "Nota Fiscal", row: 1, col: 1 },
                                    { label: "Duplicata", row: 1, col: 2 },
                                    { label: "Pedido", row: 1, col: 3 },
                                    { label: "Orçamento", row: 1, col: 4 },
                                ].map((item, i) => (_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "block text-sm font-semibold text-orange-600 dark:text-orange-400", children: item.label }), filters[item.row]?.[item.col] &&
                                            renderField(filters[item.row][item.col], item.row, item.col)] }, i))) }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "block text-sm font-semibold text-orange-600 dark:text-orange-400", children: "Situa\u00E7\u00E3o" }), filters[2]?.[1] && renderField(filters[2][1], 2, 1)] })] })] }) }) }));
};
export default DataFilter;
