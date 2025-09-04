import { RiCloseFill } from 'react-icons/ri';

function Modal({ open, onModalClose, children }) {
  return (
    <div
      className={`fixed inset-0 z-1000 max-h-[100vh] overflow-hidden transition-colors ${open ? 'visible bg-gray-600/70' : 'invisible'} no-doc-scroll`}
      onClick={onModalClose}
    >
      {children}
    </div>
  );
}

export default Modal;
