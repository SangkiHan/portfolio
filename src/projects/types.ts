import type { ReactNode } from 'react';

export interface Improvement {
  title: string;
  metric?: string;
  details: string[];
  diagram?: ReactNode;
  blogUrl?: string;
}

export interface ProjectMeta {
  title: string;
  description?: string;
  role: string;
  period: string;
  org?: string;
  type: 'personal' | 'work' | 'study';
  tech: string[];
  links?: { label: string; url: string; icon?: 'github' | 'appstore' }[];
}
