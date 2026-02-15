// src/context/EmailContext.tsx
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { Email } from '../types'; 
import { MOCK_EMAILS } from '../data/mockData';

export interface AppSettings {
  density: 'compact' | 'normal';
  theme: 'light' | 'dark';
  accentColor: 'blue' | 'purple' | 'orange' | 'green';
}

interface EmailContextType {
  currentFolder: string;
  selectedEmail: Email | null;
  filteredEmails: Email[];
  searchQuery: string;
  
  isComposeOpen: boolean;
  openCompose: () => void;
  closeCompose: () => void;
  sendEmail: (to: string, subject: string, body: string) => void;

  isSettingsOpen: boolean;
  toggleSettings: () => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;

  // Actions
  selectFolder: (folderId: string) => void;
  selectEmail: (emailId: string) => void;
  setSearchQuery: (query: string) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFolder, setCurrentFolder] = useState<string>('inbox'); // Default to Inbox
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS); // Moved to state to allow updates
  const [isComposeOpen, setComposeOpen] = useState(false);

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    density: 'normal',
    theme: 'light',
    accentColor: 'blue'
  });
  // --- Effect: Handle Dark Mode Class ---
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Actions
  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  // Derived state: Filter emails based on Folder AND Search
  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      const matchesFolder = email.folderId === currentFolder;
      const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            email.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [emails, currentFolder, searchQuery]);

  const sendEmail = (_to: string, subject: string, body: string) => {
    const newEmail: Email = {
      id: Date.now().toString(),
      folderId: 'sent', // automatically goes to sent
      sender: { id: '11', name: 'Me', email: 'me@domain.com', avatar: 'ME' },
      subject: subject,
      preview: body.substring(0, 50) + '...',
      body: body,
      timestamp: 'Just Now',
      isRead: true,
    };
    setEmails([newEmail, ...emails]); // Add to top of list
    setComposeOpen(false);
  };

  // Derived state: Find the full email object
  const selectedEmail = useMemo(() => {
    return emails.find(e => e.id === selectedEmailId) || null;
  }, [emails, selectedEmailId]);

  // Actions
  const selectFolder = (folderId: string) => {
    setCurrentFolder(folderId);
    setSelectedEmailId(null); // Deselect email when switching folders
  };

  const selectEmail = (emailId: string) => {
    setSelectedEmailId(emailId);
  };

  return (
    <EmailContext.Provider value={{
      currentFolder,
      selectedEmail,
      filteredEmails,
      searchQuery,
      // selectFolder: setCurrentFolder,
      // selectEmail: setSelectedEmailId,
      setSearchQuery,
      selectEmail,
      selectFolder,
      isComposeOpen,
      openCompose: () => setComposeOpen(true),
      closeCompose: () => setComposeOpen(false),
      sendEmail,
        isSettingsOpen,
        toggleSettings: () => setSettingsOpen(prev => !prev),
        settings,
        updateSettings
    }}>
      {children}
    </EmailContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};