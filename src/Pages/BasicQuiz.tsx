// src/Pages/BasicQuiz.tsx
import React, { useState } from 'react';

interface FormData {
  industry: string;          // Answer to industry question
  teamWork: string;          // Answer to team work preference
  creative: string;          // Answer to creativity question (Yes/No)
  workPace: string;          // Answer to work pace preference
  learnNewSkills: string;    // Answer to learning new skills question (Yes/No)
  remote: string;            // Answer to remote work preference (Yes/No)
  educationLevel: string;    // Answer to education level question
}


function Basic_Quiz() {
  // Managing State
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    teamWork: '',
    creative: '',
    workPace: '',
    learnNewSkills: '',
    remote: '',
    educationLevel: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  // Event Handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;  // Extract the field name and new value
    
    // Create a new formData object with the updated value
    // Copy all existing formData properties
    //Then replace it with the copy
    const updatedFormData = {
      ...formData,
      [name]: value 
    };
    
    // Update the state with our new data
    setFormData(updatedFormData);
    
    // Check if all questions are now answered
    checkAllQuestionsAnswered(updatedFormData);
  };


  const checkAllQuestionsAnswered = (data: FormData) => {
    // The condition checks if each value is NOT an empty string
    const allAnswered = Object.values(data).every(value => value !== '');
    
    // Update our state based on whether all questions are answered
    setAllQuestionsAnswered(allAnswered);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // Prevents the page from reloading on form submission
    
    // Log the form data to the console (useful for debugging)
    console.log('Form submitted:', formData);
    
    // Update state to show the thank you message
    setSubmitted(true);
    
    // SEND DATA FROM HERE TO CHATGPT/OPENAI
  };

  return (
    <div className="page-content">
      <h2>Basic Quiz</h2>
      <p>Answer these questions to help determine your ideal career path</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="quiz-form">
          {/* Question 1: Industry */}
          <div className="question-container">
            <h3>Question 1</h3>
            <p className="question-text">What industry would you be most interested in working in?</p>
            <div className="options-container">
              {['STEM', 'Medicine', 'Finance/Economics', 'Business Administration/Management', 'Creative arts and humanities'].map((option) => (
                <div className="option" key={option}>
                  <input
                    type="radio"
                    id={`industry-${option}`}
                    name="industry"
                    value={option}
                    checked={formData.industry === option}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor={`industry-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Question 2: Team Work */}
          <div className="question-container">
            <h3>Question 2</h3>
            <p className="question-text">Do you work best with a team or independently?</p>
            <div className="options-container">
              {['Independent', 'Team'].map((option) => (
                <div className="option" key={option}>
                  <input
                    type="radio"
                    id={`teamWork-${option}`}
                    name="teamWork"
                    value={option}
                    checked={formData.teamWork === option}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor={`teamWork-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Question 3: Creative */}
          <div className="question-container">
            <h3>Question 3</h3>
            <p className="question-text">Are you a creative person?</p>
            <div className="options-container">
              {['Yes', 'No'].map((option) => (
                <div className="option" key={option}>
                  <input
                    type="radio"
                    id={`creative-${option}`}
                    name="creative"
                    value={option}
                    checked={formData.creative === option}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor={`creative-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          {/* We'll add more questions in future commits */}
          
          {/* Submit button appears only when all questions are answered */}
          {allQuestionsAnswered && (
            <button type="submit" className="submit-button">Submit Quiz</button>
          )}
        </form>
      ) : (
        <div className="completion-container">
          <h3>Thank you for completing the quiz!</h3>
          <p>Your responses have been recorded. We'll analyze your answers and provide career insights soon.</p>
          <button onClick={() => setSubmitted(false)} className="retake-button">
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Basic_Quiz;