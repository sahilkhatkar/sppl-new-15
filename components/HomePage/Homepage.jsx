"use client";

import React from 'react'
import { motion } from 'framer-motion'
import styles from "./homepage.module.css";
import { IoNotifications } from 'react-icons/io5';
import Image from 'next/image';
import { useData } from '@/app/DataProvider';

const fadeUp = {
    initial: { opacity: 0, y: 50 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const fadeIn = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

// const data = [
//     { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Administrator' },
//     { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
//     { id: 3, name: 'Charlie Rose', email: 'charlie@example.com', role: 'Subscriber' },
//     { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Contributor' },
//     { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Author' },
// ];


export default function Homepage({ session, name }) {

    let todayDate = new Date();

    const { data } = useData();
    console.log("Data: ", typeof data, data);

    return (
        <>
            <div className={styles.container}>

                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className={styles.greeting}
                    >
                        Hi,{" "}
                        <strong>
                            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                        </strong>
                    </motion.h1>

                    <div className={styles.dateAndUser}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className={styles.date}
                        >
                            <strong>{todayDate.toDateString()}</strong>
                        </motion.div>

                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.25 }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 10,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={styles.notificationButton}
                        >
                            <IoNotifications />
                        </motion.button>

                        <motion.div
                            className={styles.userProfile}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Image
                                src={session?.user?.image || BgImg}
                                height={50}
                                width={50}
                                alt="user-image"
                                style={{ borderRadius: "50%" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>



                <section className={styles.hero}>
                    <motion.h1
                        className={styles.title}
                        variants={fadeUp}
                        initial="initial"
                        animate="animate"
                    >
                        Welcome to Our Dashboard
                    </motion.h1>
                    <motion.p
                        className={styles.subtitle}
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                    >
                        Explore the latest orders below to gain insights.
                    </motion.p>
                    <motion.div
                        className={styles.tableWrapper}
                        variants={fadeUp}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.table
                            className={styles.table}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Client</th>
                                    <th>Job</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.slice(-10).reverse().map((user, index) => (
                                    <motion.tr
                                        key={user.job_order}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{user.job_order}</td>
                                        <td>{user.client}</td>
                                        <td>{user.job_name}</td>
                                        <td>{user.quantity}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </motion.table>
                    </motion.div>
                </section>
            </div>
        </>
    )
}
