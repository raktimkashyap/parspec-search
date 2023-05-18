import { ChangeEvent } from "react";

export interface SearchBarInterface {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    clearSearch: () => void;
    placeholder: string;
}