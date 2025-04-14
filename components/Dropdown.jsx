import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from "./salesComponent.module.css";

export default function Dropdown() {
  const [timeFrame, setTimeFrame] = useState("Today");
  const [showDropdown, setShowDropdown] = useState(false);

  function changeData(e) {
    console.log(e);
  }

  return (
    <div className={styles.dropdown}>
      <button
        onClick={changeTimeframe}
        className={styles.dropbtn}
        id="dropBtnRef"
      >
        {/* <h2> */}
        {timeFrame}
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
        <button onClick={(e) => changeData(e)}>Today</button>
        <button onClick={(e) => changeData(e)}>This Week</button>
        <button onClick={(e) => changeData(e)}>This Month</button>
      </div>
    </div>
  );
}
