// src/data/mockData.ts
import type{ Email } from '../types';

export const MOCK_EMAILS: Email[] = [
  // --- Inbox Emails ---
  {
    id: '1',
    folderId: 'inbox',
    sender: { id: '5', name: 'Alice Smith', email: 'alice@company.com', avatar: 'AS' },
    subject: 'Project Kickoff: Internship Redesign',
    preview: 'Hi everyone, excited to start this...',
    body: 'Hi everyone, <br/><br/>Excited to start this new project. The goal is to revamp the internship portal. <br/><br/>Best, Alice',
    timestamp: '10:42 AM',
    isRead: false,
  },
  {
    id: '2',
    folderId: 'inbox',
    sender: { id: '4', name: 'HR Department', email: 'hr@company.com', avatar: 'HR' },
    subject: 'Policy Update: Remote Work',
    preview: 'Please read the attached policy...',
    body: 'Dear Employees, <br/><br/>Attached is the updated remote work policy effective next month.',
    timestamp: 'Yesterday',
    isRead: true,
  },
  
  // --- Room: Internship Project Emails ---
  {
    id: '3',
    folderId: 'room-internship',
    sender: { id: '1', name: 'Dev Team', email: 'dev@company.com', avatar: 'DT' },
    subject: 'Frontend Architecture Decisions',
    preview: 'We decided to use React Context...',
    body: 'Team, <br/><br/>After the meeting, we have decided to stick with React Context for state management instead of Redux for now.',
    timestamp: '11:20 AM',
    isRead: false,
    tags: ['Technical', 'Urgent']
  },
  {
    id: '4',
    folderId: 'room-internship',
    sender: { id: '2', name: 'Sarah Designer', email: 'sarah@design.com', avatar: 'SD' },
    subject: 'New Figma Prototypes',
    preview: 'Check out the new dark mode...',
    body: 'Here are the links to the dark mode prototypes. Let me know what you think!',
    timestamp: 'Mon',
    isRead: true,
  },

  // --- Room: University Design ---
  {
    id: '5',
    folderId: 'room-uni',
    sender: { id: '3', name: 'Dr. Professor', email: 'prof@university.edu', avatar: 'DP' },
    subject: 'Assignment Deadline Extension',
    preview: 'Due to the holiday...',
    body: 'Class, the deadline has been extended by 2 days.',
    timestamp: 'Fri',
    isRead: true,
  }
];