"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  SiPython, 
  SiNextdotjs, 
  SiJavascript, 
  SiTypescript, 
  SiDjango, 
  SiPostgresql, 
  SiHtml5, 
  SiCss3 
} from "react-icons/si";
import FluidGlass from "./FluidGlass";

const technologies = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Django", icon: SiDjango, color: "#092E20" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
];

export function TechStack() {
  // Duplicate the array to create seamless infinite scroll
  const duplicatedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <div className="w-full py-20 pb-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-4"
        >
          Languages i work with
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-center text-lg max-w-2xl mx-auto"
        >
          Technologies I work with to bring ideas to life
        </motion.p>
      </div>

      {/* Infinite Scrolling Container */}
      <div className="relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
        
        {/* Scrolling Icons */}
        <motion.div
          className="flex gap-16 items-center"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{ width: "max-content" }}
        >
          {duplicatedTechs.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center gap-4 min-w-[120px] group"
                whileHover={{ 
                  scale: 1.1,
                  y: -10 
                }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-white/30 transition-all duration-300"
                  style={{ 
                    boxShadow: `0 0 30px ${tech.color}20`,
                  }}
                >
                  <IconComponent 
                    size={48} 
                    style={{ color: tech.color }}
                    className="group-hover:drop-shadow-lg transition-all duration-300"
                  />
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ 
                      background: `radial-gradient(circle, ${tech.color} 0%, transparent 70%)`,
                    }}
                  />
                </div>
                
                <span 
                  className="text-white/80 font-medium text-sm group-hover:text-white transition-colors duration-300"
                  style={{ 
                    textShadow: `0 0 10px ${tech.color}50` 
                  }}
                >
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Secondary row scrolling in opposite direction for more dynamic effect */}
      <div className="relative mt-16">
        <motion.div
          className="flex gap-16 items-center"
          animate={{
            x: [-2000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          style={{ width: "max-content" }}
        >
          {duplicatedTechs.reverse().map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={`reverse-${tech.name}-${index}`}
                className="flex items-center justify-center min-w-[80px] group"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360 
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <IconComponent 
                    size={32} 
                    style={{ color: tech.color }}
                    className="opacity-40 group-hover:opacity-80 transition-all duration-300"
                  />
                  
                  {/* Subtle glow */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"
                    style={{ 
                      background: `radial-gradient(circle, ${tech.color} 0%, transparent 50%)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* FluidGlass Full Screen 3D Interactive Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-20 w-full"
      >
        
        {/* Full screen FluidGlass */}
        <div className="relative w-full h-screen min-h-[100vh] overflow-hidden bg-black">
          
                      <FluidGlass 
              mode="lens"
              lensProps={{
                scale: 0.25,
                ior: 1.15,
                thickness: 5,
                chromaticAberration: 0.02,
                anisotropy: 0.01,
                navItems: [
                  { label: "Skills", link: "#skills" },
                  { label: "Projects", link: "#projects" },
                  { label: "Experience", link: "#experience" },
                  { label: "Contact", link: "#contact" },
                ]
              }}
            />
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-center"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium tracking-wider uppercase">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 