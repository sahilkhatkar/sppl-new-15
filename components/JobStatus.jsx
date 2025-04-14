"use client";

import styles from "../app/orderslist/page.module.css";
import { MdOutlineDownloading } from "react-icons/md";

export default function JobStatus() {
  const column = [
    {
      name: "Name",
      // color: "var(--color-total-order)"
    },
    { name: "Total jobs", color: "var(--color-total-value)" },
    { name: "Repeat", color: "var(--color-completed-order)" },
    { name: "Approved", color: "var(--color-completed-order)" },
    { name: "Pending", color: "var(--color-pending-order)" },
    { name: "Sent for Approval", color: "var(--color-average-value)" },
    { name: "Hold", color: "var(--color-cancelled)" },
  ];

  // const data = useSelector((state) => state.data.datas.importedData);
  // const data = useSelector((state) => state.data.jobStatusList );
  // const loading = useSelector((state) => state.data.jobStatusLoading);
  // const error = useSelector((state) => state.data.jobStatusError);

  const expandTable = () => {
    console.log("first");
    if (document.getElementById("jobStatusTable").style.height == "4rem") {
      document.getElementById("jobStatusTable").style.height = "18rem";
      document.getElementById("jobStatusTable").style.overflow = "auto";
    } else {
      document.getElementById("jobStatusTable").style.height = "4rem";
      document.getElementById("jobStatusTable").style.overflow = "hidden";
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 onClick={expandTable} style={{ cursor: "pointer" }}>
          Job status
          {/* ({data && data.pendingList?.length}) */}
        </h2>
      </div>
      {/* <Table
        headerBg={"pink"}
        column={[
          {
            name: "Name",
            // color: "var(--color-total-order)"
          },
          { name: "Total jobs", color: "var(--color-total-value)" },
          { name: "Repeat", color: "var(--color-completed-order)" },
          { name: "Approved", color: "var(--color-completed-order)" },
          { name: "Pending", color: "var(--color-pending-order)" },
          { name: "Sent for Approval", color: "var(--color-average-value)" },
          { name: "Hold", color: "var(--color-cancelled)" },
        ]}
        data={data}
      /> */}
      <div
        className={styles.jobsTable}
        // id="tableID"
        id="jobStatusTable"
        // style={{ minHeight: "max-content" }}
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
            {data &&
              data.jobStatusList?.map((job, index) => {
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
          <div></div>
        )}
      </div>
    </>
  );
}

// export function Tableau() {
//   const dispatch = useDispatch();
//   const data = useSelector(selectData);
//   const loading = useSelector(selectLoading);
//   const err = useSelector(selectError);

//   const column = [
//     { title: "S.no" },
//     { title: "Order ID" },
//     { title: "PO no." },
//     { title: "PO Date" },
//     { title: "Client" },
//     { title: "Job" },
//     { title: "Dimension" },
//     { title: "Paper" },
//     { title: "GSM" },
//     { title: "Quantity" },
//     { title: "Rate" },
//     { title: "Length" },
//     { title: "Width" },
//     { title: "Ups" },
//   ];

//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <h2 onClick={expandTable} style={{ cursor: "pointer" }}>
//           Pending List ({data && data.pendingList?.length})
//         </h2>
//         {loading ? (
//           ""
//         ) : (
//           <button className={styles.downloadBtn} onClick={downloadPDF}>
//             <MdOutlineDownloading /> &nbsp; Download
//           </button>
//         )}
//       </div>

//       <div
//         className={styles.jobsTable}
//         // id="tableID"
//         id="pendingListTable"
//       >
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               {column &&
//                 column.map((col, index) => (
//                   <td
//                     key={index}
//                     style={{
//                       background: col.color,
//                       borderRadius: "1rem",
//                       // borderInline: "1rem solid var(--color-background)",
//                     }}
//                   >
//                     {col.title}
//                   </td>
//                 ))}
//             </tr>
//           </thead>

//           <tbody>
//             {data &&
//               data.pendingList?.map((job, index) => {
//                 return (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{job.job_order}</td>
//                     <td>{job.po_number}</td>
//                     <td>{job.po_date}</td>
//                     <td>{job.client}</td>
//                     <td>{job.job_name}</td>
//                     <td>{job.dimensions}</td>
//                     <td>{job.paper}</td>
//                     <td>{job.gsm}</td>
//                     <td>{job.quantity}</td>
//                     <td>{job.rate}</td>
//                     <td>{job.sheet_size_length}</td>
//                     <td>{job.sheet_size_width}</td>
//                     <td>{job.sheet_size_ups}</td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>

//         {loading ? (
//           <div
//             style={{
//               minHeight: "15rem",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             Loading...
//           </div>
//         ) : (
//           ""
//         )}
//       </div>
//     </>
//   );
// }
