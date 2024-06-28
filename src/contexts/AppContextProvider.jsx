import {createContext, useEffect, useMemo, useState} from 'react';

/** @typedef {import ('../../mono-repo-globals/@types/jsdoc.d.js').AppContextValue} AppContextValue */

const AppContext = createContext({
    appState: { id: undefined, gameIdGlobal: undefined },
    setAppState: () => { },
});

function AppContextProvider({ children }) {
    const [appState, setAppState] = useState(() => ({ id: undefined,  gameIdGlobal: undefined, isLoggedIn: false }));
    const contextState = useMemo(
        () => ({
            // app state
            appState,
            setAppState,
        }),
        [appState, setAppState]
    );

    useEffect(() => {
        // Load the ID from sessionStorage
        const storedId = sessionStorage.getItem('userId');

        if (storedId) {
            // If ID is found in sessionStorage, update the app state with it
            setAppState({ id: storedId });
        }
    }, []);

    return (
        <AppContext.Provider value={contextState}>
            {children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;
export { AppContext };
