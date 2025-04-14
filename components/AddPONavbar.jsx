"use client";

import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddPONavbar() {
  const pathname = usePathname();
  return (
    <div className={styles.upperNavbar}>
      <Link
        className={`${pathname === "/add-po" ? styles.active : ""}`}
        href="/add-po"
      >
        Add PO
      </Link>
      <Link
        className={`${pathname === "/sheet-size" ? styles.active : ""}`}
        href="/sheet-size"
      >
        Sheet Size
      </Link>
      <Link
        className={`${pathname === "/sheet-available" ? styles.active : ""}`}
        href="sheet"
      >
        Sheet Availability
      </Link>
      <Link
        className={`${pathname === "/artwork" ? styles.active : ""}`}
        href="/artwork"
      >
        Artwork
      </Link>
      <Link
        className={`${pathname === "/jobcard" ? styles.active : ""}`}
        href="/jobcard"
      >
        Job Card
      </Link>
      <Link
        className={`${pathname === "/dispatch" ? styles.active : ""}`}
        href="/dispatch"
      >
        Dispatch
      </Link>
    </div>
  );
}
