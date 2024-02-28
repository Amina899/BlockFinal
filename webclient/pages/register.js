// pages/register.js

import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import FooterComponent from "../components/FooterComponent";
import styles from "../styles/register.module.scss";
import Cookies from "js-cookie";
import Web3 from "web3";
const ethers = require('ethers');


const RegisterPage = () => {

    if (typeof window !== 'undefined' && window.ethereum) {
        const web3 = new Web3(window.ethereum);
        // Now you can use web3 and window.ethereum.request
    }
    const router = useRouter(); // Initialize the useRouter hook

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const connectButton = document.getElementById("connect");
        console.log("hers is the thing"+connectButton)

        connectButton.addEventListener("click", connectAccount);

        async function connectAccount() {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                const account = accounts[0];
                connectButton.innerHTML =
                    account.slice(0, 6) + "..." + account.slice(-4);
            } catch (error) {
                console.error('Error connecting MetaMask:', error);
            }
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        const metaMaskAddress = document.getElementById("connect").innerText;
        Cookies.set('metamask-address', metaMaskAddress)

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
                    address: metaMaskAddress
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

                {/* MetaMask Connect Button inside the Form */}
                <div className="mb-3">
                    <button className={styles.connect} id="connect">
                        Connect MetaMask
                    </button>
                </div>

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
