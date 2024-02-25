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
    const query = 'SELECT * FROM friend_requests WHERE receiverId = ? AND status = "pending"';

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
        const userProfile = await ProfileModel.getUserProfile(userId);
        return userProfile;
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }

};

const handleAsyncError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Function to get friend requests
const getIfFriendRequests = handleAsyncError(async (req, res) => {
    const { userId } = req.params;

    const query = 'SELECT * FROM friend_requests WHERE receiver_id = ?';

    try {
        const [rows, fields] = await db.query(query, [userId]);
        res.json({ success: true, friendRequests: rows });
    } catch (error) {
        console.error('Error getting friend requests:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve friend requests' });
    }
});

// Function to send friend request
const sendFriendRequest = handleAsyncError(async (req, res) => {
    const { userId } = req.params;
    const senderId = req.body.senderId; // Assuming senderId is provided in the request body

    const insertQuery = 'INSERT INTO friend_requests (sender_id, receiver_id) VALUES (?, ?)';

    try {
        const [result] = await db.query(insertQuery, [senderId, userId]);
        const requestId = result.insertId;

        res.json({ success: true, requestId });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ success: false, error: 'Failed to send friend request' });
    }
});



module.exports = {
    addProfile,
    createFriendRequest,
    getUserProfile,
    getFriendRequests,
    getIfFriendRequests,
    sendFriendRequest
};
