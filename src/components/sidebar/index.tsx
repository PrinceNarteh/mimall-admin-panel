import { Link } from "react-router-dom";
// import { useUserSelector } from "../../hooks/useUserSelector";
import { sidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

export default function Sidebar() {
  // const { user } = useUserSelector();

  // const userPermissions = user.role?.permissions ?? [];

  // const allowedPermissions = [];
  // SidebarData.filter((value) => {
  //   let navItem = {
  //     sectionTitle: value.sectionTitle,
  //     navItems: [],
  //   };

  //   for (let item of value.navItems) {
  //     if (userPermissions.includes(item.groupTitle)) {
  //       navItem.navItems.push(item);
  //     }
  //   }

  //   if (navItem.navItems !== 0) {
  //     allowedPermissions.push(navItem);
  //   }
  // });

  return (
    <div className="z-30 h-screen bg-primary w-20 duration-500 md:w-72 fixed flex flex-col left-0 top-0 overflow-y-scroll cursor-pointer">
      <div className=" top h-[30px] flex items-center justify-center ">
        <Link to="/">
          <div className="flex justify-center items-center mt-20 p-2 bg-primary border-b border-white border-opacity-50">
            <img
              src={"/images/logo.png"}
              alt=""
              className="w-10 h-8 md:w-20 md:h-16 duration-500 ml-3 rounded-full"
            />
            <h3 className="text-md w-32 ml-4 text-white font-bold font-ray hidden md:block">
              MiMall
            </h3>
          </div>
        </Link>
      </div>
      <div className="overflow-y-scroll mt-[5.5rem] h-screen">
        <div className="">
          {sidebarData?.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
          {/* {user.role?.name === "owner"
            ? sidebarData?.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })
            : allowedPermissions?.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })} */}
        </div>
      </div>
    </div>
  );
}
