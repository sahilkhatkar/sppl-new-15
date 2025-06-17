// context/SettingsContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const scriptURL = "https://script.google.com/macros/s/AKfycbwKxawj_o46QLFyC3l9phstfA68YwJ7Z6iALemnVtBVh4U1UGwiYM-BvMDSaCd15-ma/exec";

const DataContext = createContext();

// export const DataProvider = ({ children, data }) => {
export const DataProvider = ({ children }) => {

    const [data, setData] = useState([{ job_order: '...', po_number: 1, work_order_number: '', timestamp: 'loading...', po_date: '', client: '', job_name: 'loading...', quantity: '', paper: '', approval_status: '', artwork_status: '', remarks: '', jobcard_status: '', dispatch_status: '', balance_status: '' }]);

    useEffect(() => {
        const getSettings = async () => {
            try {
                const res = await fetch(scriptURL);
                const json = await res.json();
                setData(json);
                console.log('Fetched settings:', json);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            }
        };


        getSettings();
    }, []);


    return (
        <DataContext.Provider value={{ data }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};