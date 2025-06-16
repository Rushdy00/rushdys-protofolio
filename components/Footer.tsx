import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/yourusername",
      label: "GitHub"
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      href: "https://twitter.com/yourusername",
      label: "Twitter"
    },
    {
      icon: <FaLinkedinIn className="w-5 h-5" />,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn"
    }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full py-10 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-white/60 text-sm"
          >
            © {new Date().getFullYear()} Rushdy. All rights reserved.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#CBACF9" }}
                transition={{ duration: 0.2 }}
                className="text-white/60 hover:text-purple transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
