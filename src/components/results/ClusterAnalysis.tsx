
import React from 'react';
import FadeIn from '@/components/FadeIn';
import { Layers, Info } from 'lucide-react';
import { GMMVisualizationProps } from './types';
import GMMVisualization from './GMMVisualization';

const ClusterAnalysis: React.FC<GMMVisualizationProps> = ({ 
  canvasRef, 
  userCluster, 
  clusters 
}) => {
  return (
    <FadeIn delay={100}>
      <div className="glass rounded-xl p-6 border border-white/50 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-fem-primary flex items-center justify-center">
            <Layers size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-medium text-black dark:text-white">Your Gaussian Mixture Model Analysis</h2>
        </div>
        
        <p className="text-black dark:text-white/90 mb-6">
          Our algorithm has placed you in the <strong className="text-fem-primary">
            {userCluster >= 0 && userCluster < clusters.length ? clusters[userCluster].label : 'Loading...'}
          </strong> health cluster based on your questionnaire responses.
        </p>
        
        <div className="bg-white rounded-xl p-4 border border-fem-soft/30 shadow-sm mb-6">
          <div className="flex items-start gap-2 mb-2">
            <Info size={18} className="text-fem-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-black">
              This visualization shows how your health profile fits within our data model of women's health patterns.
              Each cluster represents a distinct pattern of health needs and characteristics.
            </p>
          </div>
        </div>
        
        <GMMVisualization canvasRef={canvasRef} userCluster={userCluster} clusters={clusters} />
      </div>
    </FadeIn>
  );
};

export default ClusterAnalysis;
