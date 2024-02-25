// authRouter.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const userId = await authController.register(fullName, email, password);
        res.json({ success: true, userId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, error: 'Registration failed' });
    }
});

// Authentication
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { userId, full_name } = await authController.authenticate(email, password);
        if (userId !== null) {
            res.json({ success: true, userId, full_name });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ success: false, error: 'Authentication failed' });
    }
});

module.exports = router;
