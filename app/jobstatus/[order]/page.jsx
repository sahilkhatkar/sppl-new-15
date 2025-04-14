"use client";

import React, { useEffect, useState } from "react";
import myStyle from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

export default function Orders({ params }) {
  const router = useRouter();

  const data = useSelector((state) => state.data.datas.importedData);

  const [currentJobList, setCurrentJobList] = useState([]);

  useEffect(() => {
    const current = data.reduce((sum, job) => {
      if (job.job_order === params.order) {
        sum.push(job);
      }
      return sum;
    }, []);

    setCurrentJobList(current);
  }, []);

  console.log(currentJobList);

  return (
    <>
      <div>
        <div className={myStyle.orderContainer}>
          <div className={myStyle.header}>
            <button className={myStyle.backBtn} onClick={router.back}>
              <IoIosArrowBack />
              Back
            </button>
            <div>
              <h1>Order Summary</h1>
            </div>
          </div>

          {currentJobList.map((job, index) => (
            <div className={myStyle.summaryContainer} key={index}>
              <div className={myStyle.summaryDetails}>
                <div className={myStyle.completedStep}>
                  <div>
                    <span>Order initiated</span>
                    <span>{`${new Date(job.timestamp).toDateString().slice(4)} 
                      ${new Date(job.timestamp).toLocaleTimeString()}`}</span>
                  </div>
                  {job.remarks ? (
                    <div>
                      <span>Remarks:&nbsp;
                       {job.remarks}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* <div>
                  <div>
                    <span>Performa Invoice</span>
                    <span>{}</span>
                  </div>
                  <div>
                    <span>
                      PI
                      <Link href="#" target="_blank">
                        download
                      </Link>
                    </span>
                    <span>PI#123456</span>
                  </div>
                  <div>
                    <span>Freight</span>
                    <span>Anjani Courier: 8060</span>
                  </div>
                </div> */}

                <div
                  className={`${
                    job.sheet_size_actual ? myStyle.completedStep : ""
                  }`}
                >
                  <div>
                    <span>Sheet size</span>
                    {job.sheet_size_actual ? (
                      <span>{`${new Date(job.sheet_size_actual)
                        .toDateString()
                        .slice(4)} 
                      ${new Date(
                        job.sheet_size_actual
                      ).toLocaleTimeString()}`}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <span>Length</span>
                    <span>{job.sheet_size_length}</span>
                  </div>
                </div>

                {job.sheet_avail_actual ? (
                  <div
                    className={`${
                      job.sheet_avail_status === "Yes"
                        ? myStyle.completedStep
                        : ""
                    }`}
                  >
                    <div>
                      <span>Paper status</span>
                      {job.sheet_avail_actual ? (
                        <span>{`${new Date(job.sheet_avail_actual)
                          .toDateString()
                          .slice(4)} 
                      ${new Date(
                        job.sheet_avail_actual
                      ).toLocaleTimeString()}`}</span>
                      ) : (
                        <span>pending</span>
                      )}
                    </div>
                    {job.order_paper_planned ? (
                      <div>
                        <span>
                          Paper Order - {job.order_paper_quantity} sheets
                        </span>
                        {/* {job.order_paper_actual ? (
                          <span>{`${new Date(job.order_paper_actual)
                            .toDateString()
                            .slice(4)} 
                      ${new Date(
                        job.order_paper_actual
                      ).toLocaleTimeString()}`}</span>
                        ) : (
                          ""
                        )} */}
                        <span>
                          Expected on &nbsp;
                          {new Date(job.order_paper_delivery_date)
                            .toDateString()
                            .slice(4)}{" "}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    {job.order_paper_remarks ? (
                      <div>
                        <span>Remarks:&nbsp;{job.order_paper_remarks}</span>
                      </div>
                    ) : (
                      ""
                    )}

                    {job.paper_receiving_qty_received ? (
                      <div>
                        <span>
                          Quantity received:&nbsp;
                          {job.paper_receiving_qty_received}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={`${
                    job.artwork_status === "Repeat" ||
                    job.artwork_status === "Approved"
                      ? myStyle.completedStep
                      : ""
                  }`}
                >
                  <div>
                    <span>Artwork approval</span>
                    {job.artwork_actual ? (
                      <span>{`${new Date(job.artwork_actual)
                        .toDateString()
                        .slice(4)} 
                      ${new Date(
                        job.artwork_actual
                      ).toLocaleTimeString()}`}</span>
                    ) : (
                      <span>pending</span>
                    )}
                  </div>
                  <div>
                    <span>
                      Artwork
                      <Link
                        href="#"
                        target="_blank"
                      >
                        download
                      </Link>
                    </span>
                    <span>SPPL/450/24-25</span>
                  </div>
                </div>

                <div
                  className={`${
                    job.jobcard_actual ? myStyle.completedStep : ""
                  }`}
                >
                  <div>
                    <span>Jobcard status</span>

                    {job.jobcard_actual ? (
                      <span>{`${new Date(job.jobcard_actual)
                        .toDateString()
                        .slice(4)} 
                      ${new Date(
                        job.jobcard_actual
                      ).toLocaleTimeString()}`}</span>
                    ) : (
                      <span>pending</span>
                    )}
                  </div>
                  {job.jobcard_status ? (
                    <div>
                      <span>Jobcard</span>
                      <span>{job.jobcard_status}</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {job.jobcard_remarks ? (
                    <div>
                      <span>Remarks</span>
                      <span>{job.jobcard_remarks}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div
                  className={`${
                    job.dispatch_actual ? myStyle.completedStep : ""
                  }`}
                >
                  <div>
                    <span>Goods dispatched</span>
                    {job.dispatch_actual ? (
                      <span>{`${new Date(job.dispatch_actual)
                        .toDateString()
                        .slice(4)} 
                      ${new Date(
                        job.dispatch_actual
                      ).toLocaleTimeString()}`}</span>
                    ) : (
                      <span>pending</span>
                    )}
                  </div>
                  <div>
                    <span>Docket</span>
                    <span>Docket id</span>
                  </div>
                </div>
                {/* <div>
                  <div>
                    <span>Delivered</span>
                    <span>{`${new Date(job.timestamp).toDateString().slice(4)} 
                      ${new Date(job.timestamp).toLocaleTimeString()}`}</span>
                  </div>
                </div> */}
              </div>

              <div className={myStyle.orderDetailsContainer}>
                <div className="status">
                  {job.dispatch_order_status === "Extra Dispatched" ||
                  job.dispatch_order_status === "Dispatched" ? (
                    <span>Completed</span>
                  ) : job.dispatch_order_status === "Cancel" ? (
                    <span style={{ background: "red" }}>Cancelled</span>
                  ) : job.dispatch_order_status == "" ? (
                    <span style={{ background: "var(--color-primary-blue)" }}>
                      In process
                    </span>
                  ) : (
                    ""
                  )}
                  <span>26/07/2024 18:03:01</span>
                </div>
                <div>
                  <h2>{job.job_name}</h2>
                  {/* <h2>{job.job_order}</h2> */}
                </div>
                <div className="orderDetails">
                  <div>
                    <span>Client</span>
                    <span>{job.client}</span>
                  </div>
                  <div>
                    <span>Dimension</span>
                    <span>{job.dimensions}</span>
                  </div>
                  <div>
                    <span>Qty</span>
                    <span>{job.quantity}</span>
                  </div>
                  <div>
                    <span>Rate</span>
                    <span>{job.rate}</span>
                  </div>
                  {/* <div>
                    <span>Payment terms</span>
                    <span>50% ADVANCE & 50% BEFORE DISPATCH</span>
                  </div> */}
                  {/* <div>
                    <span>Warranty</span>
                    <span>NA</span>
                  </div>
                  <div>
                    <span>PI</span>
                    <span>NA</span>
                  </div>
                  <div>
                    <span>Warranty</span>
                    <span>NA</span>
                  </div> */}
                </div>
                <div>
                  <span>Remarks :</span>
                  <span>{job.remarks}</span>
                </div>

                <div className={myStyle.companyDetails}>
                  <div>
                    <span>Sales Person</span>
                    <span></span>
                  </div>
                  <div>
                    <span>GST</span>
                    <span></span>
                  </div>
                  <div>
                    <span>Contact</span>
                    <span></span>
                  </div>
                  <div>
                    <span>E-mail</span>
                    {/* <span>mis@gmail.com</span> */}
                  </div>
                  <div>
                    <span>Billing Address</span>
                    <span>
                      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Unde, voluptates aliquid? */}
                    </span>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
