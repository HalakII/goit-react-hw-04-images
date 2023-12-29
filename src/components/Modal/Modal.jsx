import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, tags, onCloseModal }) => {
  useEffect(() => {
    const escapeCloseModal = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', escapeCloseModal);
    return () => {
      window.removeEventListener('keydown', escapeCloseModal);
    };
  }, [onCloseModal]);

  const backdropCloseModal = evt => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };
  return (
    <div onClick={backdropCloseModal} className={css.overlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
