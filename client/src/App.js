import React, {useState, useEffect} from "react";
import './App.css';
import {connectToWeb3, connectToMetamask} from './web3.function.js';
import Manager from './components/Manager.js';
import Voter from './components/voter.js';
import Home from './components/Home.js';
import Navbar from './components/Navbar.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
const[contractInstance , setContractInstance] = useState(null)
const[accounts, setAccounts] = useState();
const[manager, getManager] = useState();


useEffect(()=>{
async function connect(){
try{
let{accounts, instance, manager} = await connectToMetamask();
setAccounts(accounts[0]);
setContractInstance(instance);
getManager(manager);
}catch(error){
alert("failed to load contract");
console.log(error);
}
}
connect()
})

return (
    <div className="App" >
       { contractInstance == null ?
    <>

    </> :
        <>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<><Navbar /><Home /></>}/>
              <Route path="/Manager" element={<><Navbar /><Manager contractInstance={contractInstance} account={accounts} manager={manager}/></>}/>
              <Route path="/voter" element={<><Navbar /><Voter contractInstance={contractInstance} account={accounts}/></>} />
            </Routes>
          </BrowserRouter>
        </>}

    </div>
  );

}

export default App;


