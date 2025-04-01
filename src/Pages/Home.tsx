// src/Pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-content">
      <h1>Welcome to Car Quiz</h1>
      <p>It's careering time</p>
      <Link to="/basic-quiz" className='link-button'>Take Basic Quiz</Link>
    </div>
  );
}

export default Home;