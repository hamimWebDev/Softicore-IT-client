import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const PiriLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [lastProgressUpdate, setLastProgressUpdate] = useState(0);
  
  const stages = [
    "Initializing...",
    "Loading assets...",
    "Preparing content...",
    "Almost ready..."
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stageInterval: NodeJS.Timeout;

    // Use requestAnimationFrame for smoother progress updates
    const updateProgress = () => {
      const now = Date.now();
      // Throttle updates to prevent excessive re-renders
      if (now - lastProgressUpdate > 150) {
        setProgress(prev => {
          if (prev >= 100) {
            return 100;
          }
          return prev + Math.random() * 15;
        });
        setLastProgressUpdate(now);
      }
    };

    // Use requestAnimationFrame for stage updates
    const updateStage = () => {
      setStage(prev => {
        if (prev >= stages.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    };

    // Start intervals with proper cleanup
    progressInterval = setInterval(updateProgress, 200);
    stageInterval = setInterval(updateStage, 800);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (stageInterval) clearInterval(stageInterval);
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo/Brand */}
      <motion.div 
        className="mb-8 animate-fade-in-scale"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="w-24 h-24 relative mb-4 flex items-center justify-center">
          <Image
            src="/icon/logo.png"
            alt="Softicore IT"
            fill
            className="object-contain animate-pulse"
            sizes="96px"
            priority
          />
        </div>
        <h2 className="text-2xl font-bold text-white text-center animate-pulse">
          Softicore IT
        </h2>
        <motion.p 
          className="text-blue-200 text-center mt-2 animate-pulse"
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {stages[Math.min(stage, stages.length - 1)]}
        </motion.p>
      </motion.div>
      
      {/* Main Spinner */}
      <motion.div 
        className="relative mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="w-20 h-20 rounded-full border-4 border-blue-200/30 border-t-blue-400 animate-spin"></div>
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </motion.div>
      
      {/* Progress Bar */}
      <motion.div 
        className="w-64 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="w-full bg-blue-200/20 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <div className="text-center mt-2">
          <span className="text-blue-200 text-sm">
            {Math.round(Math.min(progress, 100))}%
          </span>
        </div>
      </motion.div>
      
      {/* Loading Dots */}
      <motion.div 
        className="flex space-x-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-blue-400 rounded-full"
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PiriLoader; 