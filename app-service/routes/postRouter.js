// postRouter.js

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await postController.getPosts();
        res.json({ success: true, posts });
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve posts' });
    }
});

// Add a new post
router.post('/add', async (req, res) => {
    const { content, userId } = req.body;

    try {
        const postId = await postController.addPost(content, userId);
        res.json({ success: true, postId });
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).json({ success: false, error: 'Failed to add post' });
    }
});

module.exports = router;
