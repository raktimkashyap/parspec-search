"use client";
import React, { useEffect, useRef } from "react";
import styles from "./searchListItem.module.css";
import clsx from "clsx";
import { ListItemInterface } from "@/interfaces/ListItemInterface";

const SearchListItem = ({
  searchValue,
  itemData,
  onHighLight,
  index,
  selectedIndex,
}: ListItemInterface) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedIndex]);

  const highlightText = (text: string, highlight: string) => {
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((phrase, index) =>
      phrase.toLowerCase() === highlight.toLowerCase() ? (
        <span className={styles.highlight} key={index}>
          {phrase}
        </span>
      ) : (
        phrase
      )
    );
  };

  return (
    <div
      ref={selectedIndex === index ? scrollRef : null}
      className={clsx(styles.root, {
        [styles.selected]: index === selectedIndex,
      })}
      onMouseMove={() => onHighLight && onHighLight(index)}
    >
      <div className={styles.contents}>
        <h1 className={styles.userId}>
          {" "}
          {highlightText(itemData.id, searchValue)}
        </h1>
        <p className={styles.userName}>
          {highlightText(itemData.name, searchValue)}
        </p>

        {itemData.items
          .join(", ")
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ? (
          <li className={styles.foundInItems}>
            <span className={styles.highlight}>{`"${searchValue}"`}</span>
            {` found in items`}
          </li>
        ) : null}

        <p className={styles.address}>
          {highlightText(itemData.address, searchValue)}
        </p>
      </div>
    </div>
  );
};

export default SearchListItem;
