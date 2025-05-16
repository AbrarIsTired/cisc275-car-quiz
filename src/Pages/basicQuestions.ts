export interface MultipleChoiceQuestion {
  label: string;
  content: string;
  options: string[];
}

export const BasicQuestions: MultipleChoiceQuestion[] = [
  { 
    label: "industry",
    content: "What industry would you be most interested in working in?",
    options: ['STEM', 
              'Medicine', 
              'Finance/Economics', 
              'Business Administration/Management', 
              'Creative arts and humanities']
  },{ 
    label: "teamWork",
    content: "Do you work best with a team or independently?",
    options: ['Independently',
              'In teams']
  },{ 
    label: "creative",
    content: "Are you a creative person?",
    options: ['Yes',
              'No']
  },{ 
    label: "workPace",
    content: "Do you prefer a slower or faster paced work environment?",
    options: ['Slower',
              'Faster']
  },{ 
    label: "learnNewSkills",
    content: "Are you comfortable with learning new skills in everchanging fields?",
    options: ['Yes',
              'No']
  },{ 
    label: "remote",
    content: "Do you want to work remotely?",
    options: ['Yes',
              'No']
  },{ 
    label: "educationLevel",
    content: "What is the highest level of education you have completed?",
    options: ['PHD', 
              'Masters', 
              'Bachelors', 
              'Associates', 
              'High School/GED Equivalent', 
              'N/A']
  },
]

