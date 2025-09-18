
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { SiSlack } from '@icons-pack/react-simple-icons';

export const SlackConnectDialog = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <SiSlack className="h-6 w-6 mr-2" />
                        Slack Connect
                    </DialogTitle>
                    <DialogDescription>
                        Invite people from outside your organization to collaborate in a channel via email.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <Input type="email" placeholder="Enter email address" />
                </div>
                <div className="mt-4 flex justify-end">
                    <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Send Invite
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
