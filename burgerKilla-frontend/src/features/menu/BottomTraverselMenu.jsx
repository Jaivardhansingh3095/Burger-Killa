import { IoIosBasket } from "react-icons/io";
import { TbHomeFilled } from "react-icons/tb";
import { BiSolidFoodMenu } from "react-icons/bi";

import useOutsideClick from "../../hook/useOutsideCllick";
import Modal from "../../components/Modal";
import MenuModalView from "./MenuModalView";
import CartModalView from "../cart/CartModalView";
import { useSelector } from "react-redux";
import { selectCartQuantity } from "../cart/cartSlice";
import { useLocation, useNavigate } from "react-router";

function BottomTraverselMenu() {
  const { openModal: openModalCart, handleModalClose: handleModalCloseCart } =
    useOutsideClick();
  const location = useLocation();
  const navigate = useNavigate();

  const cartQuantity = useSelector(selectCartQuantity);

  return (
    <div className="fixed bottom-0 z-10 flex items-center w-full gap-10 pt-2 pb-1 bg-gray-200/90 justify-evenly lg:hidden">
      <button
        onClick={() => navigate("/")}
        className="flex flex-col items-center justify-center cursor-pointer rounded-xl"
      >
        <TbHomeFilled
          className={`w-6 h-6 ${location.pathname === "/" ? "fill-primary" : "fill-gray-800"}`}
        />
        <span
          className={`font-semibold tracking-wide text-sm ${location.pathname === "/" ? "text-primary" : "text-gray-400"}`}
        >
          Home
        </span>
      </button>
      <button
        onClick={() => navigate("/menu")}
        className="flex flex-col items-center justify-center cursor-pointer rounded-xl"
      >
        <BiSolidFoodMenu
          className={`w-6 h-6 ${location.pathname === "/menu" ? "fill-primary" : "fill-gray-800"}`}
        />
        <span
          className={`font-semibold tracking-wide text-sm ${location.pathname === "/menu" ? "text-primary" : "text-gray-400"}`}
        >
          Menu
        </span>
      </button>
      <button
        onClick={handleModalCloseCart}
        className="relative flex flex-col items-center justify-center cursor-pointer rounded-xl"
      >
        <IoIosBasket className="w-6 h-6 fill-gray-800" />
        {cartQuantity ? (
          <span className="absolute px-2 py-1 text-xs font-semibold text-white bg-primary rounded-full -top-1.5 -right-2">
            {cartQuantity}
          </span>
        ) : null}

        <span className={`font-semibold tracking-wide text-gray-500 text-sm`}>
          Cart
        </span>
      </button>

      {openModalCart ? (
        <Modal open={openModalCart} onModalClose={handleModalCloseCart}>
          <CartModalView handleModalClose={handleModalCloseCart} />
        </Modal>
      ) : null}
    </div>
  );
}

export default BottomTraverselMenu;
