// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ReverseString {
    function reverse(string memory str) public pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        uint256 len = strBytes.length;
        bytes memory reversedBytes = new bytes(len);

        for (uint256 i = 0; i < len; i++) {
            reversedBytes[i] = strBytes[len - 1 - i];
        }

        return string(reversedBytes);
    }
}
