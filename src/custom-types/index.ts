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
  permissions: string[];
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

export interface Client extends BaseUser {
  first_name: string;
  last_name: string;
  middle_name: string;
  nationality: string;
  password: string;
  profile_image: string;
  card_type: string;
  card_number: string;
  orders: Order[];
  reviews: string[];
}

export interface DeliveryCompany extends BaseUser {
  name: string;
  slug: string;
  whatsapp_number: string;
  location: string;
  owner_first_name: string;
  owner_last_name: string;
  owner_phone_number: string;
  deliveries: Delivery[];
  quick_orders: QuickOrder[];
  slide_images: string[];
  logo?: string;
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
  first_name: string;
  middle_name: string;
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

export interface Shop {
  _id: string;
  role: Role;
  phone_number: string;
  alternate_phone_number: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  token: string;
  shop_code: string;
  name: string;
  password: string;
  plain_password: string;
  description: string;
  location: string;
  map_direction: string;
  whatsapp_number: string;
  instagram_handle: string;
  facebook_handle: string;
  twitter_handle: string;
  tiktok_handle: string;
  opening_time: string;
  closing_time: string;
  banner: string;
  profile_image: string;
  products: Product[];
  orders: OrderItem[];
  quick_order_items: QuickOrderItem[];
}

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  discount_percentage: number;
  stock: number;
  brand: string;
  category: string;
  product_images: string[];
  rating: number[];
  reviews: number[];
  quick_order_items: QuickOrderItem[];
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
  delivery_company: DeliveryCompany;
  delivery_charge: number;
  full_name: string;
  phone_number: string;
  alternate_phone_number: string;
  items: QuickOrderItem[];
};
