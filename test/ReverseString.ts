import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("ReverseString contract", function () {
    it("should reverse a string correctly", async function () {
        const ReverseString = await ethers.getContractFactory("ReverseString");
        const reverseString = await ReverseString.deploy();
        await reverseString.waitForDeployment();

        const result = await reverseString.reverse("hello");
        expect(result).to.equal("olleh");
    });
});
