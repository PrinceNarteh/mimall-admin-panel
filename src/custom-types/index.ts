export type Entity =
  | "admins"
  | "delivery-companies"
  | "products"
  | "users"
  | "shops";

export type Permission = { _id: string; name: string };

export type Role = {
  _id: string;
  name: string;
  permissions: Permission[];
};

interface BaseUser {
  _id: string;
  role: Role;
  email: string;
  phone_number: string;
  alternate_phone_number: string;
  active: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface DeliveryCompany extends BaseUser {
  name: string;
  slug: string;
  whatsappNumber: string;
  location: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerPhoneNumber: string;
  deliveries: Delivery[];
  quickOrders: QuickOrder[];
  slide_images: string[];
}

export interface User extends BaseUser {
  middle_name: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  card_type: string;
  card_number: string;
  nationality: string;
}

export interface Admin extends BaseUser {
  middle_name: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  card_type: string;
  card_number: string;
  nationality: string;
}

export type SubNav = {
  title: string;
  path: string;
};

export type NavItem = {
  groupTitle: string;
  path: string;
  icon: React.JSX.Element;
  subNav?: SubNav[];
};

export type SidebarData = {
  sectionTitle: string;
  navItems: NavItem[];
};

export type OrderItem = {
  quantity: number;
  price: number;
  product: Product;
  shop: Shop;
  order: Order;
};

export type Order = {
  order_id: string;
  amount: number;
  user: "User";
  items: OrderItem[];
};

export interface Shop extends BaseUser {
  _id: string;
  role: Role;
  phone_number: string;
  alternate_phone_number: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  token: string;
  shopCode: string;
  name: string;
  password: string;
  plainPassword: string;
  description: string;
  location: string;
  mapDirection: string;
  phoneNumber: string;
  alternateNumber: string;
  whatsappNumber: string;
  instagramHandle: string;
  facebookHandle: string;
  twitterHandle: string;
  tiktokHandle: string;
  openingTime: string;
  closingTime: string;
  image: string;
  banner: string;
  products: Product[];
  orders: OrderItem[];
  quickOrderItems: QuickOrderItem[];
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  product_images: string[];
  rating: number[];
  reviews: number[];
  quickOrderItems: QuickOrderItem[];
  shop: Shop;
};

export type Delivery = {
  request: string;
  from: string;
  to: string;
  other_details: string;
  full_name: string;
  phone_number: string;
  alternate_phone_number?: string;
  location: string;
  delivery_charge: number;
  date_and_time: string;
  delivery_company: DeliveryCompany;
};

export type QuickOrderItem = {
  quantity: number;
  price: number;
  product: Product;
  shop: Shop;
  order: QuickOrder;
};

export type QuickOrder = {
  orderId: string;
  amount: number;
  deliveryCompany: "DeliveryCompany";
  deliveryCharge: number;
  fullName: string;
  phoneNumber: string;
  alternatePhoneNumber: string;
  items: QuickOrderItem[];
};
