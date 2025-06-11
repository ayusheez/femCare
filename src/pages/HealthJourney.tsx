
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import Questionnaire from '@/components/Questionnaire';
import NavbarThemeToggle from '@/components/NavbarThemeToggle';

const HealthJourney: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  
  useEffect(() => {
    // Retrieve user information from sessionStorage
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      const { name } = JSON.parse(userInfo);
      setUserName(name || '');
    }
  }, []);
  
  const handleQuestionnaireComplete = (data: any) => {
    // Store the questionnaire data in sessionStorage to use in results page
    sessionStorage.setItem('healthProfile', JSON.stringify(data));
    
    // Navigate to results page
    navigate('/results');
  };
  
  return (
    <div className="min-h-screen bg-fem-light dark:bg-fem-dark py-16 px-4 sm:px-6">
      <NavbarThemeToggle />
      <div className="container mx-auto">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4 dark:text-white">
              {userName ? `${userName}, your ` : 'Your '}<span className="text-gradient">Health Journey</span> Begins
            </h1>
            <p className="text-lg text-fem-dark/80 dark:text-white/80">
              Please answer these questions so we can create your personalized health profile and recommendations.
            </p>
          </div>
        </FadeIn>
        
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      </div>
    </div>
  );
};

export default HealthJourney;
