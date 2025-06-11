
import React from 'react';
import FadeIn from '@/components/FadeIn';
import { ResultsHeaderProps } from './types';

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ title, subtitle }) => {
  return (
    <FadeIn>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-black dark:text-white">
          {title.split('Health Profile').map((part, index) => (
            index === 0 ? 
              <React.Fragment key={index}>
                {part}<span className="text-gradient">Health Profile</span>
              </React.Fragment> : 
              part
          ))}
        </h1>
        <p className="text-lg text-black dark:text-white/90">
          {subtitle}
        </p>
      </div>
    </FadeIn>
  );
};

export default ResultsHeader;
