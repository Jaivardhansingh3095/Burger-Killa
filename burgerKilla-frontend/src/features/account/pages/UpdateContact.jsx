import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { selectUser } from "../../authentication/userSlice";
import ErrorDisplayNoAuthorization from "../../../components/ErrorDisplayNoAuthorization";
import Loader from "../../../components/Loader";

function UpdateContact() {
  const currentUser = useSelector(selectUser);

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

  return (
    <div className="flex justify-center w-full min-h-[90vh] py-3 bg-gray-50">
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
              <h4 className="text-xl font-bold tracking-wider text-gray-600 uppercase">
                Update Password
              </h4>
              <div className="flex flex-col items-center w-full gap-5 py-5">
                <div className="flex items-center justify-center w-1/2">
                  <label
                    htmlFor="oldPassword"
                    className="font-bold tracking-wide basis-1/3"
                  >
                    Old Password :
                  </label>
                  <input
                    type="text"
                    id="oldPassword"
                    className="grow-1 px-3 py-2 font-semibold tracking-wide text-gray-600 bg-gray-200/80 focus:outline-none inset-shadow-[1px_1px_4px_1px] inset-shadow-gray-300"
                    required
                  />
                </div>
                <div className="flex items-center justify-center w-1/2">
                  <label
                    htmlFor="newPassword"
                    className="font-bold tracking-wide basis-1/3"
                  >
                    New Password :
                  </label>
                  <input
                    type="text"
                    id="newPassword"
                    className="grow-1 px-3 py-2 font-semibold tracking-wide text-gray-600 bg-gray-200/80 focus:outline-none inset-shadow-[1px_1px_4px_1px] inset-shadow-gray-300"
                    required
                  />
                </div>
                <div className="flex items-center justify-center w-1/2">
                  <label
                    htmlFor="confirmPassword"
                    className="font-bold tracking-wide basis-1/3"
                  >
                    Confirm Password :
                  </label>
                  <input
                    type="text"
                    id="confirmPassword"
                    className="grow-1 px-3 py-2 font-semibold tracking-wide text-gray-600 bg-gray-200/80 focus:outline-none inset-shadow-[1px_1px_4px_1px] inset-shadow-gray-300"
                    required
                  />
                </div>
                <div className="flex items-center justify-center w-1/2 mt-10">
                  <button className="px-6 py-2 text-lg font-bold tracking-wider text-white uppercase rounded-lg text-shadow-2xs text-shadow-amber-900 bg-primary shadow-[1px_1px_2px_1px] shadow-amber-900 cursor-pointer hover:-translate-y-1 hover:shadow-[1px_1px_4px] hover:shadow-gray-600 hover:scale-103 active:scale-98 active:translate-y-1  active:shadow-[0px_1px_12px] active:shadow-gray-700 transition-all duration-100 ease-linear">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateContact;
