"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Download, { downloadPDF } from "../../components/Download";
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
import { motion } from "framer-motion";

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

  const MotionCard = ({ title, count, subCount, onClick, bgColor }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      className={styles.statusCard}
      style={{ background: bgColor }}
      onClick={onClick}
    >
      <span>{title}</span>
      {subCount && <span className={styles.headerStatus}>{subCount}</span>}
      <span>{count}</span>
    </motion.div>
  );
  

  return (
    <>
      <div className={styles.mainContainer}>
      <main className={styles.dashboardHeader}>
        <h1>Orders</h1>
        <div className={styles.dashboardHeaderSection}>
          <MotionCard
            title="Total orders"
            subCount={todayOrder.length > 0 ? `+${todayOrder.length}` : null}
            count={totalOrders.length}
            bgColor="#00bbf9"
            onClick={() => {
              setCurrentPage(1);
              setFilterJobList(totalOrders);
              setPdfHeading("All orders");
            }}
          />

          <MotionCard
            title="Completed"
            subCount={todayDispatch.length > 0 ? `+${todayDispatch.length}` : null}
            count={completedJobs.length}
            bgColor="var(--color-primary-green)"
            onClick={() => {
              setCurrentPage(1);
              setFilterJobList(completedJobs);
              setPdfHeading("Dispatched orders");
            }}
          />

          <MotionCard
            title="Print comp. / Ready"
            subCount={`+${todayPrintComplete.length} P + ${todayMaterialReady.length} R`}
            count={printCompleteMaterialReady.length}
            bgColor="var(--color-total-order)"
            onClick={() => {
              setCurrentPage(1);
              setFilterJobList(printCompleteMaterialReady);
              setPdfHeading("Print comp./Material ready List");
            }}
          />

          <MotionCard
            title="Artwork Pending"
            count={artworkPending.length}
            subCount={null}
            bgColor="var(--color-pending-order)"
            onClick={() => {
              setCurrentPage(1);
              setFilterJobList(artworkPending);
              setPdfHeading("Artwork Pending List");
            }}
          />

          <MotionCard
            title="Jobcard's pending"
            count={jobcardPending.length}
            subCount={null}
            bgColor="var(--color-primary-orange)"
            onClick={() => {
              setCurrentPage(1);
              setFilterJobList(jobcardPending);
              setPdfHeading("Pending Jobcard orders");
            }}
          />

          <MotionCard
            title="Partial quantity"
            count={partialQuantity.length}
            subCount={null}
            bgColor="var(--color-average-value)"
            onClick={() => {
              setCurrentPage(1);
              setFilterJobList(partialQuantity);
              setPdfHeading("Partial quantity orders");
            }}
          />

          <MotionCard
            title="Print pending"
            count={printPending.length}
            subCount={null}
            bgColor="var(--color-soft-teal)"
            onClick={() => {
              setCurrentPage(1);
              setFilterJobList(printPending);
              setPdfHeading("Print Pending List");
            }}
          />

          <MotionCard
            title="Total pending"
            count={totalPending.length}
            subCount={null}
            bgColor="var(--color-light-coral)"
            onClick={() => {
              setCurrentPage(1);
              setFilterJobList(totalPending);
              setPdfHeading("Total Pending List");
            }}
          />
        </div>
      </main>

      <div className={styles.filterMenu}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={styles.searchField}
        >
          <input
            className={styles.inputField}
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              setSearchQuery(query);
              setCurrentPage(1);

              const filtered = data.data.filter(job =>
                `${job.po_number} ${job.job_order} ${job.client} ${job.job_name} ${job.quantity} ${job.artwork_status} ${job.dispatch_status} ${job.dispatch_order_status}`
                  .toLowerCase()
                  .includes(query)
              );

              setFilterJobList(filtered);
            }}
          />
          <button><IoMdSearch /></button>
          <button>CtrlK</button>
        </motion.div>

        <div className={styles.actionButtons}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className={styles.downloadButton}
            onClick={() => downloadPDF(filterJobList, searchQuery, pdfHeading)}
          >
            Download List
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            onClick={captureTable}
            style={{
              padding: "10px 20px",
              backgroundColor: "var(--color-primary-green)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Capture Table as Image
          </motion.button>
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