import { LayoutProvider } from '../contexts/LayoutContext';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
    return (
        <LayoutProvider>
            <div className="app-layout">
                <Header />
                <main className="content">{children}</main>
                <Footer />
            </div>
        </LayoutProvider>
    );
};

export default AppLayout;