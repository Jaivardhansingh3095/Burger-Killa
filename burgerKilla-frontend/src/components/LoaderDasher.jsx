function LoaderDasher() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[80%] h-[70%] sm:w-[65%] sm:h-[65%] md:w-[50%] md:h-[60%] bg-gray-300 rounded-xl animate-pulse flex flex-col justify-evenly gap-5 items-center py-3 px-5 sm:px-8 md:px-10">
        <div className="w-full h-[40%] flex justify-between items-center gap-5">
          <div className="w-full h-full bg-gray-400 rounded-3xl animate-pulse"></div>
          <div className="flex flex-col items-center w-full h-full justify-evenly">
            <div className="w-full h-[20%] bg-gray-400 animate-pulse rounded-xl"></div>
            <div className="w-full h-[20%] bg-gray-400 animate-pulse rounded-xl"></div>
          </div>
        </div>
        <div className="w-full h-[40%] flex flex-col items-center gap-5 justify-evenly">
          <div className="w-full h-[20%] bg-gray-400 animate-pulse rounded-xl"></div>
          <div className="w-full h-[20%] bg-gray-400 animate-pulse rounded-xl"></div>
          <div className="w-full h-[20%] bg-gray-400 animate-pulse rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default LoaderDasher;
