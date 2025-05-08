// src/Pages/DetailedQuiz.tsx
import React, { useState, useEffect } from 'react';
import { callOpenAI_API } from '../openAI-config';
import { Link } from 'react-router-dom';

interface FormData {
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
  hobbies: string;
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
    hobbies: ''
  });

  // Check if API key exists
  const [, setHasApiKey] = useState<boolean>(false);
  
  useEffect(() => {
    const apiKey = localStorage.getItem("MYKEY");
    setHasApiKey(!!apiKey);
  }, []);

  // State Management
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState<boolean>(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [results, setResults] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  

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
    // For detailed quiz, teamsize is optional if teamwork is "Independently"
    const isTeamsizeRequired = data.teamwork === 'Team';
    
    // Check if all required fields are filled
    const allAnswered = Object.entries(data).every(([key, value]) => {
      if (key === 'teamsize' && !isTeamsizeRequired) {
        return true; // Skip teamsize check if teamwork is "Independently"
      }
      return value !== '';
    });
    
    setAllQuestionsAnswered(allAnswered);

    // Count answered questions
    const answered: number = Object.entries(data).reduce((total, [key, val]) => {
      if (key === 'teamsize' && data.teamwork !== 'Team') {
        return total; // Don't count teamsize if teamwork is "Independently"
      }
      return total + ((val !== "") ? 1 : 0);
    }, 0);
    
    setQuestionsAnswered(answered);
  };

  function parseData(data: FormData) {
    let parsed: string = `I am interested in working in ${data.industry}.
      I would be happy with a minimum salary range of ${data.salary}.
      I intend to complete a ${data.education} level of education.
      Work-life balance is ${data.workLife.toLowerCase()} to me.
      I prefer to work from ${data.commute === 'Home' ? 'home' : 'an office and commute'}.
      Creative expression in my work is ${data.creativity.toLowerCase()} to me.
      I prefer to work ${data.teamwork === 'Independently' ? 'independently' : 'in a team'}.
      ${data.teamwork === 'Team' ? `I work best in a team of ${data.teamsize} people.` : ''}
      I am ${data.skills === 'Yes' ? 'comfortable' : 'not comfortable'} with learning new skills as my field evolves.
      I prefer a ${data.workPace.toLowerCase()}-paced work environment.
      My hobbies and interests include: ${data.hobbies}.`;
    console.log(parsed);
    return parsed;
  }

  async function getResponse(message: string) {
    setIsLoading(true);
    setError("");
    
    try {
      const output = await callOpenAI_API(message);
      
      if (typeof output === 'string' && output.includes("API key is missing or invalid")) {
        setError("API key is missing or invalid. Please add a valid OpenAI API key on the home page.");
        setIsLoading(false);
        return;
      }
      
      setResults(output ?? "No results were returned. Please try again.");
    } catch (err) {
      console.error("Error getting career recommendations:", err);
      setError("Failed to get career recommendations. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Check if API key exists before calling API
    const apiKey = localStorage.getItem("MYKEY");
    if (apiKey) {
      getResponse(parseData(formData));
    } else {
      setError("API key is missing. Please add your OpenAI API key to get your career recommendations.");
    }
  };

  function resetQuiz() {
    setSubmitted(false);
    setFormData({
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
      hobbies: ''
    });
    setQuestionsAnswered(0);
    setResults("");
    setError("");
  }

  return (
    <div className="quiz-page-content">
      <h2>Detailed Quiz</h2>
      <p>Answer these 10 questions to help determine your ideal career path</p>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="quiz-form">        
          <progress id="basic-progress" value={questionsAnswered} max="10"></progress>
          
          {/* Question 1: Industry */}
          <div className="question-container">
            <h3>Question 1</h3>
            <p className="question-text">Briefly describe what industry you would like to work in.</p>
            <div className="response-container">
              <div className="response">
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="question-container">
            {/*Question 2*/}
            <h3>Question 2</h3>
            <p className="question-text">What is the MINIMUM salary you would be happy with?</p>
            <div className="options-container">
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

          <div className="question-container">
            {/*Question 3*/}
            <h3>Question 3</h3>
            <p className="question-text">What is the highest level of education you intend to complete?</p>
            <div className="options-container">
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

          <div className="question-container">
            {/*Question 4*/}
            <h3>Question 4</h3>
            <p className="question-text">How much do you value work life balance?</p>
            <div className="options-container">
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

          <div className="question-container">
            {/*Question 5*/}
            <h3>Question 5</h3>
            <p className="question-text">Would you prefer to work from home or commute</p>
            <div className="options-container">
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
          
          <div className="question-container">
            {/*Question 6*/}
            <h3>Question 6</h3>
            <p className="question-text">How much do you value creative expression in your work?</p>
            <div className="options-container">
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
          
          <div className="question-container">
            {/*Question 7a*/}
            <h3>Question 7a</h3>
            <p className="question-text">Do you prefer to work in a team or independently?</p>
            <div className="options-container">
              {['Independently', 'Team'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`teamwork-${option}`}
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

          {/* Only show Question 7b if teamwork is "Team" */}
          {formData.teamwork === 'Team' && (
            <div className="question-container">
              {/*Question 7b*/}
              <h3>Question 7b</h3>
              <p className="question-text">What team size would you work in best?</p>
              <div className="options-container">
                {['2-4','5-7','8-10','11+'].map((option) => (
                  <div className="option" key={option}>
                  <input
                    type="radio"
                    id={`teamsize-${option}`}
                    name="teamsize"
                    value={option}
                    checked={formData.teamsize === option}
                    onChange={handleInputChange}
                    required={formData.teamwork === 'Team'}
                  />
                  <label htmlFor={`teamsize-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="question-container">
            {/*Question 8*/}
            <h3>Question 8</h3>
            <p className="question-text">Are you comfortable with learning new skills as your field evolves?</p>
            <div className="options-container">
              {['Yes','No'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`skills-${option}`}
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

          <div className="question-container">
            {/*Question 9*/}
            <h3>Question 9</h3>
            <p className="question-text">What workplace pacing are you comfortable with?</p>
            <div className="options-container">
              {['Slow','Moderate','Fast'].map((option) => (
                <div className="option" key={option}>
                <input
                  type="radio"
                  id={`workPace-${option}`}
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
          
          {/* Question 10: Hobbies */}
          <div className="question-container">
            <h3>Question 10</h3>
            <p className="question-text">List some of your hobbies and interests</p>
            <div className="response-container">
              <div className="response">
                <input
                  type="text"
                  id="hobbies"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {allQuestionsAnswered && (
            <button type="submit" className="submit-quiz-button">Submit Quiz</button>
          )}
        </form>
      ) : (
        <div className="completion-container">
          <h3>You have completed the Detailed Career Quiz</h3>
          
          {isLoading ? (
            <p>Loading your career recommendations...</p>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <Link to="/" className="link-button">Add API Key</Link>
              <button onClick={resetQuiz} className="submit-quiz-button">
                Retake Detailed Quiz
              </button>
            </div>
          ) : (
            <>
              <p>Based on your responses, here are your career recommendations:</p>
              <div className="detailed-quiz-results">{results}</div>
              <button onClick={resetQuiz} className="submit-quiz-button">
                Retake Detailed Quiz
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DetailedQuiz;