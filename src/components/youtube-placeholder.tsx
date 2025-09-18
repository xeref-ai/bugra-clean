
import React, { useState } from 'react';
import Image from 'next/image';
import { BugraKarsliLogo } from '@/components/bugra-karsli-logo';

interface YoutubePlaceholderProps {
  videoId: string;
  channelId: string;
  channelName: string;
  channelLogo: string;
}

const YoutubePlaceholder: React.FC<YoutubePlaceholderProps> = ({ videoId, channelId, channelName, channelLogo }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const handleImageError = () => {
    setThumbnailError(true);
  };

  if (showVideo) {
    return (
      <div className="w-full h-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-pointer" onClick={() => setShowVideo(true)}>
      {thumbnailError ? (
        <div className="w-full h-full flex items-center justify-center bg-black text-red-500">
          Could not load video thumbnail.
        </div>
      ) : (
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Video thumbnail"
          fill={true}
          style={{ objectFit: 'cover' }}
          priority
          onError={handleImageError}
        />
      )}
      <div className="absolute top-0 left-0 p-4 flex items-center">
        <BugraKarsliLogo className="h-10 w-10 rounded-full" />
        <span className="ml-2 text-white font-semibold">{channelName}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-20 h-20 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 13.5v-7l5 3.5-5 3.5z" />
        </svg>
      </div>
    </div>
  );
};

export default YoutubePlaceholder;
