// src/Pages/Basic-Quiz.tsx
import React from 'react';

interface FormData{
  educationLevel: string;
  workLifeBalance: string;
  workPreference: string;
  workEnviroment: string;
  salaryRange: string;
  motivations: string[];
  publicSpeaking: string;
}


function Basic_Quiz() {
  return (
    <div className="page-content">
      <h2>Basic Quiz</h2>
      <p>it's basic quizzing time</p>
    </div>
  );
}

export default Basic_Quiz;