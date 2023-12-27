import { Entity } from "@custom-types/index";
import { Icon } from "@iconify/react";
import { fetchImage } from "@utils/fetchImage";
import React, { useState } from "react";

type GalleryProps = {
  entity: Entity;
  images: string[] | undefined;
};

const Gallery: React.FC<GalleryProps> = ({ images = [], entity }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      <img
        src={fetchImage({
          entity,
          imageName: images[active],
        })}
        alt=""
        className="rounded-xl h-80 w-full object-cover"
      />
      <div className="absolute top-[50%] flex justify-between w-full">
        <button className="block border rounded-full bg-gray-900 text-white w7 h-7">
          <Icon icon="ic:sharp-keyboard-arrow-left" />
        </button>
        <button className="block border rounded-full bg-gray-900 text-white w7 h-7">
          <Icon icon="ic:sharp-keyboard-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
