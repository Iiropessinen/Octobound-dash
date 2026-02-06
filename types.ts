// Added React import to fix 'Cannot find namespace React' error in TypeScript definitions
import React from 'react';

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  subItems?: string[];
}

export interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  leads: number;
  responseRate: number;
  conversionRate: number;
  change: number;
  history: { time: string; value: number }[];
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number;
}