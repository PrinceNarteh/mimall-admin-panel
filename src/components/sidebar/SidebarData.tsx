import { Icon } from "@iconify/react";
import { SidebarData } from "@types/index";
import { Link } from "react-router-dom";

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
    navItems: [],
  },

  // SERVICES
  {
    sectionTitle: "FINANCE",
    navItems: [
      {
        groupTitle: "Cost & Payment",
        icon: <Icon icon="fluent:payment-32-regular" className="h-6 w-6" />,
        path: "/payment/estimate",
        subNav: [
          {
            title: <Link to="/payment/estimate">Estimate</Link>,
            icon: <BsDot size={20} />,
            path: "/payment/estimate",
            condition: true,
          },
          {
            title: <Link to="/payment/add-estimate">Add Estimate</Link>,
            icon: <BsDot size={20} />,
            path: "/payment/add-estimate",
            condition: false,
          },
          {
            title: <Link to="/payment/invoice">Invoices</Link>,
            icon: <BsDot size={20} />,
            path: "/payment/invoice",
            condition: true,
          },
          {
            title: <Link to="/payment/add-invoice">Add Invoices</Link>,
            icon: <BsDot size={20} />,
            path: "/payment/add-invoice",
            condition: false,
          },

          {
            title: <Link to="/payment/transactions">Transactions</Link>,
            icon: <BsDot size={20} />,
            path: "/payment/transactions",
            condition: true,
          },
          {
            title: (
              <Link to="/payment/received-payments">Received Payments</Link>
            ),
            icon: <BsDot size={20} />,
            path: "/payment/received-payments",
            condition: true,
          },

          {
            title: <Link to="/payment/out-payments">Out Payments</Link>,
            icon: <BsDot size={20} />,
            path: "/payment/out-payments",
            condition: true,
          },
          {
            title: (
              <Link to="/payment/products-and-services">
                Products & Services
              </Link>
            ),
            icon: <BsDot size={20} />,
            path: "/payment/products-and-services",
            condition: true,
          },
          {
            title: (
              <Link to="/payment/add-products-and-services">
                Add Product or Service
              </Link>
            ),
            icon: <BsDot size={20} />,
            path: "/payment/add-products-and-services",
            condition: false,
          },
        ],
      },
    ],
  },
];
