// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);


    // Deploy TopWeb3NFT contract
    const TopWeb3NFT = await ethers.getContractFactory("TopWeb3NFT");
    const topWeb3NFT = await TopWeb3NFT.deploy();
    await topWeb3NFT.waitForDeployment();
    console.log("TopWeb3NFT deployed to:", topWeb3NFT.target);

    // Deploy UserToken contract (ERC-20)
    const UserToken = await ethers.getContractFactory("UserToken"); // Adjust the contract name accordingly
    const userToken = await UserToken.deploy();
    await userToken.waitForDeployment();
    console.log("UserToken deployed to:", userToken.target);

    // Deploy UserProfile contract
    const UserProfile = await ethers.getContractFactory("UserProfile");
    const userProfile = await UserProfile.deploy(userToken.target, topWeb3NFT.target);
    await userProfile.waitForDeployment();
    console.log("UserProfile deployed to:", userProfile.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
