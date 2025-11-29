import React from "react";
export type FieldType = "text" | "select" | "date" | "radio";
export interface FilterOption {
    value: string;
    label: string;
}
export interface FilterField {
    label: string;
    value: string;
    placeholder?: string;
    type?: FieldType;
    options?: FilterOption[];
}
export interface DataFilterProps {
    filters: FilterField[][];
    onFilterChange: (filters: FilterField[][]) => void;
}
declare const DataFilter: React.FC<DataFilterProps>;
export default DataFilter;
