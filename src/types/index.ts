export type SubNav = {
  title: string;
  icon: React.JSX.Element;
  path: string;
  condition: boolean;
};

export type NavItems = {
  groupTitle: string;
  path: string;
  icon: React.JSX.Element;
  subNav?: SubNav[];
};

export type SidebarData = {
  sectionTitle: string;
  navItems: NavItems[];
};
