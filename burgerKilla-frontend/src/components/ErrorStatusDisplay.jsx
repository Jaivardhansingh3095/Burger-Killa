import { BiErrorCircle } from "react-icons/bi";
import { AnimatePresence, motion } from "motion/react";

function ErrorStatusDisplay({ errorMessage, errorCode, onCloseHandler }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ".4", ease: "easeInOut" }}
        exit={{ opacity: 0, scale: 0.7, filter: "blur(10px)" }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-center gap-5 px-5 py-2 rounded-md bg-gray-50 max-w-[50%]"
      >
        <div className="flex items-center justify-center gap-2 text-xl font-bold tracking-wide text-red-500">
          <BiErrorCircle className="w-6 h-6" />
          <span>Error</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 px-5 font-semibold text-gray-600 w-[80%]">
          {errorMessage ? (
            <>
              {errorCode && <span>{errorCode}</span>}
              <span>{errorMessage}</span>
            </>
          ) : (
            <>
              <span>Something went wrong!</span>
              <span>Please check your connection.</span>
            </>
          )}
        </div>
        <button
          onClick={onCloseHandler}
          className="px-6 py-2 font-bold tracking-widest text-white rounded-md text-shadow-2xs text-shadow-gray-900 shadow-[1px_2px_5px_2px] shadow-gray-300 cursor-pointer bg-rose-500"
        >
          OK
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default ErrorStatusDisplay;
