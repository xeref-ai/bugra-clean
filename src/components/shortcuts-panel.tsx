
'use client';

import React from 'react';

const shortcuts = [
    { command: 'Create New', key: 'Q' },
    { command: 'Edit User Context', key: 'S' },
    { command: 'Search', key: 'F' },
    { command: 'Go to next view', key: 'V' },
    { command: 'Trigger Voice Input', key: 'T' },
    { command: 'See completed tasks', key: 'C' },
    { command: 'Toggle Sidebar', keys: ['Ctrl', 'B'] },
    { command: 'Toggle Agent/Chat Mode', keys: ['Ctrl', 'I/L'] },
];

const agents = [
    { name: 'Xeref Agent', description: 'The main agent you interact with.' },
    { name: 'Background Agent', description: 'Works autonomously on your tasks.' },
    { name: 'TaskListAgent', description: 'Manages your tasks.' },
    { name: 'NoteListAgent', description: 'Manages your notes.' },
    { name: 'ReminderAgent', description: 'Manages recurring reminders.' },
    { name: 'IdeaListAgent', description: 'Handles your ideas.' },
    { name: 'ProjectAgent', description: 'Organizes projects.' },
    { name: 'WebSearchAgent', description: 'Conducts web research for you.' },
];

const KeyDisplay = ({ children }: { children: React.ReactNode }) => (
    <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-300 bg-[#3a3d41] border border-gray-600 rounded-md">
      {children}
    </kbd>
);

export const ShortcutsPanel = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 text-gray-200">
            {/* Left Column: Keyboard Shortcuts */}
            <div className="p-8 border-r-0 md:border-r border-b md:border-b-0 border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-6">Keyboard Shortcuts</h2>
                <ul className="space-y-4">
                    {shortcuts.map((shortcut, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                            <span>{shortcut.command}</span>
                            <div className="flex items-center space-x-1">
                                {shortcut.key ? (
                                    <KeyDisplay>{shortcut.key}</KeyDisplay>
                                ) : shortcut.keys?.map((k, i) => (
                                    <React.Fragment key={i}>
                                        <KeyDisplay>{k}</KeyDisplay>
                                        {i < shortcut.keys!.length - 1 && <span className="text-gray-500">+</span>}
                                    </React.Fragment>
                                ))
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Column: Available AI Agents */}
            <div className="p-8">
                <h2 className="text-lg font-semibold text-white mb-6">Available AI Agents</h2>
                <ul className="space-y-5">
                    {agents.map((agent, index) => (
                        <li key={index}>
                            <p className="font-semibold text-sm text-white">{agent.name}</p>
                            <p className="text-sm text-gray-400">{agent.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
