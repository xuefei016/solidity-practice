// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract BinarySearch {
    function binarySearch(uint256[] memory arr, uint256 target) public pure returns (int256) {
        int256 left = 0;
        int256 right = int256(arr.length) - 1;
        while (left <= right) {
            int256 mid = left + (right - left) / 2;
            if (arr[uint256(mid)] == target) {
                return mid;
            } else if (arr[uint256(mid)] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
