"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useState } from "react";
import styles from "./download.module.css";

import { MdOutlineDownloading } from "react-icons/md";

import { FaPaperPlane } from "react-icons/fa";

export const downloadPDF = (pendingListData, query, pdfHeading) => {
  // setDownloading(true);
  if (pendingListData.length === 0) {
    alert("No data available to generate PDF");
    return;
  }

  // const doc = new jsPDF("p");
  const doc = new jsPDF("l");

  // Add the heading
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`(${pendingListData.length}) ${pdfHeading}:-`, 14, 10); // Add the heading at (x, y) coordinates

  // Sorting the pendingListData array

  pendingListData.sort((a, b) => {
    if (a.client < b.client) return -1; // a comes before b

    // if (a.artwork_status < b.artwork_status) return -1; // a comes before b

    return 0; // a and b are equal
  });

  pendingListData.sort((a, b) => {
    // First, compare by client (ascending order)
    if (a.designer > b.designer) return 1;
    if (a.designer < b.designer) return -1;

    // First, compare by client (ascending order)
    // if (a.client > b.client) return 1;
    // if (a.client < b.client) return -1;

    // If client values are equal, compare by artwork_status (ascending order)
    // if (a.print_ready_status > b.print_ready_status) return 1;
    // if (a.print_ready_status < b.print_ready_status) return -1;

    // If both client and artwork_status are equal, compare by job_name (ascending order)
    // if (a.jobcard_status > b.jobcard_status) return 1;
    // if (a.jobcard_status < b.jobcard_status) return -1;

    return 0;
  });


  // pendingListData.sort((a, b) => {
  //   if (a.sheet_avail_status > b.sheet_avail_status) {
  //     return -1; // a comes before b
  //   }
  //   if (a.sheet_size < b.sheet_size) {
  //     return 1; // b comes before a
  //   }
  //   return 0; // a and b are equal
  // });

  // Define the columns
  const columns = [
    { title: "S.No" },
    { title: "Order ID" },
    { title: "Designer" },
    { title: "PO no." },
    { title: "Timestamp" },
    // { title: "PO date" },
    { title: "Client" },
    { title: "Job" },
    { title: "Quantity" },
    { title: "Paper" },
    { title: "Approval" },
    { title: "Artwork" },
    { title: "Remarks" },
    { title: "Job card" },
    { title: "Status" },
    // { title: "Dispatch" },
    // { title: "Balance" },
  ];

  autoTable(doc, {
    startY: 17,
    head: [columns.map((col) => col.title)],
    body: pendingListData.map((item, index) => [
      `${index + 1}`,
      item.job_order,
      item.designer,
      item.po_number,

      `${new Date(item.timestamp).getDate()}/${new Date(item.timestamp).getMonth() + 1
      }/${new Date(item.timestamp).getFullYear()}`,

      // `${new Date(item.timestamp).toLocaleDateString()}`,

      // `${new Date(item.timestamp).toDateString().slice(4)}`,

      // `${new Date(item.po_date).getDate()}/${
      //   new Date(item.po_date).getMonth() + 1
      // }/${new Date(item.po_date).getFullYear()}`,

      item.client,
      item.job_name,
      item.quantity,

      `${item.sheet_avail_status == "Yes" ? "Available" : "..."}`,
      // `${
      //   item.sheet_size_ups && item.sheet_size_length && item.sheet_size_width
      //     ? "Available"
      //     : "Pending"
      // }`,

      `${item.artwork_actual && item.artwork_actual
        ? `${new Date(item.artwork_actual).getDate()}/${new Date(item.artwork_actual).getMonth() + 1
        }/${new Date(item.artwork_actual).getFullYear()}`
        : ""
      }`,

      // `${item.artwork_status == "Sent for Approval" ? "Sent" : item.artwork_status == "Approved" ? 'A' : item.artwork_status == "Repeat" ? "R" : item.artwork_status == "Under Process" ? "P" : item.artwork_status}`,

      item.artwork_status,

      item.artwork_remarks,
      item.jobcard_status,
      // item.print_ready_status,
      // `${item.print_ready_status === "Material ready" ? "Ready" : item.print_ready_status === "Print complete" ? "P.C." : ""}`,
      `${item.print_ready_status === "Material ready" ? "Ready" : item.print_ready_status === "Print complete" ? "P.C." : ""}`,
      // item.dispatch_quantity,

      // `${
      //   item.dispatch_quantity ? item.dispatch_quantity - item.quantity : ""
      // }`,
    ]),

    styles: {
      // fontSize: 6,
      fontSize: 7,
      //(default)
      cellPadding: 0,
      halign: "left",
      valign: "middle",
    },
    headStyles: {
      cellPadding: 1,
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
    margin: { top: 5, left: 2, right: 4, bottom: 10 },

    didParseCell: (data) => {
      if (data.column.index === 12 && data.cell.raw < 0) {
        data.cell.styles.fillColor = [255, 0, 0]; // Red color for negative values
        data.cell.styles.textColor = [255, 255, 255]; // Optional: white text for contrast
      } else if (data.column.index === 12 && data.cell.raw > 0) {
        data.cell.styles.fillColor = [46, 207, 3]; // Green color for negative values
        data.cell.styles.textColor = [255, 255, 255]; // Optional: white text for contrast
      }

      if (data.column.index === 10 && data.cell.raw === "Sent for Approval") {
        data.cell.styles.fillColor = [255, 215, 0]; // Gold color
        data.cell.styles.textColor = [0, 0, 0]; // Optional: Black text for contrast
      }

      // if (data.column.index === 13 && data.cell.raw === "Material ready") {
      if (data.column.index === 13 && data.cell.raw === "Ready") {
        data.cell.styles.fillColor = [46, 207, 3]; // Green color for entire row
        data.cell.styles.textColor = [0, 0, 0]; // Optional: Black text for contrast
      }

    },

    didDrawPage: (data) => {
      // Get the current page number and total pages
      const pageCount = doc.internal.getNumberOfPages();
      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width || pageSize.getWidth();
      const pageHeight = pageSize.height || pageSize.getHeight();

      // Add the page number at the bottom center
      const pageString = `Page-${data.pageNumber}`;
      // const pageString = `Page ${data.pageNumber} of ${pageCount}`;
      doc.setFontSize(10);
      doc.text(pageString, pageWidth / 2, pageHeight - 6, {
        align: "center",
      });

    },
  });

  // Save the PDF
  doc.save(`${query}.pdf`);
  // setDownloading(false);
  // const pdfDataUrl = doc.output('dataurlnewwindow');
};
export default function Download({ pendingListData, query, pdfHeading }) {
  // const [downloading, setDownloading] = useState(false);

  return (
    <button
      className={styles.downloadBtn}
      onClick={downloadPDF(pendingListData?pendingListData:["no item"], query, pdfHeading)}
    // disabled={downloading}
    >
      <MdOutlineDownloading /> &nbsp;
      {/* {downloading && downloading ? " Downloading..." : " Download"} */}
      Download
    </button>
  );
}
