// pages/profile/[userId].js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import styles from "../../styles/profile.module.scss";

const ProfilePage = () => {

    const router = useRouter();
    const { userId } = router.query;

    const [profile, setProfile] = useState({
        avatarUrl: 'https://placekitten.com/100/100',
        address: 'Ohio, USA',
        bio: "Hi, My name is Ben and I like cats, so if you've got any spare me some",
        erc20TokenBalance: 105.50,
        erc721TokenCount: 3,
    });
    const [friendRequests, setFriendRequests] = useState([]);
    const [recipientId, setRecipientId] = useState(''); // State to hold the recipient's ID or name

    useEffect(() => {

        const isLoggedIn = Cookies.get('isLoggedIn') === 'true';

        if (!isLoggedIn) {
            window.location.replace('/login'); // Redirect to login page if not logged in
        }
        if (userId) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/profiles/${userId}`);
                    const data = await response.json();

                    if (response.ok) {
                        setProfile(data.profile);
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
                        setFriendRequests(data.friendRequests);
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

    // Function to handle sending friend request
    const handleSendFriendRequest = async () => {
        try {
            const response = await fetch(`http://localhost:4000/profiles/send-friend-request/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: Cookies.get('userId'), // Assuming senderId is stored in cookies
                    receiverId: recipientId, // Using the state for recipientId
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Friend request sent successfully:', data);
                // Optionally, you can fetch the updated friend requests list
                // to reflect the changes instantly without a page reload
                // fetchFriendRequests();
            } else {
                console.error('Failed to send friend request:', data.error);
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    if (!userId) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <NavbarComponent />
                <div className={styles.profileContainer}>
                    <h1>User Profile</h1>
                    <div>
                        {/* Display user profile information */}
                        <img src={profile.avatarUrl || 'https://placekitten.com/100/100'} alt="User Avatar" style={{ width: '100px', height: '100px' }} />
                        <p>Address: {profile.address}</p>
                        <p>Bio: {profile.bio}</p>
                        <p>erc20TokenBalance: {profile.erc20TokenBalance}</p>
                        <p>erc20TokenCount: {profile.erc721TokenCount}</p>
                    </div>

                    {/* Input field for recipient's ID or name */}
                    <div className={styles.sendFriendRequest}>
                        <div>
                            <label>
                                Recipient ID or Name:
                                <input type="text" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} />
                            </label>
                        </div>

                        {/* Button to send friend request */}
                        <div>
                            <button onClick={handleSendFriendRequest} className={styles.acceptButton}>Send Friend Request</button>
                        </div>
                    </div>

                    {/* Display friend requests */}
                    <h2>Friend Requests</h2>
                    {friendRequests.map((request) => (
                        <div key={request.id} className={styles.friendRequest}>
                            {/* Display friend request information */}
                            <p>From: {request.senderId}</p>
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
