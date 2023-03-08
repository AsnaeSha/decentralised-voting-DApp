import React from 'react';
import {Link} from "react-router-dom";

export default function Home(){
 return (
    <>
    <div className="center">
      <h2 style={{marginTop: "60px"}}>Welcome To CR Election </h2>

       <div className="list-group " style={{ width: "50%", marginTop: "8%", marginLeft: "23%" }}>
          <li className="list-group-item">
            <h1>Please Select</h1>
          </li>
          <li className="list-group-item">
          <div className=" d-flex flex-column align-items-center">
          <Link to="/manager" className="text-decoration-none text">
            <button type="button" className="btn btn-dark mb-3">Manager</button>
            </Link>
            <Link to="/voter" className="text-decoration-none text">
              <button type="button" className="btn btn-dark">Voter</button>
            </Link>
          </div>
          </li>
          </div>
    </div>
    </>
  );
}
