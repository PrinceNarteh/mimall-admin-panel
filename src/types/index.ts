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
