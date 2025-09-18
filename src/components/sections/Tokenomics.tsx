"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Tokenomics: React.FC = () => {
  const tokenomicsData = [
    {
      category: "Public Sale",
      percentage: 60,
      amount: "600,000,000 GSTD",
      description: "Available for public purchase",
      color: "from-[#FF6B35] to-[#FF8E53]"
    },
    {
      category: "Liquidity Pool",
      percentage: 30,
      amount: "300,000,000 GSTD", 
      description: "For DEX liquidity provision",
      color: "from-[#4ECDC4] to-[#44A08D]"
    },
    {
      category: "Team & Development",
      percentage: 10,
      amount: "100,000,000 GSTD",
      description: "Team allocation & development fund",
      color: "from-[#F7DC6F] to-[#F1C40F]"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0A0A0B] via-[#1A1A1B] to-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent mb-6"
          >
            Tokenomics
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Transparent and sustainable token distribution designed for long-term growth and community engagement
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Chart Section */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Outer ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2"
                />
                
                {/* Public Sale - 60% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.6} ${2 * Math.PI * 40}`}
                  strokeDashoffset={`-${2 * Math.PI * 40 * 0.25}`}
                  className="animate-pulse"
                />
                
                {/* Liquidity Pool - 30% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient2)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.3} ${2 * Math.PI * 40}`}
                  strokeDashoffset={`-${2 * Math.PI * 40 * 0.85}`}
                />
                
                {/* Team & Development - 10% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient3)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.1} ${2 * Math.PI * 40}`}
                  strokeDashoffset={`-${2 * Math.PI * 40 * 0.95}`}
                />

                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#FF8E53" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4ECDC4" />
                    <stop offset="100%" stopColor="#44A08D" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F7DC6F" />
                    <stop offset="100%" stopColor="#F1C40F" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1B</div>
                  <div className="text-sm text-gray-400">Total Supply</div>
                  <div className="text-xs text-gray-500 mt-1">GSTD Tokens</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legend Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            {tokenomicsData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group"
              >
                <div className="flex items-center space-x-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} shadow-lg`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#FF6B35] transition-colors">
                        {item.category}
                      </h3>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                        {item.percentage}%
                      </span>
                    </div>
                    <p className="text-lg text-[#4ECDC4] font-medium mb-1">
                      {item.amount}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] bg-clip-text text-transparent mb-2">
              No Taxes
            </div>
            <p className="text-gray-300">Zero transaction fees on transfers and trading</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] bg-clip-text text-transparent mb-2">
              Fair Launch
            </div>
            <p className="text-gray-300">No presale, no private allocations, equal opportunity for all</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#F7DC6F] to-[#F1C40F] bg-clip-text text-transparent mb-2">
              Community Owned
            </div>
            <p className="text-gray-300">Majority of tokens distributed to the community</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;
