import { IoCheckmarkCircle } from "react-icons/io5";

import { AnimatePresence, motion } from "motion/react";

function SuccessStatusDisplay({ message }) {
  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-center gap-5 py-10 text-center bg-white rounded-md px-15"
      >
        <motion.div
          initial={{
            opacity: 0,
            translateY: "10px",
            scale: 0.7,
            translate: "3px",
          }}
          animate={{
            opacity: 1,
            translateY: ["10px", "-2px", "0px"],
            translateX: ["3px", "-3px", "0px"],
            scale: [0.7, 1.3, 1],
          }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="relative flex items-center justify-center"
        >
          <IoCheckmarkCircle className="w-15 h-15 fill-green-500" />
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 1, 0], scale: [0.7, 1, 1.1] }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-20 h-20 border-3 border-green-200 rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ translateY: "10px", opacity: 0 }}
          animate={{ opacity: 1, translateY: "0px" }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center gap-2"
        >
          <p className="font-semibold tracking-wide text-gray-600">
            {message?.primary || "Great job!"}
          </p>
          <p className="font-light tracking-wide text-gray-900">
            {message?.secondary || "Destination on the way..."}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SuccessStatusDisplay;
