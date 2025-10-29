import { useTopProducts } from '../useTopProducts';
import Loader from '../../../components/Loader';
import { Link } from 'react-router';
import { formatCurrency } from '../../../utils/helpers';

function MenuDemoSection() {
  const { topProducts, status } = useTopProducts();

  if (status === 'pending') {
    <section className=" h-auto md:h-screen w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
      <div className="max-w-[1250px] w-full mx-auto h-full">
        <Loader />
      </div>
    </section>;
  }

  if (status === 'error') {
    return (
      <section className="h-auto md:h-screen w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
        <div className="max-w-[1250px] w-full mx-auto h-full">
          🙏Sorry for the inconvience. Servers are down at this moment.
        </div>
      </section>
    );
  }

  return (
    <section className=" h-auto w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
      <div className="max-w-[1250px] w-full mx-auto h-full">
        <div className="w-full h-full grid-cols-[repeat(1,1fr)] grid md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] gap-y-35 gap-x-10 px-10 sm:px-40 md:px-5 py-40">
          {topProducts?.map((product) => (
            <div
              key={product.id}
              className="w-full h-full flex flex-col justify-center items-center bg-white rounded-xl shadow-[1px_3px_10px_1px] shadow-gray-300"
            >
              <div className="relative w-full h-40">
                <img
                  src={`${import.meta.env.VITE_BACKEND}public/img/home/${product.name.toLowerCase().split(' ').join('-')}.png`}
                  alt={product.name}
                  loading="lazy"
                  className="mx-auto w-70 h-70 absolute left-[50%] -translate-x-[50%] -top-[80%] drop-shadow-[0px_30px_20px] drop-shadow-gray-500"
                />
              </div>
              <div className="flex flex-col items-start justify-center w-full gap-2 px-5 py-2">
                <p className="text-lg tracking-wide text-amber-500 font-poetsen text-shadow-2xs text-shadow-amber-800">
                  {product.name}
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  {product.description}
                </p>
              </div>
              <div className="flex items-start justify-between w-full px-5 py-3">
                <span className="text-xl font-bold tracking-wide text-gray-600">
                  {formatCurrency(product.price)}
                </span>
                <Link
                  to={`/menu?categories=${product.categories}`}
                  className="px-4 py-2 font-semibold tracking-wider transition-colors duration-300 ease-linear border border-transparent text-gray-50 bg-amber-500 rounded-xl text-shadow-2xs text-shadow-amber-800 hover:text-white hover:bg-amber-600 hover:border-orange-800"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuDemoSection;
