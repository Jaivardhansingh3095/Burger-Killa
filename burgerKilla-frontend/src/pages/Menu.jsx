import Cart from '../features/cart/Cart';
import MediumMenuCartView from '../features/menu/MediumMenuCartView';
import MenuLayout from '../features/menu/MenuLayout';

function Menu() {
  return (
    <div className="p-2 z-1 h-auto lg:h-[89vh] max-w-[2100px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-2 bg-gray-100">
      <MenuLayout />
      <Cart />
      <MediumMenuCartView />
    </div>
  );
}

export default Menu;
