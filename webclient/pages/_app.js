// pages/_app.js

import '../styles/global.css';
import '../styles/main.module.scss';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
