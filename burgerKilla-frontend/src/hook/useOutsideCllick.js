import { useState } from 'react';

function useOutsideClick() {
  const [openModal, setOpenModal] = useState(false);

  function handleModalClose() {
    setOpenModal((prev) => !prev);
  }

  return { openModal, handleModalClose };
}

export default useOutsideClick;
