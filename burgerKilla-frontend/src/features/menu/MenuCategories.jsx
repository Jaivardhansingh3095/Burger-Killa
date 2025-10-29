import Category from './Category';
import { useSearchParams } from 'react-router';

const menuItems = [
  { name: 'Burgers', quantity: 12, image: './icons-svg/burger-icon.svg' },
  { name: 'Wraps', quantity: 12, image: './icons-svg/wrap.svg' },
  { name: 'Meals', quantity: 12, image: './icons-svg/burger-meal-icon.svg' },
  { name: 'Munchies', quantity: 12, image: './icons-svg/fried-chicken.svg' },
  {
    name: 'Milkshakes',
    quantity: 12,
    image: './icons-svg/milkshake-icon.svg',
  },
  {
    name: 'Refreshments',
    image: './icons-svg/soda-drink.svg',
  },
  { name: 'Desserts', quantity: 12, image: './icons-svg/dessert-icon.svg' },
];

function MenuCategories() {
  const [searchParams, setSearchParams] = useSearchParams({
    categories: 'burger',
  });

  return (
    <div className="flex-col items-center hidden w-full h-full gap-2 lg:flex flex-1/4">
      <h3 className="w-full text-center bg-white rounded-tl-xl rounded-tr-xl">
        Categories
      </h3>
      <div className="flex flex-col items-center w-full h-full text-gray-900 rounded-md bg-gray-50">
        {menuItems.map((item) => (
          <Category
            key={item.name}
            item={item}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuCategories;
