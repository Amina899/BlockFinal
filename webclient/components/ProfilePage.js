// components/ProfilePage.js

import React, { useEffect, useState } from 'react';
import { getFriendRequests } from '../api'; // Import the API function to fetch friend requests

const ProfilePage = ({ userId }) => {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await getFriendRequests(userId);
                if (response.success) {
                    setFriendRequests(response.friendRequests);
                } else {
                    console.error('Failed to fetch friend requests:', response.error);
                }
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };

        fetchFriendRequests();
    }, [userId]);

    return (
        <div>
            <h1>User Profile</h1>
            {/* Display user profile information */}
            {/* Display friend requests */}
            <h2>Friend Requests</h2>
            {friendRequests.map((request) => (
                <div key={request.id}>
                    {/* Display friend request information */}
                    {/* Add Accept/Reject buttons or UI as needed */}
                </div>
            ))}
        </div>
    );
};

export default ProfilePage;
