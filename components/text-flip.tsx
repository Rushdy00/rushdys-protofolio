"use client";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spotlight } from "./ui/Spotlight";

export function ContainerTextFlipDemo() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 md:py-0 transition-all duration-700 ${isHovered ? 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20' : ''}`}>
      {/* Dynamic Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10"
      />
      
      {/* Spotlights */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill={isHovered ? "purple" : "grey"}
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill={isHovered ? "cyan" : "white"}
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill={isHovered ? "blue" : "gray"}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 md:gap-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.img
            src={isHovered ? "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" : "/rushdy13.jpg"}
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/30"
          />
          
          {/* Hover ring effect */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-300" />
          
          {/* Optional hover indicator */}
          <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 010 6h-1m4-6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <motion.span 
              className={`text-4xl md:text-7xl font-['Gathenia'] transition-all duration-700 ${
                isHovered 
                  ? 'text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text' 
                  : 'text-white'
              }`}
              animate={{ 
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              I will make you
            </motion.span>
            <div className={`transition-all duration-700 ${isHovered ? 'drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]' : ''}`}>
              <ContainerTextFlip
                words={["better", "modern", "Tyler Durden", "awesome"]}
                textClassName="font-['Gathenia']"
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-center max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light tracking-wide transition-all duration-700 ${
              isHovered 
                ? 'text-cyan-200/90 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
                : 'text-white/70'
            }`}
          >
            Crafting elegant digital experiences with modern web technologies. 
            Turning complex challenges into seamless, user-friendly solutions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            <motion.div 
              className={`flex items-center gap-2 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full transition-all duration-700 ${
                isHovered 
                  ? 'bg-purple-500/20 border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'bg-white/5 border border-white/10'
              }`}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-700 ${
                isHovered ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'bg-green-400'
              }`} />
              <span className={`text-xs md:text-sm transition-colors duration-700 ${
                isHovered ? 'text-cyan-200' : 'text-white/80'
              }`}>Available for projects</span>
            </motion.div>
            
            <motion.div 
              className={`flex items-center gap-2 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full transition-all duration-700 ${
                isHovered 
                  ? 'bg-blue-500/20 border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                  : 'bg-transparent border border-white/20'
              }`}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`text-xs md:text-sm transition-colors duration-700 ${
                isHovered ? 'text-blue-200' : 'text-white/80'
              }`}>Based in</span>
              <span className={`font-semibold transition-colors duration-700 ${
                isHovered ? 'text-cyan-300' : 'text-white'
              }`}>Egypt</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex gap-3 md:gap-4"
          >
            <motion.a
              href="#projects"
              className={`backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-700 ${
                isHovered 
                  ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-cyan-200 border border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]' 
                  : 'bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/40'
              }`}
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                y: isHovered ? -2 : 0 
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: isHovered ? 1.08 : 1.05 }}
            >
              View projects
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/rushdy-abdelkarim/"
              target="_blank"
              rel="noopener noreferrer"
              className={`backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-700 flex items-center gap-2 ${
                isHovered 
                  ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 border border-blue-400/50 shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]' 
                  : 'bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/40'
              }`}
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                y: isHovered ? -2 : 0 
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: isHovered ? 1.08 : 1.05 }}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-700 ${
                isHovered ? 'drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : ''
              }`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
