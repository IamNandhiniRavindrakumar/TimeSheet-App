// src/components/MotivationalBox.js
import React from "react";
import { motion } from "framer-motion";

const MotivationalBox = ({ message }) => {
  return (
    <motion.div 
      className="alert alert-success" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}>
      <strong>Well Done!</strong> {message}
    </motion.div>
  );
};

export default MotivationalBox;

