// components/NavbarComponent.js

import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import Cookies from 'js-cookie'; // Import the Cookies library
import Link from 'next/link';

const NotificationIcon = ({ count }) => (
    <Link href="#notifications">
        <Nav.Link>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <g fill="none" fillRule="evenodd">
                    <path d="M0 0h24v24H0z" />
                    <path d="M4 21v-2a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v2" />
                    <path d="M0 0h24v24H0z" />
                </g>
            </svg>
            {count > 0 && <Badge bg="danger">{count}</Badge>}
        </Nav.Link>
    </Link>
);

const NavbarComponent = () => {
    const [isClient, setIsClient] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3); // Example notification count

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
                        <Nav.Link href="/main">Home</Nav.Link>
                        <Nav.Link href="#network">Network</Nav.Link>
                        <Nav.Link href="#jobs">Jobs</Nav.Link>
                        <Nav.Link href="#notifications">Notifications</Nav.Link>
                    </Nav>
                    {isClient && isLoggedIn && (
                        <>
                            <Form className="d-flex">
                                <FormControl type="text" placeholder="Search" className="mr-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Nav className="ms-2">
                                {/* Display the user's avatar */}
                                <Link href={`/profile/${Cookies.get.userId}`}>
                                    <img
                                        src="https://placekitten.com/100/100" // Replace with the URL of the user's actual avatar //
                                        alt="User Avatar"
                                        width="40"
                                        height="40"
                                        roundedCircle
                                    />
                                </Link>
                                <NotificationIcon count={notificationCount} />
                            </Nav>
                            <Button variant="outline-danger" onClick={handleLogout} className="ms-2">
                                Logout
                            </Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
