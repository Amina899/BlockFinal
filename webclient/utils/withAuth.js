// utils/withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const isLoggedIn = Cookies.get('isLoggedIn'); // Check if the user is logged in

            if (!isLoggedIn) {
                router.push('/login');
            }
        }, [router]);

        // If user is authenticated, render the wrapped component
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
