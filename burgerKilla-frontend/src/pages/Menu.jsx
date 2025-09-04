import Cart from '../features/cart/Cart';
import MenuLayout from '../features/menu/MenuLayout';

function Menu() {
  return (
    <div className="p-2 h-[89vh] max-w-[2100px] mx-auto flex justify-center items-center gap-2 bg-gray-100">
      <MenuLayout />
      <Cart />
    </div>
  );
}

export default Menu;
