const baseUrl = process.env.REACT_APP_BASE_URL;

export const getImage = (imageName: string, entity: string): string => {
  return `${baseUrl}/${entity}/image/${imageName}`;
};
