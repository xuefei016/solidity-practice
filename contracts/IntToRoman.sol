// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract IntToRoman {
    function intToRoman(uint256 num) public pure returns (string memory) {
        string[4] memory thousands = ["", "M", "MM", "MMM"];
        string[10] memory hundreds = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM"
        ];
        string[10] memory tens = [
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC"
        ];
        string[10] memory ones = [
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX"
        ];
        return
            string(
                abi.encodePacked(
                    thousands[num / 1000],
                    hundreds[(num % 1000) / 100],
                    tens[(num % 100) / 10],
                    ones[num % 10]
                )
            );
    }

    function charToValue(bytes1 c) internal pure returns (uint256) {
        if (c == "I") return 1;
        if (c == "V") return 5;
        if (c == "X") return 10;
        if (c == "L") return 50;
        if (c == "C") return 100;
        if (c == "D") return 500;
        if (c == "M") return 1000;
        revert("Invalid Roman numeral");
    }
}
