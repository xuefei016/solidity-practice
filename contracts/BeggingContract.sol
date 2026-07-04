// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract BeggingContract {
    mapping(address => uint256) public contributions;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function donate() public payable {
        require(msg.value > 0, "Sent value must > 0");
        contributions[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to withdraw");
        payable(owner).transfer(contractBalance);
    }

    function getDonation(address contributor) public view returns (uint256) {
        require(contributor != address(0), "Invalid contributor address");
        return contributions[contributor];
    }
}
