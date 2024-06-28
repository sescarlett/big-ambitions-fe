import {createContext, useMemo, useState} from 'react';

/** @typedef {import ('../../mono-repo-globals/@types/jsdoc.d.js').AppContextValue} AppContextValue */

const AppContext = createContext({
    appState: {
        id: undefined,
        gameIdGlobal: undefined,
        isLoggedIn: undefined,
    },
    setAppState: () => {},
});

function AppContextProvider({ children }) {
    const [appState, setAppState] = useState({
        id: sessionStorage.getItem('userId') || undefined,
        gameIdGlobal: undefined,
        isLoggedIn: sessionStorage.getItem('isLoggedIn') || undefined ,
    });

    // Memoize the context value to avoid unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            appState,
            setAppState,
        }),
        [appState, setAppState]
    );

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;
export { AppContext };
