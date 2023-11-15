import { SidebarData } from "@custom-types/index";
import { Icon } from "@iconify/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function SubMenu({ item }: { item: SidebarData }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="">
      {item.sectionTitle && (
        <div className="mt-10 ml-5 mb-4 text-neutral-200 font-bold text-[14px]">
          {item.sectionTitle}
        </div>
      )}
      {item.navItems.map((nav, idx) => (
        <React.Fragment key={idx}>
          <div className={`flex justify-between items-center`}>
            <div
              className={`sidebarLink w-full space-y-4 flex text-black font-bold justify-between items-center list-none h-12 font-second text-md mx-4 cursor-pointer rounded-lg  ${
                pathname.includes(nav.path) ? "bg-white text-primary" : ""
              }`}
            >
              <Link
                to={nav.path}
                className={`w-full flex justify-between items-center p-3 rounded-lg`}
              >
                <div className="flex items-center">
                  <div
                    className={`mr-2 mb-1 ${
                      pathname.includes(nav.path)
                        ? "text-primary"
                        : "text-white"
                    }`}
                  >
                    {nav.icon}
                  </div>
                  <div
                    className={`font-ray SidebarLabel font-semibold line-clamp-1 ${
                      pathname.includes(nav.path)
                        ? "text-primary"
                        : "text-white"
                    }`}
                  >
                    {nav.groupTitle}
                  </div>
                </div>
                <div
                  className={`${
                    pathname.includes(nav.path) ? "text-primary" : "text-white"
                  }`}
                >
                  {nav.subNav && nav.subNav.length > 0 && (
                    <Icon
                      icon="ic:baseline-keyboard-arrow-right"
                      className={`transform ${
                        pathname.includes(nav.path) ? "rotate-90" : "rotate-0"
                      } duration-300`}
                    />
                  )}
                </div>
              </Link>
            </div>

            <div
              className={`${
                pathname.includes(nav.path)
                  ? "w-1 mr-[0.10rem] h-9 bg-white rounded-full"
                  : ""
              } `}
            ></div>
          </div>

          {pathname.includes(nav.path) &&
            nav.subNav &&
            nav.subNav.length > 0 &&
            nav.subNav.map((subNavItem, index) => (
              <Link
                key={index}
                to={subNavItem.path}
                className={`pl-10 flex py-2 items-center tracking-wider font-ray font-semibold duration-300`}
              >
                {pathname === subNavItem.path ? (
                  <Icon
                    icon="game-icons:check-mark"
                    className={`w-3 mr-2 mt-1 text-white`}
                  />
                ) : (
                  <Icon
                    icon="ci:dot-03-m"
                    className={`w-3 mr-2 mt-1 text-white`}
                    fontSize={20}
                  />
                )}
                <span
                  className={`${
                    pathname.includes(nav.path) ? "text-white" : "text-primary"
                  } flex items-center`}
                >
                  {subNavItem.title}
                </span>
              </Link>
            ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default SubMenu;
