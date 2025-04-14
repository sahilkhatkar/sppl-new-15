import Link from "next/link";
import React, { useState } from "react";
import styles from "../(main)/orderslist/page.module.css";

export default function Table(props) {
  const [column, setColumn] = useState(props.column);

  return (
    <div
      className={styles.jobsTable}
      id="tableID"
      style={{ minHeight: "max-content" }}
    >
      <table
        className={styles.table}
        //   ref={tableRef}
      >
        <thead>
          <tr>
            {column &&
              column.map((job, index) => (
                <td
                  key={index}
                  style={{
                    background: job.color,
                    borderRadius: "1rem",
                    // borderInline: "1rem solid var(--color-background)",
                  }}
                >
                  {job.name}
                </td>
              ))}
          </tr>
        </thead>

        <tbody>
          {props.data &&
            props.data.map((job, index) => {
              return (
                <tr key={index}>
                  <td>{job.designer}</td>
                  <td>
                    {job.pending +
                      job.repeat +
                      job.approved +
                      job.sentForApproval +
                      job.hold}
                  </td>
                  <td>{job.repeat}</td>
                  <td>{job.approved}</td>
                  <td>{job.pending}</td>
                  <td>{job.sentForApproval}</td>
                  <td>{job.hold}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* <div className={styles.pagination}>
        <p>{`Total pages: ${npage}`}</p>
        <div>
          <li className={`${currentPage === 1 ? styles.disabledLi : ""}`}>
            <Link
              href="#tableID"
              onClick={() => {
                if (currentPage === 1) return 0;
                if (currentPage != 1) setCurrentPage(currentPage - 1);
              }}
              style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
            >
              <IoArrowBackCircleOutline /> Previous
            </Link>
          </li>

          <li>
            <Link href="#tableID" style={{ color: "var(--color-background)" }}>
              {currentPage}
            </Link>
          </li>
          <li className={`${currentPage === npage ? styles.disabledLi : ""}`}>
            <Link
              href="#tableID"
              onClick={() => {
                // if (currentPage === npage) return 0;
                if (currentPage != npage) setCurrentPage(currentPage + 1);
              }}
              style={{
                pointerEvents: currentPage === npage ? "none" : "auto",
              }}
            >
              Next
              <IoArrowForwardCircleOutline />
            </Link>
          </li>
        </div>
        <p>
          {firstIndex}-{filterJobList.length ? lastIndex : 0} of{" "}
          {filterJobList.length} results
        </p>
      </div> */}
    </div>
  );
}
