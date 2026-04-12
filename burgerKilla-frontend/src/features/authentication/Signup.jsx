import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useSignup from "./useSignup";
import useOutsideClick from "../../hook/useOutsideCllick";
import Modal from "../../components/Modal";
import PendingStatusLoader from "../../components/PendingStatusLoader";
import ErrorStatusDisplay from "../../components/ErrorStatusDisplay";
import SuccessStatusDisplay from "../../components/SuccessStatusDisplay";
import { useSelector } from "react-redux";
import { selectUser } from "./userSlice";
import LoggedRestrictionDisplay from "../../components/LoggedRestrictionDisplay";

const radioItems = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const formSchema = z.object({
  name: z
    .string()
    .min(1, "name is required.")
    .min(5, "name should contain equal or more than 5 characters.")
    .regex(/(^[a-zA-Z\s]+$)/, "name should only contains letters"),
  email: z.email("invalid email address").min(1, "email is required."),
  phone: z.coerce
    .string()
    .min(1, "phone is required")
    .regex(
      /^[1-9][0-9]{9}$/,
      "Phone must be a 10-digit number not starting with 0"
    ),
  password: z.coerce
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must conatin one or more lower, upper, digit and special character"
    )
    .min(8, "password must contain minumum 8 characters."),
});

// console.log(
//   validationrSchema.safeParse({
//     name: "Jaiardhan",
//     email: "jaiardhan@xample.com",
//     phone: "8989898989",
//     password: "Jai11419123@",
//   }).success
// );

function SignUp() {
  const currentUser = useSelector(selectUser);
  const [page, setPage] = useState(1);
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const { signup, signupStatus, signupError } = useSignup();
  const { openModal: pendingModal, handleModalClose: handlePendingClose } =
    useOutsideClick();
  const { openModal: errorModal, handleModalClose: handleErrorClose } =
    useOutsideClick();
  const { openModal: successModal, handleModalClose: handleSuccessClose } =
    useOutsideClick();

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      gender: "male",
      dob: "",
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        console.log("password do not match");
        return;
      }
      console.log(value);
      signup({
        name: value.name,
        email: value.email,
        phoneNumber: value.phone,
        password: value.password,
        dob: value.dob,
        gender: value.gender,
      });
    },
    validators: {
      onSubmit: formSchema,
      onBlur: formSchema,
    },
  });

  useEffect(
    function () {
      if (signupStatus === "idle" || !signupStatus) return;

      if (signupStatus === "pending") {
        handlePendingClose();
      }

      if (signupStatus === "error") {
        handlePendingClose();
        handleErrorClose();
      }
      let successTimeout;

      if (signupStatus === "success") {
        handlePendingClose();
        handleSuccessClose();
        successTimeout = setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }

      return () => {
        clearTimeout(successTimeout);
      };
    },
    [signupStatus]
  );

  if (
    currentUser.user &&
    signupStatus !== "pending" &&
    signupStatus !== "success"
  ) {
    return (
      <div className="w-full h-screen bg-[linear-gradient(90deg,#ffffff_0%,#fff600_130%)]">
        <div className="flex items-center justify-center w-full h-full">
          <LoggedRestrictionDisplay />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[linear-gradient(90deg,#ffffff_0%,#fff600_130%)]">
      <div className="flex items-center w-full h-full">
        <div className="hidden h-full md:block basis-1/3">
          {/* <div className="flex flex-col items-center justify-center w-full h-full gap-5">
            <button
              onClick={handlePendingClose}
              className="p-5 text-lg text-white rounded-md cursor-pointer bg-amber-500"
            >
              Pending
            </button>
            <button
              onClick={handleSuccessClose}
              className="p-5 text-lg text-white rounded-md cursor-pointer bg-amber-500"
            >
              Success
            </button>
            <button
              onClick={handleErrorClose}
              className="p-5 text-lg text-white rounded-md cursor-pointer bg-amber-500"
            >
              Error
            </button>
          </div> */}
        </div>
        <div className="w-full h-full md:basis-2/3">
          <div className="flex items-center justify-center w-full h-full">
            <div className="h-[85%] w-[85%] md:h-[80%] lg:w-[75%] xl:w-[60%] bg-white rounded-lg shadow-[1px_2px_5px_2px,-1px_-2px_5px_2px] shadow-amber-300/35 flex flex-col items-center">
              <div className="flex items-center justify-start w-full gap-10 px-10 py-5 text-lg custom-mobile-text-size custom-laptop-text-size">
                <Link
                  to="/"
                  className="relative font-bold tracking-wide text-amber-400 text-shadow-2xs text-shadow-gray-300  after:absolute after:left-0 after:top-full after:w-full after:h-[3px] after:bg-amber-400 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-in-out"
                >
                  Home
                </Link>

                <Link
                  to="/login"
                  className="relative font-bold tracking-wide text-amber-400 text-shadow-2xs text-shadow-gray-300 after:absolute after:left-0 after:top-full after:w-full after:h-[3px] after:bg-amber-400 after:origin-left after:scale-0 hover:after:scale-100 after:transition-transform after:duration-500 after:ease-in-out"
                >
                  Login
                </Link>
              </div>
              <div className="w-full px-5 py-4 grow-1">
                <div className="flex flex-col w-full h-full gap-3 rounded-lg bg-yellow-50">
                  <div className="flex items-center justify-end w-full gap-1 px-5 py-2">
                    <div
                      onClick={() => {
                        if (page === 1) return;
                        setPage(1);
                      }}
                      className={`cursor-pointer flex justify-center items-center w-10 h-4 bg-white border rounded-full border-amber-500 `}
                    >
                      {page === 1 && (
                        <AnimatePresence>
                          <motion.span
                            initial={{
                              translateX: "20px",
                              opacity: 40,
                            }}
                            animate={{
                              opacity: 100,
                              translateX: ["20px", "-5px", "0px"],
                            }}
                            transition={{
                              duration: ".4",
                              ease: "easeInOut",
                            }}
                            exit={{
                              opacity: 0,
                            }}
                            className="w-[85%] h-[80%] bg-amber-500 top-[2.3px] left-[2.5px] rounded-full"
                          />
                        </AnimatePresence>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        if (page === 2) return;
                        setPage(2);
                      }}
                      className={`cursor-pointer flex justify-center items-center w-10 h-4 bg-white border rounded-full border-amber-500 `}
                    >
                      {page === 2 && (
                        <AnimatePresence>
                          <motion.span
                            initial={{
                              translateX: "20px",
                              opacity: 40,
                            }}
                            animate={{
                              opacity: 100,
                              translateX: ["-20px", "5px", "0px"],
                            }}
                            transition={{
                              duration: ".4",
                              ease: "easeInOut",
                            }}
                            exit={{
                              opacity: 0,
                            }}
                            className="w-[85%] h-[80%] bg-amber-500 top-[2.3px] left-[2.5px] rounded-full"
                          />
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-5 grow-1">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (page === 1) {
                          setPage(2);
                          return;
                        }
                        handleSubmit();
                      }}
                      className="flex flex-col w-full h-full gap-5"
                    >
                      {page === 1 && (
                        <>
                          <AnimatePresence>
                            <motion.div
                              initial={{
                                opacity: 0,
                                translateY: "-10px",
                              }}
                              animate={{
                                opacity: 100,
                                translateY: ["-10px", "1px", "0px"],
                              }}
                              transition={{
                                duration: ".3",
                                ease: "easeIn",
                              }}
                              className="flex flex-col gap-1"
                            >
                              <Field
                                name="name"
                                children={(field) => {
                                  const { errors, isTouched } =
                                    field.state.meta;
                                  return (
                                    <>
                                      <label
                                        htmlFor={field.name}
                                        className="hidden w-full pl-1 text-lg font-bold tracking-wider md:block text-amber-400"
                                      >
                                        Name
                                      </label>
                                      <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                        placeholder="Name"
                                        type="text"
                                        className="w-full tracking-wide py-2 px-3  font-semibold text-gray-600 bg-white rounded-lg outline-none focus:outline-none shadow-[0px_1px_10px_2px] shadow-amber-100 md:placeholder:text-white"
                                      />
                                      {errors?.length && isTouched ? (
                                        <motion.span
                                          initial={{
                                            translateY: "-4px",
                                            opacity: 0,
                                          }}
                                          animate={{
                                            opacity: 100,
                                            translateY: ["-4px", "1px", "0px"],
                                          }}
                                          transition={{
                                            duration: ".3",
                                            ease: "easeIn",
                                          }}
                                          className="w-full px-1 py-0.5 text-xs text-red-400 font-semibold"
                                        >
                                          * {errors[0].message}
                                        </motion.span>
                                      ) : null}
                                    </>
                                  );
                                }}
                              />
                            </motion.div>
                            <motion.div
                              initial={{
                                opacity: 0,
                                translateY: "-10px",
                              }}
                              animate={{
                                opacity: 100,
                                translateY: ["-10px", "1px", "0px"],
                              }}
                              transition={{
                                duration: ".3",
                                ease: "easeIn",
                              }}
                              className="flex flex-col gap-1"
                            >
                              <Field
                                name="email"
                                children={(field) => {
                                  const { errors, isTouched } =
                                    field.state.meta;
                                  return (
                                    <>
                                      <label
                                        htmlFor={field.name}
                                        className="hidden w-full pl-1 text-lg font-bold tracking-wider md:block text-amber-400"
                                      >
                                        Email
                                      </label>
                                      <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                        placeholder="Email"
                                        type="email"
                                        className="w-full tracking-wide py-2 px-3  font-semibold text-gray-600 bg-white rounded-lg outline-none focus:outline-none shadow-[0px_1px_10px_2px] shadow-amber-100 md:placeholder:text-white"
                                      />
                                      {errors?.length && isTouched ? (
                                        <motion.span
                                          initial={{
                                            translateY: "-4px",
                                            opacity: 0,
                                          }}
                                          animate={{
                                            opacity: 100,
                                            translateY: ["-4px", "1px", "0px"],
                                          }}
                                          transition={{
                                            duration: ".3",
                                            ease: "easeIn",
                                          }}
                                          className="w-full px-1 py-0.5 text-xs text-red-400 font-semibold"
                                        >
                                          * {errors[0].message}
                                        </motion.span>
                                      ) : null}
                                    </>
                                  );
                                }}
                              />
                            </motion.div>
                            <motion.div
                              initial={{
                                opacity: 0,
                                translateY: "-10px",
                              }}
                              animate={{
                                opacity: 100,
                                translateY: ["-10px", "1px", "0px"],
                              }}
                              transition={{
                                duration: ".3",
                                ease: "easeIn",
                              }}
                              className="flex flex-col gap-1"
                            >
                              <Field
                                name="phone"
                                children={(field) => {
                                  const { errors, isTouched } =
                                    field.state.meta;
                                  return (
                                    <>
                                      <label
                                        htmlFor={field.name}
                                        className="hidden w-full pl-1 text-lg font-bold tracking-wider md:block text-amber-400"
                                      >
                                        Phone
                                      </label>
                                      <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                        placeholder="Phone"
                                        type="number"
                                        className="w-full tracking-wide py-2 px-3  font-semibold text-gray-600 bg-white rounded-lg outline-none focus:outline-none shadow-[0px_1px_10px_2px] shadow-amber-100 md:placeholder:text-white"
                                      />
                                      {errors?.length && isTouched ? (
                                        <motion.span
                                          initial={{
                                            translateY: "-4px",
                                            opacity: 0,
                                          }}
                                          animate={{
                                            opacity: 100,
                                            translateY: ["-4px", "1px", "0px"],
                                          }}
                                          transition={{
                                            duration: ".3",
                                            ease: "easeIn",
                                          }}
                                          className="w-full px-1 py-0.5 text-xs text-red-400 font-semibold"
                                        >
                                          * {errors[0].message}
                                        </motion.span>
                                      ) : null}
                                    </>
                                  );
                                }}
                              />
                            </motion.div>
                            <motion.div
                              initial={{
                                opacity: 0,
                              }}
                              animate={{
                                opacity: 100,
                              }}
                              transition={{
                                duration: ".3",
                                ease: "easeIn",
                              }}
                              className="flex flex-col items-start justify-start gap-10 pl-2 sm:flex-row"
                            >
                              <Field
                                name="gender"
                                children={(field) => (
                                  <>
                                    {radioItems.map((item) => (
                                      <div key={item.value}>
                                        <input
                                          type="radio"
                                          id={item.value}
                                          name={field.name}
                                          className="hidden peer"
                                          value={item.value}
                                          onChange={(e) =>
                                            field.handleChange(e.target.value)
                                          }
                                          checked={
                                            field.state.value === item.value
                                          }
                                          required
                                        />
                                        <label
                                          htmlFor={item.value}
                                          className={`relative flex justify-center text-amber-400 font-bold text-lg items-center tracking-wider before:inline-block  before:h-5 before:w-5 before:rounded-full before:border-2 before:border-amber-400 before:mr-2 after:inline-block  after:h-3 after:w-3 after:bg-amber-400 after:rounded-full after:absolute after:left-[4px] after:opacity-0 peer-checked:after:opacity-100 after:transition-all after:duration-400 after:ease-out `}
                                        >
                                          {item.label}
                                        </label>
                                      </div>
                                    ))}
                                  </>
                                )}
                              />
                            </motion.div>
                          </AnimatePresence>
                        </>
                      )}
                      {page === 2 && (
                        <>
                          <AnimatePresence>
                            <motion.div
                              initial={{
                                opacity: 0,
                              }}
                              animate={{
                                opacity: 100,
                              }}
                              transition={{
                                duration: ".3",
                                ease: "easeIn",
                              }}
                              className="flex flex-col gap-1"
                            >
                              <Field
                                name="dob"
                                children={(field) => {
                                  return (
                                    <>
                                      <label
                                        htmlFor={field.name}
                                        className="hidden w-full pl-1 text-lg font-bold tracking-wider md:block text-amber-400"
                                      >
                                        Date of birth{" "}
                                        <span className="font-mono text-sm font-semibold">
                                          (optional) (mm/dd/yyyy)
                                        </span>
                                      </label>
                                      <input
                                        type="date"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.dob}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                        className="w-[50%] custom-mobile-text-size border-1 text-lg border-gray-300 px-3 py-1 rounded-[10px] bg-gray-100 text-gray-500 tracking-wider"
                                      />
                                    </>
                                  );
                                }}
                              />
                            </motion.div>
                            <motion.div
                              initial={{
                                opacity: 0,
                                translateY: "-10px",
                              }}
                              animate={{
                                opacity: 100,
                                translateY: ["-10px", "1px", "0px"],
                              }}
                              transition={{
                                duration: ".3",
                                ease: "easeIn",
                              }}
                              className="flex flex-col gap-1"
                            >
                              <Field
                                name="password"
                                children={(field) => {
                                  const { errors, isTouched } =
                                    field.state.meta;
                                  return (
                                    <>
                                      <label
                                        htmlFor={field.name}
                                        className="hidden w-full pl-1 text-lg font-bold tracking-wider md:block text-amber-400"
                                      >
                                        Password
                                      </label>
                                      <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                          field.handleChange(e.target.value);
                                          passwordRef.current = e.target.value;
                                        }}
                                        placeholder="Password"
                                        type="password"
                                        className="w-full tracking-wide py-2 px-3  font-semibold text-gray-600 bg-white rounded-lg outline-none focus:outline-none shadow-[0px_1px_10px_2px] shadow-amber-100 md:placeholder:text-white"
                                      />
                                      {errors?.length && isTouched ? (
                                        <motion.span
                                          initial={{
                                            translateY: "-4px",
                                            opacity: 0,
                                          }}
                                          animate={{
                                            opacity: 100,
                                            translateY: ["-4px", "1px", "0px"],
                                          }}
                                          transition={{
                                            duration: ".3",
                                            ease: "easeIn",
                                          }}
                                          className="w-full px-1 py-0.5 text-xs text-red-400 font-semibold"
                                        >
                                          * {errors[0].message}
                                        </motion.span>
                                      ) : null}
                                    </>
                                  );
                                }}
                              />
                            </motion.div>
                            <motion.div
                              initial={{
                                opacity: 0,
                                translateY: "-10px",
                              }}
                              animate={{
                                opacity: 100,
                                translateY: ["-10px", "1px", "0px"],
                              }}
                              transition={{
                                duration: ".3",
                                ease: "easeIn",
                              }}
                              className="flex flex-col gap-1"
                            >
                              <Field
                                name="confirmPassword"
                                children={(field) => {
                                  return (
                                    <>
                                      <label
                                        htmlFor={field.name}
                                        className="hidden w-full pl-1 text-lg font-bold tracking-wider md:block text-amber-400"
                                      >
                                        Connfirm Password
                                      </label>
                                      <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                        placeholder="Confirm Password"
                                        type="password"
                                        className="w-full tracking-wide py-2 px-3  font-semibold text-gray-600 bg-white rounded-lg outline-none focus:outline-none shadow-[0px_1px_10px_2px] shadow-amber-100 md:placeholder:text-white"
                                      />
                                      {field.state.value &&
                                      field.state.value ===
                                        passwordRef.current ? (
                                        <div className="flex items-center justify-start gap-2 mt-2 text-sm font-semibold tracking-wide text-green-500 md:text-lg">
                                          <TbPassword className="w-6 h-6" />
                                          <span>Password match</span>
                                        </div>
                                      ) : field.state.value &&
                                        field.state.value !==
                                          passwordRef.current ? (
                                        <div className="flex items-center justify-start gap-2 mt-2 text-sm font-semibold tracking-wide text-red-500 md:text-lg">
                                          <MdOutlineDoNotDisturbAlt className="w-6 h-6" />
                                          <span>Password don't match</span>
                                        </div>
                                      ) : (
                                        <div className="w-full mt-2 text-sm font-semibold tracking-wide text-transparent md:text-lg">
                                          No text
                                        </div>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </motion.div>
                          </AnimatePresence>
                        </>
                      )}
                      <div className="flex items-center justify-center w-full">
                        <button
                          type="submit"
                          className={`flex items-center justify-center gap-3 py-3 text-xl font-bold transition-colors duration-200 ease-in rounded-lg cursor-pointer ${page === 1 ? "px-7 tracking-wider" : "px-10 tracking-widest"} text-gray-50 text-shadow-2xs text-shadow-gray-900 bg-amber-500 hover:bg-amber-600/90`}
                        >
                          <span>{page === 1 ? "Continue" : "Sign Up"}</span>
                          {page === 1 ? (
                            <MdOutlineKeyboardArrowRight className="w-7 h-7" />
                          ) : null}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pendingModal && (
        <Modal open={pendingModal} onModalClose={handlePendingClose}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-full h-full"
          >
            <PendingStatusLoader
              isVisible={pendingModal}
              onCloseHandler={handlePendingClose}
              loaderType="account_creation"
            />
          </div>
        </Modal>
      )}
      {errorModal && (
        <Modal open={errorModal} onModalClose={handleErrorClose}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-full h-full"
          >
            <ErrorStatusDisplay
              errorMessage={signupError?.message}
              errorCode={signupError?.statusCode}
              onCloseHandler={handleErrorClose}
            />
          </div>
        </Modal>
      )}
      {successModal && (
        <Modal open={successModal} onModalClose={handleSuccessClose}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-full h-full "
          >
            <SuccessStatusDisplay
              message={{
                primary: "Welcome to Burger Killa 🍔",
                secondary: "Redirecting you to the kitchen ...",
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SignUp;
