'use client';

import { useRef } from "react";
import html2canvas from "html2canvas";

const TableToImage = ({data}) => {
  // Table data object
  // const data = [
  //   { ID: 1, Name: "Item 1", Status: "Available" },
  //   { ID: 2, Name: "Item 2", Status: "Out of stock" },
  //   { ID: 3, Name: "Item 3", Status: "Available" },
  // ];

  // Ref to the table container
  const tableRef = useRef();

  // Function to capture table as an image
  const captureTable = async () => {
    const canvas = await html2canvas(tableRef.current);
    const imgData = canvas.toDataURL("image/png");

    // Open the image in a new tab
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${imgData}" />`);

    // Alternatively, you can download the image
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "table_image.png";
    link.click();
  };

  return (
    <div>
      {/* Table to be captured */}
      <div ref={tableRef} style={{ overflowX: "auto", marginBottom: "20px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f4f4f4",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.ID}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.Name}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to capture table as an image */}
      <button
        onClick={captureTable}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Capture Table as Image
      </button>
    </div>
  );
};

export default TableToImage;
