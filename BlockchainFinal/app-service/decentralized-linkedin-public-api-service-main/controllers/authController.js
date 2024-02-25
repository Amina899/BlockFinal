// controllers/authController.js

const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

const saltRounds = 10;

// Register a new user
const register = async (fullName, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userId = await UserModel.createUser({ fullName, email, password: hashedPassword });
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
