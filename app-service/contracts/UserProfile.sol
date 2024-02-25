// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserToken.sol";
import "./TopWeb3NFT.sol";

contract UserProfile {
    struct Profile {
        string name;
        string bio;
        string profilePicture;
        address[] connections;
        bool isTopWeb3;
        bool isRegistered;
    }

    mapping(address => Profile) public profiles;
    mapping(address => uint256) public tokenBalances;
    address public userTokenAddress;
    address public topWeb3NFTAddress;

    event ConnectionRequestSent(address indexed sender, address indexed receiver);
    event ConnectionRequestAccepted(address indexed sender, address indexed receiver);
    event PostCreated(address indexed author, string content);
    event CommentCreated(address indexed commenter, address indexed author, string content);
    event UserRegistered(address indexed user, string name);

    constructor(address _userTokenAddress, address _topWeb3NFTAddress) {
        userTokenAddress = _userTokenAddress;
        topWeb3NFTAddress = _topWeb3NFTAddress;
    }

    function registerUser(string memory _name, string memory _bio, string memory _profilePicture) external {
        require(!profiles[msg.sender].isRegistered, "User already registered");

        profiles[msg.sender].name = _name;
        profiles[msg.sender].bio = _bio;
        profiles[msg.sender].profilePicture = _profilePicture;
        profiles[msg.sender].isRegistered = true;

        // Allocate initial tokens to the user upon registration
        tokenBalances[msg.sender] += 100; // Adjust the initial token amount as needed

        emit UserRegistered(msg.sender, _name);
    }

    function isAuthenticated() external view returns (bool) {
        return profiles[msg.sender].isRegistered;
    }

    function updateProfile(string memory _name, string memory _bio, string memory _profilePicture) external {
        require(profiles[msg.sender].isRegistered, "User not registered");

        profiles[msg.sender].name = _name;
        profiles[msg.sender].bio = _bio;
        profiles[msg.sender].profilePicture = _profilePicture;
    }

    function sendConnectionRequest(address _receiver) external {
        require(profiles[msg.sender].isRegistered, "User not registered");
        require(tokenBalances[msg.sender] >= 10, "Insufficient tokens for connection request");
        require(bytes(profiles[_receiver].name).length > 0, "Receiver profile not found");

        tokenBalances[msg.sender] -= 10; // Deduct 10 tokens for sending a connection request

        emit ConnectionRequestSent(msg.sender, _receiver);
    }

    function acceptConnectionRequest(address _sender) external {
        require(profiles[msg.sender].isRegistered, "User not registered");
        require(tokenBalances[msg.sender] >= 10, "Insufficient tokens to accept connection request");
        require(bytes(profiles[_sender].name).length > 0, "Sender profile not found");

        tokenBalances[msg.sender] -= 10; // Deduct 10 tokens for accepting a connection request

        profiles[msg.sender].connections.push(_sender);
        profiles[_sender].connections.push(msg.sender);

        emit ConnectionRequestAccepted(msg.sender, _sender);
    }

    function checkAndMintTopWeb3NFT() external {
        require(profiles[msg.sender].isRegistered, "User not registered");
        require(profiles[msg.sender].connections.length >= 5, "Insufficient connections for TOPWEB3 NFT");

        // Mint the TOPWEB3 NFT
        TopWeb3NFT topWeb3NFT = TopWeb3NFT(topWeb3NFTAddress);
        topWeb3NFT.mint(msg.sender);

        // Set user as TOPWEB3
        profiles[msg.sender].isTopWeb3 = true;
    }

    function writePost(string memory _content) external {
        require(profiles[msg.sender].isTopWeb3, "User does not have TOPWEB3 NFT");
        emit PostCreated(msg.sender, _content);
    }

    function commentOnPost(address _author, string memory _content) external {
        require(profiles[msg.sender].isTopWeb3, "User does not have TOPWEB3 NFT");
        require(bytes(profiles[_author].name).length > 0, "Author profile not found");
        emit CommentCreated(msg.sender, _author, _content);
    }
}
