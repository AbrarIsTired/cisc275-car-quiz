// src/components/MainLayout.tsx
import React, {useState} from 'react';
import { Outlet, Link} from 'react-router-dom';
import fish from '../fish.png';
import { Button, Form } from 'react-bootstrap'
import { callOpenAI_API } from '../openAI-config';
import light from "../light_mode.png";
import dark from "../dark_mode.png";

function MainLayout() {
  const [visible, setVisible] = useState<boolean>(true);
  const [message, updateMessage] = useState<string>("How can I make six figures"); // user message
  const [response, updateResponse] = useState<string>(""); // openai response
  const [darkMode, setView] = useState<boolean>(false);
  
  // Get responses from OpenAI using "await callOpenAI_API(message)"
  // with message being the user input
  async function getResponse() {
    const output = await callOpenAI_API(message)
    console.log(output)

    // Account for the possibilty of the output being null
    // Update UseState to store output
    updateResponse(output ?? "")
  }

  function toggleLightDark() {
    setView(!darkMode);
    var element = document.body;
    element.classList.toggle("dark-mode")
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
            <Link to="/basic-quiz">Basic Quiz</Link>
          </li>
          <li>
            <Link to="/detailed-quiz">Detailed Quiz</Link>
          </li>
          <label className="switch">
            <input type="checkbox" id="light-dark-checkbox" onClick={() => toggleLightDark()}></input>
            <span className="slider round">
              {!darkMode ? 
              <img src={light} className='dark-mode-img' alt=""/> :
              <img src={dark} className='dark-mode-img' alt=""/>
              }
            </span>
          </label>
          
         
        </ul>
      </nav>
      
      {/* This is where the routed content will appear */}
      <div className="content-area mt-4">
        <Outlet />

        {!visible && <div className="help-chat">
          helpi chat 
          <div>
            <Form.Group controlId="userChat">
              <Form.Label>say something:</Form.Label>
              <Form.Control type="text" value={message} onChange={(e) => updateMessage(e.target.value)}></Form.Control>
            </Form.Group>
            <Button onClick={() => {getResponse()}}>Ask</Button>
          </div>
          <div>
            car-quiz says: {response}
          </div>
        </div>}

        <div>
          <Button className="chat-button" onClick={() => setVisible(!visible)}>
            {/* 🚗 */}
          </Button>
        </div>
      </div>

      <header className="App-footer">
        <div style={{textAlign: "left", display: "inline-block", width: "50%"}}>
          <img src={fish} className="App-logo" alt="logo" />
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