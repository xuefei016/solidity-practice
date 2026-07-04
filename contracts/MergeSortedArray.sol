// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract MergeSortedArray {
    function mergeSortedArrays(
        uint256[] memory arr1,
        uint256[] memory arr2
    ) public pure returns (uint256[] memory) {
        uint256[] memory result = new uint256[](arr1.length + arr2.length);
        uint256 i = 0;
        uint256 j = 0;
        uint256 k = 0;
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                result[k++] = arr1[i++];
            } else {
                result[k++] = arr2[j++];
            }
        }
        while (i < arr1.length) {
            result[k++] = arr1[i++];
        }
        while (j < arr2.length) {
            result[k++] = arr2[j++];
        }
        return result;
    }
}
