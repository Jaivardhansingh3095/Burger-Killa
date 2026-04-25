import { IoChevronBack } from "react-icons/io5";
import { TbPassword } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { fetchUser, selectUser } from "../../authentication/userSlice";
import ErrorDisplayNoAuthorization from "../../../components/ErrorDisplayNoAuthorization";
import Loader from "../../../components/Loader";
import { useState } from "react";
import * as z from "zod";
import { motion } from "motion/react";
import useOutsideClick from "../../../hook/useOutsideCllick";
import Modal from "../../../components/Modal";
import PendingStatusLoader from "../../../components/PendingStatusLoader";
import ErrorStatusDisplay from "../../../components/ErrorStatusDisplay";
import SuccessStatusDisplay from "../../../components/SuccessStatusDisplay";
import { useEffect } from "react";
import { useUpdatePassword } from "../useUpdatePassword";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const passwordValidator = z.object({
  password: z
    .string()
    .min(8, "password must contain minumum 8 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must contain one or more lower, upper, digit and special character"
    ),
});

function UpdateContact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const {
    openModal: pendingUpdateModal,
    handleModalClose: handlePendingUpdateClose,
  } = useOutsideClick();
  const {
    openModal: successUpdateModal,
    handleModalClose: handleSuccessUpdateClose,
  } = useOutsideClick();
  const {
    openModal: errorUpdateModal,
    handleModalClose: handleErrorUpdateClose,
  } = useOutsideClick();
  const { updatePassword, updatePasswordStatus, updateError } =
    useUpdatePassword();

  useEffect(
    function () {
      if (updatePasswordStatus === "error") {
        handlePendingUpdateClose();
        handleErrorUpdateClose();
      }
      let successDisplayTimeout;

      if (updatePasswordStatus === "success") {
        handlePendingUpdateClose();
        handleSuccessUpdateClose();
        successDisplayTimeout = setTimeout(() => {
          localStorage.removeItem("jwt_token");
          dispatch(fetchUser());
          handleSuccessUpdateClose();
          navigate("/login", {
            replace: true,
          });
        }, 2000);
      }

      return () => {
        clearTimeout(successDisplayTimeout);
      };
    },
    [updatePasswordStatus]
  );

  if (currentUser.status === "pending") {
    return (
      <div className="max-w-[600px] h-screen mx-auto flex justify-center items-center">
        <div className="w-full max-h-[600px] flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (currentUser.status === "error") {
    return (
      <div className="max-w-[600px] h-screen mx-auto flex justify-center items-center">
        <div className="w-full max-h-[600px]">
          <ErrorDisplayNoAuthorization message={currentUser?.error} />
        </div>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      //Validating newPassword
      passwordValidator.parse({ password: newPassword });

      if (newPassword !== confirmPassword)
        throw new Error("password do not match!");

      updatePassword({ oldPassword, newPassword });
      handlePendingUpdateClose();

      setError((prev) => ({
        ...prev,
        confirmPassword: "",
        newPassword: "",
      }));
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError((prev) => ({
          ...prev,
          newPassword: e.issues[0].message,
          confirmPassword: "",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          newPassword: "",
          confirmPassword: e.message,
        }));
      }
    }
  }

  return (
    <div className="flex justify-center w-full min-h-screen py-3 bg-gray-50">
      <div className="grow-1 md:min-w-[600px] w-full lg:min-w-[900px] xl:max-w-[1250px] bg-white rounded-lg shadow-[1px_1px_4px_2px,-1px_-1px_4px_2px] shadow-gray-100">
        <div className="flex flex-col h-full gap-5 px-1 py-2 sm:px-5">
          <div className="flex items-center justify-start w-full pt-2 pb-5 border-b border-dashed border-b-gray-300">
            <Link
              to={"/"}
              className="flex items-center justify-start gap-2 text-xl font-bold tracking-wide text-gray-700 transition-colors duration-200 ease-in cursor-pointer hover:text-primary"
            >
              <IoChevronBack className="w-6 h-6" />
              <span>Home</span>
            </Link>
          </div>
          <div className="flex flex-col w-full gap-10 px-2 py-2 grow-1">
            <div className="flex flex-col w-full gap-5">
              <h4 className="pb-1 font-bold tracking-wider text-gray-600 uppercase sm:text-lg md:text-xl">
                Update Password
              </h4>
              <div className="flex flex-col items-center w-full gap-5 py-5">
                <div className="flex items-center justify-center w-full md:w-3/4 lg:w-1/2">
                  <label
                    htmlFor="oldPassword"
                    className="font-bold tracking-wide basis-1/3 text-xs sm:text-[1rem]"
                  >
                    Old Password :
                  </label>
                  <div className="flex flex-col gap-1 basis-2/3">
                    <input
                      type="text"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 font-semibold tracking-wide text-gray-600 bg-gray-200/80 rounded-sm focus:outline-none inset-shadow-[1px_1px_4px_1px] inset-shadow-gray-300"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center w-full md:w-3/4 lg:w-1/2">
                  <label
                    htmlFor="newPassword"
                    className="font-bold tracking-wide basis-1/3 text-xs sm:text-[1rem]"
                  >
                    New Password :
                  </label>
                  <div className="flex flex-col gap-1 basis-2/3">
                    <input
                      type="text"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-2 rounded-sm sm:px-3 py-1 sm:py-2 font-semibold tracking-wide text-gray-600 bg-gray-200/80 focus:outline-none inset-shadow-[1px_1px_4px_1px] inset-shadow-gray-300"
                      required
                    />
                    {error.newPassword && (
                      <motion.p
                        initial={{
                          opacity: 0,
                          translateY: "-10px",
                        }}
                        animate={{
                          opacity: 100,
                          translateY: ["-10px", "2px", "0px"],
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className="w-full px-2  text-xs bg-red-300 py-0.5 text-gray-900"
                      >
                        <span className="text-red-600">*</span>{" "}
                        {error?.newPassword}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center w-full md:w-3/4 lg:w-1/2">
                  <label
                    htmlFor="confirmPassword"
                    className="font-bold tracking-wide basis-1/3 text-xs sm:text-[1rem]"
                  >
                    Confirm Password :
                  </label>
                  <input
                    type="text"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="grow-1 px-2 rounded-sm sm:px-3 py-1 sm:py-2 font-semibold tracking-wide text-gray-600 bg-gray-200/80 focus:outline-none inset-shadow-[1px_1px_4px_1px] inset-shadow-gray-300"
                    required
                  />
                </div>
                {error.confirmPassword && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      translateY: "-10px",
                    }}
                    animate={{
                      opacity: 100,
                      translateY: ["-10px", "2px", "0px"],
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="flex items-center justify-start w-full gap-2 text-red-500 sm:pl-2 md:w-3/4 lg:w-1/2"
                  >
                    <TbPassword className="w-6 h-6" />
                    <span className="text-sm sm:text-[1rem] font-bold tracking-wide lg:text-lg">
                      Password do not match!
                    </span>
                  </motion.p>
                )}
                <div className="flex items-center justify-center mt-2 sm:w-1/2">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 sm:text-lg font-bold tracking-wider text-white uppercase rounded-lg text-shadow-2xs text-shadow-amber-900 bg-primary shadow-[1px_1px_2px_1px] shadow-amber-900 cursor-pointer active:scale-98 active:translate-y-1  active:shadow-[0px_1px_7px] active:shadow-gray-900 transition-all duration-100 ease-linear"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pendingUpdateModal && (
        <Modal
          open={pendingUpdateModal}
          onModalClose={handlePendingUpdateClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-full h-full"
          >
            <PendingStatusLoader
              isVisible={pendingUpdateModal}
              onCloseHandler={handlePendingUpdateClose}
              loaderType="updatePassword"
            />
          </div>
        </Modal>
      )}
      {errorUpdateModal && (
        <Modal open={errorUpdateModal} onModalClose={handleErrorUpdateClose}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-full h-full"
          >
            <ErrorStatusDisplay
              errorMessage={updateError?.message}
              errorCode={updateError?.statusCode}
              onCloseHandler={handleErrorUpdateClose}
            />
          </div>
        </Modal>
      )}
      {successUpdateModal && (
        <Modal
          open={successUpdateModal}
          onModalClose={handleSuccessUpdateClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-full h-full"
          >
            <SuccessStatusDisplay
              message={{
                primary: "Password Updated Successfully",
                secondary: "signing out your account ...",
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UpdateContact;

// <div className="flex items-center justify-center w-full gap-10">
//   <button
//     onClick={handlePendingUpdateClose}
//     className="px-6 py-2 text-white rounded-lg cursor-pointer bg-primary"
//   >
//     Pending
//   </button>
//   <button
//     onClick={handleErrorUpdateClose}
//     className="px-6 py-2 text-white rounded-lg cursor-pointer bg-primary"
//   >
//     Error
//   </button>
//   <button
//     onClick={handleSuccessUpdateClose}
//     className="px-6 py-2 text-white rounded-lg cursor-pointer bg-primary"
//   >
//     Success
//   </button>
// </div>;
