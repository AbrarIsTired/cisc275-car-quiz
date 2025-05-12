// src/Pages/BasicQuiz.tsx
import React, { useState, useEffect } from 'react';
import { callOpenAI_API } from '../openAI-config';
import { BasicQuestions, MultipleChoiceQuestion } from './basicQuestions';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function Basic_Quiz() {

  

  // Check if API key exists
  const [, setHasApiKey] = useState<boolean>(false);
   useEffect(() => {
    const apiKey = localStorage.getItem("MYKEY");
    setHasApiKey(!!apiKey);
  }, []);

  
  let init: string[] = Array(BasicQuestions.length).fill("");

  // State Management
  const [data, setData] = useState<string[]>(init);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [results, setResults] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  //On Radio button click
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const index: number = +(e.currentTarget.id).split("-")[0];
    data[index] = e.target.value;
    // Update form data with user responses
    setData([...data.slice(0, index), e.target.value, ...data.slice(index + 1)])

    // Check if all questions are answered
    const answered: number = Object.values(data).reduce(function(total, val) {
      return total + ((val !== "") ? 1 : 0);}, 0);
    console.log(answered);
    setQuestionsAnswered(answered);
  };


  //Altering the states when submitting the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    getResponse(parseData());
  };

  // Parsing the results of the quiz to human (GPT) readable language
  function parseData() {
    let parsed: string = BasicQuestions.reduce((str: string, question: MultipleChoiceQuestion, index: number) => {
      return str.concat(question.content.concat(": ").concat(data[index])).concat("\n");
    }, "")
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

 function resetQuiz() {
    setSubmitted(false);
    setData(init);
    setQuestionsAnswered(0);
    setResults("");
    setError("");
  }

// Rendering the Fender Bender
 return (
    <div className="quiz-page-content">
      <h2>Basic Quiz</h2>
      <p>Answer these 7 questions to help determine your ideal career path</p>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="quiz-form">
          {BasicQuestions.map((question: MultipleChoiceQuestion, index: number) => (
            <div className="question-container">
              <h3>Question {index + 1}</h3>
              <p className="question-text">{question.content}</p>
              <div className="options-container">
                {question.options.map((option: string) => (
                  <div className="option" key={option}>
                    <input
                      type="radio"
                      id={`${index}-${option}`}
                      name={question.label}
                      value={option}
                      onChange={handleInputChange}
                      checked={data[index] === option}
                      required
                    />
                    <label htmlFor={`${index}-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div> 
          ))}
          
          {(questionsAnswered === BasicQuestions.length) && (
            <button type="submit" className="submit-quiz-button">Submit Quiz</button>
          )}
        </form>
      ) : (
        <div className="completion-container">
          <h3>You have completed the Basic Career Quiz</h3>
          {isLoading ? (
            <p>Loading your career recommendations...</p>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <Link to="/" className="link-button">Add API Key</Link>
              <button onClick={resetQuiz} className="submit-quiz-button">
                Retake Basic Quiz
              </button>
            </div>
          ) : (
            <>
              <p>Based on your responses, here are your career recommendations:</p>
              <div className="quiz-results">
                <ReactMarkdown>
                  {results}
                </ReactMarkdown>
              </div>
              <button onClick={resetQuiz} className="submit-quiz-button">
                Retake Basic Quiz
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/*
QUIZ RESULTS
- Top 3 career recommendation 
- Description of career
- Salary and demand
- Required education level
- Required skillsets
*/

export default Basic_Quiz;