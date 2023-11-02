interface BaseUser {
  _id: string;
  role: string;
  email: string;
  phone_number: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
}

export interface User extends BaseUser {
  middle_name: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  auth_token: string;
  card_type: string;
  card_number: string;
  nationality: string;
}

export interface Admin extends BaseUser {
  first_name: string;
  last_name: string;
  profile_image: string;
  updatedAt: string;
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

export type Permission = string;
export type Role = {
  _id: string;
  name: string;
  permissions: Permission[];
};
