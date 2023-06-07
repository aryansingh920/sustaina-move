// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImageStorage {
    struct Image {
        string ipfsHash;
        uint256 timestamp;
    }

    Image[] public images;

    function addImage(string memory _ipfsHash) public {
        Image memory newImage = Image(_ipfsHash, block.timestamp);
        images.push(newImage);
    }

    function getImagesCount() public view returns (uint256) {
        return images.length;
    }

    function getImage(uint256 _index) public view returns (string memory, uint256) {
        require(_index < images.length, "Invalid index");
        Image memory image = images[_index];
        return (image.ipfsHash, image.timestamp);
    }
}
