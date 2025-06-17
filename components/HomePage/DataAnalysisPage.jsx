'use client';

import React from 'react';
import styles from './dataAnalysisPage.module.css';
import { motion } from 'framer-motion';

const clientData = [
    { id: 1, client: "AFKINZ Suisse India Pvt. Ltd", jobs: 2, value: 196250 },
    { id: 2, client: "Afxia Franke", jobs: 4, value: 220750 },
    { id: 5, client: "Allrite Pharmaceuticals Unit-I", jobs: 59, value: 2565269 },
    { id: 14, client: "Combitic Global Caplet", jobs: 52, value: 0 },
    { id: 15, client: "Curetech Skincare", jobs: 20, value: 15633041 },
    { id: 17, client: "East African Plot No-1", jobs: 53, value: 4517441 },
    { id: 39, client: "Skymap Pharma B3", jobs: 49, value: 1265097 },
    { id: 48, client: "Yacca Pharmaceuticals Pvt. Ltd.", jobs: 1, value: 346000 },
];

const highlightThreshold = 50;

export default function ClientTable() {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Client</th>
                        <th>Jobs</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {clientData.map((row, index) => (
                        <motion.tr
                            key={row.id}
                            className={`${styles.row} ${styles.hoverEffect}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <td>{index + 1}</td>
                            <td>{row.client}</td>
                            <td className={row.jobs >= highlightThreshold ? styles.highlight : ''}>
                                {row.jobs}
                            </td>
                            <td className={styles.valueCell}>
                                {row.value.toLocaleString()}
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

