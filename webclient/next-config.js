// next.config.js

module.exports = {
    async redirects() {
        return [
            {
                source: '/profile/:userId', // Adjust the source path based on your project structure
                destination: '/profile/[userId]',
                permanent: true,
            },
        ];
    },
};
