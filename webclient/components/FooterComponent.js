// components/FooterComponent.js

import Link from "next/link";

const FooterComponent = () => {

    return (
        <footer className="text-center mt-5">
            <p>&copy; 2024 LinkedIn, Powered by <Link href='https://nextjs.org/'>Next.JS</Link></p>
        </footer>
);
};

export default FooterComponent;
