import { SidebarData } from "@custom-types/index";
import { Link, useLocation } from "react-router-dom";

function SubMenu({ item }: { item: SidebarData }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="">
      {item.sectionTitle && (
        <div className=" ml-5 mt-7 line-clamp-1 text-neutral-200 font-bold text-[14px] invisible md:visible duration-500">
          {item.sectionTitle}
        </div>
      )}
      {item.navItems.map((nav, idx) => (
        <div key={idx} className={`flex justify-between items-center`}>
          <div
            className={`w-full space-y-4 flex text-black font-bold justify-between items-center list-none h-12 font-second text-md mx-4 cursor-pointer rounded-lg  ${
              pathname === nav.path ? "bg-white text-primary" : ""
            }`}
          >
            <Link
              to={nav.path}
              className={`w-full flex justify-between items-center p-3 rounded-lg`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    pathname === nav.path ? "text-primary" : "text-white"
                  }`}
                >
                  {nav.icon}
                </div>
                <div
                  className={`font-ray font-semibold line-clamp-1 hidden md:block ${
                    pathname === nav.path ? "text-primary" : "text-white"
                  }`}
                >
                  {nav.groupTitle}
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SubMenu;
