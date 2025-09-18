
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, ChevronDown, FileText, Plus, Repeat, Calendar } from 'lucide-react';

const timelineData = [
    {
        id: 'upcoming',
        title: 'Upcoming',
        isCollapsible: true,
        notes: []
    },
    {
        id: 'today',
        title: 'Today',
        project: 'xeref.ai',
        noteCount: 1,
        notes: [
            { id: 'note-today', text: 'this is a sample note for today' }
        ]
    },
    {
        id: '2025-04-21',
        title: 'April 21, 2025',
        notes: [
            { id: 'note1', text: 'Xeref.ai' },
            { id: 'note2', text: "You can use the following CURL command to fetch ideas: curl -X GET 'https://www.bugrakarsli.com/ideas' -H 'Authorization: Bearer your_token'" },
        ]
    },
    {
        id: '2025-04-19',
        title: 'April 19, 2025',
        notes: [
            { id: 'note3', text: 'Welcome to Notes! Every time you create a new Item, our AI Agent carefully analyses the item and decides whether it should be a Note, or a Task.' },
        ]
    },
    {
        id: '2024-04-19',
        title: 'April 19, 2024',
        notes: [
             { id: 'note4', text: 'Xeref is born.' }
        ]
    },
    {
        id: '2009-01-03',
        title: 'January 3, 2009',
        notes: [
            { id: 'note5', text: 'Satoshi creates Bitcoin.' }
        ]
    },
    {
        id: '1950-10-01',
        title: 'October 1, 1950',
        notes: [
            { id: 'note6', text: 'Alan Turing invents the Turing Test' }
        ]
    }
];

const isUrl = (text: string) => {
    try {
        new URL(text);
        return true;
    } catch (_) {
        return text.startsWith('curl');
    }
};

export const NotesView = ({onClose}: {onClose: () => void}) => {
    return (
      <div className="bg-[#121016] text-gray-300 flex-shrink-0 flex flex-col border-l border-gray-800 p-6 h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Notes</h2>
           <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white h-8 w-8">
            <X size={20} />
          </Button>
        </div>

        <ScrollArea className="flex-1 -mx-6">
          <div className="px-6 py-4">
            <div className="relative"> {/* Container for timeline */}
                <div className="absolute left-3 top-0 h-full w-0.5 bg-gray-700"></div>

                <div className="space-y-8">
                    {timelineData.map((group) => (
                        <div key={group.id} className="relative pl-8">
                            <div className="absolute left-3 top-1 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-white border-2 border-[#121016]"></div>

                            <div className="flex items-center min-h-[24px]">
                              {group.id === 'upcoming' && (
                                 <div className="flex items-center space-x-2 cursor-pointer">
                                    <h3 className="font-semibold text-white text-sm">{group.title}</h3>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                 </div>
                              )}
                              {group.id === 'today' && (
                                 <div className="flex items-center space-x-3 w-full">
                                    <h3 className="font-semibold text-white text-sm">{group.title}</h3>
                                    <Badge variant="secondary" className="bg-gray-700 text-gray-300 px-1.5 py-0.5 text-xs h-6 flex items-center gap-1">
                                        <FileText size={12} />
                                        <span>{group.noteCount}</span>
                                    </Badge>
                                    <span className="text-gray-500 font-normal text-sm flex items-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2"></div>
                                        Project: {group.project}
                                    </span>
                                    <div className="flex-grow"></div>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 bg-gray-700 text-white rounded-full hover:bg-gray-600">
                                        <Plus size={16} />
                                    </Button>
                                 </div>
                              )}
                              {group.id !== 'upcoming' && group.id !== 'today' && (
                                 <h3 className="font-semibold text-white text-sm">{group.title}</h3>
                              )}
                            </div>

                            <div className="mt-2 space-y-2">
                                {group.notes.map(note => (
                                    <div key={note.id} className="bg-[#2C2D30] p-3 rounded-md border border-gray-700 group relative">
                                        <p className="text-sm">
                                            {isUrl(note.text) ? (
                                                <span className="text-purple-400">{note.text}</span>
                                            ) : (
                                                note.text
                                            )}
                                        </p>
                                        <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white"><Repeat size={14} /></Button>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white"><Calendar size={14} /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
};
