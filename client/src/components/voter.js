import React, {useState, useEffect} from "react";
import man from '../man.jpeg';

export default function Voter({account, contractInstance}){
const[candidateAddress, setCandidateAddress] = useState('');
const[getCandidate, setCandidate]= useState([]);
const[votingStarted, setVotingStarted] = useState(false);

useEffect(()=>{
async function get_candidates(){
try{
const response = await contractInstance.methods.getRegisteredCandidates().call({from:account});
console.log(response)
setCandidate(response)
const voting_status = await contractInstance.methods.votingStatus().call({from:account});
console.log(voting_status)
setVotingStarted(voting_status);
}catch(error){
console.error(error)
}
}
get_candidates();
});

async function voting(e,candidateAddress){
e.preventDefault();
try{
const response = await contractInstance.methods.putVote(candidateAddress).send({from:account});
console.log(response)
}catch(error){
console.error(error);
}
}

return (
  <>
    <div className="container-md" style={{ width: "80%", marginTop: "30px" }}>
    <h2>Welcome To CR Election</h2>
    <div>
      {votingStarted ? (
        <p>Voting has started. You can now vote.</p>
      ) : (
        <p>Voting has not started yet. Please wait.</p>
      )}
    </div>
    <div className="row">
      {getCandidate.slice(1, 3).map((candidate, index) => (
        <div style={{ marginTop: "40px" }} className="col-md-6" key={index}>
          <img src={man} className="img-fluid"/>
          <h3 className='mt-4'> <b>{`${candidate.name}`}</b></h3>
          <div className='mt-3'>
          <button
            onClick={(e) => voting(e, candidate.candidateAddress)}
            className="btn btn-danger me-6"
          >
            Vote
          </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  </>
);

}
