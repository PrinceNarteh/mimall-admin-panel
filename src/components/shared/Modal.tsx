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
  start?: boolean;
  disableOutsideClick?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  children,
  width = "max-w-xl",
  className = "",
  fullWidth = false,
  start = false,
  disableOutsideClick = false,
}) => {
  const modalRef = useClickedOutside(() => closeModal(false));

  return (
    <>
      <div
        className={`min-h-screen fixed top-0 right-0 bottom-0 ${
          fullWidth ? "left-0" : "left-20 md:left-72"
        } h-screen grid grid-cols-1 ${
          start ? "place-content-start" : "place-content-center"
        } p-10 overflow-y-auto  bg-neutral-700/70 z-50 ${className}
          ${
            openModal ? "scale-100 opacity-100" : "scale-0 opacity-0"
          } duration-500`}
      >
        <div
          ref={disableOutsideClick ? null : modalRef}
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
    </>
  );
};

export default Modal;
