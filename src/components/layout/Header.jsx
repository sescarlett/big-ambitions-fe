// src/components/Header.js

import {Button, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import routingUrls from "../../enums/routingUrls.js";

const Header = () => {
    const isLoginPage = location.pathname === routingUrls.login;
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate(routingUrls.login);
    }

    return (
        <Navbar expand="md" className="header">
                <Navbar.Brand className="app-title" href="/home">Big Ambitions Companion</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav hidden={isLoginPage}>
                        <Nav.Item>
                            <Nav.Link href="/product" className="nav-items">Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/display" className="nav-items">Displays</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/profile" className="nav-items">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="d-md-none ms-auto">
                            <Button
                                className="button"
                                variant="dark"
                                onClick={handleLogout}
                            >Logout
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            <div className="d-none d-md-block ms-auto" >
            <Button
                className="button"
                variant="dark"
                onClick={handleLogout}
                hidden={isLoginPage}
            >Logout
            </Button>
            </div>
        </Navbar>
    );
};

export default Header;
