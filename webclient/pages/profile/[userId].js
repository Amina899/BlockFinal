// pages/profile/[userId].js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import styles from "../../styles/profile.module.scss";
import {Button} from "react-bootstrap";

const ProfilePage = () => {

    const router = useRouter();
    const { userId } = router.query;

    const [profile, setProfile] = useState({
        address: 'Nothing here yet',
        bio: "I'm new here, hope you're all nice!",
        erc20TokenBalance: 105.50,
        erc721TokenCount: 3,
    });

    const [friendRequests, setFriendRequests] = useState([]);
    const [recipientId, setRecipientId] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {

        const isLoggedIn = Cookies.get('isLoggedIn') === 'true';

        if (!isLoggedIn) {
            window.location.replace('/login'); // Redirect to login page if not logged in
        }

        if (userId) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/profiles/${userId}`);
                    const data = await response.json().then(json => {
                        setProfile(json.userProfile)
                    });

                    if (response.ok) {
                        console.log("user profile fetched")
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
                    const data = await response.json().then(json => {
                        setFriendRequests(json.friendRequests)
                    });

                    if (response.ok) {
                        console.log("fetched friend requests")
                    } else {
                        console.error('Failed to fetch friend requests:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching friend requests:', error);
                }
            };

            const fetchFriendsList = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/profiles/friends/${userId}`);
                    const data = await response.json().then(json => {
                        setFriendsList(json.friendsList)
                    });

                    if (response.ok) {
                        console.log("fetched friends list")
                    } else {
                        console.error('Failed to fetch friends list:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching friends list:', error);
                }
            };

            fetchUserProfile();
            fetchFriendRequests();
            fetchFriendsList()
        }

    });

    // Function to handle sending friend request
    const handleSendFriendRequest = async () => {
        try {
            const response = await fetch(`http://localhost:4000/profiles/send-friend-request/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: Cookies.get('userId'),
                    receiverId: recipientId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Friend request sent successfully:', data);
                // Optionally, you can fetch the updated friend requests list
                // to reflect the changes instantly without a page reload
                // fetchFriendRequests();

                // Display success message
                setSuccessMessage('Friend request sent successfully!');
                // Clear success message after a few seconds
                setTimeout(() => setSuccessMessage(''), 5000);
            } else {
                console.error('Failed to send friend request:', data.error);
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            const response = await fetch('http://localhost:4000/profiles/accept-friend-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                // Fetch updated friend requests and profile
                fetchFriendRequests();
                fetchUserProfile();
            } else {
                console.error('Failed to accept friend request:', data.error);
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            const response = await fetch('http://localhost:4000/profiles/reject-friend-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                // Fetch updated friend requests
                fetchFriendRequests();
            } else {
                console.error('Failed to reject friend request:', data.error);
            }
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };


    if (!userId) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <NavbarComponent />
            <div className={styles.userProfileContainer}>
                <h1>User Profile</h1>
                <div className={styles.containerFlex}>
                    <div className={styles.userDetailsContainer}>
                        <div className={styles.avatarContainer}>
                            <img src={profile.avatar_url} alt="User Avatar" />
                        </div>
                        <div className={styles.userInfo}>
                            <p>Name: {profile.full_name}</p>
                            <p>Address: {profile.address}</p>
                            <p>Bio: {profile.bio}</p>
                            <p>erc20TokenBalance: {profile.erc20_token_balance}</p>
                            <p>erc20TokenCount: {profile.erc721_token_count}</p>
                        </div>
                    </div>

                    {/* Display friends list */}
                    <div className={styles.friendsListContainer}>
                        <h2>Friends</h2>
                        <ul>
                            {friendsList.map((friend) => (
                                <li key={friend.id}>{friend.full_name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Display friend requests */}
                    <div className={styles.friendRequestsContainer}>
                        <h2>Friend Requests</h2>
                        {friendRequests.map((request) => (
                            <div key={request.id} className={styles.friendRequest}>
                                {/* Display friend request information */}
                                <p>From: {request.sender_name}</p>
                                <Button variant="success" onClick={() => handleAcceptRequest(request.id)}>
                                    Accept
                                </Button>
                                <Button variant="danger" onClick={() => handleRejectRequest(request.id)}>
                                    Reject
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Input field for recipient's ID or name */}
                    <div className={styles.sendFriendRequestContainer}>
                        <h2>Send Friend Request</h2>
                        <form>
                            <div>
                                <label>
                                    Recipient ID or Name:
                                    <input type="text" value={recipientId} onChange={(e) => setRecipientId(e.target.value)}/>
                                </label>
                            </div>

                            {/* Button to send friend request */}
                            <div>
                                <button onClick={handleSendFriendRequest} className={styles.acceptButton}>Send Friend Request
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Display success message */}
                    {successMessage && (
                        <div className={styles.successMessage}>
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
            <FooterComponent />
        </div>
    );
};

export default ProfilePage;
