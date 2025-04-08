// src/Pages/BasicQuiz.tsx
import React, { useState } from 'react';

interface FormData {
  industry: string;
  teamWork: string;
  creative: string;
  workPace: string;
  learnNewSkills: string;
  remote: string;
  educationLevel: string;
}

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

}

export default Basic_Quiz;