// src/components/modules/ComposeModal.tsx
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogActions, 
  Button, IconButton, Typography 
} from '@mui/material';
import { Close, AttachFile, FormatBold, FormatItalic, Image, DeleteOutline } from '@mui/icons-material';
import { useEmail } from '../../context/EmailContext';

const ComposeModal: React.FC = () => {
  const { isComposeOpen, closeCompose, sendEmail } = useEmail();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (!to || !subject) return; // Basic validation
    sendEmail(to, subject, body);
    // Reset form
    setTo('');
    setSubject('');
    setBody('');
  };

  return (
    <Dialog 
      open={isComposeOpen} 
      onClose={closeCompose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: { height: '80vh', borderRadius: '12px' }
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-slate-50">
        <Typography variant="h6" className="text-slate-700 font-semibold pl-2">New Message</Typography>
        <IconButton onClick={closeCompose} size="small">
          <Close fontSize="small" />
        </IconButton>
      </div>

      {/* Form Fields */}
      <DialogContent className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
           <span className="w-16 text-slate-500 font-medium text-sm">To</span>
           <input 
             className="flex-1 outline-none text-slate-800 text-sm" 
             placeholder="Recipients"
             value={to}
             onChange={(e) => setTo(e.target.value)}
             autoFocus
           />
           <span className="text-slate-400 text-xs cursor-pointer hover:text-blue-600">Cc / Bcc</span>
        </div>
        
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
           <span className="w-16 text-slate-500 font-medium text-sm">Subject</span>
           <input 
             className="flex-1 outline-none text-slate-800 text-sm font-medium" 
             placeholder="Add a subject"
             value={subject}
             onChange={(e) => setSubject(e.target.value)}
           />
        </div>

        {/* Editor Toolbar (Mock) */}
        <div className="flex gap-1 py-2 border-b border-slate-100">
            <IconButton size="small"><FormatBold fontSize="small" /></IconButton>
            <IconButton size="small"><FormatItalic fontSize="small" /></IconButton>
            <div className="w-px h-6 bg-slate-200 mx-2 self-center"></div>
            <IconButton size="small"><AttachFile fontSize="small" /></IconButton>
            <IconButton size="small"><Image fontSize="small" /></IconButton>
        </div>

        {/* Body */}
        <textarea 
          className="flex-1 resize-none outline-none text-slate-700 leading-relaxed p-2"
          placeholder="Type your message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </DialogContent>

      {/* Footer Actions */}
      <DialogActions className="p-4 border-t border-slate-100 bg-slate-50 justify-between">
         <div className="flex gap-2">
            <Button 
              variant="contained" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 normal-case font-semibold"
              onClick={handleSend}
            >
              Send
            </Button>
            <Button 
              className="text-slate-500 hover:bg-slate-200 normal-case"
              onClick={closeCompose}
            >
              Discard
            </Button>
         </div>
         <div className="flex gap-2 text-slate-400">
             <IconButton size="small"><DeleteOutline fontSize="small" /></IconButton>
         </div>
      </DialogActions>
    </Dialog>
  );
};

export default ComposeModal;