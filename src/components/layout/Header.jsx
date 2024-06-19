// src/components/Header.js

import {Button, Container, Nav, Navbar} from "react-bootstrap";
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
        <Navbar className="header" expand="md">
            <Container fluid>
                <Navbar.Brand className="app-title" href="/home">Big Ambitions Companion</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav hidden={isLoginPage}>
                        <Nav.Item>
                            <Nav.Link href="/product">Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/display">Displays</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Button
                                variant="dark"
                                hidden={isLoginPage}
                                onClick={handleLogout}
                            >Logout
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
