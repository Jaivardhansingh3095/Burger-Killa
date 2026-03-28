import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";

// @loaderType
// account_creation ||  success_account

const accountStatus = ["creating account", "securing data", "wait a moment"];

const loginStatus = [
  "Authenticating",
  "fetching your data",
  "preparing the kitchen",
];

function PendingStatusLoader({ isVisible, onCloseHandler, loaderType }) {
  const [loaderStep, setLoaderStep] = useState(0);

  useEffect(
    function () {
      if (!isVisible) return;

      if (
        loaderType === "account_creation" &&
        loaderStep === accountStatus.length - 1
      )
        return;

      if (loaderType === "login" && loaderStep === loginStatus.length - 1)
        return;

      const loaderInterval = setInterval(() => {
        console.log(loaderType);
        if (loaderType === "account_creation")
          setLoaderStep((prev) =>
            prev < accountStatus.length - 1 ? prev + 1 : prev
          );

        if (loaderType === "login")
          setLoaderStep((prev) => {
            return prev < loginStatus.length - 1 ? prev + 1 : prev;
          });
      }, 1000);
      return () => clearInterval(loaderInterval);
    },
    [isVisible]
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col items-center justify-center gap-3 px-5 py-5 bg-[radial-gradient(circle_farthest-corner_at_center_center,#ffffff_0%,#ededed_100%)] rounded-lg h-40 w-65 sm:h-45 sm:w-70"
    >
      <div className="flex items-center justify-center basis-1/3">
        <CircularProgressBar
          currentStep={loaderStep + 1}
          totalSteps={
            loaderType === "account_creation"
              ? accountStatus.length
              : loaderType === "login"
                ? loginStatus.length
                : 4
          }
        />
      </div>
      <div className="flex items-center justify-center w-full gap-2 basis-2/3">
        <AnimatePresence mode="wait">
          <motion.span
            key={loaderStep}
            initial={{ opacity: 0, translateY: "-10px" }}
            animate={{ opacity: 100, translateY: "0px" }}
            exit={{
              opacity: 0,
              translateY: "10px",
            }}
            transition={{
              duration: ".4",
              ease: "easeInOut",
            }}
            className="flex items-center justify-center font-semibold tracking-wide text-gray-500 basis-4/5"
          >
            <span>
              {loaderType === "account_creation"
                ? accountStatus[loaderStep]
                : loaderType === "login"
                  ? loginStatus[loaderStep]
                  : accountStatus[loaderStep]}
            </span>
          </motion.span>
        </AnimatePresence>
        <span className="text-left animate-bounce basis-1/5">...</span>
      </div>
    </div>
  );
}

export default PendingStatusLoader;

// const [currentStep, setCurrentStep] = useState(0);

// useEffect(() => {
//   if (!isVisible) return;

//   // Cycle through steps every 2 seconds
//   const interval = setInterval(() => {
//     setCurrentStep((prev) =>
//       prev < accountStatus.length - 1 ? prev + 1 : prev
//     );
//   }, 2000);

//   return () => clearInterval(interval);
// }, [isVisible]);

// if (!isVisible) return null;

// return (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//     <div className="p-8 text-center bg-white shadow-xl rounded-2xl w-80">
//       {/* Simple spinner icon (optional) */}
//       <div className="flex justify-center mb-6">
//         <div className="w-10 h-10 border-4 border-indigo-200 rounded-full border-t-indigo-600 animate-spin" />
//       </div>

//       <div className="relative h-8 overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.p
//             key={accountStatus[currentStep]}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -20, opacity: 0 }}
//             transition={{ duration: 0.4, ease: "easeInOut" }}
//             className="absolute w-full font-medium text-gray-700"
//           >
//             {accountStatus[currentStep]}
//           </motion.p>
//         </AnimatePresence>
//       </div>

//       {/* Progress bar */}
//       <div className="mt-6 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
//         <motion.div
//           className="h-full bg-indigo-600"
//           initial={{ width: "0%" }}
//           animate={{
//             width: `${((currentStep + 1) / accountStatus.length) * 100}%`,
//           }}
//         />
//       </div>
//     </div>
//   </div>
// );
