const baseUrl = import.meta.env.VITE_API_URL;

export const getImage = (imageName: string, entity: string): string => {
  return `${baseUrl}/${entity}/image/${imageName}`;
};
