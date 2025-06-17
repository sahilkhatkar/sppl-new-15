import styles from "./page.module.css";

// components/PieChart.js
import Barchart from "../components/Barchart";
import Piechart from "../components/Piechart";
import SalesComponent from "../components/SalesComponent";
import PendingList from "../components/PendingList";
// import { getName } from "../api/auth/signout/signOutBtn";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";

import BgImg from "../public/welcome-bg.jpg";
import { auth } from "../auth";
import CustomDropdown from "../components/CustomDropdown";
import Homepage from "../components/HomePage/Homepage";
import DataAnalysisPage from "../components/HomePage/DataAnalysisPage";

// (async function () {
//   const data = [
//     { year: 2010, count: 10 },
//     { year: 2011, count: 20 },
//     { year: 2012, count: 15 },
//     { year: 2013, count: 25 },
//     { year: 2014, count: 22 },
//     { year: 2015, count: 30 },
//     { year: 2016, count: 28 },
//   ];

//   new Chart(document.getElementById("acquisitions"), {
//     type: "bar",
//     data: {
//       labels: data.map((row) => row.year),
//       datasets: [
//         {
//           label: "Acquisitions by year",
//           data: data.map((row) => row.count),
//         },
//       ],
//     },
//   });
// })();

export default async function Home() {
  // const chartRef = useRef(null);
  // const chartInstanceRef = useRef(null);

  const session = await auth();

  const name = session?.user?.name.split(" ")[0];

  // console.log(navigator.userAgent);

  let todayDate = new Date();

  const options = [
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
  ]

  return (
    <>
      <Homepage name={name} session={session} />
      {/* <DataAnalysisPage /> */}

      {/* <div className={styles.charts}>
        <Piechart label="Orders" data={result} />
        <Barchart label="Orders" data={result} />
      </div> */}

      {/* <SalesComponent /> */}

      {/* <PendingList /> */}

      {/* <CustomDropdown defaultValue={options[0]} options={options}/> */}

    </>
  );
}
