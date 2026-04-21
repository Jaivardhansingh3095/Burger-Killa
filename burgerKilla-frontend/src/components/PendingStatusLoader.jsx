import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";

// @loaderType
// account_creation ||  success_account

const accountStatus = ["creating account", "securing data", "wait a moment"];

const loginStatus = [
  "authenticating account",
  "fetching your data",
  "preparing the kitchen",
];

const updatePasswordStatus = [
  "verifying account",
  "analysing password",
  "wait a moment",
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

      if (
        loaderType === "updatePassword" &&
        loaderStep === updatePasswordStatus.length - 1
      )
        return;

      const loaderInterval = setInterval(() => {
        if (loaderType === "account_creation")
          setLoaderStep((prev) =>
            prev < accountStatus.length - 1 ? prev + 1 : prev
          );

        if (loaderType === "login")
          setLoaderStep((prev) => {
            return prev < loginStatus.length - 1 ? prev + 1 : prev;
          });

        if (loaderType === "updatePassword")
          setLoaderStep((prev) => {
            return prev < updatePasswordStatus.length - 1 ? prev + 1 : prev;
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
                : loaderType === "updatePassword"
                  ? updatePasswordStatus.length
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
                  : loaderType === "updatePassword"
                    ? updatePasswordStatus[loaderStep]
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
