// Abrar: I moved our original App.tsx into its own component. So our layouts would be along these lines

// src/components/MainLayout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../logo.svg';


function MainLayout() {
  return (
    <div className="App">
      
      {/* Navigation */}
      <nav className="main-nav mt-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/basic-quiz">Basic Quiz</Link>
          </li>
          <li>
            <Link to="/detailed-quiz">Detailed Quiz</Link>
          </li>
        </ul>
      </nav>
      
      {/* This is where the routed content will appear */}
      <div className="content-area mt-4">
        <Outlet />
      </div>

      <header className="App-footer">
        <div style={{textAlign: "left", display: "inline-block", width: "50%"}}>
          <img src={logo} className="App-logo" alt="logo" />
          CISC275 Career Quiz Project
        </div>
        <div style={{textAlign: "right", display: "inline-block", width: "50%", paddingRight: "30px"}}>
          Sophia Zhang, Aaron Riley, Abrar Nomani
        </div>
      </header>
    </div>
  );
}

export default MainLayout;