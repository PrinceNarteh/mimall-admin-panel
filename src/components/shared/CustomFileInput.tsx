import { Icon } from "@iconify/react";
import React from "react";

type CustomFileInputProps = {
  onChange: React.Dispatch<React.SetStateAction<File[] | null>>;
  label: string;
  required?: boolean;
  multiple?: boolean;
  height?: string;
  placeholder?: string;
};

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  onChange,
  label = "",
  required = false,
  multiple = false,
  height = "h-40",
  placeholder = "Drop your logo here",
}) => {
  const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (multiple) {
      const files = e.target.files;
      const imagesArr = [];
      for (const file of files) {
        imagesArr.push(file);
      }
      onChange(imagesArr);
    } else {
      onChange([e.target.files[0]]);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
          {label}{" "}
          {!required && (
            <span className="text-slate-300 text-md">(Optional)</span>
          )}
        </label>
      )}
      <label
        htmlFor="dropzone-file"
        className={`flex-1 w-full flex items-center justify-center  border-2 border-primary bg-[#F4F6FB] border-dashed rounded-lg cursor-pointer p-2 ${height}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Icon
            icon="line-md:cloud-upload-outline-loop"
            className="w-10 h-10 text-gray-400"
          />
          <div className="text-center">
            <span className="text-blue-900 text-[15px] font-bold">
              {placeholder}, or
            </span>
            <span className="text-red-500 text-[15px] font-bold ml-2">
              browse
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG and GIF files are allowed
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => setInput(e)}
          multiple
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default CustomFileInput;
