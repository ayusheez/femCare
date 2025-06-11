
import React, { useState } from 'react';
import FadeIn from './FadeIn';
import { Check, ChevronDown, Info } from 'lucide-react';
import Button from './Button';
import Questionnaire from './Questionnaire';

interface ProfileSectionProps {
  onProfileUpdate?: (data: any) => void;
}

const categories = [
  {
    name: "Personal Information",
    fields: ["Age", "Height", "Weight", "Ethnicity"]
  },
  {
    name: "Medical History",
    fields: ["Chronic Conditions", "Past Surgeries", "Family History", "Allergies"]
  },
  {
    name: "Lifestyle",
    fields: ["Exercise Frequency", "Diet Type", "Sleep Quality", "Stress Level"]
  },
  {
    name: "Reproductive Health",
    fields: ["Menstrual Cycle", "Pregnancy History", "Hormonal Treatment", "Menopause Status"]
  },
  {
    name: "Preventive Care",
    fields: ["Last Physical Exam", "Screenings", "Vaccinations", "Health Goals"]
  }
];

const ProfileSection: React.FC<ProfileSectionProps> = ({ onProfileUpdate }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Personal Information");
  const [completionStatus, setCompletionStatus] = useState<{[key: string]: number}>({
    "Personal Information": 10,
    "Medical History": 0,
    "Lifestyle": 0,
    "Reproductive Health": 0,
    "Preventive Care": 0
  });
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [questionnaireComplete, setQuestionnaireComplete] = useState(false);

  const totalCompletion = Object.values(completionStatus).reduce((sum, value) => sum + value, 0) / Object.values(completionStatus).length;

  const handleQuestionnaireComplete = (data: any) => {
    setCompletionStatus(data.completionStatus);
    setShowQuestionnaire(false);
    setQuestionnaireComplete(true);
    
    // Pass data up to parent component
    if (onProfileUpdate) {
      onProfileUpdate(data);
    }
  };

  const startQuestionnaire = () => {
    setShowQuestionnaire(true);
  };

  return (
    <section id="profile" className="py-20 bg-fem-light relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-radial from-fem-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-radial from-fem-accent/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Build Your <span className="text-gradient">Health Profile</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-fem-dark/80">
              The more information you provide, the more personalized your recommendations will be.
            </p>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto">
          <FadeIn delay={200}>
            <div className="mb-8 glass rounded-xl p-6 border border-white/50">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-medium mb-1">Your Health Profile</h3>
                  <p className="text-sm text-fem-dark/70">Complete your profile to get personalized recommendations</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-fem-accent"></div>
                  <span className="text-sm font-medium">30% Complete</span>
                </div>
              </div>

              <div className="w-full bg-white rounded-full h-2 mb-8">
                <div className="bg-gradient-to-r from-fem-primary to-fem-accent h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>

              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.name} className="rounded-lg border border-white/70 overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-fem-soft/50 transition-colors"
                      onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-fem-soft">
                          <div className="w-6 h-6 rounded-full bg-fem-soft flex items-center justify-center">
                            {completionStatus[category.name] === 100 ? (
                              <Check size={14} className="text-fem-primary" />
                            ) : (
                              <span className="text-xs font-medium text-fem-primary">{completionStatus[category.name]}%</span>
                            )}
                          </div>
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-fem-dark/50 transition-transform ${expandedCategory === category.name ? 'rotate-180' : ''}`} 
                      />
                    </div>
                    
                    {expandedCategory === category.name && (
                      <div className="p-4 bg-white border-t border-fem-soft/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.fields.map((field) => (
                            <div key={field} className="rounded-md border border-fem-soft/70 p-3 hover:border-fem-primary/30 transition-colors">
                              <label className="block text-sm font-medium text-fem-dark mb-1">{field}</label>
                              <input 
                                type="text"
                                className="w-full bg-white border border-fem-soft rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-fem-primary/30"
                                placeholder={`Enter your ${field.toLowerCase()}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button size="sm">
                            Save Information
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-5 border border-white/50 col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-medium">Data Privacy</h3>
                  <Info size={16} className="text-fem-primary/70" />
                </div>
                <p className="text-sm text-fem-dark/80 mb-4">
                  Your health information is encrypted and secure. We use advanced algorithms to analyze your data
                  without compromising your privacy.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-fem-dark/70 border border-fem-soft">
                    End-to-end encryption
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-fem-dark/70 border border-fem-soft">
                    HIPAA compliant
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-fem-dark/70 border border-fem-soft">
                    Private by design
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-xl p-5 border border-white/50">
                <h3 className="text-lg font-medium mb-3">Profile Impact</h3>
                <p className="text-sm text-fem-dark/80 mb-4">
                  A complete profile increases recommendation accuracy by up to 85%.
                </p>
                <Button variant="outline" fullWidth size="sm">
                  Learn More
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
