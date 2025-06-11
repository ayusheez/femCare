
import React, { useState, useEffect } from 'react';
import FadeIn from '../FadeIn';
import HeaderSection from './HeaderSection';
import FilterSection from './FilterSection';
import RecommendationList from './RecommendationList';
import EmptyState from './EmptyState';
import { 
  defaultRecommendations, 
  categoryFilters, 
  priorityFilters, 
  generatePersonalizedRecommendations 
} from './recommendationData';
import { RecommendationsProps, Recommendation } from './types';

const Recommendations: React.FC<RecommendationsProps> = ({ profileData }) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [expandedRec, setExpandedRec] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(defaultRecommendations);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);

  useEffect(() => {
    if (profileData && profileData.answers) {
      setHasCompletedQuestionnaire(true);
      
      const personalizedRecs = generatePersonalizedRecommendations(profileData.answers);
      setRecommendations(personalizedRecs);
    }
  }, [profileData]);

  const filteredRecs = recommendations.filter(rec => {
    const categoryMatch = categoryFilter === 'All' || rec.category === categoryFilter;
    const priorityMatch = priorityFilter === 'All' || rec.priority === priorityFilter.toLowerCase();
    return categoryMatch && priorityMatch;
  });

  const handleResetFilters = () => {
    setCategoryFilter('All');
    setPriorityFilter('All');
  };

  const handleGoToQuestionnaire = () => {
    const profileSection = document.getElementById('profile');
    if (profileSection) {
      window.scrollTo({
        top: profileSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="recommendations" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Personalized <span className="text-gradient">Recommendations</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-fem-dark/80">
              {hasCompletedQuestionnaire 
                ? "Based on your health questionnaire, our algorithm suggests these personalized recommendations."
                : "Complete the health questionnaire to receive personalized recommendations tailored to your needs."}
            </p>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto">
          <FadeIn delay={150}>
            <HeaderSection hasCompletedQuestionnaire={hasCompletedQuestionnaire} />
          </FadeIn>

          {!hasCompletedQuestionnaire ? (
            <FadeIn delay={200}>
              <EmptyState 
                noProfile={true} 
                onResetFilters={handleResetFilters} 
                onGoToQuestionnaire={handleGoToQuestionnaire} 
              />
            </FadeIn>
          ) : (
            <>
              <FadeIn delay={200}>
                <FilterSection
                  categoryFilter={categoryFilter}
                  priorityFilter={priorityFilter}
                  setCategoryFilter={setCategoryFilter}
                  setPriorityFilter={setPriorityFilter}
                  categoryFilters={categoryFilters}
                  priorityFilters={priorityFilters}
                  onResetFilters={handleResetFilters}
                />
              </FadeIn>

              <FadeIn delay={300}>
                <RecommendationList
                  filteredRecs={filteredRecs}
                  expandedRec={expandedRec}
                  setExpandedRec={setExpandedRec}
                  handleResetFilters={handleResetFilters}
                />
              </FadeIn>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
