// src/Pages/BasicQuiz.tsx
import React, { useState } from 'react';
import { callOpenAI_API } from '../openAI-config';
// import { BasicQuestions, MultipleChoiceQuestion } from './basicQuestions';
interface FormData {
  industry: string;          // Answer to industry question
  teamWork: string;          // Answer to team work preference
  creative: string;          // Answer to creativity question (Yes/No)
  workPace: string;          // Answer to work pace preference
  learnNewSkills: string;    // Answer to learning new skills question (Yes/No)
  remote: string;            // Answer to remote work preference (Yes/No)
  educationLevel: string;    // Answer to education level question
}

  // State Management
function Basic_Quiz() {
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    teamWork: '',
    creative: '',
    workPace: '',
    learnNewSkills: '',
    remote: '',
    educationLevel: ''
  });

  // Check if API key exists
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
 
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


  //On Radio button click
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    //New form object which is a copy of the old one just with whatever is filled in
    const updatedFormData = {
      ...formData,
      [name]: value
    };


    //Update state with new data
    setFormData(updatedFormData);

    // Check if all questions are answered
    // checkAllQuestionsAnswered(updatedFormData);
    checkAllQuestionsAnswered(updatedFormData);
  };


  const checkAllQuestionsAnswered = (data: FormData) => {
    // Check if all fields have a non-empty value
    const allAnswered = Object.values(data).every(value => value !== '');
    setAllQuestionsAnswered(allAnswered);

    // Counts the number of non-empty values in the interface object
    const answered: number = Object.values(data).reduce(function(total, val) {
      return total + ((val !== "") ? 1 : 0);}, 0);
    console.log(answered)
    setQuestionsAnswered(answered);
  };


  //Altering the states when submitting the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    getResponse(parseData(formData));
  };

  // Parsing the results of the quiz to human (GPT) readable language
  function parseData(data: FormData) {
    let parsed: string = `I am interested in the ${data.industry} industry.
      I would prefer to work ${data.teamWork === "Independent" ? "independently" : "in teams"}.
      I am ${data.creative === "Yes" ? "creative" : "not creative"}.
      I prefer a ${data.workPace === "Slower" ? "slow" : "fast" } paced work environment.
      I am ${data.learnNewSkills === "Yes" ? "comfortable" : "unflexible"} with learning new skills in the workplace.
      I want to work ${data.remote === "Yes" ? "remotely" : "in-person"}.
      ${data.educationLevel === "N/A" ? "" : `The highest level of education I have completed is my ${data.educationLevel}`}`
    console.log(parsed);
    return parsed;
  }

  // Get responses from OpenAI using "await callOpenAI_API(message)"
  // with message being the user input
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


  // Rendering the Fender Bender
  return (
    <div className="quiz-page-content">
      <h2>Basic Quiz</h2>
      <p>Answer these 7 questions to help determine your ideal career path</p>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="quiz-form">      
          <progress id="basic-progress" value={questionsAnswered} max="7"></progress>
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
              {['Independently', 'In teams'].map((option) => (
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

          {/* Question 4: Work Pace */}
          <div className="question-container">
            <h3>Question 4</h3>
            <p className="question-text">Do you prefer a slower or faster paced work environment?</p>
            <div className="options-container">
              {['Slower', 'Faster'].map((option) => (
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

          {/* Question 5: Learn New Skills */}
          <div className="question-container">
            <h3>Question 5</h3>
            <p className="question-text">Are you comfortable with learning new skills in everchanging fields?</p>
            <div className="options-container">
              {['Yes', 'No'].map((option) => (
                <div className="option" key={option}>
                  <input
                    type="radio"
                    id={`learnNewSkills-${option}`}
                    name="learnNewSkills"
                    value={option}
                    checked={formData.learnNewSkills === option}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor={`learnNewSkills-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Question 6: Remote Work */}
          <div className="question-container">
            <h3>Question 6</h3>
            <p className="question-text">Do you want to work remotely?</p>
            <div className="options-container">
              {['Yes', 'No'].map((option) => (
                <div className="option" key={option}>
                  <input
                    type="radio"
                    id={`remote-${option}`}
                    name="remote"
                    value={option}
                    checked={formData.remote === option}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor={`remote-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Question 7: Education Level */}
          <div className="question-container">
            <h3>Question 7</h3>
            <p className="question-text">What is the highest level of education you have completed?</p>
            <div className="options-container">
              {['PHD', 'Masters', 'Bachelors', 'Associates', 'High School/GED Equivalent', 'N/A'].map((option) => (
                <div className="option" key={option}>
                  <input
                    type="radio"
                    id={`educationLevel-${option}`}
                    name="educationLevel"
                    value={option}
                    checked={formData.educationLevel === option}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor={`educationLevel-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          
          {allQuestionsAnswered && (
            <button type="submit" className="submit-quiz-button" onClick={() => {
              getResponse(parseData(formData))
            }}>Submit Quiz</button>
          )}
        </form>
      ) : (
        <div className="completion-container">
          <h3>You have completed the Basic Career Quiz</h3>
          <p>Your responses have been recorded. We'll send it to the ChatGPT Dimension Soon :tm:</p>
          <div className="basic-quiz-results">{results}</div>
          <button onClick={() => {setSubmitted(false); setFormData({
            industry: '',
            teamWork: '',
            creative: '',
            workPace: '',
            learnNewSkills: '',
            remote: '',
            educationLevel: ''});
            setQuestionsAnswered(0)
          }} 
            className="submit-quiz-button">
            Retake Basic Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Basic_Quiz;