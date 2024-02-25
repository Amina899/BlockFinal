// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter'); // Import authRouter
const postRouter = require('./routes/postRouter'); // Import postRouter
const profilesRouter = require('./routes/profilesRouter'); // Import profilesRouter
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter); // Use authRouter for paths starting with /auth
app.use('/posts', postRouter); // Use postRouter for paths starting with /posts
app.use('/profiles', profilesRouter); // Use profilesRouter for paths starting with /profiles

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
