export const queryKeys = {
  // Administrators
  AllAdmins: {
    key: ["all-admins"],
    url: "/admins",
  },
  GetAdmin: {
    key: (id: string) => ["all-admins", id],
    url: (id: string) => `/admins/${id}`,
  },
  EditAdmin: {
    key: (id: string) => ["all-admins", id],
    url: (id: string) => `/admins/${id}/edit`,
  },

  // Products
  AllProducts: {
    key: ["all-products"],
    url: "/products",
  },
  GetProduct: {
    key: (id: string) => ["all-products", id],
    url: (id: string) => `/products/${id}`,
  },
  EditProducts: {
    key: (id: string) => ["all-products", id],
    url: (id: string) => `/products/${id}/edit`,
  },

  // Roles
  AllRoles: {
    key: ["all-roles"],
    url: "/roles",
  },
  GetRole: {
    key: (id: string) => ["all-roles", id],
    url: (id: string) => `/roles/${id}`,
  },
  EditRoles: {
    key: (id: string) => ["all-roles", id],
    url: (id: string) => `/roles/${id}/edit`,
  },
};
