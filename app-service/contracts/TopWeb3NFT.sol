// contracts/TopWeb3NFT.sol
// This contract represents the ERC-721 NFT for users with 5 or more connections

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TopWeb3NFT is ERC721 {
    uint256 public tokenIdCounter;
    mapping(address => uint256) public userToTokenId;

    constructor() ERC721("TOPWEB3", "TW3") {
        tokenIdCounter = 1;
    }

    function mint(address _recipient) external {
        // Mint the NFT for the user
        require(userToTokenId[_recipient] == 0, "User already has TOPWEB3 NFT");
        _mint(_recipient, tokenIdCounter);
        userToTokenId[_recipient] = tokenIdCounter;
        tokenIdCounter++;
    }
}
