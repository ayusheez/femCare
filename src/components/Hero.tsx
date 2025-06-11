
import React from 'react';
import FadeIn from './FadeIn';
import Button from './Button';
import { ChevronRight, Heart, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartJourney = () => {
    navigate('/login');
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-fem-accent/20 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-fem-primary/10 to-transparent opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={100}>
            <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-fem-soft border border-fem-primary/10 text-fem-secondary text-sm font-medium">
              <Sparkles size={16} className="mr-2" />
              <span>Personalized Women's Health</span>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              <span className="text-gradient">Data-Driven</span> Healthcare <br className="hidden md:block" />
              Made for <span className="relative">
                Women
                <span className="absolute bottom-1 left-0 w-full h-1 bg-fem-accent/30 rounded-full"></span>
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-lg md:text-xl text-fem-dark/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience healthcare recommendations uniquely tailored to your needs through 
              advanced clustering algorithms that understand women's health like never before.
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                icon={<ChevronRight size={18} />} 
                iconPosition="right"
                onClick={handleStartJourney}
              >
                Start Your Health Journey
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={500} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="glass rounded-xl p-5 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-fem-soft flex items-center justify-center mb-3 mx-auto">
                  <Heart size={20} className="text-fem-primary" />
                </div>
                <h3 className="text-sm font-medium mb-1">Personalized Care</h3>
                <p className="text-xs text-fem-dark/70">Recommendations tailored precisely to your health profile</p>
              </div>
              
              <div className="glass rounded-xl p-5 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-fem-soft flex items-center justify-center mb-3 mx-auto">
                  <Shield size={20} className="text-fem-primary" />
                </div>
                <h3 className="text-sm font-medium mb-1">Data Security</h3>
                <p className="text-xs text-fem-dark/70">Your health information is protected with advanced encryption</p>
              </div>
              
              <div className="glass rounded-xl p-5 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-fem-soft flex items-center justify-center mb-3 mx-auto">
                  <Sparkles size={20} className="text-fem-primary" />
                </div>
                <h3 className="text-sm font-medium mb-1">Advanced Analysis</h3>
                <p className="text-xs text-fem-dark/70">Powered by Hierarchical Clustering and Gaussian Models</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
