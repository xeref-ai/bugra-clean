
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
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';

export const EmailDraftDialog = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Mail className="h-6 w-6 mr-2" />
                        Draft an Email
                    </DialogTitle>
                    <DialogDescription>
                        Compose and save an email draft.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <Input type="email" placeholder="To" />
                    <Input type="text" placeholder="Subject" />
                    <Textarea placeholder="Message" className="min-h-[200px]" />
                </div>
                <div className="mt-4 flex justify-end">
                    <Button>we should save the draft e-mail</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
