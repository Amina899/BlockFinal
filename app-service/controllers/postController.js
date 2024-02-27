// controllers/postController.js

const PostModel = require('../models/PostModel');

const addPost = async (userId, content) => {
    try {
        const postId = await PostModel.createPost({ userId, content });
        return postId;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

const getPosts = async () => {
    try {
        const posts = await PostModel.getPosts();
        return posts;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};

module.exports = {
    addPost,
    getPosts,
};
