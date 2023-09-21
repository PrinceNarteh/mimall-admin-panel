import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { clearUser } from "../../app/feature/user/userSlice";
// import { useUserSelector } from "../../hooks/useUserSelector";

const Header = () => {
  // const { user } = useUserSelector();
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    // dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="z-10 fixed flex bg-[#f4f3f5] h-16  justify-end items-center w-full cursor-pointer">
      <div className="flex items-center justify-end rounded-xl text-slate-700 text-[24px] font-bold leading-loose item-center pr-5">
        <div className="flex bg-primary h-12 w-[23rem] rounded-xl text-slate-700 text-[24px] font-bold leading-loose item-center">
          <div className="h-8 w-72 bg-[#F4F6FB] flex mt-2 ml-2 rounded-lg">
            <Icon icon="circum:search" className="mt-[0.4rem] h-5 w-5 ml-3" />

            <input
              type="text"
              name="name"
              placeholder="Search "
              className="bg-[#F4F6FB] w-40 outline-none p-2 placeholder:text-gray-700 text-sm placeholder:font-normal placeholder:mb-3"
            />
          </div>

          <div className="flex items-center">
            <Link to="/notification">
              <Icon
                icon="ic:outline-notifications"
                className=" ml-2 h-7 w-7 "
              />
            </Link>
            <Icon icon="ep:warning" rotate={2} className=" ml-2 h-7 w-7" />
          </div>

          <img
            className="w-8 h-8 mr-2 ml-2 mt-2 ring-2 ring-white ring-offset-1 rounded-full object-cover cursor-pointer"
            src={"/images/logo.png"}
            ref={imgRef}
            onClick={() => setOpen(!open)}
            alt=""
          />

          {open && (
            <div
              ref={menuRef}
              className="z-10 bg-white shadow-xl absolute h-40 w-60 right-4 top-20 rounded-xl ease-in-out duration-150"
            >
              <ul className="text-lg space-y-4 font-ray font-sm mt-4">
                <Link to="/main-profile">
                  <div className="flex items-center">
                    <Icon
                      icon="ic:outline-person"
                      fontSize={"25"}
                      className="ml-4 text-neutral-900"
                    />
                    <li className="cursor-pointer ml-3">View profile</li>
                  </div>
                </Link>

                <Link to="/settings">
                  <div className="flex items-center mt-5">
                    <Icon
                      icon="material-symbols:settings-outline-rounded"
                      fontSize={"20"}
                      className="ml-5 text-neutral-900"
                    />
                    <li className="cursor-pointer ml-3">Settings</li>
                  </div>
                </Link>

                <div className="flex items-center mt-5" onClick={handleLogout}>
                  <Icon
                    icon="octicon:sign-out"
                    fontSize="20"
                    className="ml-5 text-neutral-900"
                  />
                  <li className="cursor-pointer ml-3">Logout</li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
