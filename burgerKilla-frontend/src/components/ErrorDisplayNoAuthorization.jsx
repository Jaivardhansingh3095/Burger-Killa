function ErrorDisplayNoAuthorization({ message }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10 px-5">
      <h6 className="flex items-center justify-center gap-5 text-lg font-bold tracking-wider text-red-500 sm:text-xl">
        <span>403!</span>
        <span className="uppercase">Unauthorized Access</span>
      </h6>
      <p className="font-semibold tracking-wide text-center text-gray-600 sm:text-lg">
        {message}
      </p>
    </div>
  );
}

export default ErrorDisplayNoAuthorization;
