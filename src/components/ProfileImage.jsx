import React from 'react';
import { motion } from 'framer-motion';

const ProfileImage = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`relative ${className}`}
    >
      {/* Animated Background Rings */}
      <div className="absolute inset-0 rounded-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-blue-400/30 to-purple-400/30"
          style={{
            background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3))'
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border border-purple-400/20"
        />
      </div>

      {/* Profile Image Container */}
      <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-white/10 shadow-2xl">
        {/* Placeholder for actual image - Replace with your photo */}
        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
              AS
            </div>
            <p className="text-sm text-gray-400">Replace with</p>
            <p className="text-sm text-gray-400">your photo</p>
          </div>
        </div>
        
        {/* Uncomment and use this when you have your actual photo */}
        {/*
        <img
          src="/path-to-your-photo.jpg"
          alt="Adebusuyi Samuel - Fullstack Web Developer"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        */}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-blue-400/20" />
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
};

export default ProfileImage;
