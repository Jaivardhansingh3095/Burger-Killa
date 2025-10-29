import { RiAccountCircle2Fill } from 'react-icons/ri';
import useOutsideClick from '../hook/useOutsideCllick';
import ProfileMenu from './ProfileMenu';

function ButtonProfile({ currentUser }) {
  const { openModal, handleModalClose } = useOutsideClick();
  return (
    <>
      <button className="cursor-pointer" onClick={handleModalClose}>
        <span className="flex items-center justify-center gap-1">
          <RiAccountCircle2Fill className="w-6 h-6 sm:h-7 sm:w-7" />
          <span className="tracking-wide sm:text-[1.1rem]">Profile</span>
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
