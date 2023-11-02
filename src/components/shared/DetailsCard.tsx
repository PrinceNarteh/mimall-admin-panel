import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

type DetailsCardProps = {
  heading: string;
  title: string;
  description: string;
  image: string;
  openDetails: boolean;
  closeDetails: () => void;
  editLink?: string | null;
  actionButtons?: Function | null;
};

const DetailsCard = ({
  heading,
  image,
  title,
  description,
  openDetails,
  closeDetails,
  children,
  editLink = null,
  actionButtons = null,
}: React.PropsWithChildren<DetailsCardProps>) => {
  return (
    <div
      className={`flex items-start fixed top-0 right-0 bottom-0 left-72 min-h-screen  p-5 overflow-y-auto  bg-black/80 z-50 transform ${
        openDetails ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } duration-500`}
    >
      <div className="w-full px-12">
        <div className="h-40 bg-primary bg-[url('/public/images/wave.png')] rounded-xl relative">
          <button
            onClick={() => closeDetails()}
            className="absolute -right-4 -top-4 text-white cursor-pointer"
          >
            <Icon icon="line-md:close-circle" fontSize={36} />
          </button>
          <div className="ml-9 top-0 text-white text-2xl font-bold absolute mt-7">
            <h3>{heading}</h3>
          </div>

          <div className="absolute -bottom-10 h-20 w-11/12 mx-auto bg-white/75 backdrop-blur-lg  rounded-xl flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={image}
                alt=""
                className="h-14 w-14 ml-5 object-cover rounded-lg"
              />
              <div className="ml-3">
                <div className="h-[25px] text-blue-900 text-lg font-bold leading-7">
                  {title}
                </div>
                <div className="h-5 text-neutral-700 text-sm font-normal leading-tight">
                  {description}
                </div>
              </div>
            </div>

            <div className="flex gap-5 mr-5">
              {editLink ? (
                <Link to={editLink}>
                  <Icon
                    icon="iconamoon:edit-light"
                    className="text-2xl cursor-pointer text-orange-900"
                  />
                </Link>
              ) : null}

              {actionButtons && actionButtons()}
            </div>
          </div>
        </div>
        <div className="mt-14 max-w-full">{children}</div>
      </div>
    </div>
  );
};

export default DetailsCard;
