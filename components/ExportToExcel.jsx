
import React from "react";
import * as XLSX from "xlsx";

export default function ExportToExcel(props) {

    // Function to convert object data into Excel and trigger download
    const exportToExcel = (data, filename) => {

        // let filterData = 1;

        let filterData = data.reduce((acc, obj) => {

            if (obj.po_number != "Advance" && (obj.artwork_status === "Hold" || obj.artwork_status === "Under Process" || obj.artwork_status === "Sent for Approval"))
                acc.push({
                    "S no": acc.length + 1,
                    "Order Id": obj.job_order,
                    "Designer": obj.designer,
                    "PO no.": obj.po_number,
                    "Timestamp": obj.timestamp,
                    "Client": obj.client,
                    "Job": obj.job_name,
                    "Quantity": obj.quantity,
                    "Paper": obj.paper_receiving_final_receiving_status,
                    "Approval": obj.artwork_actual,
                    "Artwork": obj.artwork_status,
                    "Remarks": obj.artwork_remarks,
                    "Jobcard": obj.jobcard_status,
                    "Status": obj.print_ready_status,
                });
            return acc;
        }, []);

        // Convert object data to a worksheet
        const ws = XLSX.utils.json_to_sheet(filterData);

        // console.log("Excel::", data)



        // Apply styles to the headers
        const headerStyle = {
            fill: {
                fgColor: { rgb: "008000" }, // Green background
            },
            font: {
                bold: true,
                color: { rgb: "FFFFFF" }, // White text
                textDecoration: "capitalize", // Capitalize text
            },
            alignment: {
                horizontal: "center", // Center align the text
                vertical: "center", // Center align the text vertically
            },
        };

        // Style the headers (first row)
        const range = XLSX.utils.decode_range(ws["!ref"]); // Get the range of the sheet
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cell_address = { r: 0, c: col }; // First row, all columns
            const cell_ref = XLSX.utils.encode_cell(cell_address);
            if (!ws[cell_ref]) continue; // Skip if no cell
            ws[cell_ref].s = headerStyle; // Apply style to each header cell
        }



        // Create a new workbook and append the sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Approved");

        // Trigger file download
        XLSX.writeFile(wb, filename);
    };

    return (
        <div>
            <button
                onClick={() => exportToExcel(props?.list || [], `${props.filename}.xlsx`)}
                className="btn btn-primary"
            >
                Download Excel
            </button>
        </div>
    );
};