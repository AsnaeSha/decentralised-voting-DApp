import React, {useState, useEffect} from "react";


export default function Manager({account, contractInstance, manager}){

const[name,setName] = useState('');
const[candidateAddress, setCandidateAddress] = useState('');
const[voterAddress,setVoterAddress] = useState('');
const[winnerAddress, setWinnerAddress]= useState('');
const[votingStarted, setVotingStarted] = useState(false);


async function registerCandidates(e){
e.preventDefault();
try{
const response = await contractInstance.methods.registeredCandidates(name, candidateAddress).send({from:account})
console.log(response)
}catch(error){
console.error(error)
}
}
async function registerVoters(e){
e.preventDefault();
try{
const response = await contractInstance.methods.registerVoter(voterAddress).send({from:account})
console.log(response)
}catch(error){
console.error(error)
}
}

async function start_voting(){
try{
const response = await contractInstance.methods.startVoting().send({from:account})
console.log(response);
setVotingStarted(true);
}catch(error){
console.error(error)
}
}
async function stop_voting(){
try{
const response = await contractInstance.methods.stopVoting().send({from:account})
console.log(response);
setVotingStarted(false);
}catch(error){
console.error(error)
}
}
async function get_winner(){
try{
const response = await contractInstance.methods.getWinner().call({from:account})
console.log(response)
setWinnerAddress(response)
}catch(error){
console.error(error)
}
}


return (
  <div className="container-md" style={{ width: "50%", marginTop: "20px" }}>
  <h3>Welcome To CR Election</h3>
  <p>Manager- <b>{account === manager ? manager : "you are not the admin"}</b></p>
    <form>
      <div className="mb-3">
          <label className="form-label" htmlFor="name">Candidate Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Candidate Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      <div className="mb-3">
          <label className="form-label" htmlFor="address">Candidate Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter Candidate Address"
            value={candidateAddress}
            onChange={e => setCandidateAddress(e.target.value)}
          />
        </div>
      <button type="submit" className="btn btn-dark" onClick={registerCandidates}>Register candidate</button>
    </form>
    <form>
      <div className="mb-3 mt-3">
          <label className="form-label" htmlFor="address">Voter Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter Voter Address"
            value={voterAddress}
            onChange={e => setVoterAddress(e.target.value)}
          />
        </div>
       <button type="submit" className="btn btn-dark" onClick={registerVoters}>Register Voter</button>
    </form>
    <div className="mt-3">
      <button onClick={start_voting} className="btn btn-success me-2">Start Voting</button>
      <button onClick={stop_voting} className="btn btn-danger me-2">Stop Voting</button>
      <button onClick={get_winner} className="btn btn-warning">Winner</button>
    </div>
    <div className='mt-2'>
    {winnerAddress && <p>Winner Name : <b>{winnerAddress.name}</b></p>}
    {winnerAddress && <p>Winner Address : <b>{winnerAddress.candidateAddress}</b></p>}
    </div>
  </div>
);

}
