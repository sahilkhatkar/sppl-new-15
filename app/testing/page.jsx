'use client';


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { IoMdInformationCircle } from "react-icons/io";

export default function Home() {
    const [isPopUpOpen, setPopUpOpen] = useState(false);

    const order = {
        id: 'ORD123',
        customer: 'Alice Johnson',
        status: 'Shipped',
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            <h1>Order Dashboard</h1>
            <button
                onClick={() => setPopUpOpen(true)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#0070f3',
                    fontSize: '18px',
                    cursor: 'pointer',
                }}
                aria-label="View Order Info"
            >
                <IoMdInformationCircle />
            </button>

            <AnimatePresence>
                {isPopUpOpen && (
                    <>
                        <motion.div
                            className={styles.overlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setPopUpOpen(false)}
                        />
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <h2>Order Information</h2>
                            <p><strong>ID:</strong> {order.id}</p>
                            <p><strong>Customer:</strong> {order.customer}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <button className={styles.closeBtn} onClick={() => setPopUpOpen(false)}>Close</button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}
