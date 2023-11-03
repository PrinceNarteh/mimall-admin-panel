export const queryKeys = {
  // Administrators
  AllAdmins: {
    key: ["all-admins"],
    url: "/admins",
  },
  SingleAdmin: {
    key: (id: string) => ["all-admins", id],
    url: (id: string) => `/admins/${id}`,
  },

  // Products
  AllProducts: {
    key: ["all-products"],
    url: "/products",
  },
  SingleProduct: {
    key: (id: string) => ["all-products", id],
    url: (id: string) => `/products/${id}`,
  },

  // Roles
  AllRoles: {
    key: ["all-roles"],
    url: "/roles",
  },
  SingleRole: {
    key: (id: string) => ["all-roles", id],
    url: (id: string) => `/roles/${id}`,
  },

  // Delivery Companies
  AllDeliveryCompanies: {
    key: ["all-delivery-companies"],
    url: "/delivery-companies",
  },
  SingleDeliveryCompany: {
    key: (id: string) => ["all-delivery-companies", id],
    url: (id: string) => `/delivery-companies/${id}`,
  },

  // Shops
  AllShops: {
    key: ["all-shops"],
    url: "/shops",
  },
  SingleShop: {
    key: (id: string) => ["all-shops", id],
    url: (id: string) => `/shops/${id}`,
  },
};
