"use client";

import React from "react";
import styles from "./searchbar.module.css";
import clsx from "clsx";
import Image from "next/image";
import { SearchBarInterface } from "@/interfaces/SearchBarInterface";

const SearchBar = ({
  value,
  onChange,
  placeholder,
  clearSearch,
}: SearchBarInterface) => {
  return (
    <div>
      <div
        className={clsx(styles.searchWrapper, {
          [styles.searchbarActive]: value.trim().length > 0,
        })}
      >
        <Image src={"/assets/searchIcon.svg"} alt="" width={24} height={24} />
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.searchbar}
        />
        {value.length > 0 && (
          <Image
            src={"/assets/closeIcon.svg"}
            alt=""
            width={24}
            height={24}
            className={styles.clearList}
            onClick={clearSearch}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
