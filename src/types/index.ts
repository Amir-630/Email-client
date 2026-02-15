// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Email {
  id: string;
  sender: User;
  subject: string;
  preview: string;
  body: string; // HTML content
  timestamp: string;
  isRead: boolean;
  folderId: string;
  tags?: string[];
}

export interface Room {
  id: string;
  name: string;
  type: 'project' | 'social' | 'announcement';
  members: User[];
  unreadCount: number;
}