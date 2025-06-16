"use client";

import React from "react";
import { motion } from "framer-motion";
import { companies } from "@/data";

const Clients = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="py-20 w-full"
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="heading"
      >
        Trusted by <span className="text-purple">leading companies</span>
      </motion.h1>

      <div className="mt-20 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10">
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ 
              opacity: 0, 
              y: 30,
              scale: 0.8
            }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            whileHover={{ 
              scale: 1.05,
              filter: "brightness(1.1)"
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
            <div className="relative z-10 bg-[rgba(12,14,35,0.5)] backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-purple/50 transition-colors duration-300">
              <motion.img
                initial={{ scale: 0.8, opacity: 0.5 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                src={company.img}
                alt={company.name}
                className="w-16 h-16 object-contain"
              />
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                viewport={{ once: true }}
                src={company.nameImg}
                alt={company.name}
                className="w-24 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Clients;
