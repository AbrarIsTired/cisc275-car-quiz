// Abrar: I moved our original App.tsx into its own component. So our layouts would be along these lines

// src/components/MainLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import logo from '../logo.svg';

// Local storage for API Key
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function MainLayout() {
  const [key, setKey] = useState<string>(keyData);
  
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  
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
              <Link to="/test">Pages Tutorial</Link>
            </li>
          </ul>
        </nav>
        
        {/* This is where the routed content will appear */}
        <div className="content-area mt-4">
          <Outlet />

        
        
        <div className="api-container" >
        <Form className="mt-4">
          <Form.Label>Enter API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
        </div>
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