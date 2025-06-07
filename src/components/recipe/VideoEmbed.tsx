import { useState } from 'react';

interface VideoEmbedProps {
  youtubeId: string;
  title: string;
}

const VideoEmbed = ({ youtubeId, title }: VideoEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shadow-md mb-8">
      <div className="relative pb-[56.25%] h-0">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
            <div className="w-12 h-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          </div>
        )}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={`${title} Recipe Video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoEmbed;