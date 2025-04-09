// src/Pages/DetailedQuiz.tsx
import React, { useState } from 'react';
import { Form } from "react-bootstrap";


interface FormData{
  industry: string;
  salary: string;
  education: string;
  workLife: string;
  commute: string;
  creativity: string;
  teamwork: string;
  teamsize: string;
  skills: string;
  workPace: string;
}

function DetailedQuiz() {
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    salary: '',
    education: '',
    workLife: '',
    commute: '',
    creativity: '',
    teamwork: '',
    teamsize: '',
    skills: '',
    workPace: '',
  });
    const [submitted, setSubmitted] = useState(false);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(updatedFormData);
    
    checkAllQuestionsAnswered(updatedFormData);
  };

  const checkAllQuestionsAnswered = (data: FormData) => {
    const allAnswered = Object.values(data).every(value => value !== '');
    
    setAllQuestionsAnswered(allAnswered);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setSubmitted(true);
    };

  return (
    <div className="page-content">
      <h2>Detailed Quiz</h2>
      <p>it's detailed quizzing time</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className = "quiz-form">
          <div className = "question-container">
            {/*Question 1*/}
            <h3>Question 1</h3>
            <p className = "question-text">Give a brief description of the industry you would like to work in?</p>
            <div>
              <Form.Group controlId="formWrittenResponse">
                <Form.Control
                value={formData.industry}
                onChange={handleInputChange} />
              </Form.Group>
            </div>
          </div>

          <div className = "question-container">
            {/*Question 3*/}
            <h3>Question 3</h3>
            <p className = "question-text">What is the highest level of education you intend to complete?</p>
            <div className = "options-container">
              {['PHD','Masters','Bachelors','Associates','High School Diploma/GED'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`education-${option}`}
                  name="education"
                  value={option}
                  checked={formData.education === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`education-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          {allQuestionsAnswered && (
            <button type="submit" className="submit-button">Submit Quiz</button>
          )}
        </form>
      ) : (
        <div className="completion-container">
          <h3>You have completed the Detailed Career Quiz</h3>
          <p>Your responses have been recorded. We'll send it to the ChatGPT Dimension Soon :tm:</p>
          <button onClick={() => setSubmitted(false)} className="retake-button">
            Retake Detailed Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default DetailedQuiz;