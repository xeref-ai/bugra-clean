
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rss } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SkoolNewsFeed } from './skool-news-feed';

export const SkoolNewsBubble = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full h-12 w-12 p-0">
                    <Rss className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Rss className="h-5 w-5 mr-2" />
                        Skool News
                    </DialogTitle>
                    <DialogDescription>
                        The latest news and updates from the Skool community.
                    </DialogDescription>
                </DialogHeader>
                <SkoolNewsFeed onClose={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
