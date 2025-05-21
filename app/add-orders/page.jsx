'use client';

import { useState } from 'react';
import styles from './style.module.css';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function PurchaseOrderPage() {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        qty: '',
        price: '',
        warranty: '',
        remarks: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(`Changed: ${e.target.name} = ${e.target.value}`);
    };

    const validate = () => {
        const errs = {};
        if (!formData.productName) errs.productName = 'Product Name is required';
        if (!formData.productDescription) errs.productDescription = 'Product Description is required';
        if (!formData.qty || isNaN(formData.qty)) errs.qty = 'Valid quantity required';
        if (!formData.price || isNaN(formData.price)) errs.price = 'Valid price required';
        if (!formData.warranty) errs.warranty = 'Warranty is required';
        if (!formData.remarks) errs.remarks = 'Remarks are required';
        console.log('Validation Errors:', errs);
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            console.log('Submitting data:', formData);
            const response = await fetch('https://script.google.com/macros/s/AKfycbzksGYOF-SpIK8V_Oyrz3EXnIi5voboMeCWx6SXhEIQ8rsTRXmle9_MPqMvUjsIXw/exec', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log('Google Sheet Response:', result);
            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <>
            <Head>
                <title>Purchase Order</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className={styles.wrapper}>
                <motion.form
                    onSubmit={handleSubmit}
                    className={styles.form}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.heading}>PURCHASE ORDER</h1>

                    {[
                        { label: 'Product Name', name: 'productName' },
                        { label: 'Product Description', name: 'productDescription' },
                        { label: 'Quantity', name: 'qty', type: 'number' },
                        { label: 'Price', name: 'price', type: 'number' },
                        { label: 'Warranty', name: 'warranty' },
                        { label: 'Remarks', name: 'remarks' },
                    ].map(({ label, name, type = 'text' }) => (
                        <div className={styles.group} key={name}>
                            <label className={styles.label}>{label}</label>
                            <input
                                className={styles.inputField}
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={`Enter ${label.toLowerCase()}`}
                            />
                            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
                        </div>
                    ))}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className={styles.button}
                    >
                        Submit
                    </motion.button>

                    {submitted && <p className={styles.success}>Form submitted successfully!</p>}
                </motion.form>
            </div>
        </>
    );
}
