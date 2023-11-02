import useClickedOutside from "@hooks/useClickedOutside";
import { Icon } from "@iconify/react";
import React from "react";

type ModalProps = {
  openModal: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: string;
  className?: string;
  fullWidth?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  children,
  width = "max-w-xl",
  className = "",
  fullWidth = false,
}) => {
  const modalRef = useClickedOutside(() => closeModal(false));

  return (
    <>
      {openModal ? (
        <div
          className={`min-h-screen fixed top-0 right-0 bottom-0 ${
            fullWidth ? "left-0" : "left-72"
          } h-screen grid grid-cols-1 place-content-center p-10 overflow-y-auto  bg-neutral-700/30 z-50 ${className}`}
        >
          <div
            ref={modalRef}
            className={`relative p-5 bg-white rounded-xl w-full mx-auto ${width}`}
          >
            <Icon
              onClick={() => closeModal(false)}
              icon="line-md:close-circle-twotone"
              className="absolute -right-4 -top-4 text-4xl text-primary cursor-pointer"
            />
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
