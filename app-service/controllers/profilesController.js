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


module.exports = {
    addProfile,
    createFriendRequest,
    getFriendRequests,
    getUserProfile
};
