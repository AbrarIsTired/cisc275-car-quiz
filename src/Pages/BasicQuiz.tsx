// src/Pages/BasicQuiz.tsx
import React, { useState } from 'react';
import { callOpenAI_API } from '../openAI-config';
import { BasicQuestions, MultipleChoiceQuestion } from './basicQuestions';
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

  const [data, setData] = useState<string[]>(Array(BasicQuestions.length).fill(""))

  //useState Hooks for tracking form status
  const [submitted, setSubmitted] = useState<boolean>(false); //Submitted Question: T or F State
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState<boolean>(false); //All Questions Answered: T or F State
  
  //useState Hook to display and update GPT generated quiz results
  const [results, updateResults] = useState<string>("");

  //Handling Events

  //On Radio button click

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    
    const { name, value } = e.target;

    //New form object which is a copy of the old one just with whatever is filled in
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    const index: number = +(e.currentTarget.id).split("-")[0];
    data[index] = e.target.value;
    // const updatedData = data.map((value: string, i: number) => {
    //   if (i === index) {
    //     return e.target.value;
    //   } else {
    //     return value;
    //   }
    // })
    // setData(["bruh"]);
    console.log(data);
    console.log(formData)
    console.log(e.currentTarget.id);
    console.log(e.target.value);


    //Update state with new data
    setFormData(updatedFormData);
    
    // Check if all questions are answered
    // checkAllQuestionsAnswered(updatedFormData);
    checkAllQuestionsAnswered();
  };


  const checkAllQuestionsAnswered = () => {
    //data: FormData
    // Check if all fields have a non-empty value
    //const allAnswered = Object.values(data).every(value => value !== '');
    const allAnswered = data.every(value => value !== '');
    
    setAllQuestionsAnswered(allAnswered);
  };


  //Altering the states when submitting the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // SEND QUIZ ANSWERS TO THE PRINCIPALS OFFICE AND HAVE HIM EXPELLED (Sent it to ChatGPT)
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
    const output = await callOpenAI_API(message)
    console.log(output)

    // Account for the possibilty of the output being null
    // Update UseState to store output
    updateResults(output ?? "") 
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
                      checked={data[index] === option}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor={`${index}-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {allQuestionsAnswered && (
            <button type="submit" className="submit-button" onClick={() => {
              getResponse(parseData(formData))
            }}>Submit Quiz</button>
          )}
        </form>
      ) : (
        <div className="completion-container">
          <h3>You have completed the Basic Career Quiz</h3>
          <p>Your responses have been recorded. We'll send it to the ChatGPT Dimension Soon :tm:</p>
          <div className="basic-quiz-results">{results}</div>
          <button onClick={() => {setSubmitted(false)
            setData(Array(BasicQuestions.length).fill(""))
          }} className="retake-button">
            Retake Basic Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Basic_Quiz;