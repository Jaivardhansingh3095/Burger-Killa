import Modal from "../components/Modal";
import Cart from "../features/cart/Cart";
import CartModalView from "../features/cart/CartModalView";
import BottomTraverselMenu from "../features/menu/BottomTraverselMenu";
import MenuFloatingButton from "../features/menu/MenuFloatingButton";

import MenuLayout from "../features/menu/MenuLayout";
import MenuModalView from "../features/menu/MenuModalView";

function Menu() {
  return (
    <div className="p-2 z-1 h-auto lg:h-[89vh] max-w-[2100px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-2 bg-gray-100">
      <MenuLayout />
      <Cart />
      <MenuFloatingButton />
      <BottomTraverselMenu />
    </div>
  );
}

export default Menu;
