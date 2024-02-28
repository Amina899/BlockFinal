// pages/main.js

import React, { useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../components/NavbarComponent';
import FeedComponent from '../components/FeedComponent';
import RecentlyRegisteredUsers from "../components/RecentlyRegisteredUsers";
import '../styles/main.module.scss';
import withAuth from '../utils/withAuth';
import Cookies from 'js-cookie';
import FooterComponent from "../components/FooterComponent"; // Import the Cookies library
import {useWeb3} from "@3rdweb/hooks"

const HomePage = () => {

    const {address, chainId} = useWeb3();
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
                    <meta name="description" content="Welcome to LinkedIn - Your professional network"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <NavbarComponent/>

                <div className="container">
                    <div className="main-content">
                        <FeedComponent/>
                    </div>

                    <div className="sidebar">
                        {/* Include the RecentlyRegisteredUsers component in the sidebar */}
                    </div>
                </div>

                <FooterComponent/>

            </div>
        );

}

export default withAuth(HomePage);
