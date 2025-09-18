
'use client';

import {
  ChevronDown,
  ChevronUp,
  Mic,
  RefreshCw,
  Check,
  Crown,
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
import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface MicDevice {
    id: string;
    name: string;
}

export function UserNav() {
  const { user, isUltraUser } = useAuth();
  const [plan, setPlan] = useState('Xeref Free');
  const [isMicOpen, setIsMicOpen] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  
  const [micDevices, setMicDevices] = useState<MicDevice[]>([]);
  const [selectedMic, setSelectedMic] = useState<string | null>(null);

  const refreshDevices = useCallback(async () => {
    if (typeof window !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
            // We must request permission to get device labels.
            // This may trigger a permission prompt if not already granted.
            await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioInputDevices = devices
                .filter(device => device.kind === 'audioinput')
                .map(device => ({ id: device.deviceId, name: (device.label || `Microphone ${device.deviceId.substring(0, 8)}`).replace(/Mikrofon/g, 'Microphone') }));
            
            setMicDevices(audioInputDevices);

            if (audioInputDevices.length > 0) {
                if (!selectedMic || !audioInputDevices.some(d => d.id === selectedMic)) {
                    setSelectedMic(audioInputDevices[0].id);
                }
            }
        } catch (err) {
            console.error("Error refreshing microphone devices:", err);
            toast({
                title: "Microphone Access Denied",
                description: "Allow microphone access in browser settings to see devices.",
                variant: "destructive",
            });
            // If permission is denied, clear the list.
            setMicDevices([]);
        }
    } else {
        toast({ title: "Unsupported Browser", description: "Cannot access media devices.", variant: "destructive" });
    }
  }, [selectedMic, toast]);

  useEffect(() => {
    if (typeof window !== "undefined") {
        refreshDevices();
    }
  }, [refreshDevices]);

  useEffect(() => {
    if (isUltraUser) {
      setPlan('Xeref Ultra');
    } else {
      setPlan('Xeref Free');
    }
  }, [isUltraUser]);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        router.push('/');
      } catch (error) {
        console.error("Logout Error:", error);
        toast({
          title: "Logout Failed",
          description: "An error occurred while logging out.",
          variant: "destructive",
        });
      }
    }
  };
  
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
             <div className="group-data-[state-collapsible=true]:hidden flex-grow flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white text-left truncate">{user?.displayName || 'User'}</p>
                  <p className={cn(
                      "text-xs text-left",
                      plan === 'Xeref Ultra' ? 'text-purple-400 font-bold' : 'text-gray-400'
                    )}>{plan}</p>
                </div>
                {isUltraUser && <Crown 
                    size={20}
                    className="text-gray-600 hover:text-yellow-400 cursor-pointer transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        toast({ title: 'Ultra Plan Active' });
                    }}
                />}
             </div>
           </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal bg-white text-black">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-black mr-2" />
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
            {micDevices.length > 0 ? micDevices.map(device => (
              <DropdownMenuItem key={device.id} onSelect={() => setSelectedMic(device.id)} className="flex items-center cursor-pointer">
                <Mic className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="flex-grow">{device.name}</span>
                {selectedMic === device.id && <Check className="h-4 w-4 text-white" />}
              </DropdownMenuItem>
            )) : (
              <DropdownMenuItem disabled>
                <span className="text-xs text-muted-foreground">No devices found.</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={refreshDevices} className="flex items-center cursor-pointer">
              <RefreshCw className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Refresh device list</span>
            </DropdownMenuItem>
          </div>
        )}
        
        <DropdownMenuItem asChild>
          <Link href="/models" className="flex items-center cursor-pointer">
            <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
            <span>AI Models</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/advanced-settings" className="flex items-center cursor-pointer">
            <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
            <span>Advanced Settings</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={handleLogout} className="flex items-center cursor-pointer">
          <div className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
