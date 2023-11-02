const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchImage = ({
  imageName,
  entity,
}: {
  imageName?: string;
  entity: "admins" | "delivery-companies" | "users" | "shops";
}): string => {
  if (!imageName) return "";
  return `${baseUrl}/${entity}/image/${imageName}`;
};
