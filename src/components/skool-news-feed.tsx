
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SkoolNew {
    id: string;
    title: string;
    content: string;
    createdAt: any;
}

export const SkoolNewsFeed = ({ onClose }: { onClose: () => void }) => {
    const [news, setNews] = useState<SkoolNew[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/skool/news');
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error('Failed to fetch Skool news:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <Card className="border-0 shadow-none">
            <CardContent className="p-0">
                <ScrollArea className="h-64">
                    {isLoading ? (
                        <p>Loading news...</p>
                    ) : news.length > 0 ? (
                        <ul className="space-y-4">
                            {news.map(item => (
                                <li key={item.id}>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No new news.</p>
                    )}
                </ScrollArea>
                <div className="flex justify-end mt-4">
                    <Button variant="ghost" onClick={onClose}>
                        <X className="h-4 w-4 mr-2" />
                        Close
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
