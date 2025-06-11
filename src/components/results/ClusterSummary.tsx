
import React from 'react';
import FadeIn from '@/components/FadeIn';
import Button from '@/components/Button';
import { Users, Heart, Activity } from 'lucide-react';
import { ClusterSummaryProps } from './types';

const ClusterSummary: React.FC<ClusterSummaryProps> = ({ 
  userCluster, 
  clusters,
  healthProfile
}) => {
  return (
    <FadeIn delay={200}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass rounded-xl p-5 border border-white/50 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-full bg-fem-soft flex items-center justify-center mb-3">
            <Users size={20} className="text-fem-primary" />
          </div>
          <h3 className="text-base font-medium mb-1 text-black dark:text-white">Your Health Cluster</h3>
          <p className="text-sm text-black dark:text-white/90 mb-4">
            {userCluster >= 0 && userCluster < clusters.length ? clusters[userCluster].label : 'Loading...'}
          </p>
          <div className="h-1 w-full bg-white rounded-full overflow-hidden">
            <div 
              className="h-full bg-fem-primary rounded-full" 
              style={{ width: '85%' }}
            ></div>
          </div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">85% match to this profile</p>
        </div>
        
        <div className="glass rounded-xl p-5 border border-white/50 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-full bg-fem-soft flex items-center justify-center mb-3">
            <Heart size={20} className="text-fem-primary" />
          </div>
          <h3 className="text-base font-medium mb-1 text-black dark:text-white">Health Score</h3>
          <p className="text-sm text-black dark:text-white/90 mb-4">Your overall health assessment</p>
          <div className="h-1 w-full bg-white rounded-full overflow-hidden">
            <div 
              className="h-full bg-fem-primary rounded-full" 
              style={{ width: '72%' }}
            ></div>
          </div>
          <p className="text-xs text-black/60 dark:text-white/60 mt-1">72/100</p>
        </div>
        
        <div className="glass rounded-xl p-5 border border-white/50 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-full bg-fem-soft flex items-center justify-center mb-3">
            <Activity size={20} className="text-fem-primary" />
          </div>
          <h3 className="text-base font-medium mb-1 text-black dark:text-white">Primary Focus</h3>
          <p className="text-sm text-black dark:text-white/90 mb-4">Your key health priority</p>
          <Button size="sm" fullWidth variant="outline">
            {healthProfile.answers.goals && healthProfile.answers.goals.length > 0 
              ? healthProfile.answers.goals[0].charAt(0).toUpperCase() + healthProfile.answers.goals[0].slice(1) 
              : 'Preventive Care'}
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};

export default ClusterSummary;
