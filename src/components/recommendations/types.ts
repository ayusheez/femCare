
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: LucideIcon;
  actionLabel: string;
}

export interface RecommendationsProps {
  profileData?: any;
}
