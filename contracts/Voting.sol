// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Voting {
    mapping(address => uint256) public candidateVotes;
    address[] public candidates;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, address indexed candidate);

    function vote(address candidate) public {
        require(
            candidate != address(0),
            "vote: candidate address cannot be zero"
        );
        require(!hasVoted[msg.sender], "vote: voter has already voted");
        require(
            candidate != msg.sender,
            "vote: voter cannot vote for themselves"
        );
        hasVoted[msg.sender] = true;
        candidateVotes[candidate]++;
        candidates.push(candidate);

        emit Voted(msg.sender, candidate);
    }

    function getVotes(address candidate) public view returns (uint256) {
        require(
            candidate != address(0),
            "vote: candidate address cannot be zero"
        );
        return candidateVotes[candidate];
    }

    function resetVotes() public {
        for (uint256 i = 0; i < candidates.length; i++) {
            address candidate = candidates[i];
            candidateVotes[candidate] = 0;
            hasVoted[candidate] = false;
        }
        delete candidates;
    }
}
