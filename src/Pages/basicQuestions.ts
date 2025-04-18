export {}
// export interface MultipleChoiceQuestion {
//   label: string;
//   content: string;
//   options: string[];
// }

// export const BasicQuestions: MultipleChoiceQuestion[] = [
//   { 
//     label: "industry",
//     content: "What industry would you be most interested in working in?",
//     options: ['STEM', 
//               'Medicine', 
//               'Finance/Economics', 
//               'Business Administration/Management', 
//               'Creative arts and humanities']
//   },{ 
//     label: "teamWork",
//     content: "Do you work best with a team or independently?",
//     options: ['Independently',
//               'In teams']
//   },{ 
//     label: "creative",
//     content: "Are you a creative person?",
//     options: ['Yes',
//               'No']
//   },{ 
//     label: "workPace",
//     content: "Do you prefer a slower or faster paced work environment?",
//     options: ['Slower',
//               'Faster']
//   },{ 
//     label: "learnNewSkills",
//     content: "Are you comfortable with learning new skills in everchanging fields?",
//     options: ['Yes',
//               'No']
//   },{ 
//     label: "remote",
//     content: "Do you want to work remotely?",
//     options: ['Yes',
//               'No']
//   },{ 
//     label: "educationLevel",
//     content: "What is the highest level of education you have completed?",
//     options: ['PHD', 
//               'Masters', 
//               'Bachelors', 
//               'Associates', 
//               'High School/GED Equivalent', 
//               'N/A']
//   },
// ]



// {!submitted ? (
//     <form onSubmit={handleSubmit} className="quiz-form">
//       {/* Question 1: Industry */}
//       <div className="question-container">
//         <h3>Question 1</h3>
//         <p className="question-text">What industry would you be most interested in working in?</p>
//         <div className="options-container">
//           {['STEM', 'Medicine', 'Finance/Economics', 'Business Administration/Management', 'Creative arts and humanities'].map((option) => (
//             <div className="option" key={option}>
//               <input
//                 type="radio"
//                 id={`industry-${option}`}
//                 name="industry"
//                 value={option}
//                 checked={formData.industry === option}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor={`industry-${option}`}>{option}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Question 2: Team Work */}
//       <div className="question-container">
//         <h3>Question 2</h3>
//         <p className="question-text">Do you work best with a team or independently?</p>
//         <div className="options-container">
//           {['Independently', 'In teams'].map((option) => (
//             <div className="option" key={option}>
//               <input
//                 type="radio"
//                 id={`teamWork-${option}`}
//                 name="teamWork"
//                 value={option}
//                 checked={formData.teamWork === option}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor={`teamWork-${option}`}>{option}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Question 3: Creative */}
//       <div className="question-container">
//         <h3>Question 3</h3>
//         <p className="question-text">Are you a creative person?</p>
//         <div className="options-container">
//           {['Yes', 'No'].map((option) => (
//             <div className="option" key={option}>
//               <input
//                 type="radio"
//                 id={`creative-${option}`}
//                 name="creative"
//                 value={option}
//                 checked={formData.creative === option}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor={`creative-${option}`}>{option}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Question 4: Work Pace */}
//       <div className="question-container">
//         <h3>Question 4</h3>
//         <p className="question-text">Do you prefer a slower or faster paced work environment?</p>
//         <div className="options-container">
//           {['Slower', 'Faster'].map((option) => (
//             <div className="option" key={option}>
//               <input
//                 type="radio"
//                 id={`workPace-${option}`}
//                 name="workPace"
//                 value={option}
//                 checked={formData.workPace === option}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor={`workPace-${option}`}>{option}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Question 5: Learn New Skills */}
//       <div className="question-container">
//         <h3>Question 5</h3>
//         <p className="question-text">Are you comfortable with learning new skills in everchanging fields?</p>
//         <div className="options-container">
//           {['Yes', 'No'].map((option) => (
//             <div className="option" key={option}>
//               <input
//                 type="radio"
//                 id={`learnNewSkills-${option}`}
//                 name="learnNewSkills"
//                 value={option}
//                 checked={formData.learnNewSkills === option}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor={`learnNewSkills-${option}`}>{option}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Question 6: Remote Work */}
//       <div className="question-container">
//         <h3>Question 6</h3>
//         <p className="question-text">Do you want to work remotely?</p>
//         <div className="options-container">
//           {['Yes', 'No'].map((option) => (
//             <div className="option" key={option}>
//               <input
//                 type="radio"
//                 id={`remote-${option}`}
//                 name="remote"
//                 value={option}
//                 checked={formData.remote === option}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor={`remote-${option}`}>{option}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Question 7: Education Level */}
//       <div className="question-container">
//         <h3>Question 7</h3>
//         <p className="question-text">What is the highest level of education you have completed?</p>
//         <div className="options-container">
//           {['PHD', 'Masters', 'Bachelors', 'Associates', 'High School/GED Equivalent', 'N/A'].map((option) => (
//             <div className="option" key={option}>
//               <input
//                 type="radio"
//                 id={`educationLevel-${option}`}
//                 name="educationLevel"
//                 value={option}
//                 checked={formData.educationLevel === option}
//                 onChange={handleInputChange}
//                 required
//               />
//               <label htmlFor={`educationLevel-${option}`}>{option}</label>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {allQuestionsAnswered && (
//         <button type="submit" className="submit-button" onClick={() => {
//           getResponse(parseData(formData))
//         }}>Submit Quiz</button>
//       )}
//     </form>
//   ) : (
//     <div className="completion-container">
//       <h3>You have completed the Basic Career Quiz</h3>
//       <p>Your responses have been recorded. We'll send it to the ChatGPT Dimension Soon :tm:</p>
//       <div className="basic-quiz-results">{results}</div>
//       <button onClick={() => setSubmitted(false)} className="retake-button">
//         Retake Basic Quiz
//       </button>
//     </div>
//   )}
