"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  // Create particles for the timeline
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    duration: 2 + Math.random() * 2
  }));

  // Transform scroll progress to timeline position
  const timelineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center px-4 pt-20 md:pt-32 pb-20 overflow-hidden">
      {/* Timeline Container */}
      <div className="w-full max-w-6xl mx-auto mb-16 md:mb-32 relative">
        {/* Dynamic Timeline Line */}
        <motion.div 
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 transform md:-translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.4), rgba(255,255,255,0.8))",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.4), rgba(255,255,255,0.8))",
              filter: "blur(8px)",
              opacity: 0.5
            }}
            animate={{
              backgroundPosition: ["0% 0%", "0% 100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Particles */}
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute left-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white"
                initial={{ 
                  y: "0%",
                  x: "-50%",
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: "100%",
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear"
                }}
                style={{
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
                }}
              />
            ))}
          </AnimatePresence>

          {/* Glowing effect that follows scroll */}
          <motion.div
            className="absolute top-0 left-0 w-full h-8 md:h-12 bg-gradient-to-b from-white/50 to-transparent"
            style={{
              y: timelineY
            }}
          />
        </motion.div>

        {/* First Timeline Item */}
        <div className="relative mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-2xl group ml-16 md:ml-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Featured Project"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Timeline Dot */}
              <motion.div 
                className="absolute -left-6 md:-right-6 top-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full transform -translate-y-1/2 z-10"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)"
                }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Pulsing effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.9)"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6 px-4 md:px-0"
            >
              <div className="relative">
                <motion.span 
                  className="text-white/80 text-sm font-medium tracking-wider"
                  whileHover={{ scale: 1.1 }}
                >
                  2024
                </motion.span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
                  Featured Project
                </h2>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                This is a showcase of one of my recent projects that demonstrates my expertise in web development and design. The project combines modern technologies with creative solutions to deliver an exceptional user experience.
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Watch the video to see how I approach complex challenges and transform ideas into reality. This is just one example of the kind of work I can do for your project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-6 md:px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Second Timeline Item */}
        <div className="relative mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6 order-2 md:order-1 px-4 md:px-0"
            >
              <div className="relative">
                <motion.span 
                  className="text-white/80 text-sm font-medium tracking-wider"
                  whileHover={{ scale: 1.1 }}
                >
                  2023
                </motion.span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
                  Another Amazing Project
                </h2>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Here's another example of my work that showcases different aspects of my skills. This project focuses on creating an immersive user experience with cutting-edge technologies.
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                The video demonstrates how I tackle unique challenges and implement innovative solutions to create memorable digital experiences.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-6 md:px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                View Project
              </motion.button>
            </motion.div>

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-2xl group order-1 md:order-2 ml-16 md:ml-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Another Project"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Timeline Dot */}
              <motion.div 
                className="absolute -left-6 md:-left-6 top-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full transform -translate-y-1/2 z-10"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)"
                }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Pulsing effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.9)"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Third Timeline Item */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-2xl group ml-16 md:ml-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Latest Project"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Timeline Dot */}
              <motion.div 
                className="absolute -left-6 md:-right-6 top-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full transform -translate-y-1/2 z-10"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)"
                }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Pulsing effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.9)"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6 px-4 md:px-0"
            >
              <div className="relative">
                <motion.span 
                  className="text-white/80 text-sm font-medium tracking-wider"
                  whileHover={{ scale: 1.1 }}
                >
                  2022
                </motion.span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
                  Latest Innovation
                </h2>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                A groundbreaking project that pushes the boundaries of what's possible in web development. This showcases my ability to innovate and create unique solutions.
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Experience how I combine creativity with technical expertise to deliver exceptional results that exceed expectations.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-6 md:px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                Explore Project
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Contact Me
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's collaborate and build something amazing together.
          </p>
        </div>

        {/* Contact form container */}
        <div className="relative">
          {/* Simple transparent container */}
          <div 
            className="relative bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Form content */}
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Name and Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="group"
                  >
                    <label htmlFor="name" className="block text-white/80 mb-3 text-lg font-medium">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/20 rounded-2xl text-white text-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 group-hover:border-white/30"
                        placeholder="Enter your name"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Email input */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="group"
                  >
                    <label htmlFor="email" className="block text-white/80 mb-3 text-lg font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/20 rounded-2xl text-white text-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 group-hover:border-white/30"
                        placeholder="Enter your email"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                {/* Message input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="group"
                >
                  <label htmlFor="message" className="block text-white/80 mb-3 text-lg font-medium">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-6 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/20 rounded-2xl text-white text-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 resize-none group-hover:border-white/30"
                      placeholder="Tell me about your project and how I can help bring your vision to life..."
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Image/GIF above Send button */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0.7, 
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden"
                  >
                    <img
                      src={isHovered ? "/rumpelstiltskin-arsenko.gif" : "/pic12.png"}
                      alt="Contact Animation"
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Pulse effect when showing GIF */}
                    {isHovered && (
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex justify-center pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitted}
                    className="relative group bg-white/10 backdrop-blur-sm text-white px-12 py-4 rounded-2xl font-semibold text-xl border border-white/30 overflow-hidden transition-all duration-300 hover:bg-white/20 hover:border-white/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    
                    <span className="relative z-10 flex items-center gap-3">
                      {isSubmitted ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </motion.svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </form>

                             {/* Contact info */}
              <div className="mt-16 pt-8 border-t border-white/10 text-center">
                <p className="text-white/50 mb-8 text-lg">
                  Or connect with me directly
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white/70">
                  <motion.a
                    href="mailto:rushdyabdelkarim@gmail.com"
                    className="group flex items-center gap-4 hover:text-white transition-colors duration-300 text-lg bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 hover:border-white/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    rushdyabdelkarim@gmail.com
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/rushdy-abdelkarim/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 hover:text-white transition-colors duration-300 text-lg bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 hover:border-white/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 