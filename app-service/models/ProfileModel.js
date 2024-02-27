// models/ProfileModel.js

const db = require('../db');

const createProfile = async ({ userId, avatarUrl, address, bio, erc20TokenBalance, erc721TokenCount, fullName }) => {
    const query = 'INSERT INTO profiles (userId, avatar_url, address, bio, erc20_token_balance, erc721_token_count, full_name) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
        const [rows, fields] = await db.query(query, [userId, avatarUrl, address, bio, erc20TokenBalance, erc721TokenCount, fullName]);
        console.log('Profile created:', rows);
        return rows.insertId;
    } catch (error) {
        console.error('Error creating profile:', error);
        throw error;
    }
};

const getUserProfile = async (userId) => {
    const query = 'SELECT * FROM profiles WHERE userId = ?';

    try {
        const [rows, fields] = await db.query(query, [userId]);
        return rows[0]; // Assuming one profile per user, adjust as needed
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};

module.exports = {
    createProfile,
    getUserProfile
};
