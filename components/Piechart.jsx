"use client";
import React from "react";
import Chart from "chart.js/auto";

export default function Piechart({ label, data }) {
  (async function () {
    const c = Chart.getChart("pieChart");
    if (c) {
      c.destroy();
    }

    // const data = [
    //   { year: 2010, count: 10 },
    //   { year: 2011, count: 20 },
    //   { year: 2012, count: 15 },
    //   { year: 2015, count: 30 },
    //   { year: 2016, count: 28 },
    // ];

    new Chart(document.getElementById("pieChart"), {
      type: "pie",
      data: {
        labels: data.map((row) => row.client),
        datasets: [
          {
            label: label,
            data: data.map((row) => row.orders),
            // backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Monthly Sales Data",
          },
        },
      },
    });
  })();

  return (
    <>
      <canvas id="pieChart" width="300px" height="200px"></canvas>
    </>
  );
}
