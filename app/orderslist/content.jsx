"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Download from "../../components/Download";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { FcOk } from "react-icons/fc";
import { IoIosCloseCircle, IoMdSearch } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaGears } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";
import { BsArrowUpRightCircle, BsFillCCircleFill, BsFillHCircleFill, BsFillPCircleFill, BsFillRCircleFill, BsPCircle } from "react-icons/bs";
import LoadingElement from "../../components/LoadingElement";

import * as XLSX from "xlsx";
import ExportToExcel from "../../components/ExportToExcel";
import FilterMenu from "./filterMenu";
import TableToImage from "./tableToImage";
import html2canvas from "html2canvas";
import { MdPending } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";

// import ViewAll from "../../../components/ViewAll";

export default function Content(props) {
  const tableRef = useRef();
  const router = useRouter();

  let data = props.obj;
  // const data = props.data?.data;

  // const [loadingData, setLoadingData] = useState(true);
  const [filterJobList, setFilterJobList] = useState([]);

  const loadingData = data.pendingListLoading;
  const totalOrders = data.totalOrders;
  const completedJobs = data.completedJobs;
  const artworkPending = data.artworkPending;
  const jobcardPending = data.jobcardPending;
  const partialQuantity = data.partialQuantity;
  const printPending = data.printPending;
  const totalPending = data.totalPending;
  const printCompleteMaterialReady = data.printReady;

  const todayOrder = data.todayOrder;
  const todayDispatch = data.todayDispatch;
  const todayPrintComplete = data.todayPrintComplete;
  const todayMaterialReady = data.todayMaterialReady;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  let records = data && data.data.slice(firstIndex, lastIndex);

  if (filterJobList.length > 0) {
    records = filterJobList && filterJobList.slice(firstIndex, lastIndex);
  }

  let npage = 0;
  if (data) npage = Math.ceil(data.data?.length / recordsPerPage);
  if (filterJobList.length > 0) {
    npage = Math.ceil(filterJobList.length / recordsPerPage);
  }

  // const numbers = [...Array(npage + 1).keys()].slice(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [customQuery, setCustomQuery] = useState("");
  const [pdfHeading, setPdfHeading] = useState("All Orders");

  useEffect(() => {
    document?.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault(); // Prevent default action
        document.getElementById("myInput").focus(); // Focus the input
      }
    });
  }, []);


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
    <>
      <div className={styles.mainContainer}>
        <main className={styles.dashboardHeader}>
          <h1>Orders</h1>
          <div className={styles.dashboardHeaderSection}>

            <div
              style={{ background: "#00bbf9" }}
            >
              <span>Total orders</span>
              <span
                className={styles.headerStatus}
                onClick={() => {
                  setCurrentPage(1);
                  setFilterJobList(todayOrder);
                  setPdfHeading(`${new Date().toISOString().split("T")[0]} orders`);
                }}
              >
                {todayOrder.length > 0 ? `+${todayOrder.length}` : ""}
              </span>
              <span
                onClick={() => {
                  setCurrentPage(1);
                  setFilterJobList(totalOrders);
                  setPdfHeading("All orders");
                }}
              >{totalOrders.length}</span>
            </div>

            <div

              style={{ background: "var(--color-primary-green)" }}
            >
              <span>Completed</span>
              <span
                className={styles.headerStatus}
                onClick={() => {
                  setCurrentPage(1);
                  setFilterJobList(todayDispatch);
                  setPdfHeading(`${new Date().toISOString().split("T")[0]} Dispatch orders`);
                }}
              >
                {todayDispatch.length > 0 ? `+${todayDispatch.length}` : ""}
              </span>
              <span
                onClick={() => {
                  setCurrentPage(1);
                  setFilterJobList(completedJobs);
                  setPdfHeading("Dispatched orders");
                }}
              >{completedJobs.length}</span>
            </div>

            <div
              style={{ background: "var(--color-total-order)" }}
            >
              <span>Print comp. / Ready</span>
              <span
                className={styles.headerStatus}
                onClick={() => {
                  setCurrentPage(1);
                  setFilterJobList([...todayMaterialReady, ...todayPrintComplete.filter(job => !todayMaterialReady.includes(job))]);
                  setPdfHeading(`${new Date().toISOString().split("T")[0]} Print complete + Material ready list`);
                }}
              >
                {
                  // todayPrintComplete.length > 0
                  // ?
                  `+${todayPrintComplete.length} P + ${todayMaterialReady.length} R`
                  // :
                  // ""
                }
              </span>
              <span
                onClick={() => {
                  setCurrentPage(1);
                  setFilterJobList(printCompleteMaterialReady);
                  setPdfHeading("Print comp./Material ready List");
                }}
              >{printCompleteMaterialReady.length}</span>
            </div>

            <div
              onClick={() => {
                setCurrentPage(1);
                setFilterJobList(artworkPending);
                setPdfHeading("Artwork Pending List");
              }}
              style={{ background: "var(--color-pending-order)" }}
            >
              <span>Artwork Pending</span>
              <span>{artworkPending.length}</span>
            </div>

            <div
              onClick={() => {
                setCurrentPage(1);
                setFilterJobList(jobcardPending);
                setPdfHeading("Pending Jobcard orders");
              }}
              style={{ background: "var(--color-primary-orange)" }}
            >
              <span>Jobcard&#39;s pending</span>
              <span>{jobcardPending.length}</span>
            </div>

            <div
              onClick={() => {
                setCurrentPage(1);
                setFilterJobList(partialQuantity);
                setPdfHeading("Partial quantity orders");
              }}
              style={{ background: "var(--color-average-value)" }}
            >
              <span>Partial quantity</span>
              <span>{partialQuantity.length}</span>
            </div>

            <div
              onClick={() => {
                setCurrentPage(1);
                setFilterJobList(printPending);
                setPdfHeading("Print Pending List");
              }}
              style={{ background: "var(--color-soft-teal)" }}
            >
              <span>Print pending</span>
              <span>{printPending.length}</span>
            </div>

            <div
              onClick={() => {
                setCurrentPage(1);
                setFilterJobList(totalPending);
                setPdfHeading("Total Pending List");
              }}
              style={{ background: "var(--color-light-coral)" }}
            >
              <span>Total pending</span>
              <span>{totalPending.length}</span>
            </div>

            <div
              onClick={() => {
                setCurrentPage(1);
                const compOrders = data?.data.reduce((accumulator, job) => {
                  if (
                    // job.client == "Nitin Lifescience Unit III" ||
                    // (
                    //   job.client == "Leeford Healthcare" ||
                    //   job.client == "Allkind Healthcare Unit III Katha" ||
                    //   job.client == "Allkind Healthcare Unit-I" ||
                    //   job.client == "Allrite Healthcare" ||
                    //   job.client == "Allrite Healthcare Unit-I" ||
                    //   job.client == "Allrite Pharmaceuticals Unit-I" ||
                    //   job.client == "Allrite Pharmaceuticals Unit-II")
                    // &&

                    // For Designers
                    // job.artwork_status != "Approved" &&
                    // job.artwork_status != "Repeat" &&
                    // job.designer === "Vikas" &&


                    (job.po_number == "Advance" ||
                      //   job.artwork_status == "Hold" ||
                      job.remarks == "Hold")
                    &&
                    // )

                    // job.print_ready_status === "" &&
                    // (new Date(job.timestamp) > new Date("2025-01-01T00:00:00Z"))
                    // &&
                    // job.po_number == 3 &&
                    job.dispatch_quantity == ""
                  ) {
                    accumulator.push(job);
                  }
                  return accumulator;
                }, []);
                setFilterJobList(compOrders);
                setPdfHeading("Advance + Hold List");
              }}
              style={{ background: "var(--color-pending-order)" }}
            >
              <span>Custom Query</span>
              <span><input className={styles.inputField} type="text" placeholder="Type here..." value={customQuery} onChange={e => {
                setCustomQuery(e.target.value);
                console.log(e.target.value);
              }} /></span>
            </div>

          </div>
        </main>

        <div className={styles.filterMenu}>
          <div className={styles.searchField}>
            <input
              id="myInput"
              className={styles.inputField}
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchQuery(e.target.value);
                console.log(searchQuery)

                let temp = [];
                for (let i = 0; i < data.data.length; i++)
                  if (
                    `${data.data[i].po_number} ${data.data[i].job_order} ${data.data[i].client} ${data.data[i].job_name} ${data.data[i].quantity} ${data.data[i].artwork_status} ${data.data[i].dispatch_status} ${data.data[i].dispatch_order_status}`
                      .toLowerCase()
                      .search(e.target.value.toLowerCase()) > -1
                  )
                    temp.push(data.data[i]);

                console.log(temp);
                setFilterJobList(temp);
              }}
            />
            <button>
              <IoMdSearch />
            </button>
            <button>CtrlK</button>
          </div>
          <div>
            {/* <ViewAll /> */}

            {/* <Link href="/filter-view" target="blank">
              View full table
              <HiOutlineExternalLink />
            </Link> */}

            <Download
              pendingListData={filterJobList}
              query={searchQuery}
              pdfHeading={pdfHeading}
            />

            {/* <ExportToExcel
              list={filterJobList}
              filename={pdfHeading} /> */}

            {/* Button to capture table as an image */}
            <button
              onClick={captureTable}
              style={{
                padding: "10px 20px",
                // backgroundColor: "#4CAF50",
                backgroundColor: "var(--color-primary-green)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Capture Table as Image
            </button>
          </div>
        </div>

        <div className={styles.jobsTable} id="tableID">
          <table className={styles.table} ref={tableRef}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>PO no.</th>
                <th>Created at</th>
                <th>Client</th>
                <th>Job</th>
                <th>Quantity</th>
                <th>Sheets</th>
                <th>Paper</th>
                <th>Artwork</th>
                <th>J/C</th>
                <th>Print ready</th>
                <th>Dispatch</th>
                <th>Balance</th>
                <th>Dispatch</th>
              </tr>
            </thead>

            {loadingData && loadingData ? (
              <LoadingElement />
            ) : (
              <tbody>
                {records &&
                  records.map((job) => (
                    <tr key={job.job_order}>
                      <td
                        onClick={(e) => {
                          console.log(
                            e.target.closest("tr").childNodes[0].innerHTML
                          );
                          router.push(
                            `/jobstatus/${e.target.closest("tr").childNodes[0].innerHTML
                            }`
                          );
                        }}
                      >
                        {job.job_order}
                      </td>
                      <td>{job.po_number}</td>
                      <td>
                        {job.timestamp && job.timestamp ? (
                          <p
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span>
                              {new Date(job.timestamp).toDateString().slice(4)}
                            </span>
                            {/* <span
                              style={{
                                fontSize: ".75rem",
                                color: "var(--color-boundary)",
                                textAlign: "right",
                              }}
                            >
                              {new Date(job.timestamp).toLocaleTimeString()}
                            </span> */}
                          </p>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{job.client}</td>
                      <td style={{ textWrap: "wrap !important" }}>
                        {job.job_name}
                      </td>
                      <td>{job.quantity}</td>
                      <td>{parseInt(job.quantity / job.sheet_size_ups) + 200}</td>

                      {
                        job.paper_receiving_final_receiving_status === "Yes" ? (
                          <td>
                            <span>
                              <IoCheckmarkCircle style={{ fontSize: "1.3rem", color: "var(--color-primary-green)" }} />
                            </span>
                          </td>
                          // <td className={styles.status}>
                          //   <span>Available</span>
                          // </td>
                        ) : job.paper_receiving_final_receiving_status === "No" ? (
                          <td>
                            <span>
                              <IoIosCloseCircle style={{ fontSize: "1.3rem", color: "var(--color-light-coral)" }} />
                            </span>
                          </td>
                        ) : <td></td>}

                      {
                        job.artwork_status === "Sent for Approval" ? (
                          <td>
                            <span>
                              <FaPaperPlane style={{ color: "var(--color-pending-order)" }} />
                            </span>
                          </td>
                        ) : (job.artwork_status === "Approved" || job.artwork_status === "Repeat") ? (
                          <td>
                            <span>
                              <IoCheckmarkCircle style={{ fontSize: "1.3rem", color: "var(--color-primary-green)" }} />
                            </span>
                          </td>
                        )
                          : job.artwork_status === "Hold" ? (
                            <td>
                              <span>
                                <BsFillHCircleFill style={{ fontSize: "1.055rem", color: "var(--color-light-coral)" }} />
                              </span>
                            </td>
                          )
                            : job.artwork_status === "Correction" ? (
                              <td>
                                <span>
                                  <BsFillCCircleFill style={{ fontSize: "1.055rem", color: "var(--color-light-coral)" }} />
                                </span>
                              </td>
                            )
                              : job.artwork_status === "Under Process" ? (
                                <td>
                                  <span>
                                    <FaGears style={{ fontSize: "1.3rem", color: "var(--color-total-order)" }} />
                                  </span>
                                </td>
                              )
                                : <td>
                                  <span>{job.artwork_status}</span>
                                </td>
                      }

                      {
                        job.jobcard_status === "Created" ? (
                          <td>
                            <span>
                              <IoCheckmarkCircle style={{ fontSize: "1.3rem", color: "var(--color-primary-green)" }} />
                            </span>
                          </td>
                        ) : job.jobcard_status != "" ? (
                          <td className={styles.status}>
                            <span style={{ background: "red" }}>
                              {job.jobcard_status}
                            </span>
                          </td>
                        )
                          :
                          <td className={styles.status}>
                          </td>
                      }

                      {job.print_ready_status === "Print complete" ? (
                        <td>
                          <span>
                            <Link
                              href={`https://docs.google.com/forms/d/e/1FAIpQLSd1ducvPDYvaQoENRtERdmaK0WB1KIZARW9v1rMKFYhLewbQQ/viewform?usp=pp_url&entry.628131065=${job.job_order}`}
                              target="_blank"
                            >
                              <BsFillPCircleFill style={{ fontSize: "1.3rem", color: "var(--color-total-order)" }} />
                              {/* <GoLinkExternal /> */}
                            </Link>
                          </span>
                        </td>
                      ) : job.print_ready_status === "Material ready" ? (
                        <td>
                          <span>
                            <BsFillRCircleFill style={{ fontSize: "1.3rem", color: "var(--color-primary-green)" }} />
                          </span>
                        </td>
                      ) : job.jobcard_status === "Created" && job.print_ready_status === "" ? (
                        <td>
                          <Link
                            href={`https://docs.google.com/forms/d/e/1FAIpQLSd1ducvPDYvaQoENRtERdmaK0WB1KIZARW9v1rMKFYhLewbQQ/viewform?usp=pp_url&entry.628131065=${job.job_order}`}
                            target="_blank">
                            <BsArrowUpRightCircle style={{ fontSize: "1.2rem", color: "var(--color-primary-blue)" }} />
                          </Link>
                        </td>
                      ) :
                        <td></td>
                      }

                      <td>
                        <span>{job.dispatch_quantity}</span>
                      </td>

                      {
                        job.dispatch_status === "Partially Dispatched" ? (
                          <td className={styles.status}>
                            <span style={{ color: "white", background: "red" }}>
                              {job.dispatch_quantity - job.quantity}
                            </span>
                          </td>
                        ) : job.dispatch_status === "" ? (
                          <td></td>
                        ) : job.dispatch_status === "Dispatched" ? (
                          <td className={styles.status}>
                            <span>0</span>
                          </td>
                        ) : job.dispatch_status === "Extra Dispatched" ? (
                          <td className={styles.status}>
                            <span
                              style={{ color: "white", background: "#2ecf03" }}
                            >
                              +{job.dispatch_quantity - job.quantity}
                            </span>
                          </td>
                        ) :
                          <td></td>
                      }

                      <td style={{ color: "var(--color-text)" }}>

                        {
                          (job.dispatch_quantity < job.quantity) && job.jobcard_status === "Created" ?
                            <Link
                              href={`https://docs.google.com/forms/d/e/1FAIpQLSen9hQ_DaoyrxFcEnAMMBlyCrRBQIOrJqsIqUPDh359r0iztw/viewform?usp=pp_url&entry.1900203967=${job.job_order}`}
                              target="_blank"
                            >
                              <BsArrowUpRightCircle style={{ fontSize: "1.2rem", color: "var(--color-primary-blue)" }} />
                            </Link>
                            : ""
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>

          <div className={styles.pagination}>
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
                <Link href="#tableID" style={{ color: "var(--color-text)" }}>
                  {currentPage}
                </Link>
              </li>
              <li
                className={`${currentPage === npage ? styles.disabledLi : ""}`}
              >
                <Link
                  href="#tableID"
                  onClick={() => {
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
              {firstIndex}-
              {filterJobList?.length ? lastIndex : data.data?.length ? lastIndex : 0}{" "}
              of{" "}
              {filterJobList?.length
                ? filterJobList.length
                : data.data?.length
                  ? data.data.length
                  : "..."}{" "}
              results
            </p>
          </div>
        </div>

        {/* <div className={styles.orderDetailContainer}>
          <div className={styles.orderDetails}>
            <span>POR-716</span>
            <p>8 Sept, 2024 at 5pm</p>
            <div className={styles.mainDetails}>
              <div>
                <p>Job</p>
                <p>Primaquine tab 7.5mg Inner</p>
              </div>
              <div>
                <p>Item</p>
                <p>Item desc</p>
              </div>
              <div>
                <p>Item</p>
                <p>Item desc</p>
              </div>
              <div>
                <p>Item</p>
                <p>Item desc</p>
              </div>
            </div>

            <div className={styles.orderFlowchart}>
              <p>Order History</p>
              <div>
                <span>Order Initiated</span>
                <p>13/09/2024 5:22 pm</p>
                <p>order details</p>
              </div>
              <div>
                <span>Order Initiated</span>
                <p>13/09/2024 5:22 pm</p>
                <p>order details</p>
              </div>
              <div>
                <span>Order Initiated</span>
                <p>13/09/2024 5:22 pm</p>
                <p>order details</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}