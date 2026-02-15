// src/components/modules/ReadingPane.tsx
import React from 'react';
import { Avatar, Button, Typography } from '@mui/material';
import { Reply, MoreVert } from '@mui/icons-material';
import { useEmail } from '../../context/EmailContext';

const ReadingPane: React.FC = () => {
  const { selectedEmail } = useEmail();

  if (!selectedEmail) {
    return (
      <div className="flex-1 h-full bg-slate-50 flex items-center justify-center">
        <div className="text-center opacity-50">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/234/234061.png" 
            alt="No Selection" 
            className="w-24 h-24 mx-auto mb-4 grayscale"
          />
          <Typography variant="h6">Select an item to read</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full bg-white flex flex-col relative animate-fade-in">
      {/* Toolbar */}
      <div className="h-12 border-b border-slate-200 flex items-center justify-between px-4 bg-white">
         <div className="flex gap-2">
             <Button startIcon={<Reply fontSize="small"/>} size="small" variant="outlined" className="!text-slate-600 !border-slate-300 !normal-case">Reply</Button>
         </div>
         <MoreVert fontSize="small" className="text-slate-400 cursor-pointer" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
          <Typography variant="h5" className="font-semibold text-slate-800 mb-6">{selectedEmail.subject}</Typography>
          
          <div className="flex items-center gap-4 mb-8">
              <Avatar className="w-12 h-12 bg-blue-600">{selectedEmail.sender.avatar}</Avatar>
              <div>
                  <Typography variant="subtitle2" className="text-slate-900 font-bold text-lg">{selectedEmail.sender.name}</Typography>
                  <Typography variant="caption" className="text-slate-500">{selectedEmail.sender.email}</Typography>
              </div>
              <div className="ml-auto text-right">
                <Typography variant="caption" className="text-slate-400 block">{selectedEmail.timestamp}</Typography>
              </div>
          </div>

          <div 
            className="text-slate-700 leading-relaxed text-sm"
            dangerouslySetInnerHTML={{ __html: selectedEmail.body }} 
          />
      </div>
    </div>
  );
};

export default ReadingPane;