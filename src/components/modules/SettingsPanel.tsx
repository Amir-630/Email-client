// src/components/modules/SettingsPanel.tsx
import React from 'react';
import { 
  Drawer, Typography, Divider, IconButton 
} from '@mui/material';
import { Close, DarkMode, LightMode, FormatAlignJustify, FormatAlignLeft } from '@mui/icons-material';
import { useEmail } from '../../context/EmailContext';

const SettingsPanel: React.FC = () => {
  const { isSettingsOpen, toggleSettings, settings, updateSettings } = useEmail();

  return (
    <Drawer
      anchor="right"
      open={isSettingsOpen}
      onClose={toggleSettings}
      PaperProps={{
        sx: { width: 320, padding: 0, backgroundColor: '#f8fafc' }
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <Typography variant="h6" className="font-bold text-slate-700">Settings</Typography>
        <IconButton onClick={toggleSettings}><Close /></IconButton>
      </div>

      <div className="p-5 flex flex-col gap-8 overflow-y-auto">
        
        {/* Section 1: Themes */}
        <div>
           <Typography variant="caption" className="uppercase font-bold text-slate-400 mb-3 block">Theme</Typography>
           <div className="grid grid-cols-2 gap-3">
              {/* Light Option */}
              <div 
                onClick={() => updateSettings({ theme: 'light' })}
                className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col items-center gap-2 transition-all ${settings.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'}`}
              >
                 <LightMode className={settings.theme === 'light' ? 'text-blue-500' : 'text-slate-400'} />
                 <span className="text-sm font-medium text-slate-700">Light</span>
              </div>

              {/* Dark Option */}
              <div 
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`cursor-pointer border-2 rounded-xl p-3 flex flex-col items-center gap-2 transition-all ${settings.theme === 'dark' ? 'border-blue-500 bg-slate-800' : 'border-slate-200 bg-slate-900 hover:border-slate-600'}`}
              >
                 <DarkMode className={settings.theme === 'dark' ? 'text-blue-400' : 'text-slate-500'} />
                 <span className="text-sm font-medium text-slate-200">Dark</span>
              </div>
           </div>
        </div>

        <Divider />

        {/* Section 2: Density (This will affect the MailList!) */}
        <div>
           <Typography variant="caption" className="uppercase font-bold text-slate-400 mb-3 block">Display Density</Typography>
           
           <div className="flex flex-col gap-2">
             {/* Normal */}
             <div 
               onClick={() => updateSettings({ density: 'normal' })}
               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all ${settings.density === 'normal' ? 'bg-white border-blue-500 shadow-sm' : 'border-transparent hover:bg-white'}`}
             >
                <div className="p-1 bg-slate-100 rounded"><FormatAlignLeft fontSize="small"/></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-700">Cozy</p>
                  <p className="text-xs text-slate-400">More spacing, easier to scan</p>
                </div>
                {settings.density === 'normal' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
             </div>

             {/* Compact */}
             <div 
               onClick={() => updateSettings({ density: 'compact' })}
               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all ${settings.density === 'compact' ? 'bg-white border-blue-500 shadow-sm' : 'border-transparent hover:bg-white'}`}
             >
                <div className="p-1 bg-slate-100 rounded"><FormatAlignJustify fontSize="small"/></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-700">Compact</p>
                  <p className="text-xs text-slate-400">See more items at once</p>
                </div>
                {settings.density === 'compact' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
             </div>
           </div>
        </div>

        <Divider />

        {/* Section 3: Brand Colors */}
        <div>
           <Typography variant="caption" className="uppercase font-bold text-slate-400 mb-3 block">Accent Color</Typography>
           <div className="flex gap-4">
              {(['blue', 'purple', 'orange', 'green'] as const).map((color) => (
                <div 
                  key={color}
                  onClick={() => updateSettings({ accentColor: color })}
                  className={`
                    w-10 h-10 rounded-full cursor-pointer border-4 flex items-center justify-center transition-all
                    ${settings.accentColor === color ? 'border-slate-300 scale-110' : 'border-transparent'}
                  `}
                  style={{ backgroundColor: `var(--color-${color})` }} // We'll map these in CSS or classes
                >
                   {/* Tailwind Trick: Dynamic classes are tricky, using inline style for color demo or explicit map */}
                   <div className={`w-full h-full rounded-full ${color === 'blue' ? 'bg-blue-600' : color === 'purple' ? 'bg-purple-600' : color === 'orange' ? 'bg-orange-500' : 'bg-green-600'}`}></div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </Drawer>
  );
};

export default SettingsPanel;