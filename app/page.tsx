"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarDemo } from "@/components/Nav-bi";
import { ContainerTextFlipDemo } from "@/components/text-flip";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { HeroParallaxDemo } from "@/components/hero-paralla";
import Footer from "@/components/Footer";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingAnimation key="loader" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative flex flex-col overflow-hidden mx-auto"
          >
            <NavbarDemo />
            <ContainerTextFlipDemo />
            <HeroParallaxDemo />
            <TechStack />
            <Contact />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
