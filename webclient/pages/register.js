// pages/register.js

import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from "../components/FooterComponent";

const RegisterPage = () => {
    const router = useRouter(); // Initialize the useRouter hook

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                // Redirect to the login page upon successful registration
                router.push('/login');
            } else {
                console.error('Registration failed:', data);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <Head>
                <title>Register - LinkedIn</title>
                <meta name="description" content="Create a new account on LinkedIn" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container className="mt-3">
                <h2>Sign Up to LinkedIn</h2>
                <p>Make connections, build career and enhance your portfolio.</p>

                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Container>

            <FooterComponent />
        </div>
    );
};

export default RegisterPage;
