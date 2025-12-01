import { useState, useMemo } from "react";
import { Search } from "lucide-react";
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

// Interfaces para tipagem
interface ClienteOption {
  value: string;
  label: string;
}

interface ParsedCliente {
  codigo: string;
  nome: string;
  documento: string;
}

interface SelectClienteProps {
  value: string;
  options: ClienteOption[];
  onChange: (value: string) => void;
}

// Função utilitária para parse do cliente
function parseCliente(label: string): ParsedCliente {
  const regex = /^(\d+)\s-\s(.+?)\s-\s(.+)$/;
  const match = label.match(regex);

  if (!match) {
    return {
      codigo: "",
      nome: label,
      documento: "",
    };
  }

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
}: SelectClienteProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const selected = options.find((o) => o.value === value);

  // Listagem filtrada pelo texto digitado no trigger
  const filteredOptions = useMemo(() => {
    if (!filter) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
    setOpen(true); // abre automaticamente ao digitar
  };

  const handleOptionSelect = (selectedValue: string): void => {
    onChange(selectedValue);
    setFilter(""); // limpa o filtro
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger com input de texto real */}
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
            onChange={handleInputChange}
          />
          <Search
            className="w-4 h-4"
            style={{ color: "var(--orange-primary)" }}
          />
        </div>
      </PopoverTrigger>

      {/* Dropdown sem campo de busca interno */}
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
              {filteredOptions.map((option) => {
                const parsedCliente = parseCliente(option.label);

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleOptionSelect(option.value)}
                    className="px-4 py-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-700"
                  >
                    <div className="flex flex-col w-full">
                      <span className="text-[13px] font-semibold text-black dark:text-white">
                        {parsedCliente.nome}
                      </span>

                      <div className="flex justify-between w-full text-orange-600 dark:text-orange-400 text-[12px]">
                        <span>{parsedCliente.codigo}</span>
                        <span>{parsedCliente.documento}</span>
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
