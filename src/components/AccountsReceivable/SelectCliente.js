import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty, } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent, } from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
function parseCliente(label) {
    const regex = /^(\d+)\s-\s(.+?)\s-\s(.+)$/;
    const match = label.match(regex);
    if (!match)
        return {
            codigo: "",
            nome: label,
            documento: "",
        };
    return {
        codigo: match[1],
        nome: match[2],
        documento: match[3],
    };
}
export default function SelectCliente({ value, options, onChange, }) {
    const selected = options.find((o) => o.value === value);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("");
    // Listagem filtrada pelo texto digitado no trigger
    const filtered = useMemo(() => {
        if (!filter)
            return options;
        return options.filter((o) => o.label.toLowerCase().includes(filter.toLowerCase()));
    }, [filter, options]);
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs("div", { className: "\n    w-full              /* mobile/tablet */\n    lg:w-[630px]        /* desktop */\n    h-[28px]\n    flex items-center\n    border border-orange-500\n    rounded\n    px-2\n    bg-white dark:bg-slate-800\n    text-sm\n    cursor-pointer\n    text-gray-900 dark:text-gray-100\n  ", children: [_jsx("input", { className: "flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400", placeholder: "Selecione...", value: filter || selected?.label || "", onChange: (e) => {
                                setFilter(e.target.value);
                                setOpen(true); // abre automaticamente ao digitar
                            } }), _jsx(Search, { className: "w-4 h-4", style: { color: "var(--orange-primary)" } })] }) }), _jsx(PopoverContent, { side: "bottom", align: "start", sideOffset: 4, className: "\n    p-0 bg-white dark:bg-slate-800 border border-orange-500 shadow-xl\n    w-full                /* MOBILE: 100% */\n    sm:w-[420px]          /* TABLET: largura m\u00E9dia */\n    md:w-[520px]          /* TABLET GRANDE */\n    lg:w-[630px]          /* DESKTOP: largura final */\n  ", children: _jsx(Command, { children: _jsxs(CommandList, { children: [_jsx(CommandEmpty, { className: "text-gray-500 dark:text-gray-400", children: "Nenhum resultado." }), _jsx(CommandGroup, { children: filtered.map((opt) => {
                                    const p = parseCliente(opt.label);
                                    return (_jsx(CommandItem, { value: opt.value, onSelect: () => {
                                            onChange(opt.value);
                                            setFilter(""); // limpa o filtro
                                            setOpen(false);
                                        }, className: "px-4 py-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-700", children: _jsxs("div", { className: "flex flex-col w-full", children: [_jsx("span", { className: "text-[13px] font-semibold text-black dark:text-white", children: p.nome }), _jsxs("div", { className: "flex justify-between w-full text-orange-600 dark:text-orange-400 text-[12px]", children: [_jsx("span", { children: p.codigo }), _jsx("span", { children: p.documento })] })] }) }, opt.value));
                                }) })] }) }) })] }));
}
