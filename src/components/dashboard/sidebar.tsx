
'use client';

import React, { useState } from 'react';
import { dashboardConfig } from '@/lib/dashboard-config';
import { icons } from '@/components/icons';

export function Sidebar({ isCollapsed, toggleCollapse }: { isCollapsed: boolean; toggleCollapse: () => void; }) {
  const [selected, setSelected] = useState(dashboardConfig.sidebar.sections.find(s => s.selected)?.id || 'today');

  const recentChats = [
    { id: '1', title: 'Brainstorm marketing ideas' },
    { id: '2', title: 'Write a Python script' },
    { id: '3', title: 'Summarize Q3 earnings report' },
  ];

  return (
    <div className={`bg-[var(--panel-color)] border-r border-[var(--border-color)] flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex-1 flex flex-col">
        <div className={`flex items-center space-x-2 text-xl font-bold mb-8 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className={`cursor-pointer group ${isCollapsed ? 'flex items-center justify-center' : 'inline-block'}`} onClick={toggleCollapse}>
            {icons['tri-icon']({ className: 'w-6 h-6 text-[var(--accent-color)] group-hover:text-opacity-80' })}
            {!isCollapsed && <span className="text-[var(--text-color)] ml-2">{dashboardConfig.sidebar.brand.label}</span>}
          </div>
        </div>

        <nav className="space-y-1 mb-6">
          {dashboardConfig.sidebar.sections.map(section => (
            <React.Fragment key={section.id}>
              <button
                className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${selected === section.id ? 'bg-[var(--accent-muted-color)] text-[var(--text-color)]' : 'text-[var(--muted-color)] hover:bg-[var(--border-color)] hover:text-[var(--text-color)]'} ${isCollapsed ? 'justify-center' : ''}`}
                onClick={() => setSelected(section.id)}
              >
                {icons[section.icon]({ className: `w-5 h-5 ${!isCollapsed ? 'mr-3' : ''}` })}
                {!isCollapsed && <span className="text-sm font-medium">{section.label}</span>}
              </button>
              {section.children && !isCollapsed && (
                <ul className="pl-6 space-y-1">
                  {section.children.map(child => (
                    <li key={child.id}>
                      <button
                        className={`w-full text-left flex items-center p-2 rounded-lg transition-colors duration-200 ${selected === child.id ? 'bg-[var(--accent-muted-color)] text-[var(--text-color)]' : 'text-[var(--muted-color)] hover:bg-[var(--border-color)] hover:text-[var(--text-color)]'}`}
                        onClick={() => setSelected(child.id)}
                      >
                        {icons[child.icon]({ className: 'w-4 h-4 mr-2' })}
                        <span className="text-sm">{child.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </nav>
        
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto w-full">
            <h2 className="text-lg text-[var(--text-color)] font-semibold mb-4">Recent Chats</h2>
            <div className="space-y-2">
              {recentChats.map(chat => (
                <button key={chat.id} className="w-full flex items-center p-3 rounded-lg hover:bg-[var(--border-color)] transition-colors duration-200">
                  {icons.chat({ className: "w-5 h-5 text-[var(--muted-color)] mr-3" })}
                  <span className="text-[var(--text-color)] text-sm truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[var(--border-color)]">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--accent-color)] text-[var(--text-color)] font-bold text-sm">
            {dashboardConfig.sidebar.footer.profile.avatar}
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <div className="text-[var(--text-color)] font-medium text-sm truncate">{dashboardConfig.sidebar.footer.profile.name}</div>
              <div className="text-xs text-[var(--muted-color)] truncate">{dashboardConfig.sidebar.footer.profile.plan}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
