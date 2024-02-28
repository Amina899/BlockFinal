// components/RecentlyRegisteredUsers.js

import React, { useState, useEffect } from 'react';

const RecentlyRegisteredUsers = () => {
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        // Fetch the list of recently registered users
        const fetchRecentUsers = async () => {
            try {
                const response = await fetch('http://localhost:4000/profiles/users');
                const data = await response.json().then(json => {
                    setRecentUsers(json.userProfile)
                });


            } catch (error) {
                console.error('Error fetching recently registered users:', error);
            }
        };

        fetchRecentUsers();
    });

    return (
        <div>
            <h2>Greet Newcomers!</h2>
            <div>
                <ul>
                    {recentUsers.map((user) => (
                        <li key={user.id}>
                            {user.full_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentlyRegisteredUsers;
