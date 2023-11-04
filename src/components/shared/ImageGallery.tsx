import { Entity } from "@custom-types/index";
import { fetchImage } from "@utils/fetchImage";
import React, { useState } from "react";

type ImageGalleryProps = {
  entity: Entity;
  images: string[] | undefined;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images = [], entity }) => {
  const [active, setActive] = useState(0);

  return (
    <div>
      <img
        src={images[active]}
        alt=""
        className="rounded-xl h-64 w-full object-cover"
      />

      <div className="overflow-x-scroll">
        <div className="flex">
          {images.map((img, i) => (
            <div
              key={i}
              className="shrink-0 ml-[6px] w-32 mr-1 flex justify-center rounded-xl mt-4 cursor-pointer"
            >
              <img
                className={`h-20 w-full rounded-lg object-cover`}
                src={fetchImage({
                  entity,
                  imageName: img,
                })}
                alt=""
                onClick={() => setActive(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
