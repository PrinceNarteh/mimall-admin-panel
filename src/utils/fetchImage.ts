import { Entity } from "@custom-types/index";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchImage = ({
  imageName,
  entity,
}: {
  imageName?: string;
  entity: Entity;
}): string => {
  if (!imageName) return "";
  return `${baseUrl}/${entity}/image/${imageName}`;
};
