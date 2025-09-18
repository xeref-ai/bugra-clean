
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { LogoSvg } from '@/components/icons';
import Image from 'next/image';

export const VideoPlaceholder = () => {
  return (
    <div className="w-full max-w-3xl aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 relative group cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <PlayCircle className="h-20 w-20 text-white/70 group-hover:text-white transition-colors" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex">
        <div className="w-1/2 bg-white flex flex-col justify-center items-start p-8">
            <h2 className="text-3xl font-bold text-blue-600">Xerenity Society</h2>
            <p className="text-lg text-gray-700">with Bugra Karsli</p>
        </div>
        <div className="w-1/2 bg-black flex flex-col justify-center items-center p-8">
            <LogoSvg className="h-16 w-16 text-white" />
             <p className="text-lg font-bold text-white mt-2">Xeref.ai</p>
        </div>
      </div>
       <div className="absolute top-4 right-4">
            <Image
                src="/bugra-karsli.jpg"
                alt="Bugra Karsli"
                width={40}
                height={40}
                className="rounded-full"
            />
        </div>
    </div>
  );
};
