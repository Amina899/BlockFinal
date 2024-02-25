// pages/profile/[userId].js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../../components/NavbarComponent';
import styles from '../../styles/profile.module.scss';
import withAuth from '../../utils/withAuth';
import Cookies from 'js-cookie';
import FooterComponent from "../../components/FooterComponent";

const ProfilePage = () => {
    const router = useRouter();
    const { userId } = router.query;

    const [profile, setProfile] = useState({});
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        if (userId) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/profiles/${userId}`);
                    const data = await response.json();

                    if (response.ok) {
                        setProfile(data.profile || {});
                    } else {
                        console.error('Failed to fetch user profile:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            };

            const fetchFriendRequests = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/profiles/friend-requests/${userId}`);
                    const data = await response.json();

                    if (response.ok) {
                        setFriendRequests(data.friendRequests || []);
                    } else {
                        console.error('Failed to fetch friend requests:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching friend requests:', error);
                }
            };

            fetchUserProfile();
            fetchFriendRequests();
        }
    }, [userId]);

    if (!userId) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {/* Include NavbarComponent */}
            <NavbarComponent/>

            <div className={styles.profileContainer}>
                <h1>User Profile</h1>
                <div className={styles.userInfoContainer}>
                    {/* Display user profile information */}
                    <div className={styles.avatarContainer}>
                        <img
                            src={profile.avatarUrl || 'https://placekitten.com/100/100'}
                            alt="User Avatar"
                            className={styles.avatar}
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <p>Name: {profile.name}</p>
                        <p>Address: {profile.address}</p>
                        <p>Bio: {profile.bio}</p>
                        {/* Add more user information as needed */}
                    </div>
                </div>

                {/* Display friend requests */}
                <h2>Friend Requests</h2>
                {friendRequests.map((request) => (
                    <div key={request.id} className={styles.friendRequest}>
                        {/* Display friend request information */}
                        <p>From: {request.senderId}</p>
                        {/* Add Accept/Reject buttons or UI as needed */}
                        <button className={styles.acceptButton}>Accept</button>
                        <button className={styles.rejectButton}>Reject</button>
                    </div>
                ))}
            </div>

            <FooterComponent />

        </div>
    );
};

export default ProfilePage;
