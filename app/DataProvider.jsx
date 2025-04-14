// context/SettingsContext.tsx
'use client';

import { createContext, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children, data }) => {
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