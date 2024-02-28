// pages/_app.js

import '../styles/global.css';
import '../styles/main.module.scss';

import "regenerator-runtime/runtime"
import {ThirdwebWeb3Provider} from "@3rdweb/hooks";

const supportedChainIds = [1, 4]
const connectors = {
    injected: {}
}
function MyApp({ Component, pageProps }) {
    return (
        <ThirdwebWeb3Provider
            supportedChainIds={supportedChainIds}
            connectors={connectors}
        >
            <Component {...pageProps} />
        </ThirdwebWeb3Provider>
        );
}

export default MyApp;
