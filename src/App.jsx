import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from "./components/AppLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {return (
      <Router>
          <AppLayout>
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/home" element={<HomePage />} />
                  {/* Add more routes as needed */}
              </Routes>
          </AppLayout>
      </Router>
  )
}

export default App
