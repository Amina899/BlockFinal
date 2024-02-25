
// utils/contract.js

import { UserProfileContractABI, UserProfileContractAddress } from './contractInfo'; // Replace with your contract ABI and address
import getWeb3 from './web3.js';

const getContract = async () => {
    const web3 = await getWeb3();
    return new web3.eth.Contract(UserProfileContractABI, UserProfileContractAddress);
};

export default getContract;
