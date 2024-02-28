// routes/profilesRouter.js

const express = require('express');
const profilesController = require('../controllers/profilesController');
const UserModel = require('../models/UserModel');
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

// Accept friend request
router.post('/accept-friend-request', profilesController.acceptFriendRequest);

// Reject friend request
router.post('/reject-friend-request', profilesController.rejectFriendRequest);

// Get users friends
router.get('/friends/:userId', profilesController.getFriends);

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

router.get('/users', async (req, res) => {
    try {
        const userProfile = await UserModel.getLatestUsers();
        res.json({ success: true, userProfile });
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve user profile' });
    }
}
)


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

router.post('/send-friend-request/:userId', profilesController.sendFriendRequest);

// Endpoint for fetching recently registered users
router.get('/users/recently-registered', async (req, res) => {
    try {
        // Fetch the last 5 registered users from the database
        const recentUsers = await profilesController.getRecentUsers();

        res.json({ recentUsers });
    } catch (error) {
        console.error('Error fetching recently registered users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
