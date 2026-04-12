import { RiAccountCircle2Fill } from "react-icons/ri";
import useOutsideClick from "../hook/useOutsideCllick";
import ProfileMenu from "./ProfileMenu";

function ButtonProfile({ currentUser }) {
  const { openModal, handleModalClose } = useOutsideClick();
  return (
    <>
      <button className="cursor-pointer" onClick={handleModalClose}>
        <span className="flex items-center justify-center gap-1">
          <RiAccountCircle2Fill className="w-7 h-7 sm:h-7 sm:w-7 fill-orange-500/90" />
          <span className="tracking-wide sm:text-[1.1rem] text-shadow-orange-500/90">
            Profile
          </span>
        </span>
      </button>

      {openModal && (
        <ProfileMenu
          openModal={openModal}
          handleModalClose={handleModalClose}
          currentUser={currentUser}
        />
      )}
    </>
  );
}

export default ButtonProfile;
