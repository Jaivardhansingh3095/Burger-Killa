import Loader from '../../components/Loader';
import AddOnProduct from './AddOnProduct';
import { useAddOn } from './useAddOn';

function AddOnProductsList({ categories, handleCheckedAddon }) {
  const { addOnItems, addOnError, addOnStatus } = useAddOn();

  if (addOnStatus === 'pending')
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    );

  if (addOnError)
    return (
      <div className="flex items-center justify-center">
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
    <div className="flex flex-col items-center justify-start w-full gap-8 px-3 bg-gray-100 lg:overflow-y-scroll lg:last:mb-7">
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
