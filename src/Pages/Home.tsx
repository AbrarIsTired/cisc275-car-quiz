// src/Pages/Home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

// Local storage for API Key
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function Home() {
  const [key, setKey] = useState<string>(keyData);
  
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  
  return (
    <div className="page-content">
      <div style={{width: "65%", padding: "0px 60px 0px 20px", display: "inline-block"}}>

        <h1>Welcome to Career Helpy</h1>
        <p>Welcome text</p>
        <br></br>

        <div className='quiz-info'>
          <div style={{width: "70%", display: "inline-block"}}>
            <h2>Basic Quiz</h2>
            <p>Basic quiz description</p>
          </div>
          <Link to="/basic-quiz" className='link-button'>Take Basic Quiz</Link>
        </div>
        <hr></hr>
        <div className='quiz-info'>
          <div style={{width: "70%", display: "inline-block"}}>
            <h2>Detailed Quiz</h2>
            <p>Detailed quiz description</p>  
          </div>
          <Link to="/detailed-quiz" className='link-button'>Take Detailed Quiz</Link>
        </div>
      </div>

      <div className="api-container" >
        <Form className="mt-4">
          <Form.Label>Enter API Key</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <Button className="Submit-Button" onClick={handleSubmit} style={{marginTop: "12px", width: "100%"}}>Submit</Button>
          <p style={{color: "grey", fontSize: "14px", textAlign: "left", margin: "12px 0px 20px 0px"}}>{!localStorage.getItem("MYKEY") ? "" : "• Key saved from previous session"}</p>
        </Form>
        </div>
    </div>
  );
}

export default Home;