// components/NavbarComponent.js

import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Cookies from 'js-cookie'; // Import the Cookies library

const NavbarComponent = () => {
    const [isClient, setIsClient] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');
    }, []);

    const handleLogout = () => {
        // Clear the session and reload the page
        Cookies.remove('isLoggedIn');
        window.location.reload();
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src="/logo.png"
                        width="90"
                        height="50"
                        className="d-inline-block align-top"
                        alt="LinkedIn Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#network">Network</Nav.Link>
                        <Nav.Link href="#jobs">Jobs</Nav.Link>
                        <Nav.Link href="#notifications">Notifications</Nav.Link>
                    </Nav>
                    {isClient && isLoggedIn && (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                    <Form className="d-flex">
                        <FormControl type="text" placeholder="Search" className="mr-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
