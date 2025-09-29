import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({ isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 400;
    const height = canvas.height = 200;

    // Create fake audio data for visualization
    const createAudioData = () => {
      const bars = 32;
      const data = [];
      for (let i = 0; i < bars; i++) {
        if (isPlaying) {
          data.push(Math.random() * 100 + 20);
        } else {
          data.push(5 + Math.random() * 10);
        }
      }
      return data;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const audioData = createAudioData();
      const barWidth = width / audioData.length;
      
      audioData.forEach((value, index) => {
        const barHeight = (value / 100) * height * 0.8;
        const x = index * barWidth;
        const y = height - barHeight;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        
        // Add glow effect
        if (isPlaying && value > 60) {
          ctx.shadowColor = '#00d4ff';
          ctx.shadowBlur = 10;
          ctx.fillRect(x, y, barWidth - 2, barHeight);
          ctx.shadowBlur = 0;
        }
      });
      
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="max-w-full max-h-full"
        style={{ 
          filter: isPlaying ? 'brightness(1.2)' : 'brightness(0.5)',
          transition: 'filter 0.3s ease'
        }}
      />
    </div>
  );
};

export default AudioVisualizer;