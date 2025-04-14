"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import { IoMdSearch } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const action_url =
  "https://script.google.com/macros/s/AKfycbwSgNq3qiJXa9qdvQ2c3vwBDqEGbm27fgHX82OFrCDdoyqQDCCGV-BQ979_MKJtJMW-/exec";

export default function Page() {

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
        const response = await fetch(action_url, {
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

  const [orders, setOrders] = useState([
    {
      job_name: "",
      length: "",
      width: "",
      height: "",
      paper: "",
      gsm: "",
      quantity: "",
      rate: "",
      remarks: "",
    },
  ]);

  // Handle changes in the form inputs
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedOrders = [...orders];
    updatedOrders[index][name] = value;
    setOrders(updatedOrders);
  };

  // Add a new order
  const addOrder = () => {
    setOrders([
      ...orders,
      {
        job_name: "",
        length: "",
        width: "",
        height: "",
        paper: "",
        gsm: "",
        quantity: "",
        rate: "",
        remarks: "",
      },
    ]);
  };

  // Remove an order
  const removeOrder = (index) => {
    if (orders.length > 1) {
      const updatedOrders = orders.filter((_, i) => i !== index);
      setOrders(updatedOrders);
    }
  };

  // Validate the input data before submitting
  const validateInput = () => {
    for (let i = 0; i < orders.length; i++) {
      const { name, email, id, contact } = orders[i];
      if (!name || !email || !id || !contact) {
        alert(`Please fill all fields for Order #${i + 1}`);
        return false;
      }
    }
    return true;
  };

  // Handle the form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // if (!validateInput()) return;

  //   // Prepare data to send
  //   const formData = {};
  //   orders.forEach((order, index) => {
  //     formData[`job_name_${index + 1}`] = order.job_name;
  //     formData[`length_${index + 1}`] = order.length;
  //     formData[`width_${index + 1}`] = order.width;
  //     formData[`height_${index + 1}`] = order.height;
  //     formData[`paper_${index + 1}`] = order.paper;
  //     formData[`gsm_${index + 1}`] = order.gsm;
  //     formData[`quantity_${index + 1}`] = order.quantity;
  //     formData[`rate_${index + 1}`] = order.rate;
  //     formData[`remarks_${index + 1}`] = order.remarks;
  //   });
  //   formData["total_Orders"] = orders.length;
  //   console.log(formData);

  //   fetch(action_url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       // "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => alert("Thankx, done..."))
  //     .catch((err) => console.error(err));
  // };

  return (
    <>
      <div className={styles.container}>
        <h1>New Order</h1>

        {/* <ToastContainer /> */}

        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchQuery}
            className={styles.inputField}
            placeholder="Type company name here..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
              let temp = [];
              for (let i = 0; i < data.length; i++) {
                let companyName = data[i].companyName;
                if (
                  companyName
                    .toUpperCase()
                    .search(e.target.value.toUpperCase()) > -1
                ) {
                  temp.push(data[i]);
                }
              }
              temp.length > 0
                ? temp
                : temp.push({
                    _id: "1x000",
                    companyName: "No results found",
                  });
              setSearchedData(temp);
            }}
          />
          <button>
            <IoMdSearch />
          </button>

          <div
            className={styles.searchResults}
            style={searchedData.length ? { height: "20rem" } : { height: "0" }}
          >
            {searchedData &&
              searchedData.map((item) => {
                return (
                  <p
                    key={item._id}
                    onClick={handleSearchQuery}
                    value={item.companyName}
                  >
                    {/* {item._id}: */}
                    <span>{item.companyName}</span>
                    <span>{item.designer}</span>
                  </p>
                );
              })}
          </div>
        </div>

        <ToastContainer />

        <div className={styles.formContainer}>
          <div>
            <div className={styles.jobInput}>
              <input
                type="text"
                id="po-number"
                name="po-number"
                placeholder=""
                required
                // value={formState.poNumber}
                // onChange={(e) =>
                //   setFormState((res) => ({ ...res, poNumber: e.target.value }))
                // }
              />
              <label htmlFor="po-number">PO number</label>
            </div>
            <div>
              <div className={styles.jobInput}>
                <input
                  type="date"
                  id="po-date"
                  name="po-date"
                  placeholder=""
                  required
                  // value={formState.poDate}
                  // onChange={(e) => {
                  //   setFormState((res) => ({ ...res, poDate: e.target.value }));
                  //   console.log("Date: ", e.target.value);
                  // }}
                />
                <label htmlFor="po-date">PO Date</label>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.jobInput}>
              <input
                type="text"
                id="work-order-number"
                name="work-order-number"
                placeholder=""
                // value={formState.workOrderNumber}
                // onChange={(e) =>
                //   setFormState((res) => ({
                //     ...res,
                //     workOrderNumber: e.target.value,
                //   }))
                // }
              />
              <label htmlFor="work-order-number">Work Order no.</label>
            </div>

            <p>
              Client: <strong>{selectedCompany && selectedCompany}</strong>
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          name="myForm"
          style={{ minHeight: "100vh" }}
        >
          <h1>Order Form</h1>
          <div className={styles.jobs}>
            {orders.map((order, index) => (
              <div key={index} className={styles.jobContainer}>
                <p>
                  <span>Order {index + 1} </span>
                </p>
                <div className={styles.jobInput}>
                  <input
                    type="text"
                    id="job_name"
                    name="job_name"
                    value={order.name}
                    placeholder=""
                    required
                    onChange={(e) => handleChange(e, index)}
                  />
                  <label htmlFor="job_name">Job name</label>
                </div>

                <div className={styles.dimensions}>
                  <div className={styles.jobInput}>
                    <input
                      type="number"
                      id="length"
                      name="length"
                      placeholder=""
                      value={order.length}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <label htmlFor="length">Length</label>
                  </div>
                  <div className={styles.jobInput}>
                    <input
                      type="number"
                      id="width"
                      name="width"
                      placeholder=""
                      value={order.width}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <label htmlFor="width">Width</label>
                  </div>
                  <div className={styles.jobInput}>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      placeholder=""
                      value={order.height}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <label htmlFor="height">Height</label>
                  </div>
                </div>

                <div className={styles.jobInput}>
                  <input
                    type="text"
                    id="paper"
                    name="paper"
                    value={order.paper}
                    placeholder=""
                    required
                    onChange={(e) => handleChange(e, index)}
                  />
                  <label htmlFor="paper">Paper</label>
                </div>
                <div className={styles.jobInput}>
                  <input
                    type="text"
                    id="gsm"
                    name="gsm"
                    value={order.gsm}
                    placeholder=""
                    required
                    onChange={(e) => handleChange(e, index)}
                  />
                  <label htmlFor="gsm">GSM</label>
                </div>
                <div className={styles.jobInput}>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={order.id}
                    placeholder=""
                    required
                    onChange={(e) => handleChange(e, index)}
                  />
                  <label htmlFor="quantity">Quantity</label>
                </div>
                <div className={styles.jobInput}>
                  <input
                    type="number"
                    id="rate"
                    name="rate"
                    value={order.id}
                    placeholder=""
                    required
                    onChange={(e) => handleChange(e, index)}
                  />
                  <label htmlFor="rate">Rate</label>
                </div>
                <div className={styles.jobInput}>
                  <input
                    type="number"
                    id="remarks"
                    name="remarks"
                    value={order.id}
                    placeholder=""
                    required
                    onChange={(e) => handleChange(e, index)}
                  />
                  <label htmlFor="remarks">Remarks</label>
                </div>

                <p style={{ alignContent: "center" }}>
                  Total:
                  <strong>
                    {order.quantity &&
                      order.rate &&
                      parseFloat(order.quantity * order.rate).toFixed(2)}
                  </strong>
                </p>
              </div>
            ))}
          </div>

          <div className={styles.buttonContainer}>
            <button id={styles.add} type="button" onClick={addOrder}>
              +
            </button>
            <button
              id={styles.remove}
              type="button"
              onClick={() => removeOrder(orders.length - 1)}
            >
              -
            </button>
            <button id={styles.submit} type="submit">
              Submit All
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
