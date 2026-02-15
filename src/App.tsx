// src/App.tsx
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  InputBase, 
  Avatar, 
  IconButton, 
  Badge,
  Box
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Notifications as NotificationsIcon, 
  HelpOutline as HelpIcon, 
  Apps as AppsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

// --- Context Provider ---
import { EmailProvider, useEmail } from './context/EmailContext';

// --- Layout Modules ---
import NavRail from './components/layout/NavRail';
import FolderPane from './components/layout/FolderPane';
import MailList from './components/modules/MailList';
import ReadingPane from './components/modules/ReadingPane';
import ComposeModal from './components/modules/ComposeModal';
import SettingsPanel from './components/modules/SettingsPanel';

/**
 * Main Application Layout
 * This component assembles the 4-column layout and wraps it in the State Provider.
 */
const OutlookLayout: React.FC = () => {
  const { toggleSettings, isSettingsOpen } = useEmail();
  // We can use the context here if we need global state in the header
  // const { setSearchQuery } = useEmail(); 
  
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50 font-sans">
      
      {/* 1. Global Header (Outlook Brand Bar) */}
      <AppBar position="static" elevation={0} className="bg-[#0078D4] text-white z-50 shadow-md">
        <Toolbar variant="dense" className="min-h-[48px] justify-between pl-2 pr-4">
            
            {/* Left: App Launcher & Branding */}
            <div className="flex items-center gap-3">
                <IconButton className="text-white hover:bg-white/10 rounded-none p-2">
                   <AppsIcon />
                </IconButton>
                <Typography variant="h6" className="font-semibold tracking-tight text-[16px]">
                  NanoVoltz Mail
                </Typography>
            </div>

            {/* Center: Global Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="bg-[#c3d9ef] text-[#005a9e] hover:bg-white hover:text-slate-700 transition-colors rounded-md px-3 py-1.5 flex items-center w-full group focus-within:bg-white focus-within:shadow-md">
                  <SearchIcon fontSize="small" className="mr-3 opacity-70 group-hover:opacity-100" />
                  <InputBase 
                    placeholder="Search" 
                    className="w-full text-sm font-medium placeholder-[#004578] group-hover:placeholder-slate-500 focus:placeholder-slate-400"
                    sx={{ 
                      '& .MuiInputBase-input': { p: 0 } 
                    }}
                    // Connect this to context if you want real-time search filtering:
                    // onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center gap-1">
                <IconButton className="text-white hover:bg-white/10" size="small">
                    <HelpIcon fontSize="small" />
                </IconButton>
                <IconButton className="text-white hover:bg-white/10" size="small">
                    <SettingsIcon fontSize="small" />
                </IconButton>
                <IconButton className="text-white hover:bg-white/10" size="small">
                    <Badge badgeContent={2} color="error" variant="dot">
                       <NotificationsIcon fontSize="small" />
                    </Badge>
                </IconButton>
                {/* SETTINGS TRIGGER */}
                <IconButton 
                   onClick={toggleSettings} // <--- Action
                   className={`text-white hover:bg-white/10 transition-transform duration-500 ${isSettingsOpen ? 'rotate-90' : ''}`} 
                   size="small"
                >
                    <SettingsIcon fontSize="small" />
                </IconButton>
                <Box ml={1}>
                  <Avatar 
                    sx={{ width: 32, height: 32, bgcolor: 'orange', fontSize: 14 }} 
                    className="cursor-pointer border border-white/20 hover:border-white transition"
                  >
                    ME
                  </Avatar>
                </Box>
            </div>
        </Toolbar>
      </AppBar>

      {/* 2. Main Workspace (Flex Row) */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* A. Navigation Rail (Leftmost - Mail, Cal, People) */}
        <NavRail />

        {/* B. Folder Pane (Tree - Inbox, Sent, Rooms) */}
        <FolderPane />

        {/* C. Mail List (Middle - List of emails) */}
        <MailList />

        {/* D. Reading Pane (Right - Email Content) */}
        <ReadingPane />

      </div>
      {/* 3. Compose Modal (Overlay) */}
      <ComposeModal />
      {/* 4. Settings Panel (Overlay) */}
      <SettingsPanel />
    </div>
  );
};

// --- Entry Point ---
const App: React.FC = () => {
  return (
    // Wrap the layout in the Context Provider so all children can access data
    <EmailProvider>
       <OutlookLayout />
    </EmailProvider>
  );
};

export default App;