import Loader from '../../components/Loader';
import Item from './Item';
import useMenu from './useMenu';

function ItemList() {
  const { status, products, error } = useMenu();

  if (status === 'pending') {
    return (
      <div className="flex justify-center h-full w-full items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-full w-full items-center">
        🙏Sorry for the inconvience. The products under this category are not
        available at this moment.
      </div>
    );
  }

  return (
    <div className="bg-white h-full w-full p-2 rounded-[5px] overflow-y-auto">
      <div className=" rounded-[5px] w-full grid grid-cols-[repeat(auto-fit,26rem)] grid-flow-row  gap-2 p-2">
        {products.map((product) => (
          <Item key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
