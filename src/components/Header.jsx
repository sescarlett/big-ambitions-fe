// src/components/Header.js
// import { useLayout } from '../context/LayoutContext';

import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Header = () => {
    // const { state } = useLayout();

    return (
        <div className="header">
            <Navbar className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#home">Big Ambitions Companion</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/product">Products</NavDropdown.Item>
                                <NavDropdown.Item href="/display">Displays</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/profile">
                                    Profile
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
