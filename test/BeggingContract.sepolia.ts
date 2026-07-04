import { expect } from "chai";
import "dotenv/config";
import { network } from "hardhat";

describe("BeggingContract on Sepolia", function () {
    it("should read owner and call donate", async function () {
        const deployedAddress = process.env.BEGGING_CONTRACT_ADDRESS;
        if (!deployedAddress) {
            throw new Error("Missing BEGGING_CONTRACT_ADDRESS in .env");
        }

        const { ethers } = await network.create({
            network: "sepolia",
            chainType: "l1",
        });

        const [, contributor] = await ethers.getSigners();
        const contract = await ethers.getContractAt("BeggingContract", deployedAddress);

        const owner = await contract.owner();
        console.log("Contract address:", deployedAddress);
        console.log("Owner:", owner);
        console.log("Caller:", contributor.address);

        const before = await contract.getDonation(contributor.address);
        const tx = await contract.connect(contributor).donate({ value: 1n });
        await tx.wait();
        const after = await contract.getDonation(contributor.address);

        expect(after).to.equal(before + 1n);
    });

    it.only("read address donote amount", async function () {
        const deployedAddress = process.env.BEGGING_CONTRACT_ADDRESS;
        if (!deployedAddress) {
            throw new Error("Missing BEGGING_CONTRACT_ADDRESS in .env");
        }

        const { ethers } = await network.create({
            network: "sepolia",
            chainType: "l1",
        });

        const [, contributor] = await ethers.getSigners();
        const contract = await ethers.getContractAt("BeggingContract", deployedAddress);

        const donation = await contract.getDonation(contributor.address);
        console.log("Donation amount for contributor:", donation);
    });

    it("owner withdraws donations", async function () {
        const deployedAddress = process.env.BEGGING_CONTRACT_ADDRESS;
        if (!deployedAddress) {
            throw new Error("Missing BEGGING_CONTRACT_ADDRESS in .env");
        }

        const { ethers } = await network.create({
            network: "sepolia",
            chainType: "l1",
        });

        const [owner] = await ethers.getSigners();
        const contract = await ethers.getContractAt("BeggingContract", deployedAddress);

        const before = await ethers.provider.getBalance(contract);
        const tx = await contract.connect(owner).withdraw();
        await tx.wait();
        const after = await ethers.provider.getBalance(contract);

        expect(after).to.equal(0n);
    });

    it("should record direct ETH transfer as a donation", async function () {
        const deployedAddress = process.env.BEGGING_CONTRACT_ADDRESS;
        if (!deployedAddress) {
            throw new Error("Missing BEGGING_CONTRACT_ADDRESS in .env");
        }

        const { ethers } = await network.create({
            network: "sepolia",
            chainType: "l1",
        });

        const [, contributor] = await ethers.getSigners();
        const contract = await ethers.getContractAt("BeggingContract", deployedAddress);

        const before = await contract.getDonation(contributor.address);
        const tx = await contributor.sendTransaction({
            to: deployedAddress,
            value: 1n,
        });
        await tx.wait();
        const after = await contract.getDonation(contributor.address);

        expect(after).to.equal(before + 1n);
    });


});
