
import { 
  Activity, 
  Heart, 
  HeartPulse, 
  ShieldCheck, 
  Tablet, 
  Target, 
  Calendar 
} from 'lucide-react';
import { Recommendation } from './types';

export const defaultRecommendations: Recommendation[] = [
  {
    id: 'rec1',
    category: 'Screening',
    title: 'Mammogram Screening',
    description: 'Based on your age and family history, we recommend scheduling a mammogram screening.',
    priority: 'high',
    icon: HeartPulse,
    actionLabel: 'Schedule Screening'
  },
  {
    id: 'rec2',
    category: 'Nutrition',
    title: 'Iron-Rich Diet Plan',
    description: 'Your health profile suggests you may benefit from increasing iron intake through diet.',
    priority: 'medium',
    icon: Heart,
    actionLabel: 'View Diet Plan'
  },
  {
    id: 'rec3',
    category: 'Activity',
    title: 'Low-Impact Exercise Program',
    description: 'Based on your joint health indicators, a low-impact exercise routine would be beneficial.',
    priority: 'medium',
    icon: Activity,
    actionLabel: 'Explore Exercises'
  },
  {
    id: 'rec4',
    category: 'Mental Health',
    title: 'Stress Reduction Techniques',
    description: 'Your stress indicators suggest implementing daily mindfulness practices.',
    priority: 'medium',
    icon: Target,
    actionLabel: 'Learn Techniques'
  },
  {
    id: 'rec5',
    category: 'Preventive',
    title: 'Bone Density Screening',
    description: 'Your profile indicates potential risk factors for osteoporosis.',
    priority: 'low',
    icon: ShieldCheck,
    actionLabel: 'Learn More'
  },
  {
    id: 'rec6',
    category: 'Supplement',
    title: 'Vitamin D Supplementation',
    description: 'Your location and lifestyle suggest potential vitamin D deficiency.',
    priority: 'low',
    icon: Tablet,
    actionLabel: 'View Options'
  }
];

export const categoryFilters = ['All', 'Screening', 'Nutrition', 'Activity', 'Mental Health', 'Preventive', 'Supplement'];
export const priorityFilters = ['All', 'High', 'Medium', 'Low'];

export const generatePersonalizedRecommendations = (answers: any): Recommendation[] => {
  let personalizedRecs = [...defaultRecommendations];
  
  if (answers.conditions && Array.isArray(answers.conditions)) {
    if (answers.conditions.includes('pcos')) {
      personalizedRecs.push({
        id: 'pcos-rec',
        category: 'Nutrition',
        title: 'PCOS Diet Plan',
        description: 'A customized nutrition plan to help manage PCOS symptoms and improve hormonal balance.',
        priority: 'high',
        icon: Heart,
        actionLabel: 'View PCOS Diet Plan'
      });
    }
    
    if (answers.conditions.includes('mental_health')) {
      personalizedRecs.push({
        id: 'mental-rec',
        category: 'Mental Health',
        title: 'Stress & Anxiety Management',
        description: 'Personalized techniques to help manage stress and anxiety based on your lifestyle.',
        priority: 'high',
        icon: Target,
        actionLabel: 'Explore Techniques'
      });
    }
  }
  
  if (answers.sleep) {
    if (answers.sleep <= 2) {
      personalizedRecs.push({
        id: 'sleep-rec',
        category: 'Lifestyle',
        title: 'Sleep Improvement Program',
        description: 'A 4-week program designed to improve your sleep quality through behavioral changes.',
        priority: 'high',
        icon: Activity,
        actionLabel: 'Start Program'
      });
    }
  }
  
  if (answers.menstrual === 'irregular') {
    personalizedRecs.push({
      id: 'cycle-rec',
      category: 'Reproductive Health',
      title: 'Cycle Tracking & Analysis',
      description: 'Track your menstrual cycle to identify patterns and get personalized insights.',
      priority: 'medium',
      icon: Calendar,
      actionLabel: 'Start Tracking'
    });
  }
  
  if (answers.age === '46-55' || answers.age === '55+') {
    personalizedRecs.push({
      id: 'age-screening',
      category: 'Screening',
      title: 'Comprehensive Health Screening',
      description: 'Based on your age bracket, we recommend these essential health screenings.',
      priority: 'high',
      icon: HeartPulse,
      actionLabel: 'View Recommended Screenings'
    });
  }
  
  if (answers.goals && Array.isArray(answers.goals)) {
    personalizedRecs = personalizedRecs.map(rec => {
      if (
        (answers.goals.includes('weight') && rec.category === 'Nutrition') ||
        (answers.goals.includes('fertility') && rec.category === 'Reproductive Health') ||
        (answers.goals.includes('mental') && rec.category === 'Mental Health') ||
        (answers.goals.includes('preventive') && rec.category === 'Screening')
      ) {
        return { ...rec, priority: 'high' };
      }
      return rec;
    });
  }
  
  const uniqueRecs = Array.from(new Set(personalizedRecs.map(rec => rec.id)))
    .map(id => personalizedRecs.find(rec => rec.id === id))
    .filter(rec => rec !== undefined) as Recommendation[];
  
  return uniqueRecs.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};
