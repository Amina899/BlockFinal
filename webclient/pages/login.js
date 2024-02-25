// pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import FooterComponent from "../components/FooterComponent";

const LoginPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log('Login successful:', data);

                // Store the userId in a cookie
                Cookies.set('userId', data.userId);

                // Redirect to the main page upon successful login
                Cookies.set('isLoggedIn', true);
                router.push('/main');
            } else {
                console.error('Login failed:', data);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleRegisterRedirect = () => {
        // Redirect to the register page
        router.push('/register');
    };

    return (
        <div>
            <Head>
                <title>Login - LinkedIn</title>
                <meta name="description" content="Login to your LinkedIn account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container className="mt-3">
                <h2>Login to LinkedIn</h2>

                <Form onSubmit={handleLogin}>
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
                        Login
                    </Button>

                    {/* Button to redirect to the register page */}
                    <Button variant="link" onClick={handleRegisterRedirect}>
                        Click here to Sign Up.
                    </Button>
                </Form>
            </Container>

            <FooterComponent />
        </div>
    );
};

export default LoginPage;
