// src/Pages/Home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

// Define constant for localStorage key
const API_KEY_STORAGE_KEY = "MYKEY";

function Home() {
  // Initialize state with value from localStorage if it exists
  const [key, setKey] = useState<string>(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    return savedKey ? JSON.parse(savedKey) : "";
  });
  
  function handleSubmit() {
    if (key) {
      // Clean up the API Key by removing whitespace
      const cleanedKey = key.trim();
      localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(cleanedKey));
    }
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  
  return (
    <div className="page-content">
      <div style={{width: "65%", padding: "0px 60px 0px 20px", display: "inline-block"}}>

        <h1>Career Helpy</h1>
        <p>Discover your career path with a personalized, AI-powered career finder.</p>
        <br></br>

        <div className='quiz-info'>
          <div style={{width: "75%", display: "inline-block", padding: "10px"}}>
            <h2>Basic Quiz</h2>
            <p>A quick and simple quiz that uses your responses to give a very general idea of what career path you could take.</p>
          </div>
          <Link to="/basic-quiz" className='link-button'>Take Basic Quiz</Link>
        </div>
        <hr></hr>
        <div className='quiz-info'>
          <div style={{width: "75%", display: "inline-block", padding: "10px"}}>
            <h2>Detailed Quiz</h2>
            <p>A more in-depth quiz that uses more specific responses to better reflect what you value in a career to further narrow down your possible path.</p>  
          </div>
          <Link to="/detailed-quiz" className='link-button'>Take Detailed Quiz</Link>
        </div>
      </div>

      <div className="api-container" >
        <Form className="mt-4">
          <Form.Label>Enter API Key</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <Button className="Submit-Button" onClick={handleSubmit} style={{marginTop: "12px", width: "100%"}}>Submit</Button>
          <p style={{color: "var(--text-dark)", fontSize: "14px", textAlign: "left", margin: "12px 0px 20px 0px"}}>{!localStorage.getItem("MYKEY") ? "" : "• Key saved from previous session"}</p>
        </Form>
        </div>
    </div>
  );
}

export default Home;