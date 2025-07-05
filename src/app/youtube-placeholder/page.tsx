
'use client';

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LogoSvg = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} data-ai-hint="logo compass">
      <path d="M12 2L4 20L12 16L20 20L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const YoutubePlaceholderPage = () => {
    return (
        <div className="bg-[#0f0f0f] text-gray-200 min-h-screen w-full">
            {/* Banner Image */}
            <div className="w-full h-32 md:h-48 bg-gray-800">
                 <Image
                    src="https://placehold.co/1500x250.png"
                    alt="Channel Banner"
                    width={1500}
                    height={250}
                    className="w-full h-full object-cover"
                    data-ai-hint="abstract tech"
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
                        <h1 className="text-3xl font-bold text-white">Xeref.ai</h1>
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                            <span>@xeref-ai</span>
                            <span>•</span>
                            <span>15.3K subscribers</span>
                            <span>•</span>
                            <span>42 videos</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            Tutorials, guides, and updates for Xeref.ai. Supercharge your productivity with AI. <span className="font-semibold text-white hover:underline cursor-pointer">...more</span>
                        </p>
                         <a href="https://www.bugrakarsli.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline mt-1 block">
                            bugrakarsli.com
                        </a>
                        <div className="mt-4 flex items-center space-x-2">
                            <Button className="bg-gray-200 text-black hover:bg-gray-300 rounded-full px-4 py-2 text-sm font-semibold">Customize channel</Button>
                            <Button className="bg-gray-800 text-white hover:bg-gray-700 rounded-full px-4 py-2 text-sm font-semibold">Manage videos</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-4 sm:px-8 md:px-24 lg:px-48 border-b border-gray-700">
                <div className="flex space-x-8 text-sm font-medium text-gray-400">
                    <button className="text-white border-b-2 border-white py-3">HOME</button>
                    <button className="hover:text-white py-3">VIDEOS</button>
                    <button className="hover:text-white py-3">SHORTS</button>
                    <button className="hover:text-white py-3">PLAYLISTS</button>
                    <button className="hover:text-white py-3">COMMUNITY</button>
                    <button className="hover:text-white py-3">ABOUT</button>
                </div>
            </div>

             {/* Video Grid Placeholder */}
            <div className="px-4 sm:px-8 md:px-24 lg:px-48 py-8">
                 <h2 className="text-xl font-bold text-white mb-4">Videos</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i}>
                             <div className="aspect-video bg-gray-800 rounded-lg" data-ai-hint="video thumbnail">
                                 <Image
                                    src={`https://placehold.co/400x225.png`}
                                    alt={`Video thumbnail ${i+1}`}
                                    width={400}
                                    height={225}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                             </div>
                             <div className="mt-2 flex items-start space-x-2">
                                 <h3 className="text-sm font-semibold text-white flex-grow">Getting Started with Xeref.ai - Episode {i+1}</h3>
                             </div>
                             <p className="text-xs text-gray-400">1.{i+1}M views • {i+1} days ago</p>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default YoutubePlaceholderPage;
