import { FaArrowRight } from "react-icons/fa6";

import { useTopProducts } from "../useTopProducts";
import { Link } from "react-router";
import { formatCurrency } from "../../../utils/helpers";
import LoaderDasher from "../../../components/LoaderDasher";

function MenuDemoSection() {
  const { topProducts, status } = useTopProducts();

  if (status === "pending") {
    return (
      <section className=" h-[500px] md:h-screen w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
        <div className="max-w-[1250px] w-full mx-auto h-full">
          <LoaderDasher />
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="h-[500px] md:h-screen w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
        <div className="max-w-[1250px] w-full mx-auto h-full flex justify-center items-center">
          <span className="text-lg text-center lg:text-3xl sm:text-xl">
            🙏Sorry for the inconvience. Servers are down at this moment.
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className=" h-auto w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
      <div className="max-w-[1250px] w-full mx-auto h-full">
        <div className="flex flex-col w-full h-full px-2 py-20 gap-35 sm:gap-45 sm:py-30 sm:px-40 md:px-5">
          <h2 className="w-full text-xl font-bold tracking-wide text-center text-gray-600 sm:text-2xl lg:text-3xl font-poetsen">
            our most{" "}
            <span className="text-2xl font-extrabold tracking-wider underline uppercase sm:text-3xl lg:text-4xl text-primary decoration-wavy decoration-primary text-shadow-2xs text-shadow-amber-900">
              loved
            </span>{" "}
            products
          </h2>
          <div className="w-full h-full grid-cols-[repeat(1,1fr)] grid md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] gap-y-35 gap-x-10 ">
            {topProducts?.map((product) => (
              <div
                key={product.id}
                className="w-full h-full flex flex-col justify-center items-center bg-white rounded-xl shadow-[1px_3px_10px_1px] shadow-gray-300"
              >
                <div className="relative w-full h-40">
                  <img
                    src={`${import.meta.env.VITE_BACKEND}public/img/home/${product.name.toLowerCase().split(" ").join("-")}.png`}
                    alt={product.name}
                    loading="lazy"
                    className="mx-auto w-70 h-70 absolute left-[50%] -translate-x-[50%] -top-[80%] drop-shadow-[0px_10px_15px] drop-shadow-gray-500"
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-full gap-2 px-2 py-2 sm:px-5">
                  <p className="text-lg tracking-wide text-amber-500 font-poetsen text-shadow-2xs text-shadow-amber-800">
                    {product.name}
                  </p>
                  <p className="text-sm font-semibold text-gray-500">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full px-2 py-3 sm:px-5">
                  <span className="text-lg font-extrabold tracking-wide text-gray-600 sm:text-xl md:text-2xl">
                    {formatCurrency(product.price)}
                  </span>
                  <Link
                    role="button"
                    to={`/menu?categories=${product.categories}`}
                    className="relative flex items-center py-2.5 pl-12 pr-4 font-semibold tracking-wide group bg-amber-500 rounded-xl text-shadow-2xs text-shadow-amber-800"
                  >
                    <span className="shadow-[1px_1px_5px_1px] shadow-amber-700 w-[35px] flex justify-center items-center py-2 px-2.5 bg-white rounded-xl absolute left-1 group-hover:w-[calc(100%_-_8px)] transition-all duration-200 ease-in-out">
                      <FaArrowRight className=" fill-amber-500" />
                    </span>
                    <span className="text-gray-50">View More</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuDemoSection;
