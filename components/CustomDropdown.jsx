'use client';

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from "./salesComponent.module.css";

export default function CustomDropdown({defaultValue, options}) {
  const [title, setTitle] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);

  function changeData(e) {
    console.log(e);
  }

  return (
    <div className={styles.dropdown}>
      <button
        // onClick={changetitle}
        className={styles.dropbtn}
        id="dropBtnRef"
      >
        {/* <h2> */}
        {title}
        {showDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
        {/* </h2> */}
      </button>
      <div
        id="myDropdown"
        className={
          showDropdown
            ? ` ${styles["dropdown-content"]} ${styles.show}`
            : styles["dropdown-content"]
        }
      >
        <button onClick={(e) => changeData(e)}>{title}</button>
        <button onClick={(e) => changeData(e)}>This Week</button>
        <button onClick={(e) => changeData(e)}>This Month</button>
      </div>
    </div>
  );
}
