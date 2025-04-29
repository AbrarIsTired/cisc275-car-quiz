// src/Pages/About.tsx
import React from 'react';

function About() {
  return (
    <div className="page-content">
      <h2>About Career Helpy</h2>
      <p>Created by Sophia Zhang, Abrar Nomani, and Aaron Riley, the Career Helpy is a streamlined way to determine possible 
        career paths for our users. Our basic quiz asks some simple questions to create a report based on rudimentary metrics.
        Our detailed quiz asked some more in depth questions specific to you and your needs in a career such as salary, hobbies,
        and workplace priorites. With the OpenAI integration, your responses are sent in to ChatGPT to generate your detailed 
        career report.
      </p>
      <h3>Resources, Libraries, and Languages Used</h3>
      <ul>
        <li>React</li>
        <li>React Routing</li>
        <li>TypeScript</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>OpenAI API</li>
      </ul>
    </div>
  );
}

export default About;