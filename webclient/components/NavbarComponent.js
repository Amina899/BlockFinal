// components/NavbarComponent.js

import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import Cookies from 'js-cookie'; // Import the Cookies library
import Link from 'next/link';

const NotificationIcon = ({ count }) => (
    <Link href="#notifications" passHref>
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
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        setIsClient(true);
        setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');

        // Fetch friend requests and set notificationCount
        const fetchFriendRequests = async () => {
            try {
                const response = await fetch(`http://localhost:4000/profiles/friend-requests/${Cookies.get('userId')}`);
                const data = await response.json().then(json => {
                    setNotificationCount(json.friendRequests.length)
                });

                if (response.ok) {
                    console.log("fetched friend requests");
                } else {
                    console.error('Failed to fetch friend requests:', data.error);
                }
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };

        if (isLoggedIn) {
            fetchFriendRequests();
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        // Clear the session and reload the page
        Cookies.remove('isLoggedIn');
        window.location.reload();
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/main">Home</Nav.Link>
                        <Nav.Link href="#network">Network</Nav.Link>
                        <Nav.Link href="#jobs">Jobs</Nav.Link>
                        <Nav.Link href="#learning">Learning</Nav.Link>
                    </Nav>
                    {isClient && isLoggedIn && (
                        <>
                            <Nav className="ms-2">
                                {/* Display the user's avatar */}
                                <Link href={`/profile/${Cookies.get('userId')}`}>
                                    <img
                                        src="https://placekitten.com/100/100"
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
