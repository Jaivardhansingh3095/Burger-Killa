import { useNavigate } from "react-router";

function LoggedRestrictionDisplay() {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-screen bg-[radial-gradient(circle_farthest-corner_at_center_center,#f5eae2_100%,#ff6f00_100%)]">
      <div className="max-w-[1250px] h-full mx-auto py-10">
        <div className="md:max-w-[730px] lg:max-w-[1000px] xl:max-w-[1200px] h-full mx-auto gap-5 flex flex-col justify-center items-center overflow-hidden ">
          <span className="text-xl font-semibold tracking-wider text-gray-700">
            You are succesfully{" "}
            <span className="font-bold text-primary">logged in!</span>
          </span>
          <span className="font-semibold tracking-wide text-gray-800">
            (For logout: Go to Profile button and click Logout)
          </span>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-2 mt-10 text-xl font-bold tracking-wider text-white uppercase rounded-sm text-shadow-2xs text-shadow-amber-900 bg-primary shadow-[1px_1px_4px_1px,-1px_-1px_1px] shadow-amber-700 cursor-pointer hover:bg-primary/80 transition-colors duration-300 ease-in"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoggedRestrictionDisplay;
