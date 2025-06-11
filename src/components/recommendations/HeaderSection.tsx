
import React from 'react';
import { AlertCircle, Calendar, FileText } from 'lucide-react';
import Button from '../Button';

interface HeaderSectionProps {
  hasCompletedQuestionnaire: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ hasCompletedQuestionnaire }) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle size={18} className="text-fem-primary" />
          <h3 className="text-lg font-medium">Your Health Action Plan</h3>
        </div>
        <p className="text-sm text-fem-dark/70">
          Recommendations are updated as your profile changes
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          icon={<Calendar size={16} />}
          iconPosition="left"
        >
          Calendar View
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          icon={<FileText size={16} />}
          iconPosition="left"
        >
          Export Plan
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
