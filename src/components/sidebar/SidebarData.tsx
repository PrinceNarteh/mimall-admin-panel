import { SidebarData } from "@customTypes/index";
import { Icon } from "@iconify/react";

export const sidebarData: SidebarData[] = [
  // DASHBOARD
  {
    sectionTitle: "",
    navItems: [
      {
        groupTitle: "Dashboard",
        path: "/",
        icon: <Icon icon="radix-icons:dashboard" />,
      },
    ],
  },

  // ENTITY MANAGEMENT
  {
    sectionTitle: "ENTITY MANAGEMENT",
    navItems: [
      {
        groupTitle: "Administrators",
        icon: <Icon icon="clarity:administrator-line" fontSize={22} />,
        path: "/admins",
        subNav: [
          {
            title: "All Administrators",
            path: "/admins",
          },
          {
            title: "Add Administrators",
            path: "/admins/add-administrator",
          },
        ],
      },
      {
        groupTitle: "Delivery Companies",
        icon: <Icon icon="carbon:delivery" fontSize={22} />,
        path: "/delivery-companies",
        subNav: [
          {
            title: "All Delivery Companies",
            path: "/delivery-companies",
          },
          {
            title: "Add Delivery Companies",
            path: "/delivery-companies/add-delivery-companies",
          },
        ],
      },
      {
        groupTitle: "Shops",
        icon: <Icon icon="icon-park-outline:shop" fontSize={22} />,
        path: "/shops",
        subNav: [
          {
            title: "All Shops",
            path: "/shops",
          },
          {
            title: "Add Shop",
            path: "/shops/add-shop",
          },
        ],
      },
    ],
  },

  // SERVICES
  {
    sectionTitle: "FINANCE",
    navItems: [
      {
        groupTitle: "Cost & Payment",
        icon: <Icon icon="fluent:payment-32-regular" className="h-6 w-6" />,
        path: "/payment/estimate",
        subNav: [],
      },
    ],
  },
];
