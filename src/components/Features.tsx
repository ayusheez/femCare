
import React from 'react';
import FadeIn from './FadeIn';
import { Brain, ChartLine, Clipboard, Clock, CreditCard, FileText, HeartPulse, LayoutGrid, SearchCheck, Settings, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: <HeartPulse className="w-6 h-6 text-fem-primary" />,
    title: "Health Pattern Recognition",
    description: "Identifies patterns in your health data that might go unnoticed with traditional approaches."
  },
  {
    icon: <Users className="w-6 h-6 text-fem-primary" />,
    title: "Demographic Clustering",
    description: "Groups users with similar health profiles to provide more relevant recommendations."
  },
  {
    icon: <SearchCheck className="w-6 h-6 text-fem-primary" />,
    title: "Personalized Screening",
    description: "Suggests screening tests based on your specific health risk factors and history."
  },
  {
    icon: <ChartLine className="w-6 h-6 text-fem-primary" />,
    title: "Trend Analysis",
    description: "Tracks changes in your health metrics over time to identify important shifts."
  },
  {
    icon: <Brain className="w-6 h-6 text-fem-primary" />,
    title: "Cognitive Health Integration",
    description: "Considers mental health alongside physical metrics for holistic recommendations."
  },
  {
    icon: <Clipboard className="w-6 h-6 text-fem-primary" />,
    title: "Preventive Recommendations",
    description: "Offers proactive suggestions to maintain optimal health based on your profile."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-fem-light relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-fem-accent/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-fem-primary/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Advanced Features for <span className="text-gradient">Women's Health</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-fem-dark/80">
              Our platform leverages cutting-edge clustering algorithms to provide truly personalized healthcare insights.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={150 + index * 50} className="h-full">
              <div className="glass rounded-xl p-6 h-full hover:shadow-md transition-all duration-300 border border-white/50">
                <div className="w-12 h-12 rounded-lg bg-fem-soft flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-fem-dark/80">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-20 glass rounded-xl p-8 border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-medium mb-4">Why Our Approach Matters</h3>
              <p className="text-sm text-fem-dark/80 mb-6">
                Traditional healthcare often follows a one-size-fits-all model that doesn't account for women's unique needs.
              </p>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <div className="min-w-8 w-8 h-8 rounded-full bg-fem-soft flex items-center justify-center">
                    <Settings size={16} className="text-fem-primary" />
                  </div>
                  <span className="text-sm font-medium">Precision Medicine</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-8 w-8 h-8 rounded-full bg-fem-soft flex items-center justify-center">
                    <Shield size={16} className="text-fem-primary" />
                  </div>
                  <span className="text-sm font-medium">Privacy Focused</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-8 w-8 h-8 rounded-full bg-fem-soft flex items-center justify-center">
                    <FileText size={16} className="text-fem-primary" />
                  </div>
                  <span className="text-sm font-medium">Evidence Based</span>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={100} className="col-span-1 md:col-span-2">
              <div className="h-full flex flex-col justify-center">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-fem-soft">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-fem-soft flex items-center justify-center">
                        <CreditCard size={20} className="text-fem-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Data-Driven Clustering</h4>
                      <p className="text-sm text-fem-dark/80 mb-3">
                        Our algorithms identify distinct health profiles among women, enabling truly personalized care recommendations.
                      </p>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-fem-light rounded-md p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock size={16} className="text-fem-primary" />
                            <span className="text-xs font-medium">Real-time Analysis</span>
                          </div>
                          <p className="text-xs text-fem-dark/70">
                            Continuous updates as new data becomes available
                          </p>
                        </div>
                        <div className="bg-fem-light rounded-md p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <LayoutGrid size={16} className="text-fem-primary" />
                            <span className="text-xs font-medium">Multiple Dimensions</span>
                          </div>
                          <p className="text-xs text-fem-dark/70">
                            Considers dozens of health factors simultaneously
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
