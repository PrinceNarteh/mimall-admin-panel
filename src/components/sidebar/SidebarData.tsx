import { SidebarData } from "@custom-types/index";
import { Icon } from "@iconify/react";

export const sidebarData: SidebarData[] = [
  // DASHBOARD
  {
    sectionTitle: "",
    navItems: [
      {
        groupTitle: "Dashboard",
        icon: <Icon icon="radix-icons:dashboard" fontSize={"20"} />,
        path: "/",
      },
    ],
  },

  // ENTITY MANAGEMENT
  {
    sectionTitle: "ENTITY MANAGEMENT",
    navItems: [
      {
        groupTitle: "Administrators",
        icon: <Icon icon="clarity:administrator-line" fontSize={"22"} />,
        path: "/admins",
      },
      {
        groupTitle: "Delivery Companies",
        icon: <Icon icon="carbon:delivery" fontSize={"22"} />,
        path: "/delivery-companies",
      },
      {
        groupTitle: "Shops",
        icon: <Icon icon="icon-park-outline:shop" fontSize={"22"} />,
        path: "/shops",
      },
      {
        groupTitle: "Users",
        icon: <Icon icon="ph:users-three-bold" fontSize={"22"} />,
        path: "/users",
      },
      {
        groupTitle: "Roles and Permissions",
        icon: <Icon icon="mdi:account-lock-outline" fontSize={"22"} />,
        path: "/roles-and-permissions",
      },
    ],
  },

  // SERVICES
  {
    sectionTitle: "SERVICES",
    navItems: [
      {
        groupTitle: "Products",
        icon: <Icon icon="icon-park-outline:ad-product" className="h-6 w-6" />,
        path: "/products",
      },
      {
        groupTitle: "Orders",
        icon: (
          <Icon
            icon="material-symbols:shopping-cart-outline"
            className="h-6 w-6"
          />
        ),
        path: "/orders",
      },
    ],
  },
];
