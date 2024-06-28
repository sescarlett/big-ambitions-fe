import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from "./components/layout/AppLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AppContextProvider, {AppContext} from "./contexts/AppContextProvider.jsx";
import routingUrls from "./enums/routingUrls.js";
import DisplayPage from "./pages/DisplayPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import {useContext} from "react";

function App() {
    const { appState } = useContext(AppContext);

    return (
        <AppContextProvider>
            <Router>
                <AppLayout>
                    <Routes>
                        <Route path="*" element={<LoginPage />} />
                        <Route path={routingUrls.login} element={<LoginPage />} />
                        <Route path={routingUrls.home} element={<HomePage loggedIn={appState.isLoggedIn} />} />
                        <Route path={routingUrls.product} element={<ProductPage loggedIn={appState.isLoggedIn} />} />
                        <Route path={routingUrls.display} element={<DisplayPage loggedIn={appState.isLoggedIn} />} />
                        <Route path={routingUrls.profile} element={<ProfilePage loggedIn={appState.isLoggedIn} />} />
                    </Routes>
                </AppLayout>
            </Router>
        </AppContextProvider>
    )
}

export default App
