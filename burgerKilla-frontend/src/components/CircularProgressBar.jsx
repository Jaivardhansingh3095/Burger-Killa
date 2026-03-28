import { motion } from "motion/react";

function CircularProgressBar({ currentStep, totalSteps }) {
  const radius = 36;
  const strokeWidth = 6;
  const progress = currentStep / totalSteps;

  return (
    <div className="flex items-center justify-center w-15 h-15">
      <svg
        className="w-full h-full origin-center transform -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          className="text-gray-200"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-amber-400"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: ".4", ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default CircularProgressBar;
