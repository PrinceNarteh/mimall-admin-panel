interface BaseUser {
  _id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  phone_number: string;
  active: boolean;
}

export interface User extends BaseUser {
  first_name: string;
  last_name: string;
  profile_image: string;
  auth_token: string;
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
