import React from "react";
import { motion } from "framer-motion";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const Experience = () => {
  return (
    <motion.div 
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
        My <span className="text-purple">work experience</span>
      </motion.h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card, index) => (
          <motion.div
            key={card.id}
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
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            <Button
              duration={12000}
              borderRadius="1.75rem"
              className="group w-full h-full bg-[linear-gradient(110deg,rgba(12,14,35,0.95),rgba(12,14,35,0.95))] hover:bg-[linear-gradient(110deg,rgba(12,14,35,0.98),rgba(12,14,35,0.98))] transition-all duration-300"
            >
              <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  src={card.thumbnail}
                  alt={card.thumbnail}
                  className="lg:w-32 md:w-20 w-16 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="lg:ms-5">
                  <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    viewport={{ once: true }}
                    className="text-start text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                  >
                    {card.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.4 }}
                    viewport={{ once: true }}
                    className="text-start text-white/70 mt-3 font-medium"
                  >
                    {card.desc}
                  </motion.p>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
