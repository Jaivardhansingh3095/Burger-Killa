import { useState } from 'react';

function useOutsideClick() {
  const [openModal, setOpenModal] = useState(false);

  function handleModalClose() {
    setOpenModal((prev) => !prev);
  }

  return { openModal, setOpenModal, handleModalClose };
}

export default useOutsideClick;
