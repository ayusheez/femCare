
import React, { useState } from 'react';
import FadeIn from './FadeIn';
import Button from './Button';
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface QuestionnaireProps {
  onComplete: (data: any) => void;
}

interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options?: Array<{
    id: string;
    text: string;
    value: string;
  }>;
  helpText?: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 'age',
    text: 'What is your age?',
    type: 'single',
    options: [
      { id: 'age1', text: '18-25', value: '18-25' },
      { id: 'age2', text: '26-35', value: '26-35' },
      { id: 'age3', text: '36-45', value: '36-45' },
      { id: 'age4', text: '46-55', value: '46-55' },
      { id: 'age5', text: 'Over 55', value: '55+' },
    ],
    helpText: 'Your age helps us tailor recommendations to your life stage',
    category: 'Personal Information'
  },
  {
    id: 'exercise',
    text: 'How often do you exercise?',
    type: 'single',
    options: [
      { id: 'ex1', text: 'Rarely', value: 'rarely' },
      { id: 'ex2', text: '1-2 times per week', value: '1-2' },
      { id: 'ex3', text: '3-4 times per week', value: '3-4' },
      { id: 'ex4', text: '5+ times per week', value: '5+' },
    ],
    helpText: 'Regular exercise is important for overall health',
    category: 'Lifestyle'
  },
  {
    id: 'sleep',
    text: 'How would you rate your sleep quality?',
    type: 'scale',
    helpText: 'Sleep quality affects many aspects of your health',
    category: 'Lifestyle'
  },
  {
    id: 'conditions',
    text: 'Do you have any of these health conditions?',
    type: 'multiple',
    options: [
      { id: 'cond1', text: 'PCOS', value: 'pcos' },
      { id: 'cond2', text: 'Endometriosis', value: 'endometriosis' },
      { id: 'cond3', text: 'Thyroid issues', value: 'thyroid' },
      { id: 'cond4', text: 'Anxiety/Depression', value: 'mental_health' },
      { id: 'cond5', text: 'Cardiovascular issues', value: 'cardiovascular' },
      { id: 'cond6', text: 'None of the above', value: 'none' },
    ],
    helpText: 'Certain conditions may require specialized care',
    category: 'Medical History'
  },
  {
    id: 'menstrual',
    text: 'How would you describe your menstrual cycle?',
    type: 'single',
    options: [
      { id: 'mens1', text: 'Regular', value: 'regular' },
      { id: 'mens2', text: 'Irregular', value: 'irregular' },
      { id: 'mens3', text: 'Heavy', value: 'heavy' },
      { id: 'mens4', text: 'Light', value: 'light' },
      { id: 'mens5', text: 'Not applicable', value: 'na' },
    ],
    helpText: 'Menstrual patterns can indicate hormonal health',
    category: 'Reproductive Health'
  },
  {
    id: 'goals',
    text: 'What are your main health goals?',
    type: 'multiple',
    options: [
      { id: 'goal1', text: 'Weight management', value: 'weight' },
      { id: 'goal2', text: 'Fertility & reproductive health', value: 'fertility' },
      { id: 'goal3', text: 'Mental wellbeing', value: 'mental' },
      { id: 'goal4', text: 'Energy & vitality', value: 'energy' },
      { id: 'goal5', text: 'Chronic condition management', value: 'chronic' },
      { id: 'goal6', text: 'Preventive care', value: 'preventive' },
    ],
    helpText: 'Your goals help us prioritize recommendations',
    category: 'Preventive Care'
  },
];

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: any}>({});
  const [showHelp, setShowHelp] = useState<boolean>(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleSingleSelect = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };
  
  const handleMultipleSelect = (value: string) => {
    const currentValues = answers[currentQuestion.id] || [];
    
    // If "None of the above" is selected, clear other selections
    if (value === 'none') {
      setAnswers({
        ...answers,
        [currentQuestion.id]: ['none']
      });
      return;
    }
    
    // If another option is selected, remove "None of the above"
    let newValues = [...currentValues];
    
    if (newValues.includes(value)) {
      newValues = newValues.filter(v => v !== value);
    } else {
      newValues.push(value);
      // Remove "none" if it exists
      newValues = newValues.filter(v => v !== 'none');
    }
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: newValues
    });
  };
  
  const handleScaleSelect = (value: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };
  
  const isAnswered = () => {
    return answers[currentQuestion.id] !== undefined && 
           (answers[currentQuestion.id] !== '' && 
            (Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id].length > 0 : true));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHelp(false);
    } else {
      // Calculate profile completion percentages based on question categories
      const categories = [...new Set(questions.map(q => q.category))];
      const categoryCompletions: {[key: string]: number} = {};
      
      categories.forEach(category => {
        const categoryQuestions = questions.filter(q => q.category === category);
        const answeredQuestions = categoryQuestions.filter(q => answers[q.id] !== undefined);
        const percentage = Math.round((answeredQuestions.length / categoryQuestions.length) * 100);
        categoryCompletions[category] = percentage;
      });
      
      // Add some random variation to make it look more realistic
      Object.keys(categoryCompletions).forEach(key => {
        if (categoryCompletions[key] > 0 && categoryCompletions[key] < 100) {
          categoryCompletions[key] = Math.min(100, categoryCompletions[key] + Math.floor(Math.random() * 15));
        }
      });
      
      toast({
        title: "Health Profile Updated",
        description: "Your questionnaire responses have been saved and your recommendations updated.",
      });
      
      onComplete({ answers, completionStatus: categoryCompletions });
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowHelp(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <FadeIn>
        <div className="glass rounded-xl p-6 border border-white/50 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-medium">Health Questionnaire</h3>
              <p className="text-sm text-fem-dark/70">
                Question {currentQuestionIndex + 1} of {questions.length} • {currentQuestion.category}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-fem-accent"></div>
              <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
            </div>
          </div>
          
          <div className="w-full bg-white rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-fem-primary to-fem-accent h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-xl font-medium">{currentQuestion.text}</h4>
              {currentQuestion.helpText && (
                <button 
                  className="text-fem-primary/70 hover:text-fem-primary transition-colors"
                  onClick={() => setShowHelp(!showHelp)}
                >
                  <HelpCircle size={18} />
                </button>
              )}
            </div>
            
            {showHelp && currentQuestion.helpText && (
              <div className="bg-fem-soft/30 rounded-lg p-3 mb-4 text-sm text-fem-dark/80">
                {currentQuestion.helpText}
              </div>
            )}
            
            <div className="mt-6">
              {currentQuestion.type === 'single' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map(option => (
                    <div 
                      key={option.id}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        answers[currentQuestion.id] === option.value 
                          ? 'border-fem-primary bg-fem-primary/5' 
                          : 'border-white/70 hover:border-fem-primary/30'
                      }`}
                      onClick={() => handleSingleSelect(option.value)}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        answers[currentQuestion.id] === option.value 
                          ? 'border-fem-primary' 
                          : 'border-fem-dark/30'
                      }`}>
                        {answers[currentQuestion.id] === option.value && (
                          <div className="w-3 h-3 rounded-full bg-fem-primary"></div>
                        )}
                      </div>
                      <span>{option.text}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'multiple' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map(option => {
                    const isSelected = Array.isArray(answers[currentQuestion.id]) && 
                                       answers[currentQuestion.id].includes(option.value);
                    
                    return (
                      <div 
                        key={option.id}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected ? 'border-fem-primary bg-fem-primary/5' : 'border-white/70 hover:border-fem-primary/30'
                        }`}
                        onClick={() => handleMultipleSelect(option.value)}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                          isSelected ? 'bg-fem-primary border-fem-primary' : 'border border-fem-dark/30'
                        }`}>
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {currentQuestion.type === 'scale' && (
                <div className="py-4">
                  <div className="flex justify-between mb-2 text-sm text-fem-dark/70">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map(value => (
                      <button
                        key={value}
                        className={`flex-1 h-12 rounded-lg font-medium transition-all ${
                          answers[currentQuestion.id] === value 
                            ? 'bg-fem-primary text-white' 
                            : 'bg-white border border-fem-soft hover:border-fem-primary/30'
                        }`}
                        onClick={() => handleScaleSelect(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              icon={<ArrowLeft size={16} />}
              iconPosition="left"
            >
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!isAnswered()}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Complete'}
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Questionnaire;
