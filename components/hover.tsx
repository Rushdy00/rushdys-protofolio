"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function TextHoverEffectDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      
      {/* Simple Black Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Header Section */}
      <div className="text-center mb-32 relative z-10 w-full max-w-6xl">
        <div className="relative">
          <h1 className="text-9xl md:text-[10rem] lg:text-[15rem] font-extrabold text-white text-center leading-none tracking-tighter opacity-90 hover:opacity-100 transition-all duration-300 mb-24 italic font-['Gathenia']">
            Connect
          </h1>
          
          {/* Description */}
          <p className="text-2xl md:text-4xl text-white/80 text-center max-w-4xl mx-auto mb-24 leading-relaxed font-['Gathenia']">
            Ready to bring your ideas to life? Let's collaborate and create something extraordinary together.
          </p>
        </div>
      </div>

      {/* Advanced Contact Form */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-12 md:p-20 relative overflow-hidden">
          
          {/* Form Content */}
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-white/90 mb-16 text-center font-['Gathenia']">
              Let's Create Something Amazing
            </h2>

            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label htmlFor="name" className="block text-white/70 mb-4 font-medium text-2xl group-hover:text-white transition-colors duration-300 font-['Gathenia']">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-8 py-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl text-white text-2xl placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-500 font-['Gathenia']"
                      placeholder="Enter your name"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="block text-white/70 mb-4 font-medium text-2xl group-hover:text-white transition-colors duration-300 font-['Gathenia']">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-8 py-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl text-white text-2xl placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-500 font-['Gathenia']"
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="message" className="block text-white/70 mb-4 font-medium text-2xl group-hover:text-white transition-colors duration-300 font-['Gathenia']">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-8 py-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl text-white text-2xl placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-500 resize-none font-['Gathenia']"
                    placeholder="Tell me about your project, goals, and how I can help bring your vision to life..."
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <button
                  type="submit"
                  className="relative group bg-white/10 backdrop-blur-sm text-white px-16 py-8 rounded-2xl font-semibold text-3xl border border-white/20 overflow-hidden font-['Gathenia']"
                  disabled={isSubmitted}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20" />
                  <span className="relative z-10">
                    {isSubmitted ? "Sending..." : "Send Message"}
                  </span>
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-24 pt-16 border-t border-white/[0.05] text-center relative z-10">
              <p className="text-white/50 mb-8 text-2xl font-['Gathenia']">
                Prefer to reach out directly?
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-white/70">
                <a
                  href="mailto:your.email@example.com"
                  className="group flex items-center gap-4 hover:text-white transition-colors duration-300 text-2xl font-['Gathenia']"
                >
                  <span className="w-3 h-3 bg-green-400 rounded-full group-hover:shadow-lg group-hover:shadow-green-400/50 transition-shadow duration-300"></span>
                  your.email@example.com
                </a>
                <a
                  href="https://www.linkedin.com/in/rushdy-abdelkarim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 hover:text-white transition-colors duration-300 text-2xl font-['Gathenia']"
                >
                  <span className="w-3 h-3 bg-blue-400 rounded-full group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-shadow duration-300"></span>
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
