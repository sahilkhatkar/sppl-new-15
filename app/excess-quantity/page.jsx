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
import { IoMdSearch } from "react-icons/io";
import { HiOutlineExternalLink } from "react-icons/hi";
// import ViewAll from "../../../components/ViewAll";

export default function OrdersList() {
  const tableRef = useRef();
  const router = useRouter();

  // const [loadingData, setLoadingData] = useState(true);
  const [filterJobList, setFilterJobList] = useState([]);

  const data = [];

  // const data = useSelector((state) => state.data.datas.importedData);
  // const filterJobList = useSelector((state) => state.data.datas.importedData);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  let records = data && data.slice(firstIndex, lastIndex);

  if (filterJobList.length > 0) {
    records = filterJobList && filterJobList.slice(firstIndex, lastIndex);
  }

  let npage = 0;
  if (data) npage = Math.ceil(data?.length / recordsPerPage);
  if (filterJobList.length > 0) {
    npage = Math.ceil(filterJobList.length / recordsPerPage);
  }

  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document?.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault(); // Prevent default action
        document.getElementById("myInput").focus(); // Focus the input
      }
    });
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <main className={styles.dashboardHeader}>
          <h1>Excess Quantity</h1>
          {/* <div className={styles.dashboardHeaderSection}>
            <div
              onClick={() => {
                setCurrentPage(1);
                setFilterJobList(data);
              }}
              style={{ background: "var(--color-total-order)" }}
            >
              <span>Total orders</span>
              <span>{totalOrders}</span>
            </div>
            <div
              onClick={() => {
                setCurrentPage(1);
                const compOrders = data?.reduce((accumulator, job) => {
                  if (job.dispatch_quantity >= job.quantity) {
                    accumulator.push(job);
                  }
                  return accumulator;
                }, []);
                setFilterJobList(compOrders);
              }}
              style={{ background: "var(--color-completed-order)" }}
            >
              <span>Completed</span>
              <span>{completedJobs}</span>
            </div>
            <div
              onClick={() => {
                setCurrentPage(1);
                const pendingOrders = data?.reduce((accumulator, job) => {
                  if (
                    job.dispatch_quantity == "" &&
                    // job.dispatch_quantity < job.quantity &&
                    job.dispatch_order_status != "Cancel" &&
                    new Date(job.timestamp) <
                      new Date(new Date() - 86400000 * 3)
                  ) {
                    console.log(
                      "Job: ",
                      typeof job.timestamp,
                      "\n New Date: ",
                      typeof new Date().toUTCString()
                    );
                    console.log(new Date().toUTCString());
                    accumulator.push(job);
                  }

                  return accumulator;
                }, []);
                setFilterJobList(pendingOrders);
              }}
              style={{ background: "var(--color-pending-order)" }}
            >
              <span>Pending</span>
              <span>{pendingOrder}</span>
            </div>
            <div
              onClick={() => {
                setCurrentPage(1);
                const partialQuantity = data?.reduce((accumulator, job) => {
                  if (
                    job.dispatch_quantity != "" &&
                    job.dispatch_quantity < job.quantity &&
                    job.dispatch_order_status != "Cancel"
                  )
                    accumulator.push(job);

                  return accumulator;
                }, []);
                setFilterJobList(partialQuantity);
              }}
              style={{ background: "var(--color-average-value)" }}
            >
              <span>Partial quantity</span>
              <span>{partialQuantity}</span>
            </div>

            <div
              onClick={() => {
                setCurrentPage(1);
                const canceledOrders = data.reduce((accumulator, job) => {
                  if (job.dispatch_order_status === "Cancel") {
                    accumulator.push(job);
                  }
                  return accumulator;
                }, []);
                setFilterJobList(canceledOrders);
              }}
              style={{ background: "var(--color-cancelled)" }}
            >
              <span>Cancelled</span>
              <span>{cancelOrder}</span>
            </div>
            <div style={{ background: "var(--color-total-value)" }}>
              <span>Total order amount</span>
              <span>{totalAmount}</span>
            </div>
          </div> */}
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

                let temp = [];
                for (let i = 0; i < data.length; i++)
                  if (
                    `${data[i].po_number} ${data[i].job_order} ${data[i].client} ${data[i].job_name} ${data[i].quantity} ${data[i].artwork_status} ${data[i].dispatch_status} ${data[i].dispatch_order_status}`
                      .toLowerCase()
                      .search(e.target.value.toLowerCase()) > -1
                  )
                    temp.push(data[i]);
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
            <Download pendingListData={filterJobList} query={searchQuery} />
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
                <th>Sheet</th>
                <th>Artwork</th>
                <th>Job card</th>
                <th>Dispatch</th>
                <th>Balance</th>
                <th>Excess</th>
              </tr>
            </thead>

            {loadingData && loadingData ? (
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Loading Data...</td>
                  <td></td>
                  <td></td>
                  {/* {records && records ? setLoadingData(false) : ""} */}
                </tr>
                {/* <div>loadingData....</div> */}
              </tbody>
            ) : (
              <tbody>
                {records &&
                  records.map((job) => (
                    <tr
                      key={job.job_order}
                      //   onClick={(e) => {
                      //     console.log(
                      //       e.target.closest("tr").childNodes[0].innerHTML
                      //     );
                      //     router.push(
                      //       `/jobstatus/${
                      //         // `/orderslist/order=${
                      //         e.target.closest("tr").childNodes[0].innerHTML
                      //       }`
                      //     );
                      //   }}
                    >
                      <td>{job.job_order}</td>
                      <td>{job.po_number}</td>
                      <td>
                        {job.timestamp && job.timestamp ? (
                          <p
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span>
                              {new Date(job.timestamp).toDateString().slice(4)}
                            </span>
                            <span
                              style={{
                                fontSize: ".75rem",
                                color: "var(--color-boundary)",
                                textAlign: "right",
                              }}
                            >
                              {new Date(job.timestamp).toLocaleTimeString()}
                            </span>
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

                      {job.dispatch_order_status === "Cancel" ? (
                        <td className={styles.status}>
                          <span style={{ background: "red" }}>Cancel</span>
                        </td>
                      ) : job.sheet_size_ups &&
                        job.sheet_size_length &&
                        job.sheet_size_width ? (
                        <td className={styles.status}>
                          <span>Available</span>
                        </td>
                      ) : (
                        <td className={styles.status}>
                          <span style={{ background: "gold" }}>pending</span>
                        </td>
                      )}

                      {job.artwork_status === "Sent for Approval" ? (
                        <td className={styles.status}>
                          <span style={{ background: "gold" }}>
                            {job.artwork_status}
                          </span>
                        </td>
                      ) : job.artwork_status != "" ? (
                        <td className={styles.status}>
                          <span>{job.artwork_status}</span>
                        </td>
                      ) : job.artwork_status === "Hold" ? (
                        <td>
                          <span style={{ background: "#8dc6ff !important" }}>
                            {job.artwork_status}
                          </span>
                        </td>
                      ) : job.artwork_status === "" ? (
                        <td></td>
                      ) : (
                        ""
                      )}

                      {job.jobcard_status === "Created" ? (
                        <td className={styles.status}>
                          <span>{job.jobcard_status}</span>
                        </td>
                      ) : job.jobcard_status != "" ? (
                        <td className={styles.status}>
                          <span style={{ background: "red" }}>
                            {job.jobcard_status}
                          </span>
                        </td>
                      ) : job.jobcard_status === "" ? (
                        <td className={styles.status}>
                          {/* <span style={{ background: "blue" }}> .</span> */}
                        </td>
                      ) : (
                        ""
                      )}

                      <td>
                        <span>{job.dispatch_quantity}</span>
                      </td>

                      {job.dispatch_status === "Partially Dispatched" ? (
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
                      ) : (
                        ""
                      )}

                      <td className={styles.externalLink}>
                        <Link
                          href={`https://docs.google.com/forms/d/e/1FAIpQLSfPbbQAaLcY9Zd0fbKhHsD3c3moMrt86P2gDu53usxYJ_2yww/viewform?usp=pp_url&entry.941611185=${job.job_order}`}
                          target="_blank"
                        >
                          <HiOutlineExternalLink />
                        </Link>
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
              {firstIndex}-
              {filterJobList?.length ? lastIndex : data?.length ? lastIndex : 0}{" "}
              of{" "}
              {filterJobList?.length
                ? filterJobList.length
                : data?.length
                ? data.length
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
