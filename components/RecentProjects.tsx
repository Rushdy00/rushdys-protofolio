"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="py-20 w-full overflow-hidden"
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="heading"
      >
        Recent <span className="text-purple">Projects</span>
      </motion.h1>

      <div className="mt-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ 
              opacity: 0, 
              y: 50,
              scale: 0.9
            }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            whileHover={{ 
              scale: 1.02,
              y: -5
            }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(12, 14, 35)"
              gradientBackgroundEnd="rgb(17, 19, 40)"
              firstColor="18, 113, 255"
              secondColor="221, 74, 255"
              thirdColor="100, 220, 255"
              fourthColor="200, 50, 50"
              fifthColor="180, 180, 50"
              pointerColor="140, 100, 255"
              className="rounded-xl border border-[rgba(255,255,255,0.1)] p-6 h-full"
            >
              <div className="relative z-10">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  src={project.img}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                  viewport={{ once: true }}
                  className="text-xl font-bold text-white mb-3"
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.4 }}
                  viewport={{ once: true }}
                  className="text-white/70 mb-4"
                >
                  {project.des}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {project.iconLists.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1 + techIndex * 0.1 
                      }}
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </BackgroundGradientAnimation>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentProjects;
