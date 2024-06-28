import { LayoutProvider } from '../../contexts/LayoutContext.jsx';
import Header from "./Header.jsx";

// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
    return (
        <LayoutProvider>
            <div className="app-layout">
                <Header />
                <main className="content">{children}</main>
            </div>
        </LayoutProvider>
    );
};

export default AppLayout;