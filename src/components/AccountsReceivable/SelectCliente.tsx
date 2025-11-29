import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Search } from "lucide-react";
import { useState, useMemo } from "react";

type ClienteOption = {
  value: string;
  label: string;
};

function parseCliente(label: string) {
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

export default function SelectCliente({
  value,
  options,
  onChange,
}: {
  value: string;
  options: ClienteOption[];
  onChange: (v: string) => void;
}) {
  const selected = options.find((o) => o.value === value);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  // Listagem filtrada pelo texto digitado no trigger
  const filtered = useMemo(() => {
    if (!filter) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, options]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Agora vira input de texto real */}
      <PopoverTrigger asChild>
        <div
          className="
    w-full              /* mobile/tablet */
    lg:w-[630px]        /* desktop */
    h-[28px]
    flex items-center
    border border-orange-500
    rounded
    px-2
    bg-white dark:bg-slate-800
    text-sm
    cursor-pointer
    text-gray-900 dark:text-gray-100
  "
        >
          <input
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Selecione..."
            value={filter || selected?.label || ""}
            onChange={(e) => {
              setFilter(e.target.value);
              setOpen(true); // abre automaticamente ao digitar
            }}
          />
          <Search
            className="w-4 h-4"
            style={{ color: "var(--orange-primary)" }}
          />
        </div>
      </PopoverTrigger>

      {/* Dropdown SEM campo de busca */}
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        className="
    p-0 bg-white dark:bg-slate-800 border border-orange-500 shadow-xl
    w-full                /* MOBILE: 100% */
    sm:w-[420px]          /* TABLET: largura média */
    md:w-[520px]          /* TABLET GRANDE */
    lg:w-[630px]          /* DESKTOP: largura final */
  "
      >
        <Command>
          <CommandList>
            <CommandEmpty className="text-gray-500 dark:text-gray-400">
              Nenhum resultado.
            </CommandEmpty>

            <CommandGroup>
              {filtered.map((opt) => {
                const p = parseCliente(opt.label);

                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      onChange(opt.value);
                      setFilter(""); // limpa o filtro
                      setOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-700"
                  >
                    <div className="flex flex-col w-full">
                      <span className="text-[13px] font-semibold text-black dark:text-white">
                        {p.nome}
                      </span>

                      <div className="flex justify-between w-full text-orange-600 dark:text-orange-400 text-[12px]">
                        <span>{p.codigo}</span>
                        <span>{p.documento}</span>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
