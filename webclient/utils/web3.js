// utils/web3.js

import Web3 from 'web3';

const getWeb3 = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.enable(); // Request access to accounts
        } catch (error) {
            console.error('User denied account access:', error);
        }
        return new Web3(window.ethereum);
    } else if (window.web3) {
        // Legacy dapp browsers
        return new Web3(window.web3.currentProvider);
    } else {
        // Fallback to a local provider (e.g., Ganache)
        return new Web3('http://localhost:8545');
    }
};

export default getWeb3;
