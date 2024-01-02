import React, { useState } from "react";

type ImageGalleryProps = {
  images: string[] | undefined;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images = [] }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1">
        <img
          src={images[active]}
          alt=""
          className="rounded-xl h-60 w-full object-cover"
        />
      </div>

      <div className="overflow-x-scroll">
        <div className="flex">
          {images.map((img, i) => (
            <div
              key={i}
              className="shrink-0 ml-[6px] w-32 mr-1 flex justify-center rounded-xl mt-4 cursor-pointer"
            >
              <img
                className={`h-20 w-full rounded-lg object-cover`}
                src={img}
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
