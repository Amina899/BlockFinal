// models/PostModel.js

const db = require('../db');

const createPost = async ({ userId, content }) => {
    const insertQuery = 'INSERT INTO posts (userID, content) VALUES (?, ?)';
    const selectQuery = 'SELECT author.full_name FROM users AS author WHERE author.id = ?';

    try {
        // Validate userId before executing the query if needed

        const [insertRows, insertFields] = await db.query(insertQuery, [content, userId]);
        console.log('Post created:', insertRows);

        // Fetch full_name from users table based on userId
        const [selectRows, selectFields] = await db.query(selectQuery, [userId]);

        if (selectRows.length > 0) {
            const { full_name } = selectRows[0];
            // Return the ID of the newly created post along with the full_name
            return { postId: insertRows.insertId, author: full_name };
        } else {
            // Return only the postId if user information is not found
            return { postId: insertRows.insertId, author: null };
        }
    } catch (error) {
        console.error('Error creating post:', error);
        throw error; // Propagate the error for handling in the calling function
    }
};

const getPosts = async () => {
    const query = 'SELECT posts.*, author.full_name AS author FROM posts LEFT JOIN users AS author ON posts.userId = author.id ORDER BY posts.createdAt DESC';

    try {
        const [rows, fields] = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};

module.exports = {
    createPost,
    getPosts,
};
