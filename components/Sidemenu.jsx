"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./sidemenu.module.css";
import Link from "next/link";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdInfoOutline, MdOutlineBorderClear } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { TbNewSection } from "react-icons/tb";
import { BiLeftArrow } from "react-icons/bi";
import {
  PiCubeFocusFill,
  PiDotsThreeOutlineVerticalThin,
} from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";

import ShowDevTools from "./ShowDevTools";

export default function Sidemenu() {

  const sideMenuRef = useRef();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullUrl = `${pathname}`;
  console.log(fullUrl);
  // const fullUrl = `${window.location.origin}${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`;

  const [menuState, setMenuState] = useState(false);

  const showHideMenu = () => {
    console.log("helllo");

    sideMenuRef.current.classList.toggle(styles.hideMenu);
    // setMenuState(!menuState);
  };

  return (
    <>
      <div
        className={styles.sidemenu}
        ref={sideMenuRef}
        id="sideMenuID"
        onClick={() => sideMenuRef.current.classList.toggle(styles.showMenu)}
      >
        <div className={styles.sidemenuUpper}>
          <div>
            {/* <h1>Current URL</h1>
            <p>{fullUrl}</p> */}
            {/* <Image
              src="/public/sppl-logo.webp"
              width={80}
              height={80}
              alt="sppl-logo"
            /> */}

            <h2 style={{ fontWeight: "bold", textAlign: 'center', color: "red !important" }}>SPPL</h2>
          </div>
          <ul>
            <li>
              <Link
                href="/"
                className={`${pathname === "/" ? styles.active : ""}`}
              >
                <IoHomeOutline />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/orderslist"
                className={`${pathname === "/orderslist" ? styles.active : ""}`}
              >
                <RiDashboardHorizontalLine />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                href="/add-po"
                className={`${pathname.startsWith("/add-po") ? styles.active : ""
                  }`}
              >
                <TbNewSection />
                <span>

                  Add PO
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/jobstatus"
                className={`${pathname.startsWith("/jobstatus") ? styles.active : ""
                  }`}
              >
                <PiCubeFocusFill />
                <span>

                  Job status
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/excess-quantity"
                className={`${pathname === "/excess-quantity" ? styles.active : ""
                  }`}
              >
                <AiOutlineProduct />
                <span>

                  Excess qty
                </span>
              </Link>
            </li> */}
            <li>
              <Link
                href="/downloads"
                className={`${pathname === "/downloads" ? styles.active : ""
                  }`}
              >
                <LiaDownloadSolid />
                <span>
                  List
                  {/* Downloads */}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className={`${pathname === "/settings" ? styles.active : ""}`}
              >
                <IoSettingsOutline />
                <span>

                  Settings
                </span>
              </Link>
            </li>

            {/* <li>
              <Link
                href="/filter-view"
                className={`${
                  pathname === "/filter-view" ? styles.active : ""
                }`}
              >
                <IoSettingsOutline />
                Filter View
              </Link>
            </li> */}

            {/* <li>
              <Link
                href="/devtools"
                className={`${pathname === "/devtools" ? styles.active : ""}`}
              >
                <IoSettingsOutline />
                Developer Tools
              </Link>
            </li> */}
            {/* <ShowDevTools /> */}
          </ul>
        </div>

        <div className={styles.sidemenuLower}>
          <ul>
            <li>
              <Link
                href="/help"
                className={`${pathname === "/help" ? styles.active : ""}`}
              >
                <MdInfoOutline />
                <span>

                  Help & information
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/signout"
                className={`${pathname === "/signout" ? styles.active : ""}`}
              >
                <HiOutlineMinusCircle />
                <span>

                  Log out
                </span>
              </Link>
            </li>
            {/* <p>2024</p> */}

            <li>
              {/* <Link onClick={showHideMenu}
              href="#menu" id="menu">
                <BiLeftArrow />
                Hide Menu
              </Link> */}
              <button className={styles.toggleMenu} onClick={showHideMenu}>
                <BiLeftArrow />
                <span>

                  Hide Menu
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.responsiveSideBar}>
        <p>{fullUrl}</p>
        <button
          onClick={() => {
            sideMenuRef.current.classList.toggle(styles.showMenu);
          }}
        >
          <PiDotsThreeOutlineVerticalThin />
        </button>
        <div></div>
      </div>
    </>
  );
}
