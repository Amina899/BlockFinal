// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

const IndexPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('isLoggedIn')) {
            router.push('/login');
        } else {
            router.push('/main');
        }
    }, []); // The empty dependency array ensures this effect runs only once on component mount.

    return (
        <div>
            {/* Your component content */}
        </div>
    );
};

export default IndexPage;
