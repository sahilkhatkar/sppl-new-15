"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosCloseCircleOutline,
  IoMdClose,
  IoMdSearch,
} from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidEditAlt } from "react-icons/bi";
import { PiGearFill } from "react-icons/pi";

import Loading from "./Loading";

// const scriptURL =
//   "https://script.google.com/macros/s/AKfycbwSgNq3qiJXa9qdvQ2c3vwBDqEGbm27fgHX82OFrCDdoyqQDCCGV-BQ979_MKJtJMW-/exec";
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwKxawj_o46QLFyC3l9phstfA68YwJ7Z6iALemnVtBVh4U1UGwiYM-BvMDSaCd15-ma/exec";

export default function Artwork() {
  const jobSection = useRef(null);

  const [jobList, setJobList] = useState([]);
  const [currentJob, setCurrentJob] = useState({
    orderID: 0,
    poNumber: "",
    poDate: "",
    client: "",
    job: "",
    remarks: "",
  });

  // const dm = useSelector((state) => state.data.designerList);
  // console.log("data list: ", dm);

  const data = [];
  const loadingData = [];

  let pendingArtworkArr = [];

  if (data) {
    data.reduce((sum, job) => {
      if (
        (job.artwork_status == "" ||
          job.artwork_status == "Hold" ||
          job.artwork_status == "Sent for Approval") &&
        job.dispatch_order_status != "Cancel"
      )
        pendingArtworkArr.push(job);
    }, 0);

    // pendingArtworkArr = [...data];
  }

  const [totalJobs, setTotalJobs] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleSearchQuery = (e) => {
    if (e.target.closest("p").childNodes[0].innerText == "No results found") {
      setSelectedCompany("");
      setSearchQuery("");
      return;
    }
    setSelectedCompany(e.target.closest("p").childNodes[0].innerText);

    setFormState((res) => ({
      ...res,
      client: e.target.closest("p").childNodes[0].innerText,
    }));
    setFormState((res) => ({
      ...res,
      designer: e.target.closest("p").childNodes[1].innerText,
    }));
    setSearchQuery("");
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Read the form data
    let form = e.target;
    const formData = new FormData(e.target);

    let date = new Date();
    let timestamp =
      date.getDate() +
      `/` +
      date.getMonth() +
      `/` +
      date.getFullYear() +
      ` ` +
      date.toTimeString().slice(0, 8);
    formData.append("Timestamp", timestamp);

    // console.log("formData", [...formData.entries()]);

    // Display the key/value pairs
    for (const pair of formData.entries()) {
      console.log(pair[0], ":", pair[1]);
    }

    async function postData() {
      try {
        const response = await fetch(scriptURL, {
          method: form.method,
          body: tempFormData,
        }).catch((error) => console.error("Error!", error.message));

        console.log("response: ", response);

        toast.success(`response: ${response.status}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        toast(error);
        console.error("error: ", error.message);
      }
    }
    // postData();
    toast.success(`response:`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    // }
  }

  const approveJob = async (e) => {
    // Artwork status = Approved or repeat
    console.log(e.target.innerText);
    // Display the orderID = POR-111
    console.log(currentJob.orderID);

    console.log(
      "pendingArtworkArr (before): ",
      pendingArtworkArr.length,
      pendingArtworkArr
    );

    if (jobList.length > 0) {
      let index = jobList?.findIndex(
        (order) => order.job_order === currentJob.orderID
      );
      setJobList(jobList.splice(index, 1)[0]);
    } else {
      let index = pendingArtworkArr?.findIndex(
        (order) => order.job_order === currentJob.orderID
      );

      if (index !== -1) {
        // If the object is found, remove it from the array
        let removedOrder = pendingArtworkArr.splice(index, 1)[0]; // splice returns an array of removed elements
        // setJobList(removedOrder);
        // console.log("Removed order:", removedOrder);
      } else {
        console.log("Order with orderID not found");
      }
      setJobList(pendingArtworkArr);
    }

    console.log(
      "pendingArtworkArr (after): ",
      pendingArtworkArr.length,
      pendingArtworkArr
    );

    console.log("joblist", jobList);

    let preFillURL = ``;

    let res = fetch(preFillURL, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Fullfilled res: ", res);
      })
      .catch((e) => console.log("Now catched", e))
      .finally((e) => console.log("finally done", e));

    // let finalStatus = "An error occured";
    let finalStatus = `${currentJob.orderID} ${e.target.innerText}`;
    // if (response.status === 200) finalStatus = "Form filled successfully";

    //   // const fetchData = await fetch(scriptURL, {
    //   //   method: "GET",
    //   // })
    //   //   .then((res) => res.json())
    //   //   .then((json) => {
    //   //     console.log(json);

    //   //     // at [5] there is client. We are matching the selectedCompany to the client in the sheet.
    //   //     if (selectedCompany === json[json.length - 1][5])
    //   //       finalStatus = `Job Order: ${json[json.length - 1][0]}`;
    //   //   });

    toast.success(`${finalStatus}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setCurrentJob({
      orderID: 0,
      poNumber: "",
      poDate: "",
      client: "",
      job: "",
      remarks: "",
    });

    jobSection.current.classList.toggle(styles.showStatusWindow);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>
          Artwork (
          {jobList.length > 0
            ? jobList.length
            : pendingArtworkArr && pendingArtworkArr.length}
          )
        </h1>
        {/* <h3>Hold: 5</h3>
        <h3>Sent for Approval: 5</h3>
        <h3>Pending: 5</h3> */}
        <ToastContainer />

        <div className={styles.artworkOrderWindow} ref={jobSection}>
          <h2 style={{ fontWeight: "bold" }}>Update status</h2>
          <div className={styles.orderDetails}>
            <div>
              <span style={{ fontSize: "1.5rem" }}>{currentJob.orderID}</span>
              <div>
                <span>{currentJob.poNumber}</span>
                <span>{currentJob.poDate}</span>
              </div>
            </div>

            <span>{currentJob.client}</span>
            <span style={{ fontStyle: "italic" }}>{currentJob.job}</span>

            <div className={styles.jobInput}>
              <label htmlFor="remarks">Remarks</label>
              <input
                type="text"
                id="remarks"
                name="remarks"
                placeholder="Type remarks, if any"
                value={currentJob.remarks}
                onChange={(e) =>
                  setCurrentJob((res) => ({
                    ...res,
                    remarks: e.target.value,
                  }))
                }
              />
            </div>

            <button
              className={styles.closeButton}
              onClick={() => {
                jobSection.current.classList.toggle(styles.showStatusWindow);
              }}
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={(e) => {
                approveJob(e);
              }}
            >
              Sent
            </button>
            <button
              onClick={(e) => {
                approveJob(e);
              }}
            >
              Hold
            </button>
            <button
              onClick={(e) => {
                approveJob(e);
              }}
            >
              Approved
            </button>
            <button
              onClick={(e) => {
                approveJob(e);
              }}
            >
              Repeat
            </button>
          </div>
        </div>

        <div className={styles.artworkTable}>
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order-ID</th>
                  <th>PO no.</th>
                  <th>Timestamp</th>
                  <th>Client</th>
                  <th>Job</th>
                  <th
                    onClick={() => {
                      setJobList({
                        orderID: 1,
                        job_order: "por-123",
                        client: "client name",
                        job_name: "job name",
                        po_number: 1243124,
                        poDate: "5 Dec 2024",
                        timestamp: "5 Dec 2024",
                        designer: "Shail",
                        artwork_status: "final artwork created",
                        finalStatus: "final",
                      });

                      console.log("first", jobList);
                    }}
                  >
                    Designer
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {jobList.length > 0 ? (
                jobList.map((job, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{job.job_order}</td>
                      <td>{job.po_number}</td>
                      {job.timestamp && job.timestamp ? (
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "fit-content",
                          }}
                        >
                          <span>
                            {/* {new Date(job.timestamp).toDateString().slice(4)} */}
                            timestamp
                          </span>
                          <span
                            style={{
                              fontSize: ".75rem",
                              color: "var(--color-boundary)",
                              textAlign: "right",
                            }}
                          >
                            {/* {new Date(job.timestamp).toLocaleTimeString()} */}
                            time
                          </span>
                        </td>
                      ) : (
                        ""
                      )}
                      <td>{job.client}</td>
                      <td>{job.job_name}</td>
                      <td>{job.designer}</td>
                      <td className={styles.status}>
                        {job.artwork_status == "Hold" ? (
                          <span
                            style={{ background: "var(--color-cancelled)" }}
                          >
                            {job.artwork_status}
                          </span>
                        ) : job.artwork_status == "Sent for Approval" ? (
                          <span
                            style={{
                              background: "var(--color-pending-order)",
                            }}
                          >
                            {job.artwork_status}
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        <div>
                          <button
                            onClick={(e) => {
                              // console.log(e);
                              // Order-ID
                              jobSection.current.classList.add(
                                styles.showStatusWindow
                              );
                              // console.log(
                              //   e.target.parentElement.parentElement
                              //     .parentElement.children[0].innerText
                              // );
                              setCurrentJob({
                                orderID:
                                  e.target.parentElement.parentElement
                                    .parentElement.children[0].innerText,
                                poNumber:
                                  e.target.parentElement.parentElement
                                    .parentElement.children[1].innerText,
                                poDate:
                                  e.target.parentElement.parentElement.parentElement.children[2].innerText.slice(
                                    0,
                                    -11
                                  ),
                                client:
                                  e.target.parentElement.parentElement
                                    .parentElement.children[3].innerText,
                                job: e.target.parentElement.parentElement
                                  .parentElement.children[4].innerText,
                              });
                            }}
                          >
                            <BiSolidEditAlt />
                          </button>
                          <button>
                            <PiGearFill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : pendingArtworkArr && pendingArtworkArr.length ? (
                pendingArtworkArr
                // .sort((a, b) => a.designer.localeCompare(b.designer))
                .map((job, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{job.job_order}</td>
                      <td>{job.po_number}</td>
                      {job.timestamp && job.timestamp ? (
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "fit-content",
                          }}
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
                        </td>
                      ) : (
                        ""
                      )}
                      <td>{job.client}</td>
                      <td>{job.job_name}</td>
                      <td>{job.designer}</td>
                      <td className={styles.status}>
                        {job.artwork_status == "Hold" ? (
                          <span
                            style={{ background: "var(--color-cancelled)" }}
                          >
                            {job.artwork_status}
                          </span>
                        ) : job.artwork_status == "Sent for Approval" ? (
                          <span
                            style={{
                              background: "var(--color-pending-order)",
                            }}
                          >
                            {job.artwork_status}
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        <div>
                          <button
                            onClick={(e) => {
                              // console.log(e);
                              // Order-ID
                              jobSection.current.classList.add(
                                styles.showStatusWindow
                              );
                              // console.log(
                              //   e.target.parentElement.parentElement
                              //     .parentElement.children[0].innerText
                              // );
                              setCurrentJob({
                                orderID:
                                  e.target.parentElement.parentElement
                                    .parentElement.children[0].innerText,
                                poNumber:
                                  e.target.parentElement.parentElement
                                    .parentElement.children[1].innerText,
                                poDate:
                                  e.target.parentElement.parentElement.parentElement.children[2].innerText.slice(
                                    0,
                                    -11
                                  ),
                                client:
                                  e.target.parentElement.parentElement
                                    .parentElement.children[3].innerText,
                                job: e.target.parentElement.parentElement
                                  .parentElement.children[4].innerText,
                              });
                            }}
                          >
                            <BiSolidEditAlt />
                          </button>
                          <button>
                            <PiGearFill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                // {/* <h2>Loading...</h2> */}
                <Loading />
              )}
            </table>
          </>
        </div>
      </div>
    </>
  );
}
