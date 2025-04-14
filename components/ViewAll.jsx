"use client";

import React, { useEffect, useState } from "react";
import styles from "./salesComponent.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "next/link";

export default function ViewAll({completedJobsBtnClick}) {
  const [timeFrame, setTimeFrame] = useState("Filter");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // const Name = async () => {
    //   let response = await getName();
    //   dispatch(setSession(response));
    // };
    // Name();

    window.onclick = function (e) {
      if (!e.target.matches("#dropBtnRef")) setShowDropdown(false);
    };
  }, []);

  function changeTimeframe() {
    setShowDropdown(!showDropdown);
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function changeData(e) {
    setTimeFrame(e.target.innerHTML);

    let temp = [];
    let totalValue = 0;
    let companyList = [];

    if (e.target.innerHTML == "Today")
      data.forEach((job) => {
        if (
          todayDate.getMonth() === new Date(job.timestamp).getMonth() &&
          todayDate.getDate() === new Date(job.timestamp).getDate()
        ) {
          totalValue += job.total;
          temp.push({ client: job.client, total: job.total });
        }
      });
    else if (e.target.innerHTML == "This Week")
      data.forEach((job) => {
        if (
          todayDate.getMonth() === new Date(job.timestamp).getMonth() &&
          todayDate.getDate() - 7 < new Date(job.timestamp).getDate()
        ) {
          totalValue += job.total;
          temp.push({ client: job.client, total: job.total });
        }
      });
    else if (e.target.innerHTML == "This Month")
      data.forEach((job) => {
        if (
          todayDate.getMonth() === new Date(job.timestamp).getMonth() &&
          new Date(job.timestamp).getDate() > 0
        ) {
          totalValue += job.total;
          temp.push({ client: job.client, total: job.total });
        }
      });

    // console.log(temp);

    temp.forEach((item) => {
      const existingClient = companyList.find(
        (job) => job.client === item.client
      );

      if (existingClient) existingClient.total += item.total;
      else companyList.push({ client: item.client, total: item.total });
    });

    setReportData({
      totalOrders: temp.length,
      companyList: companyList.sort((a, b) => b.total - a.total),
      totalValue: totalValue,
    });
  }

  return (
    <div className={styles.dropdown}>
      <button
        onClick={changeTimeframe}
        className={styles.dropbtn}
        id="dropBtnRef"
      >
        {timeFrame}
        {showDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      <div
        id="myDropdown"
        className={
          showDropdown
            ? ` ${styles["dropdown-content"]} ${styles.show}`
            : styles["dropdown-content"]
        }
      >
        <button onClick={completedJobsBtnClick}>Completed jobs</button>
        <button>Pending jobs</button>
        <button>Cancelled Jobs</button>
      </div>
    </div>
  );
}
