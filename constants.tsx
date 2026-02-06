
import React from 'react';
import { 
  LayoutDashboard, 
  Phone, 
  Mail, 
  Linkedin, 
  Zap, 
  Settings 
} from 'lucide-react';
import { NavItem, CampaignData } from './types';

export const NAV_ITEMS: { section: string; items: NavItem[] }[] = [
  {
    section: 'Yleiskatsaus',
    items: [
      { label: 'Ohjauspaneeli', icon: <LayoutDashboard size={20} />, path: 'dashboard' }
    ]
  },
  {
    section: 'Älykäs haku',
    items: [
      { label: 'AI-Automaatio', icon: <Zap size={20} />, path: 'automation' }
    ]
  },
  {
    section: 'Kampanjat',
    items: [
      { label: 'Soitot', icon: <Phone size={20} />, path: 'calls' },
      { label: 'Sähköpostit', icon: <Mail size={20} />, path: 'emails' },
      { label: 'LinkedIn', icon: <Linkedin size={20} />, path: 'linkedin' }
    ]
  },
  {
    section: 'Tili',
    items: [
      { label: 'Asetukset', icon: <Settings size={20} />, path: 'settings', badge: 0 }
    ]
  }
];

export const MOCK_CAMPAIGNS: CampaignData[] = [];
