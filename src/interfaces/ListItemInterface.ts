import { UserDataInterface } from "./UserDataInterface";

export interface ListItemInterface {
    searchValue: string;
    itemData: UserDataInterface;
    onHighLight: (index: number) => void;
    index: number;
    selectedIndex: number | null;
}