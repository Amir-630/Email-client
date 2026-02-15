// src/components/layout/FolderPane.tsx
import React, { useState } from 'react';
import { 
  List, ListItemButton, ListItemIcon, ListItemText, Collapse 
} from '@mui/material';
import { 
  Inbox, Send, ExpandLess, ExpandMore, Tag 
} from '@mui/icons-material';
import { useEmail } from '../../context/EmailContext'; // Import hook

const FolderPane: React.FC = () => {
  const { currentFolder, selectFolder } = useEmail(); // Use context
  const [roomsOpen, setRoomsOpen] = useState(true);

  // Helper to check active state
  const isActive = (id: string) => currentFolder === id;

  return (
    <div className="w-[240px] h-full bg-[#F3F4F6] border-r border-slate-200 overflow-y-auto py-2">
      
      {/* Inbox */}
      <ListItemButton 
        selected={isActive('inbox')}
        onClick={() => selectFolder('inbox')}
        className="mb-1 !rounded-r-full"
        sx={{ '&.Mui-selected': { bgcolor: '#DBEAFE', color: '#1E40AF' } }}
      >
        <ListItemIcon className="min-w-[36px]"><Inbox fontSize="small" /></ListItemIcon>
        <ListItemText primary="Inbox" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
      </ListItemButton>

      {/* Sent */}
      <ListItemButton 
        selected={isActive('sent')}
        onClick={() => selectFolder('sent')}
        className="mb-1 !rounded-r-full"
      >
        <ListItemIcon className="min-w-[36px]"><Send fontSize="small" /></ListItemIcon>
        <ListItemText primary="Sent Items" primaryTypographyProps={{ fontSize: 14 }} />
      </ListItemButton>

      {/* --- Team Rooms --- */}
      <div className="mt-4">
        <ListItemButton onClick={() => setRoomsOpen(!roomsOpen)} className="!py-1">
          <ListItemIcon className="min-w-[32px]">
            {roomsOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="Team Rooms" primaryTypographyProps={{ fontSize: 12, fontWeight: 'bold', color: '#64748B' }} />
        </ListItemButton>
        
        <Collapse in={roomsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <RoomItem 
              id="room-internship" 
              name="Internship Project" 
              color="text-green-600" 
              onClick={() => selectFolder('room-internship')}
              active={isActive('room-internship')}
            />
            <RoomItem 
              id="room-uni" 
              name="University Design" 
              color="text-purple-600" 
              onClick={() => selectFolder('room-uni')}
              active={isActive('room-uni')}
            />
          </List>
        </Collapse>
      </div>
    </div>
  );
};

const RoomItem: React.FC<{ id: string, name: string, color: string, active: boolean, onClick: () => void }> = ({ name, color, active, onClick }) => (
  <ListItemButton 
    onClick={onClick}
    className={`pl-8 !py-1 !rounded-r-full ${active ? 'bg-white shadow-sm border-l-4 border-blue-500' : ''}`}
  >
    <ListItemIcon className={`min-w-[24px] ${color}`}>
      <Tag style={{ fontSize: 16 }} />
    </ListItemIcon>
    <ListItemText 
      primary={name} 
      primaryTypographyProps={{ fontSize: 13, className: active ? 'font-semibold text-slate-800' : 'text-slate-600' }} 
    />
  </ListItemButton>
);

export default FolderPane;