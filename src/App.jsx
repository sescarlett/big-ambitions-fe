import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from "./components/AppLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AppContextProvider from "./contexts/AppContextProvider.jsx";
import routingUrls from "./enums/routingUrls.js";

function App() {return (
    <AppContextProvider>
      <Router>
          <AppLayout>
              <Routes>
                  <Route path={routingUrls.login} element={<LoginPage />} />
                  <Route path={routingUrls.home} element={<HomePage />} />
                  {/* Add more routes as needed */}
              </Routes>
          </AppLayout>
      </Router>
    </AppContextProvider>
  )
}

export default App
