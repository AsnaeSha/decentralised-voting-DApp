// spdx-license-identifier:MIT

pragma solidity ^0.8.0;

contract Voting{
    address public manager;
    address public winnerAddress;
    uint public totalVote;
    bool public votingStarted;

    struct Candidate{
        string name;
        address candidateAddress;
        bool registered;
        uint voteCount;
    }

    struct Voter{
        bool registered;
        bool voted;
    }

    Candidate[] public candidateList;
    mapping(address => Voter) public voters;
    mapping(address=>uint) public candidates;

    constructor(){
        manager = msg.sender;
    }

    function registeredCandidates(string memory name, address candidateAddress) public {
        require(msg.sender == manager, "Only the manager can register candidates");
        require(candidateAddress != manager, "The manager cannot be a candidate");
        require(candidates[candidateAddress] == 0, "Candidate already registered");

        Candidate memory candidate=Candidate({
            name:name,
            candidateAddress:candidateAddress,
            registered: true,
            voteCount: 0
        });
        if (candidateList.length ==0){
            candidateList.push();
        }
        candidates[candidateAddress] = candidateList.length;
        candidateList.push(candidate);

    }

    function registerVoter(address voterAddress)public {
        require(msg.sender == manager, "Only the manager can register voters");
        require(voterAddress != manager, "The manager cannot be a voter");
        require(voters[voterAddress].registered == false, "Voter already registered");

        Voter memory voter = Voter({
            registered: true,
            voted: false
        });

        voters[voterAddress] = voter;
    }

    function startVoting() public {
        require(msg.sender == manager, "Only the manager can start the voting");
        require(candidateList.length > 0, "No candidates registered");

        votingStarted = true;
    }

    function putVote(address candidateAddress) public {
        require(votingStarted == true, "Voting has not started yet");
        require(msg.sender != manager, "The manager cannot vote");
        require(voters[msg.sender].registered == true, "Voter not registered");
        require(voters[msg.sender].voted == false, "Already voted");
        require(candidateList[candidates[candidateAddress]].registered == true, "Candidate not registered");

        candidateList[candidates[candidateAddress]].voteCount++;
        voters[msg.sender].voted = true;

        uint candidateVote = candidateList[candidates[candidateAddress]].voteCount++;
        if(totalVote < candidateVote){
            totalVote = candidateVote;
            winnerAddress = candidateAddress;
        }
    }

    function stopVoting() public {
        require(msg.sender == manager, "Only the manager can stop the voting");

        votingStarted = false;
    }

    function votingStatus() public view returns(bool){
        return votingStarted;
    }

    function getWinner() public view returns(Candidate memory candidate){
        require(msg.sender == manager, "Only the manager can declare winner");
        require(votingStarted == false, "Voting is not yet completed");

        return candidateList[candidates[winnerAddress]];
    }

    function getRegisteredCandidates() public view returns (Candidate[] memory){
        return candidateList;
    }

}