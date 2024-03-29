// pages/main.js

import React, { useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../components/NavbarComponent';
import FeedComponent from '../components/FeedComponent';
import '../styles/main.module.scss';
import withAuth from '../utils/withAuth';
import Cookies from 'js-cookie'; // Import the Cookies library

const HomePage = () => {
    useEffect(() => {
        const isLoggedIn = Cookies.get('isLoggedIn') === 'true';

        if (!isLoggedIn) {
            window.location.replace('/login'); // Redirect to login page if not logged in
        }
    }, []);

    return (
        <div>
            <Head>
                <title>LinkedIn</title>
                <meta name="description" content="Welcome to LinkedIn - Your professional network" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavbarComponent />

            <FeedComponent />

            <footer className="text-center mt-5">
                <p>&copy; 2024 LinkedIn Corporation</p>
            </footer>
        </div>
    );
};

export default withAuth(HomePage);
