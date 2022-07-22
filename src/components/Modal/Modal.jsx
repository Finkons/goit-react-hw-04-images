import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ activeUrl, alt, onClose }) => {
  useEffect(() => {
    const onClickEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onClickEscape);

    return () => {
      window.removeEventListener('keydown', onClickEscape);
    };
  }, [onClose]);

  const onClickOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onClickOverlay}>
      <ModalWindow onClick={onClose}>
        <ModalImage src={activeUrl} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
