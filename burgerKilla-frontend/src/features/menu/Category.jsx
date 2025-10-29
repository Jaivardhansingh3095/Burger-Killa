function Category({ item, setSearchParams, searchParams, handleModalClose }) {
  return (
    <div
      className={`bg-white h-full w-full px-5 flex justify-start items-center not-last:border-b-1 not-last:border-gray-300 cursor-pointer hover:bg-amber-100/50 transition duration-300 ${searchParams.get('categories') === item.name.toLowerCase().slice(0, -1) ? 'inset-shadow-[1px_1px_8px_2px] inset-shadow-orange-600' : ''}`}
      role="button"
      onClick={() => {
        setSearchParams((prev) => ({
          ...prev,
          categories: `${item.name.toLowerCase().slice(0, -1)}`,
        }));
        if (handleModalClose) handleModalClose();
      }}
    >
      <div className="flex items-center justify-center gap-2 ">
        <img src={item.image} alt="menu category image" className="w-10 h-10" />
        <span className="font-bold text-gray-500 text-[1rem]">{item.name}</span>
      </div>
      {/* <p className="ml-auto font-extralight text-orange-300 text-[.8rem]">
        ({item.quantity})
      </p> */}
    </div>
  );
}

export default Category;
