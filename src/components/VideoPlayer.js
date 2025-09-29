import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Maximize2 } from 'lucide-react';

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMainPlayer, setIsMainPlayer] = useState(false);

  const videos = [
    {
      id: 'crimson-tide',
      title: 'Crimson Tide',
      embedId: 'r-0mfF3UUoQ',
      description: 'Latest single from DEV 404'
    },
    {
      id: 'us-vs-them',
      title: 'Us vs. Them',
      embedId: '4w_WfXl_pbE',
      description: 'New release'
    },
    {
      id: 'cracks-pavemant',
      title: 'Cracks in the Pavemant',
      embedId: 'tYfNWMa8MU0',
      description: 'Latest track'
    },
    {
      id: 'race-against-time',
      title: 'Race Against Time',
      embedId: 'VqVkf0COL1w',
      description: 'Popular track'
    },
    {
      id: 'party-history',
      title: 'Party Through History',
      embedId: 'c7kxOS2wh9Q',
      description: 'Fan favorite'
    },
    {
      id: 'timeecode',
      title: '28:06:42:12',
      embedId: 'nGgCw4msDG8',
      description: 'Concept track'
    },
    {
      id: 'dont-blink',
      title: "Don't Blink",
      embedId: '9R3sYBrbsRY',
      description: 'High energy track'
    },
    {
      id: 'hello-world',
      title: 'Hello, World!',
      embedId: '00-_LcpNSWM',
      description: 'Debut single'
    },
    {
      id: 'heirloom-fire',
      title: 'Heirloom Of Fire',
      embedId: 'szuMdzyHrWk',
      description: 'Epic track'
    }
  ];

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsMainPlayer(true);
  };

  const handleBackToGrid = () => {
    setIsMainPlayer(false);
    setSelectedVideo(null);
  };

  if (isMainPlayer && selectedVideo) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-4xl font-bold text-center flex-1">Video Player</h2>
          <Button 
            onClick={handleBackToGrid}
            variant="outline" 
            className="border-gray-600 hover:bg-blue-600/20"
          >
            Back to Videos
          </Button>
        </div>
        
        {/* Main Video Player */}
        <Card className="bg-black/30 backdrop-blur-md border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl">{selectedVideo.title}</CardTitle>
            <p className="text-gray-400">{selectedVideo.description}</p>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.embedId}?si=1&autoplay=0&fs=1&modestbranding=1&rel=0`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg absolute inset-0"
                title={selectedVideo.title}
              />
            </div>
          </CardContent>
        </Card>

        {/* Video Selection Grid */}
        <h3 className="text-2xl font-bold mb-4 text-cyan-400">Other Videos</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.filter(v => v.id !== selectedVideo.id).map((video) => (
            <Card key={video.id} className="bg-black/30 backdrop-blur-md border-gray-800 hover:border-cyan-400 transition-colors cursor-pointer" onClick={() => handleVideoSelect(video)}>
              <CardContent className="p-3">
                <div className="relative aspect-video mb-2 group">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}?si=1&controls=0&modestbranding=1&rel=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="rounded-lg pointer-events-none"
                    title={video.title}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <Play className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <h4 className="text-cyan-400 text-sm font-medium truncate">{video.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-4xl font-bold text-center flex-1">Music Videos</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsMainPlayer(!isMainPlayer)}
            variant="outline" 
            className="border-gray-600 hover:bg-blue-600/20"
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            Video Player Mode
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="bg-black/30 backdrop-blur-md border-gray-800 group hover:border-cyan-400 transition-colors">
            <CardHeader>
              <CardTitle className="text-cyan-400">{video.title}</CardTitle>
              <p className="text-gray-400 text-sm">{video.description}</p>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}?si=1&fs=1&modestbranding=1&rel=0`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-lg"
                  title={video.title}
                />
              </div>
              <Button 
                onClick={() => handleVideoSelect(video)}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch in Player
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;