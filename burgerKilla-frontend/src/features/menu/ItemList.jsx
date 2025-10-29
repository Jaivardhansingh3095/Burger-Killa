import Loader from '../../components/Loader';
import Item from './Item';
import useMenu from './useMenu';

function ItemList() {
  const { status, products, error } = useMenu();

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        🙏Sorry for the inconvience. The products under this category are not
        available at this moment.
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2 overflow-y-auto bg-white rounded-md">
      <div className="rounded-md w-full grid xl:grid-cols-[repeat(2,1fr)] 2xl:grid-cols-[repeat(2,1fr)] grid-flow-row gap-2 p-2 ">
        {products.map((product) => (
          <Item key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
