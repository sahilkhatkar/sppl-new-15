import React from "react";
import { auth } from "../auth";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";

export default async function ShowDevTools() {
  const session = await auth();
  console.table("Show devTools sessionObj: ",session);
  return (
    <li>
      <Link
        href="/devtools"
        className={`${pathname === "/devtools" ? styles.active : ""}`}
      >
        <IoSettingsOutline />
        Developer Tools
      </Link>
    </li>
  );
}
