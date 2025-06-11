
import React from 'react';
import { ArrowRight, BookOpen, Star } from 'lucide-react';
import Button from '../Button';
import { Recommendation } from './types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  isExpanded,
  onToggleExpand
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-fem-primary';
    }
  };

  const IconComponent = recommendation.icon;

  return (
    <div 
      className={`glass rounded-xl border border-white/50 overflow-hidden transition-all duration-300 ${
        isExpanded ? 'shadow-md' : ''
      }`}
    >
      <div 
        className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer"
        onClick={() => onToggleExpand(recommendation.id)}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getPriorityColor(recommendation.priority)}`}>
          <IconComponent size={20} className="text-white" />
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-fem-soft/70">
              {recommendation.category}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white">
              {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
            </span>
          </div>
          <h3 className="text-lg font-medium">{recommendation.title}</h3>
          <p className="text-sm text-fem-dark/80 line-clamp-2">
            {recommendation.description}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <ArrowRight 
            size={20} 
            className={`text-fem-primary transition-transform ${
              isExpanded ? 'rotate-90' : ''
            }`} 
          />
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-5 pb-5 pt-0 border-t border-fem-soft/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-sm font-medium mb-2">Why this matters for you:</h4>
              <p className="text-sm text-fem-dark/80 mb-4">
                Based on your specific health cluster and individual profile data, this recommendation
                has been prioritized to address your unique health needs and potential risk factors.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Star size={16} className="text-amber-500" />
                <span className="text-xs font-medium">
                  87% of women with similar profiles benefit from this recommendation
                </span>
              </div>
            </div>
            
            <div className="col-span-1 bg-white rounded-lg p-4 border border-fem-soft/50">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-fem-primary" />
                Learn More
              </h4>
              <p className="text-xs text-fem-dark/80 mb-3">
                Explore resources related to this recommendation and take action.
              </p>
              <Button
                fullWidth
                size="sm"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                {recommendation.actionLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
