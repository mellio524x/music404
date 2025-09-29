import React, { useState, useEffect } from 'react';

const TerminalBoot = ({ onBootComplete }) => {
  const [lines, setLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bootSequence = [
    'DEV 404 System Boot Sequence v2.1.4',
    'Initializing sonic architecture...',
    'Loading full-stack protocols...',
    'Mounting audio drivers...',
    'Connecting to music servers...',
    'Establishing beat synchronization...',
    'Loading creative matrices...',
    'Scanning for inspiration...',
    'Calibrating frequency modulators...',
    'Activating developer mode...',
    'System ready. Welcome to DEV 404.',
    ''
  ];

  useEffect(() => {
    if (currentIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 300 + Math.random() * 200); // Random delay for realistic effect

      return () => clearTimeout(timer);
    } else {
      // Boot sequence complete, wait a moment then fade out
      const completeTimer = setTimeout(() => {
        onBootComplete();
      }, 1000);

      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, bootSequence, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-black border border-cyan-400 rounded-lg p-6 max-w-2xl w-full mx-4 font-mono">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-cyan-400 ml-2 text-sm">Terminal</span>
        </div>
        <div className="text-green-400 text-sm space-y-1 min-h-[300px]">
          {lines.map((line, index) => (
            <div key={index} className="terminal-line" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="text-cyan-400">dev404@sonic-architect:~$</span> {line}
            </div>
          ))}
          {currentIndex < bootSequence.length && (
            <div className="flex items-center">
              <span className="text-cyan-400">dev404@sonic-architect:~$</span>
              <span className="ml-2 terminal-cursor">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalBoot;