
'use client';

import {
  ChevronDown,
  ChevronUp,
  Mic,
  RefreshCw,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { isUltraUser } from '@/lib/auth-utils';
import { auth, isFirebaseEnabled } from '@/lib/firebase';


export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState('Xeref Free');
  const [isMicOpen, setIsMicOpen] = useState(true);
  
  // Mock device data based on screenshot
  const [micDevices, setMicDevices] = useState([
    { id: '1', name: 'Default - Mikrofon (Re...' },
    { id: '2', name: 'Communications - Mi...' },
    { id: '3', name: 'Mikrofon (Realtek(R) ...' },
    { id: '4', name: 'Default microphone' },
  ]);
  const [selectedMic, setSelectedMic] = useState('4');

  useEffect(() => {
    if (!isFirebaseEnabled || !auth) {
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (isUltraUser(currentUser)) {
        setPlan('Xeref Ultra');
      } else {
        setPlan('Xeref Free');
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start h-auto p-0 hover:bg-gray-700/50 rounded-lg group" data-state-collapsible="false">
           <div className="flex items-center gap-3 w-full p-3 group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:justify-center">
             <Avatar className="h-9 w-9">
                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
                <AvatarFallback className="bg-gray-700 text-white text-sm font-semibold">
                  {(user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
                </AvatarFallback>
              </Avatar>
             <div className="group-data-[state-collapsible=true]:hidden">
                <p className="text-sm font-semibold text-white text-left truncate">{user?.displayName || 'User'}</p>
                <p className={cn(
                    "text-xs text-left",
                    plan === 'Xeref Ultra' ? 'text-purple-400 font-bold' : 'text-gray-400'
                  )}>{plan}</p>
             </div>
           </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
            <p className="text-sm font-medium leading-none">{user?.email || 'Not logged in'}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setIsMicOpen(!isMicOpen)} className="flex items-center cursor-pointer">
            <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
            <span className="flex-grow">Microphone Device</span>
            {isMicOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </DropdownMenuItem>

        {isMicOpen && (
          <div className="pl-5">
            {micDevices.map(device => (
              <DropdownMenuItem key={device.id} onSelect={() => setSelectedMic(device.id)} className="flex items-center cursor-pointer">
                <Mic className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="flex-grow">{device.name}</span>
                {selectedMic === device.id && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="flex items-center cursor-pointer">
              <RefreshCw className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Refresh device list</span>
            </DropdownMenuItem>
          </div>
        )}
        
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/path" className="flex items-center cursor-pointer">
            <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
            <span>My Path</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/models" className="flex items-center cursor-pointer">
            <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
            <span>AI Models</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/advanced-settings" className="flex items-center cursor-pointer">
            <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
            <span>Advanced Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <a href="https://console.firebase.google.com/u/0/project/xerefai/overview" target="_blank" rel="noopener noreferrer" className="flex items-center cursor-pointer w-full">
                <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
                <span>Firebase Console</span>
            </a>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem disabled={true} className="flex items-center cursor-not-allowed">
          <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
