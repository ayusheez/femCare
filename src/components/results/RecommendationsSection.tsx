
import React from 'react';
import FadeIn from '@/components/FadeIn';
import Recommendations from '@/components/recommendations/Recommendations';

interface RecommendationsSectionProps {
  profileData: any;
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ profileData }) => {
  return (
    <>
      <FadeIn delay={300}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Your Personalized Recommendations</h2>
          <p className="text-fem-dark/80">
            Based on your health profile and cluster analysis, we recommend the following actions
          </p>
        </div>
      </FadeIn>
      
      <FadeIn delay={400}>
        <Recommendations profileData={profileData} />
      </FadeIn>
    </>
  );
};

export default RecommendationsSection;
