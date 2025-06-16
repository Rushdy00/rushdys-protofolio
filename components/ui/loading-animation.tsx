"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WinkingEye = () => {
  const [isWinking, setIsWinking] = useState(false);

  useEffect(() => {
    // Start winking after a short delay
    const timeout = setTimeout(() => {
      setIsWinking(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      className="inline-block ml-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        animate={isWinking ? {
          scaleY: [1, 0.1, 1],
          transition: {
            duration: 0.3,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }
        } : {}}
        className="relative w-[8px] h-[8px] bg-white rounded-full"
      >
        <motion.div
          className="absolute -top-[6px] -left-[6px] w-[20px] h-[20px] border-2 border-white rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

export const LoadingAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1, 1.1, 1],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.3, 0.7, 1],
          ease: "easeOut",
        }}
        className="relative flex items-center justify-center"
      >
        <span className="font-['Gathenia'] text-6xl text-white text-shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.4)] tracking-wider flex items-center">
          Rushdy
          <WinkingEye />
        </span>
      </motion.div>
    </motion.div>
  );
}; 