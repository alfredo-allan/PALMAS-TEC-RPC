type ClienteOption = {
    value: string;
    label: string;
};
export default function SelectCliente({ value, options, onChange, }: {
    value: string;
    options: ClienteOption[];
    onChange: (v: string) => void;
}): import("react").JSX.Element;
export {};
