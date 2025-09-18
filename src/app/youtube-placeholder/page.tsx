
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube } from 'lucide-react';
import Image from "next/image";

const YoutubePlaceholderPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg text-center">
                <Youtube className="h-24 w-24 mx-auto text-red-600" />
                <h1 className="text-2xl font-bold mt-4">YouTube Video</h1>
                <p className="text-gray-400 mt-2">Enter a YouTube URL to embed the video.</p>
                <div className="mt-6">
                    <Input type="text" placeholder="Enter YouTube URL" className="w-full bg-gray-700 border-gray-600 text-white" />
                </div>
                <Button className="mt-4 w-full bg-red-600 hover:bg-red-700">Embed Video</Button>
            </div>
        </div>
    );
};

export default YoutubePlaceholderPage;
