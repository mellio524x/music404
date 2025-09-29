import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Music, Video, User, Mail, Facebook, Youtube, Twitter } from 'lucide-react';
import TerminalBoot from './components/TerminalBoot';
import AudioVisualizer from './components/AudioVisualizer';
import VideoPlayer from './components/VideoPlayer';
import axios from 'axios';
import './App.css';
import Logo from './lib/logo.png';
import me from './lib/Me.png';
import { useForm, ValidationError } from '@formspree/react';

// Assuming BACKEND_URL is defined elsewhere, e.g., in a .env file or config
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Fallback for local development

export default function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [signupCount, setSignupCount] = useState(0);

  useEffect(() => {
    // Check if user has seen boot sequence before
    const hasSeenBoot = sessionStorage.getItem('dev404-boot-seen');
    if (hasSeenBoot) {
      setShowBoot(false);
    }
  }, []);

  useEffect(() => {
    if (!showBoot) {
      // Fetch signup count when main app loads
      const fetchSignupCount = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/signups/count`);
          setSignupCount(response.data.count);
        } catch (error) {
          console.error('Error fetching signup count:', error);
        }
      };
      fetchSignupCount();
    }
  }, [showBoot]);

  // Simulate audio playing detection
  useEffect(() => {
    const simulateAudioReactivity = () => {
      setIsPlaying(Math.random() > 0.7); // Randomly simulate playing state
    };

    const interval = setInterval(simulateAudioReactivity, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('dev404-boot-seen', 'true');
    setShowBoot(false);
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post(`${BACKEND_URL}/api/signup`, {
        email: email,
        name: name || 'Fan'
      });

      setSubmitMessage(response.data.message);
      setEmail('');
      setName('');
      setSignupCount(prev => prev + 1);
    } catch (error) {
      if (error.response?.status === 400) {
        setSubmitMessage('This email is already registered in our fanbase!');
      } else if (error.response?.status === 422) {
        setSubmitMessage('Please enter a valid email address.');
      } else {
        setSubmitMessage(error.response?.data?.detail || 'An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show terminal boot sequence
  if (showBoot) {
    return <TerminalBoot onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white app-fade-in">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1483000805330-4eaf0a0d82da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzU0MzcwMzY1fDA&ixlib=rb-4.1.0&q=85')`
          }}
        />

       {/* Logo and Title */}
<div className="relative z-10 text-center px-6">
  <div className="mb-8">
    {/* Logo Image */}
    <div className="w-48 h-48 mx-auto mb-6 rounded-full shadow-2xl overflow-hidden logo-pulse bg-gradient-to-br from-cyan-400 to-blue-600">
      <img
        src={Logo}
        alt="DEV 404 Logo"
        className="object-cover w-full h-full"
      />
    </div>
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent typewriter">
              DEV 404
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto typewriter-delay">
              Full-Stack Web Developer Turned Sonic Architect
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/50 backdrop-blur-md rounded-full p-2">
              <Tabs defaultValue="music" className="w-auto">
                <TabsList className="grid w-full grid-cols-4 bg-transparent">
                  <TabsTrigger value="music" className="data-[state=active]:bg-blue-600">
                    <Music className="w-4 h-4 mr-2" />
                    Music
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="data-[state=active]:bg-blue-600">
                    <Video className="w-4 h-4 mr-2" />
                    Videos
                  </TabsTrigger>
                  <TabsTrigger value="bio" className="data-[state=active]:bg-blue-600">
                    <User className="w-4 h-4 mr-2" />
                    Bio
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-blue-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </TabsTrigger>
                </TabsList>

                {/* Music Section */}
                <TabsContent value="music" className="mt-8">
                  <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center">Albums</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                      {/* BROKEN Album */}
                      <div className="relative">
                        <AudioVisualizer isPlaying={isPlaying} />
                        <Card className="bg-black/30 backdrop-blur-md border-gray-800 relative z-20">
                          <CardHeader>
                            <CardTitle className="text-cyan-400">BROKEN</CardTitle>
                            <CardDescription className="text-gray-400"></CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="aspect-video">
                              <iframe
                                src="https://www.youtube.com/embed/videoseries?si=sNUcSJ7p3U35BQCV&list=OLAK5uy_mgbjUkaeNGAw52C-6PSWgUJ_cYoJp4skI&fs=1&modestbranding=1&rel=0"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="rounded-lg"
                                title="BROKEN Album"
                                onLoad={() => setIsPlaying(true)}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Movies, Lies, and War Album */}
                      <div className="relative">
                        <AudioVisualizer isPlaying={isPlaying} />
                        <Card className="bg-black/30 backdrop-blur-md border-gray-800 relative z-20">
                          <CardHeader>
                            <CardTitle className="text-cyan-400">Movies, Lies, and War</CardTitle>
                            <CardDescription className="text-gray-400">New Album</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="aspect-video">
                              <iframe
                                src="https://www.youtube.com/embed/JbC7SXparFE?si=Q1WNdrrka4fYhEX-&fs=1&modestbranding=1&rel=0"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="rounded-lg"
                                title="Movies, Lies, and War Album"
                                onLoad={() => setIsPlaying(true)}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Fractured Horizons Album */}
                      <div className="relative">
                        <AudioVisualizer isPlaying={isPlaying} />
                        <Card className="bg-black/30 backdrop-blur-md border-gray-800 relative z-20">
                          <CardHeader>
                            <CardTitle className="text-cyan-400">Fractured Horizons</CardTitle>
                            <CardDescription className="text-gray-400">Album</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="aspect-video">
                              <iframe
                                src="https://www.youtube.com/embed/videoseries?si=dmK9mknN0vEmsbPL&list=OLAK5uy_mMAopvO3gpyJ5M143_JGK7WGzctI-vm2M&fs=1&modestbranding=1&rel=0"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="rounded-lg"
                                title="Fractured Horizons Album"
                                onLoad={() => setIsPlaying(true)}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Hello, World! Album */}
                      <div className="relative">
                        <AudioVisualizer isPlaying={isPlaying} />
                        <Card className="bg-black/30 backdrop-blur-md border-gray-800 relative z-20">
                          <CardHeader>
                            <CardTitle className="text-cyan-400">Hello, World!</CardTitle>
                            <CardDescription className="text-gray-400">Debut Album</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="aspect-video">
                              <iframe
                                src="https://www.youtube.com/embed/videoseries?si=Y_KMn3roPYpPBG78&list=OLAK5uy_l5VwiQtYvUpLvL9eC1qym-mN5oAC_hgo0&fs=1&modestbranding=1&rel=0"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="rounded-lg"
                                title="Hello, World! Album"
                                onLoad={() => setIsPlaying(true)}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>

               {/* Videos Section - Now uses the new VideoPlayer component */}
                <TabsContent value="videos" className="mt-8">
                  <VideoPlayer />
                </TabsContent>

                {/* Bio Section */}
                <TabsContent value="bio" className="mt-8">
                  <div className="max-w-4xl mx-auto">
                    <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                      <CardHeader className="text-center">
                        <div
                          className="w-32 h-32 mx-auto mb-6 rounded-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${me})` // Correctly use template literal for image import
                          }}
                        />
                        <CardTitle className="text-3xl text-cyan-400 mb-2">About DEV 404</CardTitle>
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          Full-Stack Developer • Sonic Architect
                        </Badge>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-lg text-gray-300 leading-relaxed">
                          DEV 404 is a full-stack web developer turned sonic architect. With a background in code
                          and a heart wired for creation, he blends tech and music into one seamless experience.
                          More than just an artist — he's a Full-Stack Wizard of sound and syntax, building from the static.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Contact Section */}
                <TabsContent value="contact" className="mt-8">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center">Join the Fanbase</h2>
 <div className="text-center mb-6">
      <a
        href="mailto:DEV@devmusic404.com"
        className="text-cyan-400 hover:underline"
      >
        DEV@devmusic404.com
      </a>
    </div>

                    {/* Email Signup */}
                    <form
  action="https://formspree.io/f/xkgzpnvw"
  method="POST"
  className="space-y-4"
>
  <Input
    type="text"
    name="name"
    placeholder="Your name (optional)"
    className="bg-black/50 border-gray-700 text-white"
  />
  <Input
    type="email"
    name="email"
    placeholder="Your email address"
    required
    className="bg-black/50 border-gray-700 text-white"
  />
  <Button
    type="submit"
    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
  >
    Join the Fanbase

  </Button>
</form>

                    {/* Social Media Links */}
                    <Card className="bg-black/30 backdrop-blur-md border-gray-800">
                      <CardHeader className="text-center">
                        <CardTitle className="text-cyan-400">Follow DEV 404</CardTitle>
                        <CardDescription className="text-gray-400">
                          Connect on social media
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center gap-4 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://www.youtube.com/@DEV_Music_404', '_blank')}
                          >
                            <Youtube className="w-4 h-4 mr-2" />
                            YouTube
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://open.spotify.com/artist/7lvmTahHl3ViENKZrWjsG4?si=uoxP-bxMQ_yQm_OsxkBBaQ', '_blank')}
                          >
                            <Music className="w-4 h-4 mr-2" />
                            Spotify
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://www.facebook.com/profile.php?id=61578195951086', '_blank')}
                          >
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://twitter.com/dev_40435715', '_blank')}
                          >
                            <Twitter className="w-4 h-4 mr-2" />
                            X
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 hover:bg-blue-600/20"
                            onClick={() => window.open('https://www.tiktok.com/@X_dev404_X', '_blank')}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            TikTok
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}