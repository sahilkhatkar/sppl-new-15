"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PendingList from "../../components/PendingList";
import JobStatusTable from "../../components/JobStatus";

export default function JobStatus() {
  const router = useRouter();

  // const data = useSelector((state) => state.data.datas.importedData);

  const [currentJobList, setCurrentJobList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [pendingTableData, setPendingTableData] = useState([]);

  return (
    <div className={styles.container}>
      {/* <h1>Job status</h1>({data && data?.length}) */}
      {data &&
        data.map((job, index) => {
          return <p key={index}>{job.designer}</p>;
        })}
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
      <JobStatusTable />
      <PendingList />
    </div>
  );
}
