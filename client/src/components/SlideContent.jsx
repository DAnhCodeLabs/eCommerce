import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// Cấu hình easing tùy chỉnh cho độ mượt tối đa
const smoothEase = [0.4, 0.0, 0.2, 1];

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.15,
    },
  },
};

const subtitleVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const titleVariant = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 15,
      mass: 0.8,
      velocity: 0,
      restDelta: 0.001, // Giảm ngưỡng dừng để mượt hơn
      restSpeed: 0.001, // Giảm tốc độ dừng
    },
  },
};

const descVariant = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 35,
      damping: 15,
      mass: 0.8,
      delay: 0.15,
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 30,
      damping: 15,
      mass: 0.8,
      delay: 0.3,
    },
  },
};

const SlideContent = ({ idx, img, activeIndex }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (activeIndex === idx) {
      controls.start("visible");
    } else {
      // Thêm transition mượt khi ẩn đi
      controls.start("hidden", {
        transition: { duration: 0.3, ease: "easeInOut" },
      });
    }
  }, [activeIndex, idx, controls]);

  return (
    <div className="flex items-center justify-between h-full w-full p-4 md:p-12 gap-4 overflow-hidden">
      <motion.div
        className="flex flex-col items-start justify-center w-1/2 h-full"
        variants={containerVariant}
        initial="hidden"
        animate={controls}
      >
        <motion.h3
          className="text-xl font-semibold mb-2 text-primary"
          variants={subtitleVariant}
        >
          Up To 50% Off
        </motion.h3>

        <motion.h2
          className="md:text-3xl text-2xl text-start font-bold mb-4 text-secondary"
          variants={titleVariant}
        >
          For Your First Goemart Shopping
        </motion.h2>

        <motion.p
          className="text-start text-text-secondary text-base hidden md:block"
          variants={descVariant}
        >
          There are many variations of passages orem psum available but the
          majority have suffered alteration in some form by injected humour.
        </motion.p>
      </motion.div>

      <div className="flex items-center justify-center md:h-100 md:w-100 h-50 w-50">
        <motion.img
          src={img}
          alt=""
          className="max-w-full h-auto will-change-transform"
          variants={imageVariant}
          initial="hidden"
          animate={controls}
          whileHover={{ scale: 1.03 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 12,
          }}
        />
      </div>
    </div>
  );
};

export default SlideContent;
