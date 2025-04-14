'use client';

import Content from "./content";
import TableToImage from "./tableToImage";
import { useData } from "../DataProvider";

// import ViewAll from "../../../components/ViewAll";

export default function OrdersList() {

  const { data } = useData();
  // console.log("Data FROM OrdersLIst: ", data);

  const pendingList = data.reduce((accumulator, job) => {
    // if (order.dispatch_order_status === "Cancel") return accumulator;
    // else
    if (
      (job.dimensions == "" ||
        job.paper == "" ||
        job.gsm == "" ||
        job.quantity == "" ||
        job.rate == "" ||
        job.sheet_size_length == "" ||
        job.sheet_size_width == "") &&
      job.dispatch_order_status != "Cancel"
    ) {
      accumulator.push({
        job_order: job.job_order,
        po_number: job.po_number,
        client: job.client,
        po_date: `${new Date(job.po_date).getDate()}/${new Date(job.po_date).getMonth() + 1
          }/${new Date(job.po_date).getFullYear()}`,
        job_name: job.job_name,
        dimensions: job.dimensions,
        paper: job.paper,
        gsm: job.gsm,
        quantity: job.quantity,
        rate: job.rate,
        sheet_size_length: job.sheet_size_length,
        sheet_size_width: job.sheet_size_width,
        sheet_size_ups: job.sheet_size_ups,
      });
    }
    return accumulator;
  }, []);

  const totalAmount = data?.reduce((sum, job) => {
    if (job.dispatch_order_status == "Cancel") return sum;
    return (
      sum +
      (parseFloat(job.quantity) || 0) * (parseFloat(job.rate) || 0)
    );
  }, 0);

  const completedJobs = data?.reduce((arr, job) => {
    if (job.dispatch_quantity >= job.quantity)
      arr.push(job);
    return arr;
  }, []);

  const pendingJobs = data?.reduce((sum, job) => {
    if (
      job.dispatch_quantity == "" &&
      job.dispatch_order_status != "Cancel" &&
      new Date(job.timestamp) < new Date(new Date() - 86400000 * 3)
    ) {
      // console.log(new Date());
      // if (job.dispatch_quantity >= job.quantity) {
      return sum + 1;
    }
    return sum;
  }, 0);

  const totalOrders = data?.reduce((sum, job) => {
    if (job.dispatch_quantity == "")
      return sum + 1;
    return sum;
  }, 0);

  const partialQuantity = data?.reduce((arr, job) => {
    if (
      job.dispatch_quantity != "" &&
      job.dispatch_quantity < job.quantity &&
      job.dispatch_order_status != "Cancel"
    )
      arr.push(job);
    return arr;
  }, []);

  const artworkPending = data?.reduce((arr, job) => {
    if (
      job.po_number != "Advance" &&
      job.remarks != "Hold" &&
      job.artwork_status != "Approved" &&
      job.artwork_status != "Repeat" &&
      job.dispatch_quantity == ""
    )
      arr.push(job);
    return arr;
  }, []);

  const jobcardPending = data?.reduce((arr, job) => {
    if (
      job.po_number != "Advance" &&
      job.remarks != "Hold" &&
      job.jobcard_status != "Created"
    )
      arr.push(job);
    return arr;
  }, []);

  const printPending = data?.reduce((arr, job) => {
    if (
      job.po_number != "Advance" &&
      job.remarks != "Hold" &&
      job.jobcard_status == "Created" &&
      job.print_ready_status == "" &&
      job.dispatch_quantity == ""
    )
      arr.push(job);
    return arr;
  }, []);

  const totalPending = data?.reduce((arr, job) => {
    if (
      job.po_number != "Advance" &&
      job.remarks != "Hold" &&
      job.dispatch_quantity == ""
    )
      arr.push(job);
    return arr;
  }, []);

  const printCompleteMaterialReady = data?.reduce((acc, job) => {
    if (job.po_number != "Advance" &&
      job.remarks != "Hold" &&
      (
        job.order_status == "Print complete" ||
        job.order_status == "Material ready"
      )
      && job.dispatch_quantity == ""
    )
      acc.push(job);
    return acc;
  }, []);

  const cancelOrder = data?.reduce((count, order) => {
    return order.dispatch_order_status === "Cancel" ? count + 1 : count;
  }, 0);

  const pendingOrder = pendingJobs;
  // const pendingOrder = data.length - completedJobs - cancelOrder;
  const avgOrderValue = (
    totalAmount /
    (data.length - cancelOrder)
  ).toFixed(0);

  // JobStatus List starts here...

  let b = data.reduce((acc, { designer, artwork_status }) => {
    // Find if the designer already exists in the accumulator
    let existingDesigner = acc.find(
      (item) => item.designer === designer
    );

    if (!existingDesigner) {
      // If not, create a new entry for the designer
      existingDesigner = {
        designer: designer,
        artwork_status: {},
      };
      acc.push(existingDesigner);
    }

    // Increment the count for the artwork status
    existingDesigner.artwork_status[artwork_status.toLowerCase()] =
      (existingDesigner.artwork_status[artwork_status.toLowerCase()] ||
        0) + 1;

    return acc;
  }, []);

  const jobStatusList = b.reduce((obj, job) => {
    obj.push({
      designer: job.designer,
      total: 99,
      pending: job.artwork_status[""] ? job.artwork_status[""] : 0,
      repeat: job.artwork_status.repeat,
      approved: job.artwork_status.approved,
      sentForApproval:
        typeof job.artwork_status["sent for approval"] === "undefined"
          ? 0
          : job.artwork_status["sent for approval"],
      hold: job.artwork_status.hold ? job.artwork_status.hold : 0,
    });
    return obj;
  }, []);

  let obj = {
    data: data,
    jobStatusList: jobStatusList,
    artworkPending: artworkPending,
    jobcardPending: jobcardPending,
    pendingList: pendingList,
    totalOrders: data,
    completedJobs: completedJobs,
    pendingOrder: pendingOrder,
    cancelOrder: cancelOrder,
    avgOrderValue: avgOrderValue,
    partialQuantity: partialQuantity,
    totalAmount: totalAmount.toFixed(0),
    printPending: printPending,
    totalPending: totalPending,
    printReady: printCompleteMaterialReady,
  };


  return (
    <>
      <Content obj={obj} />
      {/* <TableToImage /> */}
    </>
  );
}