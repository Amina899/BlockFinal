// routes/profilesRouter.js

const express = require('express');
const profilesController = require('../controllers/profilesController');

const router = express.Router();

// Create a new profile
router.post('/add', async (req, res) => {
    const { userId, avatarUrl, address, bio, erc20TokenBalance, erc721TokenCount } = req.body;

    try {
        const profileId = await profilesController.addProfile(userId, avatarUrl, address, bio, erc20TokenBalance, erc721TokenCount);

        // Add friend request when creating a profile
        const senderId = userId; // The user creating the profile
        const receiverId = userId; // The user owning the profile
        const status = 'pending';
        await profilesController.createFriendRequest({ senderId, receiverId, status });

        res.json({ success: true, profileId });
    } catch (error) {
        console.error('Error adding profile:', error);
        res.status(500).json({ success: false, error: 'Failed to add profile' });
    }
});

// Get friend requests for a user
router.get('/friend-requests/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const friendRequests = await profilesController.getFriendRequests(userId);
        res.json({ success: true, friendRequests });
    } catch (error) {
        console.error('Error getting friend requests:', error);
        res.status(500).json({ success: false, error: 'Failed to get friend requests' });
    }
});

// Get a user's profile by userId
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userProfile = await profilesController.getUserProfile(userId);
        res.json({ success: true, userProfile });
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve user profile' });
    }
});


module.exports = router;
