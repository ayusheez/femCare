import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Cluster } from '@/components/results/types';
import ResultsHeader from '@/components/results/ResultsHeader';
import ClusterAnalysis from '@/components/results/ClusterAnalysis';
import ClusterSummary from '@/components/results/ClusterSummary';
import RecommendationsSection from '@/components/results/RecommendationsSection';
import ActionButtons from '@/components/results/ActionButtons';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [healthProfile, setHealthProfile] = useState<any>(null);
  const [userCluster, setUserCluster] = useState<number>(0);
  
  // Define GMM clusters
  const clusters: Cluster[] = [
    { meanX: 150, meanY: 150, weight: 0.3, color: '#6C8EE3', label: 'Preventive Focus' },
    { meanX: 350, meanY: 150, weight: 0.2, color: '#94A6F0', label: 'Family Planning' },
    { meanX: 250, meanY: 300, weight: 0.25, color: '#53629E', label: 'Holistic Health' },
    { meanX: 450, meanY: 350, weight: 0.15, color: '#8BAEFF', label: 'Active Lifestyle' },
    { meanX: 100, meanY: 400, weight: 0.1, color: '#4A5C99', label: 'Chronic Management' }
  ];
  
  useEffect(() => {
    // Load health profile data from session storage
    const profileData = sessionStorage.getItem('healthProfile');
    if (profileData) {
      try {
        const parsedData = JSON.parse(profileData);
        setHealthProfile(parsedData);
        
        // Determine user's cluster based on answers
        const answers = parsedData.answers;
        let clusterScore = [0, 0, 0, 0, 0]; // Scores for each cluster
        
        if (answers.age === '18-25' || answers.age === '26-35') {
          clusterScore[1] += 2; // Family Planning
        } else if (answers.age === '46-55' || answers.age === '55+') {
          clusterScore[0] += 2; // Preventive Focus
          clusterScore[4] += 1; // Chronic Management
        }
        
        if (answers.exercise === '3-4' || answers.exercise === '5+') {
          clusterScore[3] += 2; // Active Lifestyle
        }
        
        if (answers.sleep >= 4) {
          clusterScore[2] += 1; // Holistic Health
        }
        
        if (answers.conditions && answers.conditions.includes('pcos')) {
          clusterScore[4] += 2; // Chronic Management
        }
        
        if (answers.goals && answers.goals.includes('preventive')) {
          clusterScore[0] += 2; // Preventive Focus
        }
        
        if (answers.goals && answers.goals.includes('fertility')) {
          clusterScore[1] += 2; // Family Planning
        }
        
        if (answers.goals && answers.goals.includes('mental')) {
          clusterScore[2] += 2; // Holistic Health
        }
        
        // Determine the highest scoring cluster
        let maxScore = 0;
        let maxCluster = 0;
        
        clusterScore.forEach((score, index) => {
          if (score > maxScore) {
            maxScore = score;
            maxCluster = index;
          }
        });
        
        setUserCluster(maxCluster);
        const updatedProfile = {
          ...parsedData,
          userCluster: maxCluster
        };
        sessionStorage.setItem('healthProfile', JSON.stringify(updatedProfile));
      } catch (error) {
        console.error('Error parsing health profile data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load your health profile data. Please try again.",
        });
      }
    } else {
      // If no data, redirect back to journey start
      toast({
        variant: "destructive",
        title: "No health data found",
        description: "Please complete the health questionnaire first.",
      });
      navigate('/health-journey');
    }
  }, [navigate]);
  
  if (!healthProfile) {
    return (
      <div className="min-h-screen bg-fem-light flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-fem-primary border-t-transparent animate-spin mx-auto"></div>
          </div>
          <p className="text-fem-dark">Loading your health profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-fem-light">
      <div className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <ResultsHeader 
            title="Your Health Profile Results" 
            subtitle="Based on your responses, we've analyzed your health profile using our Gaussian Mixture Model"
          />
          
          <div className="max-w-4xl mx-auto mb-16">
            <ClusterAnalysis 
              canvasRef={canvasRef} 
              userCluster={userCluster} 
              clusters={clusters} 
            />
            
            <ClusterSummary 
              userCluster={userCluster} 
              clusters={clusters} 
              healthProfile={healthProfile} 
            />
            
            <RecommendationsSection profileData={healthProfile} />
            
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
