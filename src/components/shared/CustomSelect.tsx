import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  data: {
    id: string;
    label: string;
  }[];
  placeholder: string;
  label: string;
  loading: boolean;
  link?: string;
  setValue: any;
  errors: any;
};

const CustomSelect = ({
  name,
  data = [],
  placeholder = "",
  label = "",
  loading = false,
  link,
  setValue,
  errors,
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const optionsRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!optionsRef?.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousemove", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      inputRef.current = null;
    }
  }, [open]);

  return (
    <div
      ref={optionsRef}
      className="relative w-full font-medium cursor-pointer"
    >
      {label && (
        <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
          {label}{" "}
        </label>
      )}
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2.5 flex items-center justify-between
        border border-slate-400 shadow-md rounded-md pl-5
        ${!selected ? "text-gray-400" : "text-gray-700"}`}
      >
        <div className="line-clamp-1">{selected ? selected : placeholder}</div>
        <Icon
          icon="ic:baseline-keyboard-arrow-right"
          className={`duration-300 ${open && "rotate-180"}`}
        />
      </div>
      {open ? (
        <ul
          className={`absolute w-full z-10 bg-white mt-2 overflow-y-auto border border-slate-400 shadow-md rounded-md px-2 pt-2 max-h-60 ${
            link ? "pb-0" : "pb-2"
          }`}
        >
          <div className="flex items-center px-2 sticky top-0 mb-2 bg-white border border-slate-400 shadow-md rounded-md">
            <Icon icon="uil:search" fontSize="18" className="text-gray-700" />
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`${placeholder}`}
              className="placeholder:text-gray-700 p-2 outline-none w-full"
            />
          </div>
          {data?.map((item, index) => (
            <li
              key={index}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white rounded
            ${
              item?.label?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              item?.label?.toLowerCase().includes(inputValue)
                ? "block"
                : "hidden"
            }`}
              onClick={() => {
                if (item?.label?.toLowerCase() !== selected.toLowerCase()) {
                  setValue(name, item.id);
                  setSelected(item?.label);
                  setOpen(false);
                  setInputValue("");
                } else {
                  setOpen(false);
                }
              }}
            >
              {item?.label}
            </li>
          ))}
          {loading ? (
            <li className="p-2 text-sm hover:bg-sky-600 hover:text-white rounded flex items-end">
              <span>Loading</span>
              <Icon icon="eos-icons:three-dots-loading" className="text-base" />
            </li>
          ) : null}
          {link ? (
            <Link
              to={link}
              className="bg-white sticky bottom-0 border-t p-2 flex justify-center items-center pl-6"
            >
              <Icon
                icon="ant-design:plus-circle-outlined"
                className="h-4 w-4 text-primary"
              />
              <p className="text-sm text-primary ml-1 font-semibold">
                Add {label}
              </p>
            </Link>
          ) : null}
        </ul>
      ) : null}
      {errors[name] && (
        <span className="text-red-500 text-[12px]">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default CustomSelect;
