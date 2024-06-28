import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from "./components/layout/AppLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AppContextProvider from "./contexts/AppContextProvider.jsx";
import routingUrls from "./enums/routingUrls.js";
import DisplayPage from "./pages/DisplayPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {

    return (
        <AppContextProvider>
            <Router>
                <AppLayout>
                    <Routes>
                        <Route path="*" element={<LoginPage />} />
                        <Route path={routingUrls.login} element={<LoginPage />} />
                        <Route path={routingUrls.home} element={<HomePage />} />
                        <Route path={routingUrls.product} element={<ProductPage />} />
                        <Route path={routingUrls.display} element={<DisplayPage />} />
                        <Route path={routingUrls.profile} element={<ProfilePage />} />
                    </Routes>
                </AppLayout>
            </Router>
        </AppContextProvider>
    )
}

export default App
