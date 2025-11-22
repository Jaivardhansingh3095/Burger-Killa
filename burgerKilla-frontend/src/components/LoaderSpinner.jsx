function LoaderSpinner({ content }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto border-4 border-yellow-500 border-dashed rounded-full animate-spin" />
      <h2 className="mt-4 text-zinc-900 dark:text-white">Loading...</h2>
      <p className="text-zinc-600 dark:text-zinc-400">{content}</p>
    </div>
  );
}

export default LoaderSpinner;
