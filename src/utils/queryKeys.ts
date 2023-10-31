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
  GetProducts: {
    key: (id: string) => ["all-products", id],
    url: (id: string) => `/products/${id}`,
  },
  EditProducts: {
    key: (id: string) => ["all-products", id],
    url: (id: string) => `/products/${id}/edit`,
  },
};
