
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UserNav } from '@/components/user-nav';
import { LogoSvg } from '@/components/icons.tsx';
import { Clock, Users, Plus, MoreHorizontal, ChevronDown, Lock, Star, Image as ImageIcon } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseEnabled } from '@/lib/firebase';
import Link from 'next/link';
import { isUltraUser } from '@/lib/auth-utils';

const CustomExpandIcon = ({ className }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className={className}>
        <path d="M16 13L16 7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 13L12 7" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="3.5" y="3.5" width="13" height="13" rx="3" strokeWidth="1.5"/>
        <path d="M8 15L8 5" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export const IconSidebar = ({ isCollapsed, onToggle, onNewProjectClick, onEditProjectClick }: { isCollapsed: boolean, onToggle: () => void, onNewProjectClick: () => void, onEditProjectClick: () => void }) => {
    const [isPersonalOpen, setIsPersonalOpen] = React.useState(true);
    const [isStarred, setIsStarred] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const [isInviteDialogOpen, setIsInviteDialogOpen] = React.useState(false);
    const [inviteEmail, setInviteEmail] = React.useState('');
    const { toast } = useToast();

    React.useEffect(() => {
        if (!isFirebaseEnabled || !auth) return;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleInvite = () => {
        if (!inviteEmail || !inviteEmail.includes('@')) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive"
            });
            return;
        }
        // In a real app, this would call an API to send the invite
        console.log(`Inviting ${inviteEmail}...`);
        toast({
            title: "Invite Sent!",
            description: `An invitation has been sent to ${inviteEmail}.`
        });
        setInviteEmail('');
        setIsInviteDialogOpen(false); // Close dialog on success
    };

    const isUltraPlan = isUltraUser(user);
    
    return (
        <aside data-state={isCollapsed ? 'collapsed' : 'expanded'} className={cn(
            "bg-[#121016] text-gray-300 flex-shrink-0 flex flex-col p-2 transition-all duration-300 ease-in-out",
            isCollapsed ? "w-16 items-center" : "w-64"
        )}>
            <div className="flex flex-col items-start flex-grow w-full mt-2">
                <TooltipProvider>
                    <div className="w-full">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                 <Button
                                    variant="ghost"
                                    className={cn(
                                        "text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg h-auto p-2 group",
                                        isCollapsed ? "w-12 h-12 justify-center" : "w-full justify-between"
                                    )}
                                    onClick={onToggle}
                                 >
                                    <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-2")}>
                                         {isCollapsed ? (
                                            <div className="relative w-6 h-6">
                                                <LogoSvg className="h-6 w-6 text-white shrink-0 group-hover:opacity-0 transition-opacity absolute inset-0" />
                                                <CustomExpandIcon className="h-5 w-5 shrink-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ) : (
                                            <>
                                                <LogoSvg className="h-6 w-6 text-white shrink-0"/>
                                                <span className="font-bold text-lg text-white">Xeref.ai</span>
                                            </>
                                        )}
                                    </div>
                                    {!isCollapsed && <CustomExpandIcon className="h-5 w-5 shrink-0" />}
                                </Button>
                            </TooltipTrigger>
                            {isCollapsed && <TooltipContent side="right"><p>Expand</p></TooltipContent>}
                        </Tooltip>
                    </div>
                    
                    <div className={cn("w-full py-2", isCollapsed ? "px-2" : "px-2")}>
                        <Separator className="bg-gray-700" />
                    </div>

                    <div className={cn("w-full", isCollapsed ? "px-0 flex justify-center" : "px-2")}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                 <Button 
                                    variant="secondary" 
                                    className={cn(
                                        "justify-start p-2 h-auto font-semibold text-sm text-white bg-gray-700/50 rounded-lg",
                                        !isCollapsed && "w-full border-l-2 border-white",
                                        isCollapsed && "w-12 h-12 justify-center p-0"
                                    )}
                                >
                                    <Clock size={18} className={cn(!isCollapsed && "mr-3")} />
                                    {!isCollapsed && <span>Today</span>}
                                </Button>
                            </TooltipTrigger>
                             {isCollapsed && <TooltipContent side="right"><p>Today</p></TooltipContent>}
                        </Tooltip>
                    </div>

                    {/* Expanded View */}
                    <ScrollArea className={cn("w-full flex-1", isCollapsed ? "hidden" : "block")}>
                        <div className="px-2 space-y-4 mt-4">
                            <div> {/* Personal */}
                                <div
                                    onClick={() => setIsPersonalOpen(!isPersonalOpen)}
                                    className={cn(
                                        "flex items-center justify-between text-sm text-white pl-2 pr-1 h-9 rounded-lg bg-gray-700/50 hover:bg-gray-700/80 cursor-pointer",
                                        isPersonalOpen && "border-l-2 border-white bg-gray-700"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <Lock size={16} />
                                        <span className="font-semibold">Personal</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-gray-400 hover:text-white"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onNewProjectClick();
                                                    }}
                                                >
                                                    <Plus size={16} />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">New Project</TooltipContent>
                                        </Tooltip>
                                        <div className="h-7 w-7 flex items-center justify-center text-gray-400">
                                            <ChevronDown size={16} className={cn('transition-transform', !isPersonalOpen && '-rotate-90')} />
                                        </div>
                                    </div>
                                </div>
                                {isPersonalOpen && (
                                    <div className="mt-1 space-y-1">
                                        <div className="group w-full flex items-center justify-start p-2 h-auto text-sm font-normal text-gray-300 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-3 shrink-0"></div>
                                            <span className="flex-grow text-left">xeref</span>
                                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white bg-gray-800 rounded-md" onClick={(e) => { e.stopPropagation(); onEditProjectClick(); }}>
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                                <Star
                                                    size={18}
                                                    className={cn(
                                                        "cursor-pointer transition-colors",
                                                        isStarred ? "text-yellow-400 fill-yellow-400" : "text-gray-500 hover:text-yellow-400"
                                                    )}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsStarred(!isStarred);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                         <Link href="/vectorization" className="group w-full flex items-center justify-start p-2 h-auto text-sm font-normal text-gray-300 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                                            <ImageIcon size={16} className="mr-3 text-gray-400" />
                                            <span className="flex-grow text-left">Vectorization Tool</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            
                            <Separator className="bg-gray-700" />
                            
                             <div> {/* Team */}
                                <div className="flex items-center justify-between text-sm text-gray-400 px-2 py-1">
                                    <div className="flex items-center gap-3">
                                        <Users size={16} />
                                        <span className="font-semibold">Team</span>
                                    </div>
                                </div>
                                 <div className="mt-2">
                                    {isUltraPlan ? (
                                        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button className="w-full bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white h-auto py-1.5 text-sm">Invite Member</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px] bg-card border-border text-foreground">
                                                <DialogHeader>
                                                    <DialogTitle>Invite Team Member</DialogTitle>
                                                    <DialogDescription>
                                                        Enter the email address of the person you want to invite to your team.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="email" className="text-right">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="name@example.com"
                                                            className="col-span-3 bg-input"
                                                            value={inviteEmail}
                                                            onChange={(e) => setInviteEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="button" onClick={handleInvite}>Send Invite</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <Button asChild className="w-full bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white h-auto py-1.5 text-sm">
                                            <Link href="/pricing">Upgrade to Team Plan</Link>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <Separator className="bg-gray-700" />
                            
                            <div> {/* Chats */}
                                <div className="flex items-center justify-between p-2 text-sm text-gray-400">
                                    <span className="font-semibold">Chats</span>
                                </div>
                                <div className="space-y-1 text-sm">
                                     <div className="p-2 rounded-md bg-gray-700/50 text-white">
                                        <div className="flex justify-between items-start">
                                            <p className="font-medium truncate leading-tight flex-1">Hello Xeref! I am new here. ...</p>
                                            <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-400 -mr-1 -mt-1 flex-shrink-0"><MoreHorizontal size={14} /></Button>
                                        </div>
                                        <p className="text-xs text-gray-400">Jun 25・Active</p>
                                    </div>
                                     <div className="p-2 rounded-md hover:bg-gray-700/50 text-gray-300">
                                        <p className="truncate">give me the json code for v...</p>
                                         <span className="text-xs text-gray-500">Jun 21</span>
                                    </div>
                                     <div className="p-2 rounded-md hover:bg-gray-700/50 text-gray-300">
                                        <p className="truncate">https://bugrakarsli.com/ sc...</p>
                                         <span className="text-xs text-gray-500">Jun 18</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </TooltipProvider>
            </div>
            <div className={cn("w-full px-2 mt-auto")}>
              <Separator className="bg-gray-700" />
            </div>
            <div className={cn("w-full mt-2", isCollapsed ? "px-0" : "px-2")}>
                <UserNav />
            </div>
        </aside>
    );
};
