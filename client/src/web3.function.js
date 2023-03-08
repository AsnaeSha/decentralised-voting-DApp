import Web3 from "web3";
import Voting from './contracts/Voting.json';

async function connectToWeb3(){
const provider = new Web3.providers.HttpProviders("HTTP://127.0.0.1:7545");
const web3 = new Web3(provider);
const accounts = await web3.eth.getAccounts();
console.log(accounts);
const networkId = await web3.eth.net.getId();
const deployedNetwork = await Voting.networks[networkId];
console.log(deployedNetwork);
const instance = new web3.eth.Contract(Voting.abi, deployedNetwork.address);

return{accounts, instance};
}

async function connectToMetamask(){
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0:8545');
await window.ethereum.enable();
const accounts = await web3.eth.getAccounts();
const networkId = await web3.eth.net.getId();
console.log("injected web3 detected", accounts, networkId);
const deployedNetwork = await Voting.networks[networkId];
console.log(deployedNetwork);
const instance = new web3.eth.Contract(Voting.abi, deployedNetwork.address);
const manager = await instance.methods.manager().call();
console.log("manager is", manager)
return{accounts, instance, manager};
}

export {connectToWeb3, connectToMetamask}