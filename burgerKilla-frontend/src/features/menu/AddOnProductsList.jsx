import Loader from '../../components/Loader';
import AddOnProduct from './AddOnProduct';
import { useAddOn } from './useAddOn';

function AddOnProductsList({ categories, handleCheckedAddon }) {
  const { addOnItems, addOnError, addOnStatus } = useAddOn();

  if (addOnStatus === 'pending')
    return (
      <div className="h-full w-full  flex justify-center items-center">
        <Loader />
      </div>
    );

  if (addOnError)
    return (
      <div className="flex justify-center items-center">
        <p className="text-[1.1rem] text-gray-700">
          Opps, we are facing issue with fetching addons list. Please refresh
          the page or try later some time.
        </p>
      </div>
    );

  const filterAddOnMunchie = addOnItems.filter(
    (item) => item.categories === 'munchie',
  );

  const filterAddOnBeverage = addOnItems.filter(
    (item) =>
      item.categories === 'milkshake' || item.categories === 'refreshment',
  );

  return (
    <div className="overflow-y-scroll px-3 last:mb-7 w-full flex flex-col justify-start items-center gap-8">
      {categories === 'burger' ||
      categories === 'wrap' ||
      categories === 'meal' ? (
        <>
          <AddOnProduct
            filterAddOnProducts={filterAddOnMunchie}
            categoryName={'ADD ON MUNCHIE'}
            handleCheckedAddon={handleCheckedAddon}
          />
          <AddOnProduct
            filterAddOnProducts={filterAddOnBeverage}
            categoryName={'ADD ON BEVERAGE'}
            handleCheckedAddon={handleCheckedAddon}
          />
        </>
      ) : null}

      {categories === 'munchie' ? (
        <AddOnProduct
          filterAddOnProducts={filterAddOnBeverage}
          categoryName={'ADD ON BEVERAGE'}
          handleCheckedAddon={handleCheckedAddon}
        />
      ) : null}
    </div>
  );
}

export default AddOnProductsList;
