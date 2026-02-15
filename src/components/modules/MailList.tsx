// src/components/modules/MailList.tsx
import React from 'react';
import { Typography, Avatar, Chip } from '@mui/material';
import { useEmail } from '../../context/EmailContext';

const MailList: React.FC = () => {
  const { filteredEmails, selectEmail, selectedEmail, settings } = useEmail();

  // DYNAMIC STYLES BASED ON SETTINGS
  const isCompact = settings.density === 'compact';
  
  // Define styles based on state
  const rowPadding = isCompact ? 'p-1.5' : 'p-4';
  const titleSize = isCompact ? 'text-xs' : 'text-sm';
  //const hidePreview = isCompact; // Optional: hide preview text in compact mode?

  return (
    <div className="w-[350px] h-full bg-white flex flex-col border-r border-slate-200">
      
      {/* Header */}
      <div className="p-3 border-b border-slate-100">
        <Typography variant="h6" className="font-bold text-slate-800">
           {/* Dynamic Header could go here based on folder name */}
           Messages
        </Typography>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.length === 0 ? (
           <div className="p-8 text-center text-slate-400">
              <Typography variant="body2">No emails in this folder.</Typography>
           </div>
        ) : (
          filteredEmails.map((email) => (
            <div 
              key={email.id} 
              onClick={() => selectEmail(email.id)}
              className={`
                ${rowPadding} border-b border-slate-50 cursor-pointer transition-all
                ${selectedEmail?.id === email.id ? 'bg-blue-50 border-l-[4px] border-l-blue-600' : 'hover:bg-slate-50 border-l-[4px] border-l-transparent'}
              `}
            >
                <div className="flex justify-between items-start mb-0.5">
                    <div className="flex items-center gap-2">
                        {/* Hide Avatar in Compact Mode to save space? Let's keep it but make it smaller */}
                        <Avatar sx={{ width: isCompact ? 20 : 32, height: isCompact ? 20 : 32, fontSize: 10 }}>
                          {email.sender.avatar}
                        </Avatar>
                        <Typography variant="subtitle2" className={`font-bold ${titleSize} text-slate-800`}>
                           {email.sender.name}
                        </Typography>
                    </div>
                    <Typography variant="caption" className="text-slate-400 text-xs">{email.timestamp}</Typography>
                </div>
                
                <Typography variant="body2" className={`${titleSize} font-medium text-blue-700 truncate`}>
                    {email.subject}
                </Typography>
                
                {/* Conditionally show preview based on density */}
                {!isCompact && (
                  <Typography variant="caption" className="text-slate-500 line-clamp-2 mt-1">
                      {email.preview}
                  </Typography>
                )}

                {/* Show tags if they exist */}
                {email.tags && (
                  <div className="mt-2 flex gap-1">
                    {email.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" className="h-5 text-[10px] bg-slate-100" />
                    ))}
                  </div>
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MailList;