// src/components/Header.js

import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
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
        <Navbar className="header">
            <Container fluid>
                <Navbar.Brand className="app-title">Big Ambitions Companion</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" hidden={isLoginPage}>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/product">Products</NavDropdown.Item>
                                    <NavDropdown.Item href="/display">Displays</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/profile">
                                        Profile
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <Button
                            variant="dark"
                            className="ms-auto"
                            hidden={isLoginPage}
                            onClick={handleLogout}
                        >Logout
                        </Button>
            </Container>
        </Navbar>
    );
};

export default Header;
