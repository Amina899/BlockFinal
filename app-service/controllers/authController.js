// controllers/authController.js

const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');

const saltRounds = 10;

// Register a new user
const register = async (fullName, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userId = await UserModel.createUser({ fullName, email, password: hashedPassword });

        // Create a profile for the registered user
        const avatarUrl = 'https://placekitten.com/100/100'; // Provide a default avatar URL or allow the user to set it later
        const address = 'straight from linkedin'; // Provide a default address or allow the user to set it later
        const bio = 'Hey, I am new hear!'; // Provide a default bio or allow the user to set it later
        const erc20TokenBalance = 0; // Initial ERC-20 token balance
        const erc721TokenCount = 0; // Initial ERC-721 token count
        await ProfileModel.createProfile({ userId, avatarUrl, address, bio, erc20TokenBalance, erc721TokenCount, fullName });

        return userId;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Authenticate a user
const authenticate = async (email, password) => {
    try {
        const user = await UserModel.getUserByEmail(email);

        // Include full_name in the response, even if the user is not found
        return { userId: user ? user.id : null, full_name: user ? user.full_name : null };
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
};

module.exports = {
    register,
    authenticate,
};
