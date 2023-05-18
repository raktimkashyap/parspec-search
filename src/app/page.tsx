"use client";
import SearchBar from "@/components/SearchBar";
import styles from "./page.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { getUsers } from "@/services/userService";
import SearchListItem from "@/components/SearchListItem";
import clsx from "clsx";
import useListNavigation from "@/hooks/useListNavigation";
import { UserDataInterface } from "@/interfaces/UserDataInterface";

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [userData, setUserData] = useState<UserDataInterface[]>([]);

  const filteredItems = userData.filter((item: UserDataInterface) => {
    const { id, name, items, address, pincode } = item;
    const search: string = searchText.toLowerCase();
    return (
      id.toLowerCase().includes(search) ||
      name.toLowerCase().includes(search) ||
      items.some((item: string) => item.toLowerCase().includes(search)) ||
      address.toLowerCase().includes(search) ||
      pincode.toLowerCase().includes(search)
    );
  });

  const { selectedIndex, handleHighlightSelected } =
    useListNavigation(filteredItems);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUsers();
      if (data.success) {
        setUserData(data.users);
      }
    };

    getUserData();
  }, []);

  const handleSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const clearSearch = () => {
    setSearchText("");
    handleHighlightSelected(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div
          className={clsx({
            [styles.searchActive]: searchText.trim().length > 0,
          })}
        >
          <SearchBar
            value={searchText}
            onChange={handleSearchText}
            clearSearch={clearSearch}
            placeholder="Search by Id, Name, Address or Pincode"
          />
          {searchText.trim().length > 0 && filteredItems.length > 0 ? (
            <div className={styles.searchList}>
              {filteredItems.map((item: any, index: number) => (
                <SearchListItem
                  onHighLight={handleHighlightSelected}
                  key={item.id}
                  index={index}
                  selectedIndex={selectedIndex}
                  searchValue={searchText}
                  itemData={item}
                />
              ))}
            </div>
          ) : searchText.trim().length > 0 && filteredItems.length < 1 ? (
            <div className={styles.notFound}>No User Found</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
