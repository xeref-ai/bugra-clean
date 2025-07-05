'use client';

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const LogoSvg = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} data-ai-hint="logo compass">
      <path d="M12 2L4 20L12 16L20 20L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PathPage = () => {
    return (
        <div className="bg-[#0f0f0f] text-gray-200 min-h-screen w-full">
            {/* Header with back button */}
            <header className="p-4 sm:px-8 md:px-24 lg:px-48 flex justify-between items-center">
                <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to App
                    </Link>
                </Button>
            </header>
            
            {/* Banner Image */}
            <div className="w-full h-32 md:h-48 bg-gray-800">
                 <Image
                    src="https://placehold.co/1500x250.png"
                    alt="Path Banner"
                    width={1500}
                    height={250}
                    className="w-full h-full object-cover"
                    data-ai-hint="journey path"
                />
            </div>

            {/* Channel Info */}
            <div className="px-4 sm:px-8 md:px-24 lg:px-48 pt-4 pb-8">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-[#0f0f0f] -mt-12 sm:-mt-16 flex-shrink-0">
                        <div className="bg-primary h-full w-full flex items-center justify-center">
                            <LogoSvg className="h-16 w-16 text-primary-foreground" />
                        </div>
                    </Avatar>
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-white">Your Path to Mastery</h1>
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                            <span>@YourJourney</span>
                            <span>•</span>
                            <span>Level 15</span>
                            <span>•</span>
                            <span>42 Milestones</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            This is your personalized path, chronicling your journey of growth and productivity with Xeref.ai. Each video represents a milestone achieved.
                        </p>
                         <a href="https://www.bugrakarsli.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline mt-1 block">
                            Powered by Bugra Karsli
                        </a>
                        <div className="mt-4 flex items-center space-x-2">
                            <Button className="bg-gray-200 text-black hover:bg-gray-300 rounded-full px-4 py-2 text-sm font-semibold">Customize Path</Button>
                            <Button className="bg-gray-800 text-white hover:bg-gray-700 rounded-full px-4 py-2 text-sm font-semibold">Review Milestones</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-4 sm:px-8 md:px-24 lg:px-48 border-b border-gray-700">
                <div className="flex space-x-8 text-sm font-medium text-gray-400">
                    <button className="text-white border-b-2 border-white py-3">MILESTONES</button>
                    <button className="hover:text-white py-3">ACHIEVEMENTS</button>
                    <button className="hover:text-white py-3">SKILLS</button>
                    <button className="hover:text-white py-3">STATS</button>
                    <button className="hover:text-white py-3">COMMUNITY</button>
                    <button className="hover:text-white py-3">ABOUT</button>
                </div>
            </div>

             {/* Video Grid Placeholder */}
            <div className="px-4 sm:px-8 md:px-24 lg:px-48 py-8">
                 <h2 className="text-xl font-bold text-white mb-4">Recent Milestones</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i}>
                             <div className="aspect-video bg-gray-800 rounded-lg" data-ai-hint="milestone achievement">
                                 <Image
                                    src={`https://placehold.co/400x225.png`}
                                    alt={`Milestone thumbnail ${i+1}`}
                                    width={400}
                                    height={225}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                             </div>
                             <div className="mt-2 flex items-start space-x-2">
                                 <h3 className="text-sm font-semibold text-white flex-grow">Mastering AI Agents - Part {i+1}</h3>
                             </div>
                             <p className="text-xs text-gray-400">1.{i+1}M XP • {i+1} days ago</p>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default PathPage;
