// src/components/layout/NavRail.tsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useEmail } from '../../context/EmailContext';
import { 
  Mail as MailIcon, 
  CalendarMonth as CalendarIcon, 
  People as PeopleIcon, 
  CheckCircle as TodoIcon,
  Settings as SettingsIcon,
  Create as CreateIcon
} from '@mui/icons-material';

const NavRail: React.FC = () => {
    const { openCompose } = useEmail();
  return (
    <div className="w-[48px] h-full flex flex-col items-center py-4 bg-slate-50 border-r border-slate-200 z-20">
      {/* Primary Action Button */}
      <div className="mb-6">
        <IconButton 
          onClick={openCompose}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-md w-10 h-10 rounded-xl transition-all"
        >
          <CreateIcon fontSize="small" />
        </IconButton>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <NavButton icon={<MailIcon />} label="Mail" active />
        <NavButton icon={<CalendarIcon />} label="Calendar" />
        <NavButton icon={<PeopleIcon />} label="People" />
        <NavButton icon={<TodoIcon />} label="To Do" />
      </div>
      
      <div className="mt-auto">
         <NavButton icon={<SettingsIcon />} label="Settings" />
      </div>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => (
  <Tooltip title={label} placement="right">
    <IconButton 
      className={`
        transition-all duration-200 
        ${active ? 'bg-blue-100 text-blue-600 rounded-lg' : 'text-slate-500 hover:bg-slate-200'}
      `}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

export default NavRail;