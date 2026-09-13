export type ToolCategoryId = 
  | 'business-ecommerce'
  | 'finance-tax'
  | 'real-estate-construction'
  | 'furniture-woodwork'
  | 'marketing-social'
  | 'freelance-agency'
  | 'urdu-content-text'
  | 'web-developer'
  | 'daily-utility-education'
  | 'documents-pdf-image';

export interface ToolCategory {
  id: ToolCategoryId;
  name: string;
  urduName: string;
  description: string;
  icon: string;
  color: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  urduTitle: string;
  category: ToolCategoryId;
  description: string;
  urduDescription: string;
  icon: string;
  tags: string[];
  searchKeywords: string[];
  popular?: boolean;
  featured?: boolean;
  interactiveType: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export interface TrackerPillar {
  id: string;
  title: string;
  urduTitle: string;
  description: string;
  icon: string;
  completed: boolean;
}

export interface TrackerDayState {
  date: string; // YYYY-MM-DD
  mainPriority: string;
  distractionWarning: string;
  winCondition: string;
  deepWorkHours: number;
  wastedHours: number;
  routineHours: number;
  pillars: { [pillarId: string]: boolean };
  reflectionLesson: string;
  tomorrowImprovement: string;
  score: number; // 0 to 100
}
