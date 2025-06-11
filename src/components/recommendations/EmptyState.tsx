
import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from '../Button';

interface EmptyStateProps {
  onResetFilters: () => void;
  noProfile?: boolean;
  onGoToQuestionnaire?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  onResetFilters, 
  noProfile = false,
  onGoToQuestionnaire 
}) => {
  if (noProfile) {
    return (
      <div className="glass rounded-xl p-8 border border-white/50 text-center mb-8">
        <AlertCircle size={40} className="text-fem-primary/40 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Complete Your Health Profile</h3>
        <p className="text-sm text-fem-dark/70 mb-4">
          To receive personalized recommendations, please complete the health questionnaire in the Profile section.
        </p>
        <Button onClick={onGoToQuestionnaire}>
          Go to Questionnaire
        </Button>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-8 border border-white/50 text-center">
      <AlertCircle size={40} className="text-fem-primary/40 mx-auto mb-4" />
      <h3 className="text-xl font-medium mb-2">No matching recommendations</h3>
      <p className="text-sm text-fem-dark/70 mb-4">
        Try changing your filters or complete more of your health profile.
      </p>
      <Button
        variant="outline"
        className="mx-auto"
        onClick={onResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default EmptyState;
