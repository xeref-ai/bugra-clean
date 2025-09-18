
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon, Clock, Users, Video, Globe, Link as LinkIcon, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const AddEventView = ({ onClose }: { onClose: () => void }) => {
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [timezone, setTimezone] = useState('(GMT +03:00) Europe/Istanbul');
    const [isRecurring, setIsRecurring] = useState(false);
    const [location, setLocation] = useState('Zoom');
    const [description, setDescription] = useState('');
    const [whoCanAttend, setWhoCanAttend] = useState('All members');
    const [remindMembers, setRemindMembers] = useState(true);

    const handleAddEvent = async () => {
        if (!title) {
            toast({ title: "Title is required", variant: "destructive" });
            return;
        }

        const eventData = {
            title,
            date,
            time,
            duration,
            timezone,
            isRecurring,
            location,
            description,
            whoCanAttend,
            remindMembers,
        };

        // For now, we'll just log this to the console.
        // In the future, this will send the data to the /api/events endpoint.
        console.log("Event Data:", eventData);

        toast({
            title: "Event Created!",
            description: `${title} has been added.`,
        });
        onClose();
    };
    
    return (
        <div className="bg-[#1e2024] text-gray-300 flex flex-col h-full w-full p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Add event</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white h-8 w-8">
                    <X size={20} />
                </Button>
            </div>

            <p className="text-sm text-gray-400 mb-6">
                Need ideas? Try one of these fun formats: coffee hour, Q&A, co-working session, or happy hour
            </p>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={30} className="bg-input border-border" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-input border-border" />
                    </div>
                    <div>
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-input border-border" />
                    </div>
                    <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" placeholder="e.g., 1 hour" value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-input border-border" />
                    </div>
                </div>

                <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger className="w-full bg-input border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="(GMT +03:00) Europe/Istanbul">
                                (GMT +03:00) Europe/Istanbul
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
                    <Label htmlFor="recurring">Recurring event</Label>
                </div>

                <div>
                    <Label>Location</Label>
                    <div className="flex items-center space-x-2 mt-2">
                        <Button variant={location === 'Zoom' ? 'secondary' : 'outline'} onClick={() => setLocation('Zoom')}><Video className="mr-2 h-4 w-4" /> Zoom</Button>
                    </div>
                    {location === 'Zoom' && <p className="text-xs text-gray-400 mt-2">A Zoom link will be automatically generated.</p>}
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={300} className="bg-input border-border" />
                </div>

                <div>
                    <Label>Who can attend this event</Label>
                    <Select value={whoCanAttend} onValueChange={setWhoCanAttend}>
                        <SelectTrigger className="w-full bg-input border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All members">All members</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="remind" checked={remindMembers} onCheckedChange={(checked) => setRemindMembers(!!checked)} />
                    <Label htmlFor="remind">Remind members by email 1 day before</Label>
                </div>
            </div>

            <div className="mt-auto pt-6 flex justify-end space-x-2">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddEvent}>Add</Button>
            </div>
        </div>
    );
};
