import { Icon } from "@iconify/react";
import { SidebarData } from "@customTypes/index";
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
                className="font-second ml-[18%] text-sm space-y-2 mt-3"
                to={item.navItems[0].path}
                key={index}
              >
                <Link
                  to={subNavItem.path}
                  className={`Sidebarlabel flex items-center  space-x-2 tracking-wider mb-3 font-ray font-semibold `}
                >
                  <div
                    className={`${
                      pathname.includes(nav.path) ? "text-white" : "text-white"
                    } flex`}
                  >
                    {pathname === subNavItem.path && (
                      <Icon icon="ep:select" className="h-3 w-3 mr-2 mt-1" />
                    )}
                    {subNavItem.title}
                  </div>
                </Link>
              </Link>
            ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default SubMenu;
