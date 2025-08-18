import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const ScrollFadeIn = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ animate 1 lần khi hiển thị
    threshold: 0.1, // Bao nhiêu phần tử hiển thị thì trigger
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn;
