// models/UserModel.js

const db = require('../db');

const createUser = async ({ fullName, email, password }) => {
    const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)'; // Change column name to full_name

    try {
        const [rows, fields] = await db.query(query, [fullName, email, password]);
        console.log('User created:', rows);
        return rows.insertId; // Return the ID of the newly created user
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Propagate the error for handling in the calling function
    }
};

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';

    try {
        const [rows, fields] = await db.query(query, [email]);
        return rows[0];
    } catch (error) {
        console.error('Error getting user by email:', error);
        throw error;
    }
};

module.exports = {
    createUser,
    getUserByEmail
};
