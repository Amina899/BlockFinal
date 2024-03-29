// components/FeedComponent.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Cookies from 'js-cookie';

const FeedComponent = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        // Fetch posts from the server when the component mounts
        fetch('http://localhost:4000/posts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.posts);
                console.log('Fetched posts:', data.posts); // Add this line for debugging
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        try {
            const userId = Cookies.get('userId');

            if (!userId || isNaN(userId)) {
                console.error('User is not authenticated or userId is not a valid integer.');
                // Handle the case where the user is not authenticated or userId is not a valid integer
                return;
            }

            // Continue with the request
            const parsedUserId = parseInt(userId, 10); // Parse userId as an integer

            // Send the new post to the server with the correct userId
            const response = await fetch('http://localhost:4000/posts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: parsedUserId,
                    content: newPost,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Post created successfully:', data);
                // Fetch the updated list of posts
                const updatedPosts = await (await fetch('http://localhost:4000/posts')).json();
                setPosts(updatedPosts.posts);
                setNewPost(''); // Clear the input field after successful submission
            } else {
                console.error('Post creation failed:', data);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h3>Recent Posts</h3>

            {/* Form to submit new posts */}
            <Form onSubmit={handlePostSubmit} className="mb-3">
                <Form.Group controlId="formNewPost">
                    <Form.Control
                        type="text"
                        placeholder="What's on your mind?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>

            {posts.map((post) => (
                <Card key={post.id} className="mb-3">
                    <Card.Body>
                        <Card.Title>
                            <strong>{post.author}</strong>
                        </Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <small className="text-muted">Posted on {new Date(post.createdAt).toLocaleString()}</small>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default FeedComponent;
