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
                placeholder='Enter response here'
                onChange={handleInputChange} />
              </Form.Group>
            </div>
          </div>

          <div className = "question-container">
            {/*Question 2*/}
            <h3>Question 2</h3>
            <p className = "question-text">What is the MINIMUM salary you would be happy with?</p>
            <div className = "options-container">
              {['50,000-60,000','60,000-80,000','80,000-100,000',"100,000+"].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`salary-${option}`}
                  name="salary"
                  value={option}
                  checked={formData.salary === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`salary-${option}`}>{option}</label>
                </div>
              ))}
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

          <div className = "question-container">
            {/*Question 4*/}
            <h3>Question 4</h3>
            <p className = "question-text">How much do you value work life balance?</p>
            <div className = "options-container">
              {['Not at all', 'Very Little', 'Quite a bit', 'Of utmost importance'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`workLife-${option}`}
                  name="workLife"
                  value={option}
                  checked={formData.workLife === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`workLife-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className = "question-container">
            {/*Question 5*/}
            <h3>Question 5</h3>
            <p className = "question-text">Would you prefer to work from home or commute</p>
            <div className = "options-container">
              {['Home', 'Commute'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`commute-${option}`}
                  name="commute"
                  value={option}
                  checked={formData.commute === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`commute-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className = "question-container">
            {/*Question 6*/}
            <h3>Question 6</h3>
            <p className = "question-text">How much do you value creative expression in your work?</p>
            <div className = "options-container">
              {['Not at all', 'Very Little', 'Quite a bit', 'Of utmost importance'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`creativity-${option}`}
                  name="creativity"
                  value={option}
                  checked={formData.creativity === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`creativity-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className = "question-container">
            {/*Question 7a*/}
            <h3>Question 7a</h3>
            <p className = "question-text">Do you prefer to work in a team or independently?</p>
            <div className = "options-container">
              {['Independently', 'Team'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`-${option}`}
                  name="teamwork"
                  value={option}
                  checked={formData.teamwork === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`teamwork-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className = "question-container">
            {/*Question 7b*/}
            <h3>Question 7b</h3>
            <p className = "question-text">If you chose team, what team sixe would you work in best?</p>
            <div className = "options-container">
              {['2-4','5-7','8-10','11+'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`-${option}`}
                  name="teamsize"
                  value={option}
                  checked={formData.teamsize === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`teamsize-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className = "question-container">
            {/*Question 8*/}
            <h3>Question 8</h3>
            <p className = "question-text">Are you comfortable with learning new skills as your field evolves?</p>
            <div className = "options-container">
              {['Yes','No'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`-${option}`}
                  name="skills"
                  value={option}
                  checked={formData.skills === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`skills-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className = "question-container">
            {/*Question 9*/}
            <h3>Question 9</h3>
            <p className = "question-text">What workplace pacing are you comfortable with?</p>
            <div className = "options-container">
              {['Slow','Moderate','Fast'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`-${option}`}
                  name="workPace"
                  value={option}
                  checked={formData.workPace === option}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor={`workPace-${option}`}>{option}</label>
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