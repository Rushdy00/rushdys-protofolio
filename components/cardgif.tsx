"use client";
import React from "react";
import { motion } from "framer-motion";

interface CardGifProps {
  title: string;
  description: string;
  staticImageUrl: string;
  gifUrl: string;
  link?: string;
  tags?: string[];
  className?: string;
}

export function CardGif({ 
  title, 
  description, 
  staticImageUrl,
  gifUrl, 
  link, 
  tags = [], 
  className = "" 
}: CardGifProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 ${link ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image/GIF Container */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <motion.img
          src={isHovered ? gifUrl : staticImageUrl}
          alt={title}
          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-700"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-white/70 text-lg leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/60 text-sm border border-white/5 group-hover:bg-white/15 group-hover:text-white/70 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link indicator */}
        {link && (
          <div className="flex items-center text-white/50 group-hover:text-white/70 transition-colors duration-300">
            <span className="text-sm">Click to explore</span>
            <svg 
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
    </motion.div>
  );
}

// Demo component showing multiple cards
export function CardGifDemo() {
  const cards = [
    {
      title: "Interactive Dashboard",
      description: "A sleek analytics dashboard with smooth animations and real-time data visualization.",
      staticImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
      gifUrl: "https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif",
      link: "https://example.com/dashboard",
      tags: ["React", "Charts", "Analytics"]
    },
    {
      title: "Mobile App Interface",
      description: "Modern mobile application with fluid transitions and intuitive user experience.",
      staticImageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center",
      gifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif",
      link: "https://example.com/mobile-app",
      tags: ["Mobile", "UI/UX", "Animation"]
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured online store with shopping cart, payments, and inventory management.",
      staticImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      gifUrl: "https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif",
      link: "https://example.com/ecommerce",
      tags: ["E-commerce", "Payment", "Inventory"]
    }
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold text-white text-center mb-20"
        >
          Featured Work
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardGif {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
