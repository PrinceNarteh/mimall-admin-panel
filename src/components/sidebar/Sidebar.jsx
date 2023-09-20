import React from "react";
import { Link } from "react-router-dom";
import { useUserSelector } from "../../hooks/useUserSelector";
import { capitalize } from "../../utils/capitalize";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

export default function Sidebar() {
  const { user } = useUserSelector();

  const userPermissions = user.role?.permissions ?? [];

  const allowedPermissions = [];
  SidebarData.filter((value) => {
    let navItem = {
      sectionTitle: value.sectionTitle,
      navItems: [],
    };

    for (let item of value.navItems) {
      if (userPermissions.includes(item.groupTitle)) {
        navItem.navItems.push(item);
      }
    }

    if (navItem.navItems !== 0) {
      allowedPermissions.push(navItem);
    }
  });

  return (
    <div className="z-30 h-screen bg-primary w-72 fixed flex flex-col left-0 top-0 overflow-y-scroll cursor-pointer">
      <div className=" top h-[30px] flex items-center justify-center ">
        <Link to="/">
          <div className="flex justify-center items-center mt-20 p-2 bg-primary border-b border-white border-opacity-50">
            <img
              src={
                user.user_type === "company"
                  ? user.brand.company_logo
                  : user.company.brand.company_logo
              }
              alt=""
              className="w-20 h-15 ml-3 rounded-full"
            />
            <h3 className="text-md w-32 ml-4 text-white font-bold font-ray text-secondary">
              {user.user_type === "company"
                ? capitalize(user.company_name, " ")
                : `${user.f_name} ${user.l_name}`}
            </h3>
          </div>
        </Link>
      </div>
      <div className="overflow-y-scroll mt-[5.5rem] h-screen">
        <div className="">
          {user.role?.name === "owner"
            ? SidebarData?.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })
            : allowedPermissions?.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
        </div>
      </div>
    </div>
  );
}
