// src/components/MainLayout.tsx
import React, {useState} from 'react';
import { Outlet, Link} from 'react-router-dom';
import logo from '../logo.svg';
import { Button, Form } from "react-bootstrap"
//import { getResponse } from '../helpiChat-api';
import OpenAI from 'openai';

function MainLayout() {
  const [visible, setVisible] = useState<boolean>(true);
  const [message, updateMessage] = useState<string>("what is your job");

  const helpiChat = new OpenAI();
  
  async function getResponse(message: string): Promise<string> {
    const response = await helpiChat.responses.create({
      model: "gpt-4o",
      input: [
        {role: "user", 
        content: message
        }, {
          role: "system",
          content: "Find the ideal career for the user based on their responses, and provide information on their career."
        }
      ]
    });
    console.log(message);
    console.log(response.output_text)
    return response.output_text;
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
            <Button onClick={() => {getResponse(message)}}>Ask</Button>
          </div>
          <div>
            car-quiz says: {message}
          </div>
        </div>}

        <div>
          <Button className="chat-button" onClick={() => setVisible(!visible)}>
            🚗
          </Button>
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