import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
    const [state, setState] = useState({
        // Add any state you want to share between Header and Footer
    });

    return (
        <LayoutContext.Provider value={{ state, setState }}>
            {children}
        </LayoutContext.Provider>
    );
};