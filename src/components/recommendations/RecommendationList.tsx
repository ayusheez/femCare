
import React from 'react';
import RecommendationCard from './RecommendationCard';
import EmptyState from './EmptyState';
import { Recommendation } from './types';

interface RecommendationListProps {
  filteredRecs: Recommendation[];
  expandedRec: string | null;
  setExpandedRec: (id: string | null) => void;
  handleResetFilters: () => void;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  filteredRecs,
  expandedRec,
  setExpandedRec,
  handleResetFilters
}) => {
  const handleToggleExpand = (id: string) => {
    setExpandedRec(expandedRec === id ? null : id);
  };

  if (filteredRecs.length === 0) {
    return <EmptyState onResetFilters={handleResetFilters} />;
  }

  return (
    <div className="space-y-4">
      {filteredRecs.map(rec => (
        <RecommendationCard
          key={rec.id}
          recommendation={rec}
          isExpanded={expandedRec === rec.id}
          onToggleExpand={handleToggleExpand}
        />
      ))}
    </div>
  );
};

export default RecommendationList;
