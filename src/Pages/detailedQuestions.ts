export interface FreeResponseQuestion {
    label: string;
    content: string;
}

export const DetailedQuestions = [
  {
    label: "industry",
    content: "Briefly describe what industry you would like to work in.",
  },{ 
    label: "salary",
    content: "What is the MINIMUM annual salary you would be happy with?",
    options: ['50,000-60,000', 
              '60,000-80,000', 
              '80,000-100,000', 
              '100,000+' ]
  },{ 
    label: "salary",
    content: "What is the highest level of education you intend to complete?",
    options: ['PHD', 
              'Masters', 
              'Associates', 
              'High School Diploma/GED' ]
  },{ 
    label: "workLife",
    content: "How much do you value work life balance?",
    options: ['Not at all', 
              'Very Little', 
              'Quite a bit', 
              'Of utmost importance' ]
  },{ 
    label: "commute",
    content: "Would you prefer to work from home or commute?",
    options: ['Home', 
              'Commute']
  },{ 
    label: "creativity",
    content: "How much do you value creative expression in your work?",
    options: ['Not at all', 
              'Very Little', 
              'Quite a bit', 
              'Of utmost importance' ]
  },{ 
    label: "teamWork",
    content: "Do you prefer to work in a team or independently?",
    options: ['Independently', 
              'Team']
  },{ 
    label: "teamSize",
    content: "What team size would you work in best?",
    options: ['2-4', 
              '5-10',
              '10-15',
              '15+']
  },{ 
    label: "teamSize",
    content: "Are you comfortable with learning new skills as your field evolves?",
    options: ['Yes', 
              'No']
  },{ 
    label: "workPace",
    content: "What workplace pacing are you comfortable with?",
    options: ['Slow', 
              'Moderate',
              'Fast']
  }, {
    label: "hobbies",
    content: "List some of your hobbies and interests."
  }
]