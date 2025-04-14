"use client";

import styles from "./pendingList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDownloading } from "react-icons/md";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Table() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const err = useSelector(selectError);

  const column =[
    { title: "S.no" },
    { title: "Order ID" },
    { title: "PO no." },
    { title: "PO Date" },
    { title: "Client" },
    { title: "Job" },
    { title: "Dimension" },
    { title: "Paper" },
    { title: "GSM" },
    { title: "Quantity" },
    { title: "Rate" },
    { title: "Length" },
    { title: "Width" },
    { title: "Ups" },
  ];

  const downloadPDF = () => {
    // setDownloading(true);
    if (data && data?.pendingList.length === 0) {
      alert("No data available to generate PDF");
      return;
    }
    const doc = new jsPDF("l");

    // Add the heading
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Pending List:-", 14, 10); // Add the heading at (x, y) coordinates

    // Define the columns
    const columns = column;

    autoTable(doc, {
      startY: 17,
      head: [columns.map((col) => col.title)],
      body:
        data &&
        data.pendingList.map((item, index) => [
          `${index + 1}`,
          item.job_order,
          item.po_number,
          item.po_date,
          item.client,
          item.job_name,
          item.dimensions,
          item.paper,
          item.gsm,
          item.quantity,
          item.rate,
          item.sheet_size_length,
          item.sheet_size_width,
          item.sheet_size_ups,
        ]),

      styles: {
        fontSize: 7,
        cellPadding: 0,
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        cellPadding: 2,
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        cellPadding: 1,
        fillColor: [255, 255, 255], // RGB color for body background
        textColor: [0, 0, 0], // RGB color for body text
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // RGB color for alternate rows
      },
      margin: { top: 5, left: 1, right: 1, bottom: 2 },
    });

    // Save the PDF
    doc.save(`PendingList-${new Date().toISOString()}.pdf`);
    // setDownloading(false);
  };

  const expandTable = () => {
    if (document.getElementById("pendingListTable").style.height == "4rem") {
      document.getElementById("pendingListTable").style.height = "18rem";
      document.getElementById("pendingListTable").style.overflow = "auto";
    } else {
      document.getElementById("pendingListTable").style.height = "4rem";
      document.getElementById("pendingListTable").style.overflow = "hidden";
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 onClick={expandTable} style={{ cursor: "pointer" }}>
          Pending List ({data && data.pendingList?.length})
        </h2>
        {loading ? (
          ""
        ) : (
          <button className={styles.downloadBtn} onClick={downloadPDF}>
            <MdOutlineDownloading /> &nbsp; Download
          </button>
        )}
      </div>

      <div
        className={styles.jobsTable}
        // id="tableID"
        id="pendingListTable"
      >
        <table className={styles.table}>
          <thead>
            <tr>
              {column &&
                column.map((col, index) => (
                  <th
                    key={index}
                    style={{
                      background: col.color,
                      // borderRadius: "1rem",
                      // borderInline: "1rem solid var(--color-background)",
                    }}
                  >
                    {col.title}
                  </th>
                ))}
            </tr>
          </thead>

          <tbody>
            {data &&
              data.pendingList?.map((job, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{job.job_order}</td>
                    <td>{job.po_number}</td>
                    <td>{job.po_date}</td>
                    <td>{job.client}</td>
                    <td>{job.job_name}</td>
                    <td>{job.dimensions}</td>
                    <td>{job.paper}</td>
                    <td>{job.gsm}</td>
                    <td>{job.quantity}</td>
                    <td>{job.rate}</td>
                    <td>{job.sheet_size_length}</td>
                    <td>{job.sheet_size_width}</td>
                    <td>{job.sheet_size_ups}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {loading ? (
          <div
            style={{
              minHeight: "15rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
