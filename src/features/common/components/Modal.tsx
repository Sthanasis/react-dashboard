import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import Button from './Button';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    isOpen &&
    createPortal(
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-level-40"
          onClick={onClose}
        />
        <div className="w-screen overflow-hidden h-screen sm:max-w-[640px] sm:h-fit  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-snow-white py-4 rounded-md">
          <div className="flex justify-end w-full px-4">
            <Button
              variant="text"
              rounded
              onClick={onClose}
            >
              <span>
                <FontAwesomeIcon
                  height={24}
                  width={24}
                  icon={faClose}
                />
              </span>
            </Button>
          </div>

          <div className="overflow-auto h-full sm:max-h-[640px] px-4">
            {children}
          </div>
        </div>
        ;
      </>,
      document.body
    )
  );
};

export default Modal;
