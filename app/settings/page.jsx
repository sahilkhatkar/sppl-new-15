"use client";

import styles from "./page.module.css";
import { useTheme } from "../ThemeProvider";
import { useData } from "../DataProvider";

export default function SignOutPage() {
  
  const { theme, toggleTheme } = useTheme();

  console.log("Data", useData());

  return (
    <div className={styles.container}>
      <h1>Settings</h1>
      <div className={styles.sessionDetails}>
        <p>Theme: </p>

        <button onClick={toggleTheme}>
          {theme === "Light" ? "Dark" : "Light"}
        </button>
      </div>

      <div>
        <p>Developer Options</p>

        <label className="switch">
          <input type="text" onChange={(e) => console.log(e.target.value)} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}
