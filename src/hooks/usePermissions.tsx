import { NavItem } from "@custom-types/index";
import { sidebarData } from "../components/sidebar/SidebarData";
import { useUser } from "./useUser";

export const usePermissions = () => {
  const user = useUser();
  console.log(user);

  const userPermissions = user?.role?.permissions ?? [];
  const allowedPermissions = [];

  for (let value of sidebarData) {
    let navItem: {
      sectionTitle: string;
      navItems: NavItem[];
    } = {
      sectionTitle: value.sectionTitle,
      navItems: [],
    };

    for (let item of value.navItems) {
      if (userPermissions.includes(item.groupTitle)) {
        navItem.navItems.push(item);
      }
    }

    if (navItem.navItems.length > 0) {
      allowedPermissions.push(navItem);
    }
  }

  const paths = allowedPermissions
    .map((permission) => permission.navItems.map((item) => item.path))
    .flat();

  return { allowedPermissions, paths };
};
