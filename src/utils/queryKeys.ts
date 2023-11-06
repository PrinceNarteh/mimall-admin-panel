export const queryKeys = {
  // Administrators
  Admins: {
    key: ["all-admins"],
    url: "/admins",
  },
  Admin: {
    key: (id: string) => ["all-admins", id],
    url: (id: string) => `/admins/${id}`,
  },

  // Products
  Products: {
    key: ["all-products"],
    url: "/products",
  },
  Product: {
    key: (id: string) => ["all-products", id],
    url: (id: string) => `/products/${id}`,
  },

  // Roles
  Roles: {
    key: ["all-roles"],
    url: "/roles",
  },
  Role: {
    key: (id: string) => ["all-roles", id],
    url: (id: string) => `/roles/${id}`,
  },
  // Permissions
  Permissions: {
    key: ["all-permissions"],
    url: "/permissions",
  },
  Permission: {
    key: (id: string) => ["all-permissions", id],
    url: (id: string) => `/permissions/${id}`,
  },

  // Delivery Companies
  DeliveryCompanies: {
    key: ["all-delivery-companies"],
    url: "/delivery-companies",
  },
  DeliveryCompany: {
    key: (id: string) => ["all-delivery-companies", id],
    url: (id: string) => `/delivery-companies/${id}`,
  },

  // Shops
  Shops: {
    key: ["all-shops"],
    url: "/shops",
  },
  Shop: {
    key: (id: string) => ["all-shops", id],
    url: (id: string) => `/shops/${id}`,
  },

  // Shops
  Users: {
    key: ["all-users"],
    url: "/users",
  },
  User: {
    key: (id: string) => ["all-users", id],
    url: (id: string) => `/users/${id}`,
  },
};
