// pages/register.js

import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';

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
                <h2>Join LinkedIn</h2>
                <p>Discover opportunities, connect with professionals, and more.</p>

                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Your Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Join Now
                    </Button>
                </Form>
            </Container>

            <footer className="text-center mt-5">
                <p>&copy; 2024 LinkedIn Corporation</p>
            </footer>
        </div>
    );
};

export default RegisterPage;
