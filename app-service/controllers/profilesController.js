// controllers/profilesController.js

const ProfileModel = require('../models/ProfileModel');
const db = require('../db');

const addProfile = async (userId, avatarUrl, address, bio, erc20TokenBalance, erc721TokenCount) => {
    try {
        const profileId = await ProfileModel.createProfile({ userId, avatarUrl, address, bio, erc20TokenBalance, erc721TokenCount });
        return profileId;
    } catch (error) {
        console.error('Error adding profile:', error);
        throw error;
    }
};

const createFriendRequest = async ({ senderId, receiverId, status }) => {
    const query = 'INSERT INTO friend_requests (senderId, receiverId, status) VALUES (?, ?, ?)';

    try {
        const [rows, fields] = await db.query(query, [senderId, receiverId, status]);
        console.log('Friend request created:', rows);
        return rows.insertId;
    } catch (error) {
        console.error('Error creating friend request:', error);
        throw error;
    }
};

const getFriendRequests = async (userId) => {
    const query = 'SELECT friend_requests.*, users.full_name as sender_name\n' +
        '        FROM friend_requests\n' +
        '        JOIN users ON friend_requests.senderId = users.id\n' +
        '        WHERE friend_requests.receiverId = ? AND friend_requests.status = \'pending\'';

    try {
        const [rows, fields] = await db.query(query, [userId]);
        return rows;
    } catch (error) {
        console.error('Error getting friend requests:', error);
        throw error;
    }
};

const getUserProfile = async (userId) => {
    try {
        return await ProfileModel.getUserProfile(userId);
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }

};

const getRecentUsers = async (req, res) => {
    try {
        // Fetch the last 5 registered users from the database
        return await db.query('SELECT users.*, profiles.avatar_url\n' +
            '      FROM users\n' +
            '      LEFT JOIN profiles ON users.id = profiles.userId\n' +
            '      ORDER BY users.id DESC\n' +
            '      LIMIT 5');
    } catch (error) {
        console.error('Error fetching recently registered users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Function to send friend request
const sendFriendRequest = async (req, res) => {
    const senderId = req.body.senderId; // Use senderId consistently
    const receiverId = req.body.receiverId; // Use receiverId consistently

    const insertQuery = 'INSERT INTO friend_requests (senderId, receiverId) VALUES (?, ?)';

    try {
        const [result] = await db.query(insertQuery, [senderId, receiverId]);
        const requestId = result.insertId;

        res.json({ success: true, requestId });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ success: false, error: 'Failed to send friend request' });
    }
};


const getFriends = async (req, res) => {
    const { userId } = req.params;

    const query = `
        SELECT users.id, users.full_name
        FROM friends
        JOIN users ON friends.userId2 = users.id
        WHERE friends.userId1= ?
    `;

    try {
        const [rows, fields] = await db.query(query, [userId]);
        res.json({ success: true, friendsList: rows });
    } catch (error) {
        console.error('Error getting friends list:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve friends list' });
    }
};

const acceptFriendRequest = async (req, res) => {
    const { requestId } = req.body;

    try {
        // Update friend request status to 'accepted'
        await db.query('UPDATE friend_requests SET status = "accepted" WHERE id = ?', [requestId]);

        // Get senderId and receiverId from the friend request
        const [friendRequest] = await db.query('SELECT * FROM friend_requests WHERE id = ?', [requestId]);
        const { senderId, receiverId } = friendRequest[0];

        // Add friendship to the friends table
        await db.query('INSERT INTO friends (userId1, userId2) VALUES (?, ?), (?, ?)', [senderId, receiverId, receiverId, senderId]);

        res.json({ success: true, message: 'Friend request accepted successfully.' });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ success: false, error: 'Failed to accept friend request' });
    }
};

const rejectFriendRequest = async (req, res) => {
    const { requestId } = req.body;

    try {
        // Update friend request status to 'rejected'
        await db.query('UPDATE friend_requests SET status = "rejected" WHERE id = ?', [requestId]);

        res.json({ success: true, message: 'Friend request rejected successfully.' });
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        res.status(500).json({ success: false, error: 'Failed to reject friend request' });
    }
};


module.exports = {
    addProfile,
    createFriendRequest,
    getUserProfile,
    getRecentUsers,
    getFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriends
};
