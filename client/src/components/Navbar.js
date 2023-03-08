import React from 'react';
import {Link} from "react-router-dom";
import "../App.css";


export default function Navbar(){
return(
<>
      <nav className="navbar navbar-expand-lg navbar">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link navtext" aria-current="page">
                  Voting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/manager"
                  className="nav-link navtext"
                  aria-current="page"
                >
                  Manager
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/voter" className="nav-link navtext">
                  Voter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
</>
);
}