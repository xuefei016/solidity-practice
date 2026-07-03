import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("Voting contract", function () {
    it("should revert when voting for self", async function () {
        const [owner] = await ethers.getSigners();
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();
        await voting.waitForDeployment();

        await expect(voting.connect(owner).vote(owner.address))
            .to.be.revertedWith("vote: voter cannot vote for themselves");
    });

    it("should increase votes for a valid voter", async function () {
        const [owner, voter] = await ethers.getSigners();
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();
        await voting.waitForDeployment();

        await voting.connect(owner).vote(voter.address);
        expect(await voting.getVotes(voter.address)).to.equal(1);
    });

    it("should revert when voting twice", async function () {
        const [owner, voter] = await ethers.getSigners();
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();
        await voting.waitForDeployment();

        await voting.connect(owner).vote(voter.address);
        await expect(voting.connect(owner).vote(voter.address))
            .to.be.revertedWith("vote: voter has already voted");
    });

    it("should reset votes correctly", async function () {
        const [owner, voter] = await ethers.getSigners();
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();
        await voting.waitForDeployment();

        await voting.connect(owner).vote(voter.address);
        expect(await voting.getVotes(voter.address)).to.equal(1);

        await voting.resetVotes();
        expect(await voting.getVotes(voter.address)).to.equal(0);
    });

});
